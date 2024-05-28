import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import './Film.css';
import StarRating from "../StarRating/StarRating";
import { AppContext } from "../App/App";



export function Film(props) {


  const context =useContext(AppContext)
  //pour avoir l'id passé dans la query string
    const { id } = useParams();
    const [film, setFilm] = useState({});
    const [rating, setRating] = useState(0)
  
    // const urlFilm = `https://four1f-tp1-claraquintela-1.onrender.com/api/films/`;
    const urlFilm = `https://apifilm-4kgi.onrender.com/films/${id}`;
    
    useEffect(() => {
      fetch(urlFilm)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setFilm(data);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    }, []);
  

    useEffect(() => {
      async function updateNote() {
        if (rating > 0) {
          await soumettreNote();
        }
      }
        updateNote();
    }, [rating]);
  
//envuar a funcão soumettre note diretamente ao componenet star rating



    async function soumettreNote() {
      let aNotes = film.notes ? [...film.notes, rating] : [rating];
  
      const oOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notes: aNotes })
      };
  
      try {
        let putNote = await fetch(urlFilm, oOptions);
        let getFilm = await fetch(urlFilm);
  
        let [putResponse, getResponse] = await Promise.all([putNote, getFilm]);
        let data = await getResponse.json();

        setFilm(prevData => ({ ...prevData, notes: data.notes }));
      } catch (error) {
        console.error('error:', error);
      }
    }


    async function onSubmitComment(e) {
      e.preventDefault();

      let aCommentaires;
      let comment = e.target.commentaire.value;
      console.log(comment);

      // aCommentaires = film.commentaires ? (prevCommentaire => ([...prevCommentaire, comment])): [{commentaires:comment , auteur:context.nom}];
  
      if(!film.commentaires){
        aCommentaires=[{commentaires:comment, autor:context.nom}]
      }else {
        aCommentaires=film.commentaires;
        aCommentaires.push({commentaires:comment , auteur:context.nom})
      }

      const oOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ commentaires: aCommentaires })
      };
  
      try {
        let putCommentaire = await fetch(urlFilm, oOptions);
        let getFilm = await fetch(urlFilm);

        Promise.all([putCommentaire, getFilm])
        	.then(response => response[1].json())
          .then(data => {
            console.log(data);
          })

        /*
        let [putResponse, getResponse] = await Promise.all([putCommentaire, getFilm]);
        let data = await getResponse.json();

        setFilm(prevData => ({ ...prevData, Commentaires: data.Commentaires }));

        console.log(data);
        */
      } catch (error) {
        console.error('error:', error);
      }
    }
  
    let blockAddComment;
    if(context.isLogged) {
      blockAddComment = <form onSubmit={onSubmitComment}>
        <textarea name="commentaire" placeholder="Enter your comment"></textarea>
        <button>Submit</button>
      </form>
    }


    if (!film) {
      return <div>Données pas trouvées</div>;
    }


    return (
      <main>
        <div className="page-film">
          <div className="page-film_wrapper">
            <img src={`/img/${film.titreVignette}`} alt={film.titre} />
            <div className="page-film_content">
              <h2>{film.titre}</h2>
              <StarRating rating={rating} setRating={setRating}/>
              <p><span>Directed by</span> {film.realisateur}</p>
              <p><span>Year:</span> {film.annee}</p>
              <p><span>Description:</span> {film.description}</p>
              {/* <button onClick={soumettreNote}>Note</button> */}
            </div>   
          </div>
          {blockAddComment}
        </div>
      </main>
    );
  }
  
  export default Film;