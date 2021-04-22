import { useState } from "react";
import { Form, Button, Input } from "antd";

const FormInscription = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordReg, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  const inscHandler = (credentials) => {
    if(passwordReg !== passwordConfirm) {
      setMessage("Les mots de passe ne correspondent pas");
      return "";
    }
    else
    {
      setPassword(passwordConfirm.toString());
    return fetch("http://localhost:5000/api/signup", {
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
    const token = await inscHandler({
        name,
        email,
        passwordReg
    });
    localStorage.setItem("token", token);
    
    if(token !== "") {
      window.location.replace("/profil");
    }
}

  return (
    <Form {...layout}>
      <Form.Item label={"Pseudo"}>
        <Input value={name} onChange={(e) => setName(e.target.value)}/>
      </Form.Item>
      <Form.Item label={"Email"}>
        <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Form.Item>
      <Form.Item label={"Mot de passe"}>
        <Input
          value={passwordReg}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </Form.Item>
      <Form.Item label={"Confirmer le mot de passe"}>
        <Input
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" onClick={handleSubmit}>S'inscrire</Button>
      {message}
    </Form>
  );
};

export default FormInscription;