import styles from './WhiteCard.module.css';
import { ReactElement } from 'react';

interface WhiteCardProps {
    customClass: string,
    children?: JSX.Element[] | ReactElement<any, any>,
    style?: Object
}

export const WhiteCard = (
    {
        customClass,
        children,
        style
    }: WhiteCardProps
) => {
    return (
        <div
          className={`${styles.white_card} ${styles[customClass]}`}
          style={style}
        >
            {children}
        </div>
    );
}
