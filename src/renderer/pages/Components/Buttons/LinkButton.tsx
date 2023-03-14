import styles from './LinkButton.module.css';

interface LinkButtonProps {
    to?: string,
    text?: string,
    style?: Object,
    onclick: (url: string | undefined)=>void
}

export const LinkButton = (
    {
        to,
        text,
        style,
        onclick
    }: LinkButtonProps
) => {
    return (
        <button
            onClick={() => {
              onclick(to);
             }}
            className={styles.button}
            style={style}
        >
            {text}
        </button>
    );
}
