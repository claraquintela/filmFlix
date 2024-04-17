const http = require("http");
const fs = require("fs");
const express = require("express");
const path = require("path");
const server = express();
const cors = require("cors");

// conexão com a base de dados
const db = require("./data/db");


//Doit être défini au début de l'application
const dotenv = require("dotenv");
const { log } = require("console");
dotenv.config();

server.use(cors());
server.use(express.json()); //permet d'envoyer des donnés json dans le body
server.use(express.urlencoded({extended:true})); // Pour les formulaires HTML. YNGN nesse projeto, mas taqui pra quando precisar.

// Todos os caminhos que estão dentro localhost:5501/public estão acessiveis ao Express
server.use(express.static(path.join(__dirname, "public")));


//Jeito antigo e mais longo para se criar um server:

// const server = http.createServer((request, response)=>{
//     if(request.url == "/"){
//         const file = fs.readFileSync("./public/index.html", "utf8");
//         response.setHeader("Content-Type", "text/html");
//         response.statusCode = 200;
//         response.end(file);
//     } else {
//         const file = fs.readFileSync("./public/404.html", "utf8");
//         response.setHeader("Content-Type", "text/html");
//         response.statusCode = 404;
//         response.end(file);
//     }
// });

// Jeito mais simples de criar um serveur, com o pacote Express (instalado nesta pasta)


/* 
server.get("/", (req, res) =>{
    let user = {
        id: 1,
        nom: "Clara",
        email:"clara@claraquintela.com"
    };

    //jeito Vanilla
    // ----------------------------------------------------------------
     // res.setHeader("Content-Type", "application/json");
    // res.statusCode = 201;
    // res.send("user");

    // Mas eu também posso economizar umas linhas e fazer assim:
    // ----------------------------------------------------------------
    // res.statusCode = 201;
    // res.json(user);

    // ainda, pode ser escrito assim, em uma linha (repare que status perde o "code"):
    //-----------------------------------------------------------------
    res.status(201).json(user);
}); 
*/

server.get("/api/films", async(req,res)=>{
  try {
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



server.post("/api/films", (req,res)=>{
    res.json("ok post");
})

// server.post("/api/films/initialiser", (req,res)=>{
//     try{
//     const dataInit = require("./data/filmsDepart");
//     dataInit.forEach(async(film)=>{
//         await db.collection("films").add(film); 
//     });

//     res.statusCode = 200;
//     return res.json({message:"Liste de films initialisée"});

//    } catch(error) {
//     res.statusCode = 500;
//     return res.json({message: error.message})
//   }
// });

// o endereço tem que ter os : antes da palavra id (ou qualquer outra) na url para ele reconhecer o objeto. 
// Se não tiver os dois pontos, o parâmetro não será dinâmico
server.get("/api/films/:id", async (req,res)=>{
  
try{  const id = req.params.id; // para recuperar o id dynamique de l'url
    const ref = (await db.collection("films").doc(id).get()).data();
    res.statusCode = 200;
    return res.json(ref);
} catch(error) {
    res.statusCode = 500;
    return res.json({message: error.message});
  }

})

server.put("/api/films/:id", (req, res) => {
    res.json("ok4");
});

server.delete("/api/films/:id", (req, res) => {
    res.json("ok5");
});

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


server.post("/api/utilisateurs/connexion", (req, res) => {
    res.json("ok7");
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