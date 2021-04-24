import { useState } from "react";

const FormMessage = ({ onChange }) => {
  const [contenu, setContenu] = useState("");
  const [confidentialite, setConfidentialite] = useState("");
  const [message, setMessage] = useState("");

  const post = () => {
    let author = localStorage.getItem("userId");
    let desti = localStorage.getItem("profilId");
    fetch(localStorage.getItem("serveurURL") + "/api/messages/nouveaumessage", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ contenu, confidentialite, author, desti }),
    }).then(() => {
      setMessage("Votre message a bien été publié");
      onChange();
    });
  };

  return (
    <div className="border border-secondary p-2 rounded">
      <label htmlFor="contenu"><h6>Publier un message</h6></label>

      <textarea
        name="contenu"
        value={contenu}
        className="form-control"
        placeholder="Votre message ici"
        onChange={(e) => setContenu(e.target.value)}
      />
      <br />

      <h6 className="text-start">Confidentialité : </h6>

      <div className="form-check">
        <input className="form-check-input" type="radio" name="confidentialite" value="Public" id="public" required onChange={(e) => setConfidentialite(e.target.value)} />
        <p className="text-start">
          <label className="form-check-label" htmlFor="public">
            public
          </label>
        </p>
      </div>
      
      <div className="form-check">
        <input className="form-check-input" type="radio" name="confidentialite" value="Amis" id="amisUniquement" onChange={(e) => setConfidentialite(e.target.value)} />
        <p className="text-start">
          <label className="form-check-label" htmlFor="amisUniquement">
            Amis uniquement
          </label>
        </p>
      </div>

      <div className="form-check">
        <input className="form-check-input" type="radio" name="confidentialite" value="Privé" id="prive" onChange={(e) => setConfidentialite(e.target.value)} />
        <p className="text-start">
          <label className="form-check-label" htmlFor="prive">
            Privé
          </label>
        </p>
        
      </div>
      

      <button className="btn btn-primary" onClick={() => post()}>Envoyer</button>
      {message}
    </div>
  );
};

export default FormMessage;