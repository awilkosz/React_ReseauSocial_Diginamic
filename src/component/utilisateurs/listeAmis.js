import { useState, useCallback, useEffect } from 'react';
import Ami from './amis';
import DemandeAmi from './amis';

const ListeAmis = () => {
    const [demandesAmis, setDemandesAmis] = useState([]);
    const [amis, setAmis] = useState([]);

    const fetchDemandesAmis = useCallback(() => {
        let id = localStorage.getItem("userId");
        fetch(localStorage.getItem("serveurURL") + "/api/getDemandesAmi/" + id)
            .then((rawResult) => rawResult.json())
            .then((result) => {setDemandesAmis(result)});
    }, []);

    const fetchAmis = useCallback(() => {
        let id = localStorage.getItem("userId");
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
            <h3>Vos amis</h3>
            <div>
                <h4>Invitations reçues</h4>
                <div>
                    <div>
                        {demandesAmis.map((ami) => (
                        <Ami onChange={fetchDemandesAmis} onChangeAmis={fetchAmis}  key={ami.id} ami={ami}></Ami>
                        ))}
                    </div>
                </div>

            </div>
            <div>
                <h4>Liste d'amis</h4>
                {amis.map((ami) => (
                    <DemandeAmi onChange={fetchAmis} key={ami.id} ami={ami}></DemandeAmi>
                ))}
            </div>
        </div>

        
      );
};

export default ListeAmis;