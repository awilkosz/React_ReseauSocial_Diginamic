import { useState } from "react";
import { Form, Button, Input } from "antd";

const FormInscription = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordReg, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [errPseudo, setErrPseudo] = useState("");
  const [errMail, setErrMail] = useState("");
  const [errMdp, setErrMdp] = useState("");

  const inscHandler = (credentials) => {
    setPassword(passwordConfirm.toString());
    return fetch(localStorage.getItem("serveurURL") + "/api/signup", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name, email, passwordReg }),
  })
    .then((reponse) => reponse.json())
    .then((reponse) => {
      if(reponse.token) {
        localStorage.setItem("userId", reponse.user.id.toString());
        localStorage.setItem("profilId", reponse.user.id.toString());
        localStorage.setItem("userName", reponse.user.name);
        localStorage.setItem("userEmail", reponse.user.email);
        setMessage("Connecté " + email);
        return reponse.token; 
      }
      else {
        setMessage("L'adresse mail que vous avez saisie est déja utilisée");
        console.log(reponse);
      }

    }
    );
    
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  const handleSubmit = async e => {
    verifPseudo();
    verifEmail();
    verifMdp();
    verifCorrespondance();

    if(verifPseudo() && verifEmail() && verifMdp() && verifCorrespondance())
    {
      const token = await inscHandler({
          name,
          email,
          passwordReg
      });

      if(token !== undefined) {
        localStorage.setItem("token", token);
        window.location.replace("/profil");
      }
    }
  }

  const verifEmail = () => {
    var email = document.getElementById('email').value,
        flag = false,
        regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
        
    if(!regex.test(email)) {
      setErrMail("L'adresse email n'a pas le bon format");
    }
    else if(email.length < 4) {
      setErrMail("L' adresse email doit faire quatre caractères minimum");
    }
    else {
      setErrMail("");
      flag = true; 
    }
    return flag;
}

const verifPseudo = () => {

  var pseudo = document.getElementById('pseudo').value,
      flag = false;

    if(pseudo === "")
    {
      setErrPseudo("Le pseudo est obligatoire");
    }
    else if(pseudo.length < 4)
    {
      setErrPseudo("Le pseudo doit faire au moins quatre caractères");
    }
    else
    {
      setErrPseudo("");
      flag = true;
    }
    return flag;
  }

  const verifMdp = () => {
    var regex = /^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
        mdp = document.getElementById('mdp').value;
    
    if(!regex.test(mdp)){
      setErrMdp("Le mot de passe doit faire 10 caractères minimum et contenir au moins une majuscule, une minuscule, un chiffre, et un caractère spécial");
      return false;
    }
    else{
      setErrMdp("");
      return true;
    }
  }

  const verifCorrespondance = () => {
    if(passwordReg !== passwordConfirm) {
      setMessage("Les mots de passe ne correspondent pas");
      return false;
    }
    else
    {
      setMessage("");
      return true;
    }
  }

  return (
    <Form {...layout} className="border rounded m-4 bg-white">
      <h2>Inscription</h2>
      <div className="d-flex justify-content-center">
        <Form.Item label={"Pseudo"}>
          <Input value={name} className="form-control" id="pseudo" onChange={(e) => setName(e.target.value)}/>
        </Form.Item>
      </div>
      <p className="text-danger">{errPseudo}</p>

      <div className="d-flex justify-content-center">
        <Form.Item label={"Email"}>
          <Input className="form-control" value={email} id="email" onChange={(e) => setEmail(e.target.value)}/>
        </Form.Item>
      </div>
      <p className="text-danger">{errMail}</p>

      <div className="d-flex justify-content-center">
        <Form.Item label={"Mot de passe"}>
          <Input
            value={passwordReg}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="mdp"
          />
        </Form.Item>
      </div>
      <p className="text-danger">{errMdp}</p>

        <div className="d-flex justify-content-center">
          <Form.Item label={"Confirmer le mot de passe"} className="form-label">
            <Input
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password"
              className="form-control"
            />
          </Form.Item>
        </div>
        <p className="text-danger">{message}</p>
      <br />
      <Button className="btn btn-primary mb-2" type="primary" htmlType="submit" onClick={handleSubmit}>S'inscrire</Button>
    </Form>
  );
};

export default FormInscription;