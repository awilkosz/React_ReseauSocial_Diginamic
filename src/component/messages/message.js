const Message = ({ message }) => {

  const aimer = () => {
    console.log("Appeler la fonction");
    };

  return (
      <div>
        <span>{message.emmetId} : {message.contenu}</span>
        {message.emmetId.toString() !== localStorage.getItem("userId") &&
        <button onClick={aimer.bind()}>J'aime</button>
        }
      </div>
    );
  };
  
  export default Message;