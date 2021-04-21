import { useState, useCallback, useEffect } from 'react';
import Message from './message';
import FormMessage from './formMessage';

const ListeMessages = () => {
    const [messages, setMessages] = useState([]);
    const fetchMessages = useCallback(() => {
        let emmetId = localStorage.getItem("userId");
        fetch("http://localhost:5000/api/messages/" + emmetId)
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
                Liste de messages :
                {messages.map((message) => (
                <Message key={message.id} message={message}></Message>
                ))}
            </div>
        </div>
      );
};

export default ListeMessages;