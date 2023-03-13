import styles from './Row.module.css'

interface RowProps {
    object: any,
    customClass?: any,
    style?: Object,
    colorStyle?: any
}

export const Row = (
    {
        object,
        customClass,
        style,
        colorStyle
    }: RowProps
) => {
    return (
        <div className={`${styles.row} ${styles[customClass]}`}>

            {
            Object.keys(object).map((item, index) =>
                <div
                    className={`${styles.row_column}`}
                    key={index}
                    style={style}>
                    <p>{object[item]}</p>
                </div>
            )
            }
        </div>
    );
}
