import ListeMessages from './messages/listeMessages';

const monProfil = () => {
    return(
        <div>
            <h1>Mon mur</h1>
            
            <p>Bonjour {localStorage.getItem("userName")} !</p>

            <h2>Mes messages</h2>
            <ListeMessages></ListeMessages>
        </div>
    )
}

export default monProfil;
