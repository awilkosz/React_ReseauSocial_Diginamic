import { NavLink } from "react-router-dom";
import { useState } from 'react';

const DemandeAmi = ({ ami, onChange }) => {
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
        //setMessage("Votre message a bien été publié");
        onChange();
        console.log(fff);
        });
    };

    return (
      <div className="container">
          <div className="row">
            <div className="col-sm">
                <NavLink to="/profil" activeClassName="select">{ami.name} : {ami.email}</NavLink>
            </div>
            <div>
                <button onClick={accepter.bind(id)}>Accepter</button>
            </div>
          </div>
      </div>
    );
  };
  
  export default DemandeAmi;