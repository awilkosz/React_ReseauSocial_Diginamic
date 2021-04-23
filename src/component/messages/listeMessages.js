import { useState, useCallback, useEffect, isValidElement } from 'react';
import Message from './message';
import FormMessage from './formMessage';

const ListeMessages = () => {
    const [messages, setMessages] = useState([]);
    const [etreAmi, setEtreAmi] = useState([]);
    let isAmi;

    const fetchMessages = useCallback(() => {
        let destiId = localStorage.getItem("profilId");
        fetch(localStorage.getItem("serveurURL") + "/api/messages/" + destiId)
            .then((rawResult) => rawResult.json())
            .then((result) => setMessages(result));
    }, []);

    const fetchEtreAmi = useCallback(() => {
        let profilId = localStorage.getItem("profilId");
        let userId = localStorage.getItem("userId");
        fetch(localStorage.getItem("serveurURL") + "/api/getEtreAmis/" + userId + "/" + profilId)
            .then((rawResult) => rawResult.json())
            .then((result) => setEtreAmi(result));
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    useEffect(() => {
        fetchEtreAmi();
    }, [fetchEtreAmi]);


    etreAmi.map((etrAm) => (
        isAmi = etrAm.estAmi
    ));
    

    return ( 
        <div>
            {isAmi === 1 &&
            <FormMessage onChange={fetchMessages}></FormMessage>
            }
            {localStorage.getItem("userId") === localStorage.getItem("profilId") &&
            <FormMessage onChange={fetchMessages}></FormMessage>
            }
            <div>
                <h2>Mes publications</h2>
                {messages.map((message) => (
                <Message key={message.id} message={message}></Message>
                ))}
            </div>
        </div>
      );
};

export default ListeMessages;