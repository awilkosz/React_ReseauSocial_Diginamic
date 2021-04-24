const Message = ({ message }) => {

  const aimer = () => {
    console.log("Appeler la fonction");
    };

  return (
      <div class="card mt-2">
        <div class="card-header">
          {message.emmetId}
        </div>
        <div class="card-body">
          <p class="card-text"> {message.contenu}</p>
          {message.emmetId.toString() !== localStorage.getItem("userId") &&
          <button class="btn btn-secondary" onClick={aimer.bind()}>J'aime</button>
          }
        </div>
      </div>
    );
  };
  
  export default Message;