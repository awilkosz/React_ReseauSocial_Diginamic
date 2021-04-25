import { useState, useCallback, useEffect } from 'react';

const Message = ({ message }) => {

  const [nbLikes, setNbLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(0);

  const aimer = () => {
    let idUser = localStorage.getItem("userId");
    let idMessage = message.id;
    fetch(localStorage.getItem("serveurURL") + "/api/aimerUnMessage", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idUser, idMessage }),
    }).then(() => {
      console.log("Vous aimez ce message");
      getNbLikes();
      setIsLiked(1);
    });
  };

  const getNbLikes = useCallback(() => {
    fetch(localStorage.getItem("serveurURL") + "/api/getNombresLike/" + message.id)
        .then((rawResult) => rawResult.json())
        .then((result) => {
          result.map((likes) => (
            setNbLikes(likes.nbLikes)
        ));
        });
  }, []);

  const estUnMessageAime = useCallback(() => {
    let userId = localStorage.getItem("userId");
    fetch(localStorage.getItem("serveurURL") + "/api/estUnMessageAime/" + userId + "/" + message.id)
        .then((rawResult) => rawResult.json())
        .then((result) => {
          result.map((isLike) => (
            setIsLiked(isLike.aime)
        )); 
        });
  }, []);

  useEffect(() => {
    getNbLikes();
  }, [getNbLikes]);

  useEffect(() => {
    estUnMessageAime();
}, [estUnMessageAime]);

  const renderBoutonAime = () => {
    if(message.emmetId.toString() !== localStorage.getItem("userId"))
    {
      if(isLiked === 1)
        return <button className="btn btn-secondary" onClick={aimer.bind()} disabled>Vous aimez ce message</button>
      else
        return <button className="btn btn-secondary" onClick={aimer.bind()}>J'aime</button>
    }
  }

  return (
      <div className="card mt-2">
        <div className="card-header text-start">
          {message.name}
        </div>
        <div className="card-body">
          <p className="card-text"> {message.contenu}</p>
          {renderBoutonAime()}
          <p>{nbLikes} j'aimes</p>
        </div>
      </div>
    );
  };
  
  export default Message;