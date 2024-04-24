const http = require("http");
const fs = require("fs");
const express = require("express");
const path = require("path");
const server = express();
const cors = require("cors");
const bcrypt = require("bcrypt"); // Para inscriptar o mdp
const {check, validationResult, body, param, query}= require("express-validator"); // essa biblioteca tem funções de base para validar dados inputados no frontend

// conexão com a base de dados
const db = require("./data/db");


//Doit être défini au début de l'application
const dotenv = require("dotenv");
dotenv.config();

server.use(cors());
server.use(express.json()); //permet d'envoyer des donnés json dans le body
server.use(express.urlencoded({extended:true})); // Pour les formulaires HTML. YNGN nesse projeto, mas taqui pra quando precisar.

// Todos os caminhos que estão dentro localhost:5501/public estão acessiveis ao Express
server.use(express.static(path.join(__dirname, "public")));


/////////////////////////////////////////// FILMS ////////////////////////////////////////////////////////////

server.get(
    "/api/films",
    [
        check("ordre").escape().trim().optional(true).isString().notEmpty(), 
        check("limite").escape().trim().optional(true).isInt({min:0}).notEmpty()
    ], 
    async(req,res)=>{
        try {
            const validation = validationResult(req);

            if (!validation.isEmpty()){
                res.statusCode = 400;
                return res.json({"message":"Données invalides", erreurs: validation})
            }

            const ordre = req.query.ordre || 'asc';
            const limite = parseInt(req.query.limite) || 100;
            const references = await db.collection("films").orderBy("titre", ordre).limit(limite).get();
            const filmsTrouves =[];

            references.forEach((doc)=>{
                // const docData = doc.data();
                // docData.id = doc.id;
                const docData ={id:doc.id, ...doc.data()};
                filmsTrouves.push(docData);
            })

            // se nenhum filme for encontrado
            if(filmsTrouves.length == 0 ){
                res.statusCode = 404;
                return res.json({message: "Aucun film trouvé "})
            } 

    // se deu tudo certo, aficha os dados
    res.statusCode = 200;
    return res.json(filmsTrouves);

  } catch(error) {
    res.statusCode = 500;
    return res.json({message: error.message})
  }
})


server.post(
    "/api/films", 
    [
        check("titre").escape().trim().notEmpty().isString().isLength({max: 100}),
        check("genres").escape().trim().notEmpty().isString().isLength({max: 100}),
        check("description").escape().trim().isArray({min:1}).notEmpty().isString(),
        check("annee").escape().trim().notEmpty().matches("^[1-2][0-9]{3}"),
        check("realisation").escape().trim().notEmpty().isString().isLength({max: 100}),
        check("titreVignette").escape().trim().isString().notEmpty().matches("^.*\.(jpeg|jpg|png|gif|webp)$") //middleware
    ],
    async(req,res)=>{
    try{
        const validation = validationResult(req); 

        if (!validation.isEmpty()){
            res.statusCode = 400;
            return res.json({"message":"Données invalides", erreurs: validation})
        }

        const donnees = req.body;
        //valider l'info , si pas valide, on retourne une erreur sans l'envoyer à la db

        const nouveauFilm = await db.collection("films").add(donnees);
        donnees.id = nouveauFilm.id;
        res.statusCode = 200;
        return res.json(donnees);
    } catch(error) {
        res.statusCode = 500;
        return res.json({message: error.message})
    }
})

// Pour récuperer un film spécifique par id
server.get(
    "/api/films/:id", 
    [
        check("id").escape().trim().notEmpty().isString() 
    ],
    async (req,res)=>{
  
try{  
        const validation = validationResult(req);

        if(!validation.isEmpty) {
            res.statusCode=400;
            return res.json({"message":"Données invalides", erreurs:validation})
        }
        
        const id = req.params.id; // para recuperar o id dynamique de l'url
        const ref = (await db.collection("films").doc(id).get()).data();
        res.statusCode = 200;
        return res.json(ref);

    } catch(error) {
        res.statusCode = 500;
        return res.json({message: error.message});
    }
})


// Pour mettre à jour les infos d'un film spécifique
server.put("/api/films/:id", async(req, res) => {
    try { 
        const id = req.params.id;
        const contenu = req.body;
        const film = await db.collection("films").doc(id).update(contenu);

        return res.json({ message: `Le film avec l'id ${id} a été modifié` });
    } catch(error) {
        res.statusCode = 500;
        return res.json({message: error.message});
  }
});


