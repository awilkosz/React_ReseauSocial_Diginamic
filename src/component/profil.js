import { useState, useCallback, useEffect } from 'react';
import ListeMessages from './messages/listeMessages';
import ListeAmis from './utilisateurs/listeAmis';
import FilActualite from './messages/filActualite';

const Profil = () => {
    const [utilisateur, setUtilisateur] = useState([]);
    const [etreAmi, setEtreAmi] = useState([]);
    let estAmi = 0;

    /**
     * Récupère les messages du profil courant
     */
    const fetchMessages = useCallback(() => {
        let userId = localStorage.getItem("profilId");
        fetch(localStorage.getItem("serveurURL") + "/api/getUser/" + userId)
            .then((rawResult) => rawResult.json())
            .then((result) => setUtilisateur(result));
    }, []);

    /**
     * Vérifie si le profil visité par l'utilisateur est celui d'un ami
     */
    const sontAmis = useCallback(() => {
        let userId = localStorage.getItem("userId");
        let amiId = localStorage.getItem("profilId");
        fetch(localStorage.getItem("serveurURL") + "/api/getEtreAmis/" + userId + "/" + amiId)
            .then((rawResult) => rawResult.json())
            .then((result) => setEtreAmi(result));
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    useEffect(() => {
        sontAmis();
    }, [sontAmis]);


    etreAmi.map((etrAm) => (
        estAmi = etrAm.estAmi
    ));

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

    /**
     * Evite d'afficher le bouton d'invitation si on est sur le profil d'un ami
     * @returns Un bouton ou un paragraphe
     */
    const renderBoutonAmi = () => {
        if(localStorage.getItem("profilId") !== localStorage.getItem("userId"))
        {
            if(estAmi === 0)
                return <button className="btn btn-secondary mb-3" onClick={inviterUtilisateur}>Ajouter aux amis</button>
            else
                return <p className="mb-3">Cet utilisateur fait partie de votre liste d'amis</p>
        }
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
                    {renderBoutonAmi()}

                    <div className="container">
                        <div className="row">
                            <div className="col-2 bg-white rounded">
                                <ListeAmis></ListeAmis>
                            </div>
                            <div className="col-6 bg-white m-2 rounded">
                                <ListeMessages className="col"></ListeMessages>
                            </div>
                            {
                                localStorage.getItem("profilId") === localStorage.getItem("userId") &&
                                <div className="col-3 bg-white rounded">
                                
                                    <FilActualite></FilActualite>
                                
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profil;
