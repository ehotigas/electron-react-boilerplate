import styles from './Container.module.css';
import { ReactElement } from 'react';

interface ContainerProps {
    customClass: string,
    children: JSX.Element | ReactElement<any, any>
}

export const Container = (
    {
        customClass,
        children
    }: ContainerProps
) => {
    return (
        <div className={`${styles.container} ${styles[customClass]}`}>
            {children}
        </div>
    );
}
