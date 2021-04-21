import { useState } from "react";

const FormMessage = ({ onChange }) => {
  const [contenu, setContenu] = useState("");
  const [confidentialite, setConfidentialite] = useState("");
  const [message, setMessage] = useState("");

  const post = () => {
    let author = localStorage.getItem("userId");
    let desti = author;
    fetch("http://localhost:5000/api/messages/nouveaumessage", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ contenu, confidentialite, author, desti }),
    }).then(() => {
      setMessage("Votre message a bien été publié");
      onChange();
    });
  };

  return (
    <div>
      <label htmlFor="contenu">Message : </label>
      <input
        name="contenu"
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
      />
      <br />

      <label htmlFor="confidentialite">Confidentialité : </label>
      <br />

      Privé: <input type="radio" name="confidentialité" value="Privé" onChange={(e) => setConfidentialite(e.target.value)} />
      <br />
      Amis seulement: <input type="radio" name="confidentialité" value="Amis" onChange={(e) => setConfidentialite(e.target.value)} />
      <br />
      Public: <input type="radio" name="confidentialité" value="Public" onChange={(e) => setConfidentialite(e.target.value)} />
      <br />

      <button onClick={() => post()}>Envoyer</button>
      {message}
    </div>
  );
};

export default FormMessage;