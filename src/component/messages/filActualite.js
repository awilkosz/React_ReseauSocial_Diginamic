import { message } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import Message from './message';

const FilActualite = () => {
    const [messagesActu, setMessagesActu] = useState([]);

    const fetchMessagesActu = useCallback(() => {
        let id = localStorage.getItem("userId");
        fetch(localStorage.getItem("serveurURL") + "/api/filActu/" + id)
            .then((rawResult) => rawResult.json())
            .then((result) => setMessagesActu(result));
    }, []);

    useEffect(() => {
        fetchMessagesActu();
    }, [fetchMessagesActu]);

    return ( 
        <div className="col">
            <h3>Quoi de neuf ?</h3>
            <hr/>
            {messagesActu.map((message) => (
                <Message key={message.id} message={message}></Message>
            ))}
            {
                messagesActu.length === 0 &&
                <p>Cette rubrique contiendra les messages de vos amis</p>
            }
        </div>
    );
};

export default FilActualite;