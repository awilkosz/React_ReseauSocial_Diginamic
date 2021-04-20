const monProfil = () => {
    return(
        <div>
        <h1>Mon mur</h1>
        
        <p>Bonjour {localStorage.getItem("userName")} !</p>
        </div>
    )
}

export default monProfil;
