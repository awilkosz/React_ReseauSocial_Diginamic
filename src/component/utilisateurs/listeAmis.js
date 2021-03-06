import { useState, useCallback, useEffect } from 'react';
import Ami from './amis';
import DemandeAmi from './amis';

const ListeAmis = () => {
    const [demandesAmis, setDemandesAmis] = useState([]);
    const [amis, setAmis] = useState([]);

    /**
     * Récupère les invitations d'amis
     */
    const fetchDemandesAmis = useCallback(() => {
        let id = localStorage.getItem("profilId");
        fetch(localStorage.getItem("serveurURL") + "/api/getDemandesAmi/" + id)
            .then((rawResult) => rawResult.json())
            .then((result) => {setDemandesAmis(result)});
    }, []);

    /**
     * Récupère les amis
     */
    const fetchAmis = useCallback(() => {
        let id = localStorage.getItem("profilId");
        fetch(localStorage.getItem("serveurURL") + "/api/getAmis/" + id)
            .then((rawResult) => rawResult.json())
            .then((result) => {setAmis(result)});
    }, []);

    useEffect(() => {
        fetchDemandesAmis();
    }, [fetchDemandesAmis]);

    useEffect(() => {
        fetchAmis();
    }, [fetchAmis]);
    
    return ( 

        <div className="col">
            
            {localStorage.getItem("profilId") === localStorage.getItem("userId") &&
            <div>
                <h3>Vos amis</h3>
                <hr/>
                <h4>Invitations reçues</h4>
                <div>
                    <div>
                        {demandesAmis.map((ami) => (
                        <Ami onChange={fetchDemandesAmis} onChangeAmis={fetchAmis}  key={ami.id} ami={ami}></Ami>
                        ))}
                        {
                            demandesAmis.length === 0 &&
                            <p>Aucune demandes reçues</p>
                        }
                    </div>
                </div>

            </div>
            }
            <hr/>
            <div>
                <h4>Liste d'amis</h4>
                {amis.map((ami) => (
                    <DemandeAmi onChange={fetchAmis} key={ami.id} ami={ami}></DemandeAmi>
                ))}
                {
                    amis.length === 0 &&
                    <p>Aucun ami dans cette liste pour l'instant</p>
                }
            </div>
        </div>

        
      );
};

export default ListeAmis;