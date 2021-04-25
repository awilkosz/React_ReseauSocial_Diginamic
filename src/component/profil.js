import { useState, useCallback, useEffect } from 'react';
import ListeMessages from './messages/listeMessages';
import ListeAmis from './utilisateurs/listeAmis';
import FilActualite from './messages/filActualite';

const Profil = () => {
    const [utilisateur, setUtilisateur] = useState([]);
    const [etreAmi, setEtreAmi] = useState([]);
    let estAmi = 0;

    const fetchMessages = useCallback(() => {
        let userId = localStorage.getItem("profilId");
        fetch(localStorage.getItem("serveurURL") + "/api/getUser/" + userId)
            .then((rawResult) => rawResult.json())
            .then((result) => setUtilisateur(result));
    }, []);

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

    const renderBoutonAmi = () => {
        if(localStorage.getItem("profilId") !== localStorage.getItem("userId"))
        {
            if(estAmi === 0)
                return <button onClick={inviterUtilisateur}>Ajouter aux amis</button>
            else
                return <p>Cet utilisateur fait partie de votre liste d'amis</p>
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
                            <div className="col-3 bg-white">
                                <ListeAmis></ListeAmis>
                            </div>
                            <div className="col-6 bg-white">
                                <ListeMessages className="col"></ListeMessages>
                            </div>
                            <div className="col-3 bg-white">
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
