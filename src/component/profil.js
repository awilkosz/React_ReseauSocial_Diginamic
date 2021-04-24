import { useState, useCallback, useEffect } from 'react';
import ListeMessages from './messages/listeMessages';
import ListeAmis from './utilisateurs/listeAmis';
import FilActualite from './messages/filActualite';

const Profil = () => {
    const [utilisateur, setUtilisateur] = useState([]);

    const fetchMessages = useCallback(() => {
        let userId = localStorage.getItem("profilId");
        fetch(localStorage.getItem("serveurURL") + "/api/getUser/" + userId)
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
            {localStorage.getItem("profilId") === localStorage.getItem("userId") &&
                <h1>Mon mur</h1>
            }
            {localStorage.getItem("profilId") !== localStorage.getItem("userId") &&
                <h1>Profil de {utilisateur.name} </h1>
            }
            

            <div>
                <div>
                    {
                        localStorage.getItem("profilId") !== localStorage.getItem("userId") &&
                        <button onClick={inviterUtilisateur}>Ajouter aux amis</button>
                    }

                    <div class="container">
                        <div class="row">
                            <div class="col-3">
                                <ListeAmis></ListeAmis>
                            </div>
                            <div class="col-6">
                                <ListeMessages className="col"></ListeMessages>
                            </div>
                            <div class="col-3">
                            {
                                localStorage.getItem("profilId") === localStorage.getItem("userId") &&
                                <FilActualite></FilActualite>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profil;
