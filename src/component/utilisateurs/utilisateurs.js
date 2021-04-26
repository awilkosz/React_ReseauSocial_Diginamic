import { NavLink } from "react-router-dom";

const Utilisateur = ({ utilisateur }) => {
    const enregistreIdUser = (e) => {
        e.preventDefault();
        localStorage.setItem("profilId", utilisateur.id.toString());
        window.location.replace("/profil");
    }

    return (
      <div className="container">
          <div className="row">
            <div className="col-sm">
                <NavLink className="border border-light" to="/profil" activeClassName="select" onClick={enregistreIdUser}>
                  {utilisateur.name} : {utilisateur.email}
                </NavLink>
            </div>
          </div>
      </div>
    );
  };
  
  export default Utilisateur;