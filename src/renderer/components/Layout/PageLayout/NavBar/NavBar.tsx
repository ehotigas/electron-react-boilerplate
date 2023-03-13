import logo from '../../../../../../assets/logo-header.jpg';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';


export const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <Link to={'/'}>
                <img
                    src={logo}
                    alt='logo'
                />
            </Link>
        </nav>
    );
}
