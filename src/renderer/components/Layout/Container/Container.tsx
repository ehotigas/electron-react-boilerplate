import styles from './Container.module.css'

interface ContainerProps {
    customClass: string,
    children: any
}

export const Container = (
    {
        customClass,
        children
    }: ContainerProps
) => {
    return <div className={`${styles.container} ${styles[customClass]}`}>{children}</div>;
}
