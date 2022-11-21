import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../../contexts/Context";
import { URL } from "../../constants/urls";
import styled from "styled-components";
import axios from "axios";

export default function TransactionsPage() {
  const { userInfo, config } = useContext(Context);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    /*  const user = JSON.parse(sessionStorage.getItem("token"));
    if (!user) {
      navigate("/");
      return;
    } */
    const promise = axios.get(`${URL}/transactions`, config);

    promise.then((res) => {
      setTransactions(res.data.transactions);
      setBalance(res.data.balance);
    });

    promise.catch((err) => {
      alert(err.response.data.message);
    });
  }, [config]);

  return (
    <Container>
      <Headers>
        <p>Olá, {userInfo.name}</p>
      </Headers>
      <Transactions>
        {!transactions ? (
          <></>
        ) : (
          transactions.map((transaction) => {
            return (
              <Transaction key={transaction._id}>
                <Date>{transaction.date}</Date>
                <div>
                  <Description>{transaction.description}</Description>
                  <Value type={transaction.type}>
                    {Number(transaction.value).toFixed(2).replace(".", ",")}
                  </Value>
                </div>
              </Transaction>
            );
          })
        )}
        <Balance>
          {transactions.length > 0 ? (
            <>
              <p>SALDO</p>
              <BalanceValue balance={balance}>
                {balance.toFixed(2).replace(".", ",")}
              </BalanceValue>
            </>
          ) : (
            <Text>
              Não há registros de
              <br />
              entrada ou saída
            </Text>
          )}
        </Balance>
      </Transactions>
      <Footer>
        <PLink to="/input">
          <button>
            <ion-icon name="add-circle-outline"></ion-icon>
            <br />
            <>
              Nova <br /> entrada
            </>
          </button>
        </PLink>
        <PLink to="/output">
          <button>
            <ion-icon name="remove-circle-outline"></ion-icon>
            <br />
            <>
              Nova <br /> saída
            </>
          </button>
        </PLink>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Raleway", sans-serif;
  background-color: #8c11be;
  height: 100%;
  padding: 25px;
`;

const Headers = styled.div`
  display: flex;
  p {
    font-size: 26px;
    color: #fff;
    font-weight: 700;
    margin-bottom: 22px;
  }
`;

const Transactions = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  height: 70vh;
  padding: 23px 8px;
`;

const Text = styled.div`
  color: #868686;
  height: 100%;
  text-align: center;
  margin: 70% auto;
`;

const Transaction = styled.div`
  width: 100%;
  display: flex;
  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const Date = styled.span`
  padding: 8px;
  color: #c6c6c6;
`;

const Description = styled.span`
  padding: 8px;
  width: 75%;
`;

const Value = styled.span`
  padding: 8px;
  align-items: flex-end;
  color: ${(props) => (props.type === "input" ? "#03AC00" : "#C70000")};
`;

const Balance = styled.span`
height: auto;
  display: flex;
  justify-content: space-between;
  padding: 8px;
  align-items: end;
  font-size: 17px;
  p {
    font-weight: 700;
  }
`;

const BalanceValue = styled.span`
  color: ${(props) => (props.balance > 0 ? "#03AC00" : "#C70000")};
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
  height: 17vh;
`;

const PLink = styled(Link)`
  text-decoration: none;
  width: 49%;
  button {
    width: 100%;
    height: 100%;
    background-color: #a328d6;
    border-radius: 5px;
    border: none;
    color: #ffffff;
  }
`;
