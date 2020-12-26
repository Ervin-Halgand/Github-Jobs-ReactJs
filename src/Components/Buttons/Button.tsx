import HeaderBackground from '../../assets/HeaderImage.jpg';

interface ButtonProps {
    text: string,
    addClass?: string,
    clicked: Function
}

const Button = ({ text, addClass, clicked }: ButtonProps) => {
    return (
        <button onClick={() => clicked()} className={`relative flex overflow-hidden rounded-md md:px-7 sm:px-2 ${addClass} focus:outline-none`}>
            <img src={HeaderBackground} alt="Header background" className="z-0 absolute object-cover top-0 left-0 w-full h-full" />
            <p className="z-10 text-white hover:text-red-800 transition duration-300 ease-in-out"> {text}</p>
        </button>
    );
}

export default Button;