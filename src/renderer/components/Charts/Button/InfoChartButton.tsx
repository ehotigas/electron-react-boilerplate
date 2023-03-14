import styles from './InfoChartButton.module.css';

interface InfoChartButtonProps {
    click: ()=>void,
    name: string
}

export const InfoChartButton = (
    {
        click,
        name
    }: InfoChartButtonProps
) => {
    return (
        <button
            className={styles.chartButton}
            onClick={click}
        >
            {name}
        </button>
    );
}
