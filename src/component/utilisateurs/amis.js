import { NavLink } from "react-router-dom";

const Ami = ({ ami }) => {

    const accepter = () => {
        console.log("test");
    }

    return (
      <div className="container">
          <div className="row">
            <div className="col-sm">
                <NavLink to="/profil" activeClassName="select">{ami.name} : {ami.email}</NavLink>
                <button onClick={accepter}>Accepter</button>
            </div>
          </div>
      </div>
    );
  };
  
  export default Ami;