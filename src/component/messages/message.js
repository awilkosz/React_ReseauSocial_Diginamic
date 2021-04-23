const Message = ({ message }) => {
    return (
      <div>
        <span>{message.emmetId} : {message.contenu}</span>
        {message.emmetId.toString() !== localStorage.getItem("userId") &&
        <button>J'aime</button>
        }
      </div>
    );
  };
  
  export default Message;