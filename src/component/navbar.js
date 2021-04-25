import { NavLink } from "react-router-dom";

const logOut = () => {
  localStorage.clear();
  window.location.href = '/';
}

const rechercher = (e) => {
  e.preventDefault();
  let name = document.getElementById("recherche").value;
  localStorage.setItem("searchedName", name);
  window.location.replace("/recherche");
}

const setProfilIdToUserId = (e) => {
  e.preventDefault();
  localStorage.setItem("profilId", localStorage.getItem("userId"));
  window.location.replace("/profil");
}

const NavBar = ({ user }) => (
  <nav className="navbar navbar-light bg-info p-4">
    <NavLink className="text-white" onClick={setProfilIdToUserId} to="/profil" activeClassName="select">
      Mon profil
    </NavLink>
    <h5 className="text-white">
      DigiSocial
    </h5>
    <form className="d-flex">
      <input className="form-control-me-2" id="recherche" type="text" name="rechercheUtilisateur" placeholder="recherche" />
      <NavLink to="/recherche" onClick={rechercher} className="btn btn-outline-success text-white">
        Envoyer
      </NavLink>
    </form>
    <NavLink className="text-white" to="#" onClick={logOut} activeClassName="select">
      Déconnexion
    </NavLink>
  </nav>
);

export default NavBar;