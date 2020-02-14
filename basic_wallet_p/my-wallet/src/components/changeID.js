import React, { useState } from 'react';

export default function ChangeID ({ handleIdChange }) {
    const [input, setInput] = useState("");

    const handleInput = (e) => {
        setInput(e.target.value);
        console.log(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        handleIdChange(input);
        setInput("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={input}
                onChange={handleInput}
                autoFocus={true}
            />
            <button
                type="submit"
            >
                Change ID
            </button>
        </form>
    );
}