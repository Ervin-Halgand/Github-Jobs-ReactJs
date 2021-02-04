import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

interface InputProps {
    placeHolder: string,
    icon: IconProp,
    addClass?: string,
    addClassIcon?: string,
    inputValue: string,
    handleChange: ActionCreatorWithPayload<any, string>,
    Search: ActionCreatorWithoutPayload<string>
}

function SearchInput({ placeHolder, icon, addClass, addClassIcon, handleChange, inputValue, Search }: InputProps) {
    const dispatch = useDispatch();
    return (
        <div className={`flex items-center focus-within:text-blue-600 transition duration-300 ease-in-out ml-2 ${addClass} overflow-hidden`}>
            <div className={addClassIcon}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <input onChange={(e) => dispatch(handleChange(e.target.value))} onKeyDown={(e) => (e.key === 'Enter') && dispatch(Search())} type="text" name="name" placeholder={placeHolder} value={inputValue} className="w-full text-black focus:outline-none pl-2 bg-transparent placeholder-black"></input>
        </div>
    );
}

export default SearchInput;