// Pour deleter un filme de la base de données
server.delete("/api/films/:id", async(req, res) => {

    try {
        const id = req.params.id;
        const filmADeleter = await db.collection("films").doc(id).delete();
        return res.json({message: "Le film a été deleté"});

    } catch(error) {
        res.statusCode = 500;
        return res.json({message: error.message});
      }
});



///////////////////////////////////////////// UTILISATEURS ////////////////////////////////////////////////////////

//Pour avoir la liste de tous les utilisateurs
server.get("/api/utilisateurs", async (req, res) => {
    try {
        const references = await db.collection("utilisateurs").get();
        const utilisateursTrouves =[];
     
        references.forEach((doc)=>{
            const docData ={id:doc.id, ...doc.data()};
            utilisateursTrouves.push(docData);
        })
    
        // se nenhum user for encontrado
        if(utilisateursTrouves.length == 0 ){
            res.statusCode = 404;
            return res.json({message: "Aucun utilisateur trouvé"})
        } 
    
        // se deu tudo certo, aficha os dados
        res.statusCode = 200;
        return res.json(utilisateursTrouves);
    
      } catch(error) {
        res.statusCode = 500;
        return res.json({message: error.message})
      }
});

// Pour importer les données à la base
// server.post("/api/utilisateurs/inscription", (req, res) => {
//     try{
//             const dataInit = require("./data/donneesUtilisateursTest");
//             dataInit.forEach(async(utilisateur)=>{
//                 await db.collection("utilisateurs").add(utilisateur); 
//             });
        
//             res.statusCode = 200;
//             return res.json({message:"Liste d'utilisateurs initialisée"});
        
//            } catch(error) {
//             res.statusCode = 500;
//             return res.json({message: error.message})
//           }
// });


// Pour faire s'inscrire dans le site
server.post("/api/utilisateurs/inscription", async(req, res) => {
    try{
        const data = req.body;
        const {courriel, mdp} = req.body;
        //vérifier si user exist
        const reference = await db.collection("utilisateurs").where("courriel", "==", courriel).get();
        const utilisateursTrouves =[];

        reference.forEach((doc)=>{
            const docData ={id:doc.id, ...doc.data()};
            utilisateursTrouves.push(docData);
        })
        
        if(utilisateursTrouves.length > 0 ) {
            return res.json({"message" : "Le courriel existe déjà dans la base de données"});
        } else {
            const nouveauUtilisateur = await db.collection("utilisateurs").add(data);
            data.id = nouveauUtilisateur.id;
            res.statusCode = 200;
            return res.json("ok");
        }
    
    } catch (error){
        res.statusCode = 500;
        return res.json({message: error.message})
    }
});


// Pour faire le login
server.post("/api/utilisateurs/connexion", async (req, res) => {
    try {
        const {courriel, mdp} = req.body;
        const reference = await db.collection("utilisateurs").where("courriel", "==", courriel).get();

        const utilisateursTrouves =[];

        reference.forEach((doc)=>{
            const docData ={id:doc.id, ...doc.data()};
            utilisateursTrouves.push(docData);
        })

        console.log(utilisateursTrouves);
        if(utilisateursTrouves.length > 0 ) {
            const userMDP = utilisateursTrouves[0].mdp;
            const compare = await bcrypt.compare(mdp, userMDP);

            console.log(compare);

            if(compare) {
                res.statusCode = 200;
                return res.json("logged in");
            } else {
                return res.json({"message": "Le mot de passe ne concorde pas"});
            }
         }
    }catch(error){
        res.statusCode = 500;
        return res.json({message: error.message});
    }

});

// Gestion de la page 404. TAMBÉM TEM QUE FICAR NO FIM DA PÁGINA, DEPOIS DAS ROTAS, senão vai dar erro e parar a execução
// porque o servidor tem o direito de retornar apenas uma resposta
server.use((req,res) => {
    res.statusMessage = "Ressource non trouvée";
    res.status(404).json("Ressource non trouvée");
})

//Essas linhas têm que ficar no fim desse arquivo
server.listen(process.env.PORT, ()=> {
    console.log("Serveur connecté au port" + process.env.PORT)
});