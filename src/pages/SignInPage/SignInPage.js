import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Context from "../../contexts/Context";
import { URL } from "../../constants/urls";
import styled from "styled-components";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = useContext(Context);
  const { setConfig } = useContext(Context);

  const signInFomr = {
    email: email,
    password: password,
  };

  function loginSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const promise = axios.post(`${URL}/sign-in`, signInFomr);

    promise.then((res) => {
      setUserInfo(res.data);
      setConfig({
        headers: {
          Authorization: `Bearer ${res.data.token}`,
        },
      });

      const localInfo = JSON.stringify(res.data);
      sessionStorage.setItem("userInfo", localInfo);

      setLoading(false);
      navigate("/transactions");
    });

    console.log(userInfo);

    promise.catch((err) => {
      setLoading(false);
      alert(err.response.data.message);
    });
  }

  useEffect(() => {
    const savedInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    if (savedInfo !== null) {
      setUserInfo(savedInfo);
      setConfig({
        headers: {
          Authorization: `Bearer ${savedInfo.token}`,
        },
      });
      navigate("/transactions");
      // console.log(savedInfo)
      // console.log(userInfo)}
    }
  });

  return (
    <Container>
      <img src={logo} alt="logo" />
      <Form onSubmit={loginSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        {loading ? (
          <Button disabled={loading}></Button>
        ) : (
          <Button disabled={loading} type="submit">
            Entrar
          </Button>
        )}
      </Form>
      <Link to={`/sign-up`}>
        <p>Primeira vez? Cadastre-se!</p>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Raleway", sans-serif;
  height: 100vh;
  width: 100%;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background-color: #8C11BE;
  img {
    margin: 68px 0 32px 0;
  }
  a {
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    font-weight: 700;
    color: #ffffff;
    margin: 25px 0 0 0;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  font-weight: 700;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 303px;
  width: 80%;
  input {
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    height: 45px;
    margin: 3px 0px;
    padding: 12px 11px;

    ::placeholder {
      color: #dbdbdb;
      font-size: 19.976px;
    }
    :focus {
      outline: 1px solid #ffffff;
      border: 1px solid #ffffff;
    }
  }
  button {
    font-family: "Raleway", sans-serif;
    font-size: 20.976px;
    line-height: 26px;
    background-color: ${(props) => (props.disabled ? "#52B6FF" : "#A328D6")};
    color: #ffffff;
    border-radius: 4.63636px;
    border: none;
    height: 45px;
    margin: 3px 0px;
  }
`;
