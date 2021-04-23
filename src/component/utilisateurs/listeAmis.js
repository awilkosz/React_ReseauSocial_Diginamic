import { useState, useCallback, useEffect } from 'react';
import Ami from './amis';

const ListeAmis = () => {
    const [amis, setAmis] = useState([]);
    const fetchAmis = useCallback(() => {
        let id = localStorage.getItem("userId");
        fetch(localStorage.getItem("serveurURL") + "/api/getAmis/" + id)
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
                <Ami onChange={fetchAmis} key={ami.id} ami={ami}></Ami>
                ))}
            </div>
        </div>
      );
};

export default ListeAmis;