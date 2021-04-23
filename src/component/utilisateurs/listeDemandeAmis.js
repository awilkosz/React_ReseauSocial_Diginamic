import { useState, useCallback, useEffect } from 'react';
import DemandeAmi from './demandeAmis';

const ListeDemandeAmis = () => {
    const [amis, setAmis] = useState([]);
    const fetchAmis = useCallback(() => {
        let id = localStorage.getItem("userId");
        fetch(localStorage.getItem("serveurURL") + "/api/getDemandesAmi/" + id)
            .then((rawResult) => rawResult.json())
            .then((result) => {setAmis(result)});
    }, []);

    useEffect(() => {
        fetchAmis();
    }, [fetchAmis]);
    
    return ( 
        <div>
            <div>
                {amis.map((ami) => (
                <DemandeAmi onChange={fetchAmis} key={ami.id} ami={ami}></DemandeAmi>
                ))}
            </div>
        </div>
      );
};

export default ListeDemandeAmis;