import logo from '../../../../../../assets/logo-header.jpg';
import styles from './NavBar.module.css';


export const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <img
                src={logo}
                alt='logo'
            />
        </nav>
    );
}
