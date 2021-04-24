import { useState } from "react";
import { Form, Button, Input } from "antd";

  const FormAuthent = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

const connectHandler = (credentials) => {
    return fetch(localStorage.getItem("serveurURL") + "/api/signin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((reponse) => reponse.json())
      .then((reponse) => {
        if(reponse.token) {
          localStorage.setItem("userId", reponse.user.id.toString());
          localStorage.setItem("profilId", reponse.user.id.toString());
          localStorage.setItem("userName", reponse.user.name);
          localStorage.setItem("userEmail", reponse.user.email);
          return reponse.token; 
        }
        else {
          setMessage("Vos informations de connexion sont incorrectes.");
        }

      }
      );
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  const handleSubmit = async e => {
      const token = await connectHandler({
          email,
          password
      });
      
      if(token !== undefined) {
        localStorage.setItem("token", token);
        setToken(token);
        window.location.replace("/profil");
      }

  }

  return (
    <Form {...layout} onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <Form.Item label={"Email"}>
        <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Form.Item>
      <Form.Item label={"Mot de passe"}>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </Form.Item>
      <Button type="submit" onClick={handleSubmit}>Se Connecter</Button>
      <p className="danger">{message}</p>
      <br />
      <a href="/inscription" >Pas encore inscrit ? Inscrivez vous</a>
    </Form>
  );
};



export default FormAuthent;