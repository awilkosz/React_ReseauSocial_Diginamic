import { useState, useCallback, useEffect } from 'react';
import ListeMessages from './messages/listeMessages';
import ListeAmis from './utilisateurs/listeAmis';

const Profil = () => {
    const [utilisateur, setUtilisateur] = useState([]);
    const fetchMessages = useCallback(() => {
        let userId = localStorage.getItem("profilId");
        fetch("http://localhost:5000/api/getUser/" + userId)
            .then((rawResult) => rawResult.json())
            .then((result) => setUtilisateur(result));
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    /**
     * Invite un utilisateur à rejoindre la liste d'amis
     */
    const inviterUtilisateur = () => {
        let idUser = localStorage.getItem("userId");
        let idAmi = localStorage.getItem("profilId");
        fetch(localStorage.getItem("serveurURL") + "/api/demandeAmi", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ idUser, idAmi }),
          }).then(() => {
            alert("Votre demande d'ami a bien été envoyée");
          });
    }

    return(
        <div>
            <h1>Mon mur</h1>
            <p>Id du profil: {localStorage.getItem("profilId")}</p>
            <p>Bonjour {utilisateur.name} !</p>

            <div className="container">
                <div className="row align-items-start">
                    {
                        localStorage.getItem("profilId") !== localStorage.getItem("userId") &&
                        <button onClick={inviterUtilisateur}>Ajouter aux amis</button>
                    }
                    
                    {
                        localStorage.getItem("profilId") === localStorage.getItem("userId") && 
                        <ListeAmis></ListeAmis>
                    }
                    {/*
                        localStorage.getItem("profilId") !== localStorage.getItem("userId") && 
                        <div className="col">
                            <h3>Amis de {utilisateur.name}</h3>

                            <div><h4>Liste d'amis</h4></div>
                        </div>*/
                    }
                    
                    
                    <ListeMessages className="col"></ListeMessages>
                    {
                        localStorage.getItem("profilId") === localStorage.getItem("userId") &&
                        <div className="col"><h3>Quoi de neuf ?</h3></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profil;
