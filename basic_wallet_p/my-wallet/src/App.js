import React, { useEffect, useState } from "react";
import axios from "axios";

//style
import "./App.css";
import {Container, Card} from '@material-ui/core'

//localstorage usage
import { useLocalStorage } from "./components/utils/useLocalStorage";


//components
import IdForm from "./components/changeID";
import PayCoin from "./components/PayCoin";

export default function App() {
  const [id, setId] = useLocalStorage("id", null);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(null);

  const getTransactions = () => {
    axios
      .get("http://localhost:5000/chain")
      .then(res => {
        const allTransactions = res.data.chain
          .map(block => block.transactions)
          .flat();
        const myTransactions = allTransactions.filter(t => {
          return t.recipient === id || t.sender === id;
        });
        console.log(myTransactions);
        setTransactions(allTransactions);
        gettotal(myTransactions);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (id !== null) {
      getTransactions();
    }
  }, [id]);

  const handleIdChange = changed_id => {
    setId(changed_id);
  };

  const gettotal = transactions => {
    // sum amounts where id is sender (paid)
    const amountPaid = transactions.reduce((acc, cur) => {
      if (cur.sender === id) {
        return acc + +cur.amount;
      }
      return acc;
    }, 0);
    // sum amounts where id is recipient (earned)
    const amountEarned = transactions.reduce((acc, cur) => {
      if (cur.recipient === id) {
        return acc + +cur.amount;
      }
      return acc;
    }, 0);
    // subtract amount paid from amount earned to find total
    setTotal((amountEarned - amountPaid).toFixed(2));
  };

  const payCoins = input => {
    axios
      .post("http://localhost:5000/transactions/new", { ...input, sender: id })
      .then(res => {
        console.log(res);
        getTransactions();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="lg"  className="App">
      <h1>Blockchain Madness</h1>
      <div>
        {id === null ? (
          <IdForm handleIdChange={handleIdChange} />
        ) : (
          <>
            <h2>{id}</h2>
            <button onClick={() => setId(null)}>
              Change ID
            </button>
          </>
        )}
      </div>
      {id && (
        <div style={{ margin: "0 auto", maxWidth: "50%" }}>
          <div>
            <div>
              <h3>Wallet:</h3>
              <p>${total}</p>
              <h3>Pay Coins to:</h3>
              <PayCoin payCoins={payCoins} />
            </div>
            <h3>past transactions: </h3>
            {transactions.map(money => {
              return (
                <Card variant='outlined'
                  className={money.sender === id ? "paid" : "earned"}
                  style={{
                    marginBottom:'20px',
                    padding: " 10px 10px 10px 10px",
                    display:'flex',
                    flexDirection:'column',
                    flexWrap: 'wrap'
                  }}
                >
                  <h4>Sender: {money.sender}</h4>
                  <h4>Recipient: {money.recipient}</h4>
                  <h4>Amount: {money.amount} coin(s)</h4>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </Container>
  );
}
