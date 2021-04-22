import { useState, useCallback, useEffect } from 'react';
import Utilisateur from './utilisateurs';

const ListeUtilisateurs = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const fetchUtilisateurs = useCallback(() => {
        let userName = localStorage.getItem("searchedName");
        fetch(localStorage.getItem("serveurURL") + "/api/search/" + userName)
            .then((rawResult) => rawResult.json())
            .then((result) => {setUtilisateurs(result)});
    }, []);

    useEffect(() => {
        fetchUtilisateurs();
    }, [fetchUtilisateurs]);
    
    return ( 
        <div>
            <div>
                Résultats pour votre recherche :
                {utilisateurs.map((utilisateur) => (
                <Utilisateur key={utilisateur.id} utilisateur={utilisateur}></Utilisateur>
                ))}
            </div>
        </div>
      );
};

export default ListeUtilisateurs;