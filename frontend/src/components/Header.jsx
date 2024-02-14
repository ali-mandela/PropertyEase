import {Link} from 'react-router-dom';
import style from '../styles/header.module.css'
import {FaSearch} from "react-icons/fa";

const Header = () => {
    return (
        <header className={style.headerContainer}>
            <div className={style.logo}>
                <Link to='/'>
                    <span className={style.title}>Property</span>
                    <span> Easy</span>
                </Link>
            </div>
            <form className={style.search}>
                <input type='text' placeholder='search...'/>
                <FaSearch/>
            </form>
            <div className={style.links}>
                <ul>
                    <Link to='/'>
                        <li>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li>About</li>
                    </Link>
                    <Link to='/sign-in'>
                        <li>Signin</li>
                    </Link>
                </ul>
            </div>

        </header>
    )
}

export default Header