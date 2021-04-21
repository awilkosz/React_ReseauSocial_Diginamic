const Message = ({ message }) => {
    return (
      <div>
        <span>{message.emmetId} : {message.contenu}</span>
      </div>
    );
  };
  
  export default Message;