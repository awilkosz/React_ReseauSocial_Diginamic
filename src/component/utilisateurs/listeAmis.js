import { useState, useCallback, useEffect } from 'react';
import Ami from './amis';

const ListeAmis = () => {
    const [amis, setAmis] = useState([]);
    const fetchAmis = useCallback(() => {
        let id = localStorage.getItem("profilId");
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
                <Ami key={ami.id} ami={ami}></Ami>
                ))}
            </div>
        </div>
      );
};

export default ListeAmis;