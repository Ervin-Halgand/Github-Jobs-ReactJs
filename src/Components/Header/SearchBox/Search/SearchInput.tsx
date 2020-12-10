import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface InputProps {
    placeHolder: string,
    icon: IconProp,
    addClass?: string,
    addClassIcon?: string
}

function SearchInput({ placeHolder, icon, addClass, addClassIcon }: InputProps) {
    return (
        <div className={`flex items-center focus-within:text-red-400 transition duration-300 ease-in-out ml-2 ${addClass}`}>
            <div className={addClassIcon}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <input type="text" name="name" placeholder={placeHolder} className="w-full text-black focus:outline-none pl-2 bg-transparent placeholder-black"></input>
        </div>
    );
}

export default SearchInput;