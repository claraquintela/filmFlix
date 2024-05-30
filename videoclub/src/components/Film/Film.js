import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import './Film.css';
import StarRating from "../StarRating/StarRating";
import { AppContext } from "../App/App";



export function Film(props) {

  const context =useContext(AppContext)
  const [comments, setComments] = useState([]);


  //pour avoir l'id qui a été passé dans la query string
    const { id } = useParams();
    const [film, setFilm] = useState({});
    const [rating, setRating] = useState(0)
  
    const urlFilm = `https://apifilm-4kgi.onrender.com/films/${id}`;
    
  // por fetch le film à la base de donné selon le id
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


  
//Update note
    useEffect(() => {
      async function updateNote() {
        if (rating > 0) {
          await soumettreNote();
        }
      }
        updateNote();
    }, [rating]);
  

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
  
        let [getResponse] = await Promise.all([putNote, getFilm]);
        let data = await getResponse.json();

        setFilm(prevData => ({ ...prevData, notes: data.notes }));
      } catch (error) {
        console.error('error:', error);
      }
    }

    //functions to manage comments
    async function onSubmitComment(e) {
      e.preventDefault();

      let aCommentaires;
      let comment = e.target.commentaire.value;
  
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
            setComments(data);
            // e.currentTarget.reset();
          })

      } catch (error) {
        console.error('error:', error);
      }
      // e.currentTarget.reset();
    }

    //update comment 
    useEffect(() => {
      async function updateComment() {
        if (comments > 0) {
          await onSubmitComment();
        }
      }
      updateComment();
      
    }, [comments]);
  
    //Show all comments associated with this movie
    let commentsMovie = film.commentaires;
    let blockComment =[];
  
    //Ajouter form comment à la page
    let blockAddComment ; 

    if(context.isLogged) {
      if (commentsMovie) {
        blockComment = commentsMovie.map((comment, index) => (
        <p key={index}>"{comment.commentaires}"</p>
      ));
      } else {
        blockComment = <span>No comments yet. Be the first to write a comment about this movie</span>
      }
      
    
       blockAddComment =
       <div className="all-comments">
          <h3>Write a comment</h3>
          <form onSubmit={(e) => onSubmitComment(e)} className="form-comment">
            <textarea name="commentaire" placeholder="Enter your comment"></textarea>
            <button>Submit</button>
          </form>
      </div>
    }

    //recevoir les commentaires de la db

    if (!film) {
      return <div>Données pas trouvées</div>;
    }
//calculer le moyennes de notes reçues de la db
    function averageGrade(arr) {
      if(arr === undefined)
        { 
          return 0
        }
      
      let sum = 0;
      for (let i = 0; i < arr.length; i++) {

        sum += arr[i];
      }
      const average = sum / arr.length;

      return average;
    }

    return (
      <main>     
        <div className="page-film">
          <div className="page-film_wrapper"> 
            <img src={`/img/${film.titreVignette}`} alt={film.titre} />
            <div className="page-film_content">
              <h2>{film.titre}</h2>

              {context.isLogged ?
                (<div className="rating">
                  <StarRating rating={rating} setRating={setRating}/>  
                </div>) :  ""
              }
              <p><span>Rating:</span> {averageGrade(film.notes) || 0}</p>
              <p><span>Directed by</span> {film.realisateur}</p>
              <p><span>Year:</span> {film.annee}</p>
              <p><span>Description:</span> {film.description}</p>
              {/* <button onClick={soumettreNote}>Note</button> */}
            </div>   
          </div>
        </div>

        <div className="comments">
          <div className="all-comments">
              <h3>Comments</h3>
              {blockComment}
            </div>
          {blockAddComment}
        </div>
      </main>
    );
  }
  
  export default Film;