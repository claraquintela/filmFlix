import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Film.css';
import StarRating from "../StarRating/StarRating";
import { AppContext } from "../App/App";
import Animation from '../Animation/Animation';



export function Film(props) {

  const context =useContext(AppContext)
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

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
  
        let [putResponse, getResponse] = await Promise.all([putNote, getFilm]);
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
            //Clear form
            e.target.reset();
          })

      } catch (error) {
        console.error('error:', error);
      }
  
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

      return  parseFloat(average.toFixed(2));
    }

    async function deleteFilm(){
      try {
        const response = await fetch(urlFilm, {
          method: 'DELETE'
        });
    
        if (response.ok) {
          console.log('Film removed');
          navigate("/liste-films");
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    return (
      <main>     
        <div className="page-film">
          <Animation>
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
              <p><span>Directed by</span> {film.realisation}</p>
              <p><span>Year:</span> {film.annee}</p>
              <p><span>Description:</span> {film.description}</p>
            </div>   
          </div>
          </Animation>
          {context.isLogged ? 
            <button className="btn-delete" onClick={deleteFilm}>Delete</button>
            :
            ""
          }
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