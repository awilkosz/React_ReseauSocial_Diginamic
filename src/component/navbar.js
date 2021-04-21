import { NavLink } from "react-router-dom";

const logOut = () => {
  localStorage.clear();

  window.location.href = '/';
  console.log("coucou");
}

const NavBar = ({ user }) => (
  <nav class="navbar navbar-light bg-light">
    <NavLink exact to="/" activeClassName="select">
      Accueil
    </NavLink>
    {/*<NavLink to="/connexion" activeClassName="select">
      Connexion
    </NavLink>
    <NavLink to="/inscription" activeClassName="select">
      Inscription
    </NavLink>*/}
    <NavLink to="/profil" activeClassName="select">
      Mon profil
    </NavLink>
    <NavLink to="#" onClick={logOut} activeClassName="select">
      Déconnexion
    </NavLink>
  </nav>
);

export default NavBar;