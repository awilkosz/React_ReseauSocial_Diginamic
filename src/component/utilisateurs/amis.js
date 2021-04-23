import { NavLink } from "react-router-dom";
import { useState } from 'react';

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
    };

    return (
      <div className="container">
          <div className="row">
            <div className="col-sm">
                <NavLink to="/profil" activeClassName="select">{ami.name} : {ami.email}</NavLink>
            </div>
            <div>
              {ami.statut === 0 &&
                <button onClick={accepter.bind(id)}>Accepter</button>
              }
            </div>
          </div>
      </div>
    );
  };
  
  export default Ami;