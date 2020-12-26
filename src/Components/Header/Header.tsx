import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import HeaderBackground from '../../assets/HeaderImage.jpg';
import SearchBox from './SearchBox/SearchBox'

interface HeaderProps {
    titleHandler: Function,
    locationHandler: Function,
    typeHandler: Function,
    SearchActionhandler: Function,
    titleValue: string,
    locationValue: string
}

const Header = ({ titleHandler, locationHandler, typeHandler, SearchActionhandler, titleValue, locationValue }: HeaderProps) => {
    return (
        <nav className="flex w-full sm:justify-start h-20 relative">
            <img src={HeaderBackground} alt="Header background" className="z-0 absolute h-20 w-full rounded-bl-md object-cover" />
            <div className="z-10 flex items-center justify-center mx-1 md:mx-8 w-full">
                <FontAwesomeIcon icon={faGithub} size="3x" />
                <div className="sm:ml-2 lg:ml-20 text-center">
                    <h1 className="text-3xl"><span className="font-bold uppercase">Github</span>jobs</h1>
                    <p className="text-base">For developpers</p>
                </div>
                <SearchBox titleValue={titleValue} locationValue={locationValue} SearchActionhandler={SearchActionhandler} titleHandler={titleHandler} locationHandler={locationHandler} typeHandler={typeHandler} />
            </div>
        </nav>
    );
}

//ml-auto mr-10
export default Header;