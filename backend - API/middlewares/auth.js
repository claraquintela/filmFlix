const db = require("../data/db");
const jwt = require("jsonwebtoken");


const auth = async (req, res, next) => {
   try {
      const authorization = req.headers.authorization;
      // vérifier le token
      if(authorization) {
         //exemple: jeton = "Bearer ksifuhsjdmnhndsbmjfmhsnbdjshcf"
         const jetonAValider = authorization.split (" ")[1]
         const jetonDecoded = jwt.verify(jetonAValider, process.env.JWT_SECRET);     // valide le jeton
         const utilisateurVerifie = await db.collection("utilisateurs").doc(jetonDecoded.id).get()  //récupère l'utilisateur dans le jeton (il exist?)
         
         if(utilisateurVerifie.exists){
            next();
         } else {
            // res.statusCode = 401;
            // return res.json({message: "Not authorized"}). This code OR :
            throw new Error("Non autorisé")
         }
      } else {
         throw new Error("Non autorisé")
      }
   } catch (erreur) {
    res.statusCode = 500;
    return res.json({message: erreur.message})
   }
}

module.exports = auth;