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
    if(passwordReg !== passwordConfirm) {
      setMessage("Les mots de passe ne correspondent pas");
      return "";
    }
    else
    {
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
          setMessage("oups");
          console.log(reponse);
        }

      }
      );
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  const handleSubmit = async e => {
    setMessage("Hello world");
    verifPseudo();
    verifEmail();
    verifMdp();

    if(verifPseudo() && verifEmail() && verifMdp())
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

  return (
    <Form {...layout}>
      <h2>Inscription</h2>
      <Form.Item label={"Pseudo"}>
        <Input value={name} id="pseudo" onChange={(e) => setName(e.target.value)}/>
      </Form.Item>
      {errPseudo}
      <Form.Item label={"Email"}>
        <Input value={email} id="email" onChange={(e) => setEmail(e.target.value)}/>
      </Form.Item>
      {errMail}
      <Form.Item label={"Mot de passe"}>
        <Input
          value={passwordReg}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="mdp"
        />
      </Form.Item>
      {errMdp}
      <Form.Item label={"Confirmer le mot de passe"}>
        <Input
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
        />
      </Form.Item>
      {message}
      <br />
      <Button type="primary" htmlType="submit" onClick={handleSubmit}>S'inscrire</Button>
    </Form>
  );
};

export default FormInscription;