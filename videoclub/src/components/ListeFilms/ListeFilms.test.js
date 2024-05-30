import React from 'react';
import { render, screen, fireEvent, waitFor, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListeFilms from './ListeFilms';
import TuileFilm from '../TuileFilm/TuileFilm';


describe('Composant ListeFilms', () => {

    // Objet fictif
    const mockFilm = {
        titre: 'Alien - Le 8ème passager',
        genres: ['Horreur', 'Science-fiction'],
        description: 'Un vaisseau spatial perçoit une transmission non-identifiée comme un signal de détresse...',
        titreVignette: 'alienle8emepassager.jpg',
        realisation: 'Ridley Scott',
        annee: 1979,
        notes: [3, 4, 5, 2, 1],
        commentaires: [
            { commentaire: 'Commentaire 1', auteur: 'admin' },
            { commentaire: 'Commentaire 2', auteur: 'admin' }
        ]
    };


    test('Vérifie la présence du titre', () => {

        render(<ListeFilms/>);
        // expect(screen.getByText('Browse our collection')).toBeInTheDocument(); //jeito 1
        // expect(screen.getByText(/Browse our collection/i)).toBeInTheDocument(); //jeito 2

        const regTitre = new RegExp("Browse our collection", 'i') //jeito 3 de fazer a coisa
        const queryTitre = screen.getByText(regTitre); 
        // expect(queryTitre).toBeTruthy();   OU:
        expect(queryTitre).not.toBeFalsy();
        expect(queryTitre).toBeVisible();

        expect(screen.getByTestId("titre")).toBeInTheDocument();
        expect(screen.getByTestId("titre")).toHaveTextContent(regTitre);

    });

    test('Vérifie le click sur le titre', () => {

        render(<ListeFilms/>);
        const elTitre = screen.getByTestId("titre");
        fireEvent.click(elTitre);
        expect(screen.getByText(/Test/i)).toBeInTheDocument();

    });

    test('Vérifie la tuile d\'un film', () => {

    });



    test('Vérifie si les clés sont présentes dans la réponse', async () => {





    });
});