import React from 'react';
import { useState } from 'react';




function Input() {
    const [inputValue, setInputValue] = useState('');

    return (
        <>
            <input className="bg-gray-200 border-2 border-gray-300 rounded-lg p-4 w-full"
                type="text"
                name="username"
                placeholder=""
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}

            />

            <h2>{inputValue}</h2>

        </>


    );
}

export default Input;