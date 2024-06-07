import { useNavigate } from 'react-router-dom';
import './Admin.css'
import { useState } from 'react';

function Admin () {

    const navigate = useNavigate();

    const [genres, setGenres] = useState([]);

    async function onSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = {
            "titre": form.titre.value,
            genres,
            "realisation": form.realisation.value,
            "description": form.description.value,
            "annee": form.annee.value,
            "titreVignette": form.titreVignette.files[0].name
        }
        const token = `Bearer ${localStorage.getItem("api-film-token")}`;
        const options={
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "authorization": token,
            },
            body: JSON.stringify(data),
        };

        //register the info about the movie
        const reponse = await fetch("http://localhost:5000/api/films", options);
        

        //now we register the image
        const image = form.titreVignette.files[0];
        const formData = new FormData();

        formData.append("image", image);
        let options2 = {
            method: "POST",
            headers: {
                authorization: token,
            },
            body: formData,
        };
        const reponseImage = await fetch("http://localhost:5000/api/films/upload-image", options2);
        const traitementReponse = await reponseImage.json();

        if(reponse.status === 200){
            navigate("/liste-films")
        }
    }

    function onChange(e) {
        const boite = e.currentTarget;
        const value = boite.value;
        if(boite.checked && !genres.includes()){
            setGenres([...genres,value]);
        } else {
            let nouveauArray = genres.filter((element)=>{
                return element !== value;
            })
            setGenres(nouveauArray)
        }

    }

    return (
        <main>
            <div className='wrapper'>
                <h1>Insert a new movie</h1>

                <form onSubmit={onSubmit} encType='multipart/form-data'>
                    <div>
                        <label htmlFor="titre">Titre</label>
                        <input type='text' name='titre'/>
                    </div>
                    <div>
                        <label htmlFor="realisation">Réalisation</label>
                        <input type='text' name='realisation'/>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea type='text' name='description'></textarea>
                    </div>
                    <div>
                        <label htmlFor="titreVignette">Titre Vignette</label>
                        <input type='file' name='titreVignette'/>
                    </div>
                    <div>
                        <label htmlFor="annee">Annee</label>
                        <input type='text' name='annee'/>
                    </div>
                    <div>
                        <input type='checkbox' value="action" name="genres-action" onChange={onChange}/>
                        <label>Action</label>
                    </div>
                    <div>
                        <input type='checkbox' value="comedie" name="genres-comedie" onChange={onChange}/>
                        <label>Comedie</label>
                    </div>
                    <div>
                        <input type='checkbox' value="drama" name="genres-drama" onChange={onChange}/>
                        <label>Drama</label>
                    </div>
                    <div>
                        <input type='checkbox' value="fantasy" name="genres-fantasy " onChange={onChange}/>
                        <label>Fantasy</label>
                    </div>
                    <div>
                        <input type='checkbox' value="Horror" name="genres-Horror" onChange={onChange}/>
                        <label>Horror</label>
                    </div>
                    <div>
                        <input type='checkbox' value="sci-fi" name="genres-sci-fi" onChange={onChange}/>
                        <label>Sci-fi</label>
                    </div>


                    <div>
                        <input type='submit'/>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Admin;