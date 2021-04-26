import { NavLink } from "react-router-dom";
//import { useCallback } from 'react';

const Ami = ({ ami, onChange, onChangeAmis }) => {
    const id = ami.id;

    const accepter = () => {
        console.log(id);
        let idUser = localStorage.getItem("userId");
        let idAmi = id;
        fetch(localStorage.getItem("serveurURL") + "/api/accepterInvitation", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ idUser, idAmi }),
        }).then((fff) => {
        onChange();
        onChangeAmis();
        });

        setTimeout(() => {
          fetch(localStorage.getItem("serveurURL") + "/api/creerAmitie", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ idUser, idAmi }),
          }).then(() => {
            onChange();
            onChangeAmis();
          });
        }, 1000);
    };

  /*const refuser = useCallback(() => {
    let idUser = localStorage.getItem("userId");
    let idAmi = id;
    fetch(localStorage.getItem("serveurURL") + "/api/refuserInvitation/" + idUser + "/" + idAmi)
        .then((rawResult) => rawResult.json())
        .then((result) => {
          onChange();
          onChangeAmis();
        });
  }, []);*/

  const enregistreIdUser = (e) => {
      e.preventDefault();
      localStorage.setItem("profilId", ami.id.toString());
      window.location.replace("/profil");
  };

  return (
    <div className="container">
        <div className="row">
          <div className="col-sm">
              <NavLink to="/profil" onClick={enregistreIdUser} activeClassName="select">{ami.name} : {ami.email}</NavLink>
          </div>
          <div>
            {ami.statut === 0 &&
              <button class="btn btn-secondary" onClick={accepter.bind(id)}>Accepter</button>
            }
          </div>
        </div>
    </div>
  );
};
  
  export default Ami;