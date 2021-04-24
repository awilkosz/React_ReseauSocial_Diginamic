const Message = ({ message }) => {

  const aimer = () => {
    console.log("Appeler la fonction");
    };

  return (
      <div className="card mt-2">
        <div className="card-header">
          {message.emmetId}
        </div>
        <div className="card-body">
          <p className="card-text"> {message.contenu}</p>
          {message.emmetId.toString() !== localStorage.getItem("userId") &&
          <button className="btn btn-secondary" onClick={aimer.bind()}>J'aime</button>
          }
        </div>
      </div>
    );
  };
  
  export default Message;