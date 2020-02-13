import React, { useEffect, useState }from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [data, setData] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:5000/chain')
      .then(res => {
        console.log(res.data.chain)
        let block = res.data.chain

      })
  })

  return (
    <div className="App">
      <h1>Hey</h1>
    </div>
  );
}

export default App;
