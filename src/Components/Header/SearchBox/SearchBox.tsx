import React, { useState } from 'react';
import SearchInput from './Search/SearchInput'
import { faSearch, faMapMarkerAlt, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../Buttons/Button';

interface SearchBoxProps {
    titleHandler: Function,
    locationHandler: Function,
    typeHandler: Function,
    SearchActionhandler: Function,
    titleValue: string,
    locationValue: string
}

const SearchBox = ({ titleHandler, locationHandler, typeHandler, SearchActionhandler, titleValue, locationValue }: SearchBoxProps) => {
    enum filterType {
        title,
        location
    }
    let [openFilter, setOpenFilter] = useState<boolean>(false);
    let [filter, setfilter] = useState<filterType>(filterType.title);

    const filterHandler = (filter: filterType) =>
        filter === filterType.title ? <SearchInput inputValue={titleValue} handleChange={titleHandler} addClass="w-40" addClassIcon="hidden" icon={faSearch} placeHolder="Filter by title..." /> :
            <SearchInput inputValue={locationValue} handleChange={locationHandler} addClass="w-40" addClassIcon="hidden" icon={faMapMarkerAlt} placeHolder="Filter by location..." />

    return (
        <div className="flex ml-auto bg-gray-100 rounded-xl p-2 absolute -bottom-8 items-center sm:static">
            <SearchInput inputValue={titleValue} handleChange={titleHandler} addClass="sm:w-24 lg:w-52 hidden sm:flex sm:border-r-2 placeholder-opacity-75" icon={faSearch} placeHolder="Title, description..." />
            <SearchInput inputValue={locationValue} handleChange={locationHandler} addClass="sm:w-24 lg:w-44 hidden sm:flex sm:border-r-2 placeholder-opacity-75" icon={faMapMarkerAlt} placeHolder="Location..." />
            <div className="sm:flex items-center ml-2 m:p-2 hidden">
                <label className="inline-flex items-center md:mr-6 ">
                    <input onChange={(e) => { console.log(e); typeHandler(e.target.checked) }} className="h-5 w-5" type="checkbox"></input>
                    <span className="ml-3 md:text-lg">Full Time</span>
                </label>
                <div className="hidden sm:block ml-2">
                    <Button clicked={() => SearchActionhandler()} text="Search" />
                </div>
            </div>
            {<div className="sm:hidden">
                {filterHandler(filter)}
            </div>}
            <div className="sm:hidden">
                <button className="ml-1" onClick={() => { setOpenFilter(!openFilter) }}>
                    <FontAwesomeIcon icon={faFilter} />
                </button>
                <button className="ml-1" onClick={() => {
                    openFilter && setOpenFilter(false);
                    SearchActionhandler();
                }}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                <ul className={`list-none absolute top-full right-0 mt-2 ml-2 bg-gray-100 shadow-xl rounded-xl p-2 ${openFilter ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    <li><button onClick={() => { setfilter(filterType.title); setOpenFilter(!openFilter) }}>Filter by title</button></li>
                    <li><button onClick={() => { setfilter(filterType.location); setOpenFilter(!openFilter) }}>Filter by location</button></li>
                    <li>
                        <div className="items-center">
                            
                            <label className="inline-flex items-center mr-6 ">
                                <input type="checkbox" className=" form-checkbox h-4 w-4 text-pink"></input>
                                <span className="ml-3">Full Time</span>
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SearchBox;