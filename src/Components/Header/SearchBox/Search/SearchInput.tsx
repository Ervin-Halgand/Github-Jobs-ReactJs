import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface InputProps {
    placeHolder: string,
    icon: IconProp,
    addClass?: string,
    addClassIcon?: string,
    inputValue: string,
    handleChange: Function
}

function SearchInput({ placeHolder, icon, addClass, addClassIcon, handleChange, inputValue }: InputProps) {
    return (
        <div className={`flex items-center focus-within:text-blue-600 transition duration-300 ease-in-out ml-2 ${addClass} overflow-hidden`}>
            <div className={addClassIcon}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <input onChange={(e) => handleChange(e.target.value)} type="text" name="name" placeholder={placeHolder} value={inputValue} className="w-full text-black focus:outline-none pl-2 bg-transparent placeholder-black"></input>
        </div>
    );
}

export default SearchInput;