import { NavLink } from "react-router-dom";
import { useState } from 'react';

const Ami = ({ ami, onChange }) => {
    const id = ami.id;

    return (
      <div className="container">
          <div className="row">
            <div className="col-sm">
                <NavLink to="/profil" activeClassName="select">{ami.name} : {ami.email}</NavLink>
            </div>
          </div>
      </div>
    );
  };
  
  export default Ami;