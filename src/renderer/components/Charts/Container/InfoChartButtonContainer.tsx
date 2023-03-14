import styles from './InfoChartButtonContainer.module.css';
import { InfoChartButton } from '../Button/InfoChartButton';
import { CSV } from 'renderer/utils/CSV';

interface InfoChartButtonContainerProps {
    data: CSV,
    setChartData: (chatData: string[][])=>void,
    setChartTitle: (chatTitle: string)=>void,
    getConsumoData: (data: CSV, columns: string[]) => string[][]
}

export const InfoChartButtonContainer = (
    {
        data,
        setChartData,
        setChartTitle,
        getConsumoData
    }: InfoChartButtonContainerProps
) => {
    return (
        <div className={styles.chartButtons}>
            <InfoChartButton
                name="Consumo"
                click={() => {
                    setChartData(getConsumoData(data, ['Cons Fat (KWh)', 'Dem (KWh)']));
                    setChartTitle('Gráfico de Consumo (KWh)');
                }}
                    />
            <InfoChartButton
                name="Valor Fatura"
                click={() => {
                    setChartData(getConsumoData(data, ['Valor Fatura', 'Dias']));
                    setChartTitle('Gráfico Valor Fatura (R$)');
                }}
            />
            <InfoChartButton
                name="Medição"
                click={() => {
                    setChartData(getConsumoData(data, ['Cons Reg (KWh)']));
                    setChartTitle('Gráfico de Medição (KWh)');
                }}
            />
        </div>
    );
}
