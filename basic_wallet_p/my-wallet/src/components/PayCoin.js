import React, { useState } from 'react';


export default function PayCoin ({ payCoins }){
    const [input, setInput] = useState({recipient: '', amount: ''});

    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        payCoins(input);
        setInput({recipient: '', amount: ''});
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                send to: 
                <input 
                    type="text"
                    name="recipient"
                    value={input.recipient}
                    onChange={handleInput}
                />
            </label>
            <label>
                amount:  
                <input 
                    type="text"
                    name="amount"
                    value={input.amount}
                    onChange={handleInput}
                />
            </label>
            <button
                type="submit"
            >
                send
            </button>
        </form>
    );
}
