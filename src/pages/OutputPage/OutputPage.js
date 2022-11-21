import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../contexts/Context";
import { URL } from "../../constants/urls";
import styled from "styled-components";
import axios from "axios";

export default function OutputPage() {
  const { config } = useContext(Context);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function outputSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const promise = axios.post(
      `${URL}/output`,
      { value: value, description: description, type: "output" },
      config
    );
    console.log();

    promise.then((res) => {
      setLoading(false);
      navigate("/transactions");
    });

    promise.catch((err) => {
      setLoading(false);
      alert(err.response.data.message);
    });
  }

  return (
    <Container>
      <Form onSubmit={outputSubmit}>
        <p>Nova saída</p>
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button disabled={loading}>
          {loading ? "Carregando..." : "Salvar saída"}
        </Button>
      </Form>
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
  background-color: #8c11be;
  padding: 25px;
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
  width: 90%;
  p {
    font-weight: 700;
    font-size: 26px;
    color: #ffffff;
    text-align: start;
    width: 100%;
    margin: 0 0 40px 0;
  }
  input {
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    height: 45px;
    margin: 7px 0px;
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
    margin: 7px 0px;
    cursor: pointer;
  }
`;
