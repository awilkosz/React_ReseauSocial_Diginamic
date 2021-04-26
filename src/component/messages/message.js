import { useState, useCallback, useEffect } from 'react';

const Message = ({ message }) => {

  const [nbLikes, setNbLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(0);
  const [conf, setConf] = useState("");

  /**
   * Aime le message d'un ami
   */
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

  /**
   * Récupère le nombre de "j'aimes" d'un message
   */
  const getNbLikes = useCallback(() => {
    fetch(localStorage.getItem("serveurURL") + "/api/getNombresLike/" + message.id)
        .then((rawResult) => rawResult.json())
        .then((result) => {
          result.map((likes) => (
            setNbLikes(likes.nbLikes)
        ));
        });
  }, []);

  /**
   * Détermine si l'utilisateur a aimé le message
   */
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

  const changerConfidentialite = (eValue) => {
    let id = message.id;
    let privacy = eValue;
    fetch(localStorage.getItem("serveurURL") + "/api/messages/changePrivacy", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id, privacy }),
    }).then(() => {
      alert("La confidentialité de ce message a bien été modifiée");
    });
  };

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

  /**
   * Cette fonction affiche ou non un message en fonction de sa confidentialité
   * @returns Une div contenant le message à afficher
   */
  const renderMessage = () => {
    if((message.emmetId.toString() === localStorage.getItem("userId")) || (message.emmetId.toString() !== localStorage.getItem("userId") && (message.privacy === "Public" || message.privacy === "Amis")))
    {
      return(
        <div className="card mt-2">
        <div className="card-header text-start">
          {message.name}
          {message.emmetId.toString() === localStorage.getItem("userId") &&
            <div>
              {message.privacy === "Public" &&
                <select onChange={(e) => changerConfidentialite(e.target.value)} className="form-control" name="confidentialite" id="confidentialite">
                  <option value="Public" defaultValue>Public</option>
                  <option value="Amis">Amis uniquement</option>
                  <option value="Privé">Privé</option>
                </select>
              }
              {message.privacy === "Amis" &&
                <select onChange={(e) => changerConfidentialite(e.target.value)} className="form-control" name="confidentialite" id="confidentialite">
                  <option value="Amis" defaultValue>Amis uniquement</option>
                  <option value="Public">Public</option>
                  <option value="Privé">Privé</option>
                </select>
              }
              {message.privacy === "Privé" &&
                <select onChange={(e) => changerConfidentialite(e.target.value)} className="form-control" name="confidentialite" id="confidentialite">
                  <option value="Privé">Privé</option>
                  <option value="Public">Public</option>
                  <option value="Amis" defaultValue>Amis uniquement</option>
                </select>
              }
            </div>
          }
        </div>
        <div className="card-body">
          <p className="card-text"> {message.contenu}</p>
          {renderBoutonAime()}
          <p>{nbLikes} j'aimes</p>
        </div>
      </div>
      )
    }
  }

  return (
      <div>
        {renderMessage()}
      </div>
    );
  };
  
  export default Message;