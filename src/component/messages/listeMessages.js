import { useState, useCallback, useEffect } from 'react';
import Message from './message';
import FormMessage from './formMessage';

const ListeMessages = () => {
    const [messages, setMessages] = useState([]);

    const fetchMessages = useCallback(() => {
        let destiId = localStorage.getItem("profilId");
        fetch(localStorage.getItem("serveurURL") + "/api/messages/" + destiId)
            .then((rawResult) => rawResult.json())
            .then((result) => setMessages(result));
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    return ( 
        <div>
            <FormMessage onChange={fetchMessages}></FormMessage>
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