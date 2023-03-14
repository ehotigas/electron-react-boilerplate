import { InfoChartButtonContainer } from '../../components/Charts/Container/InfoChartButtonContainer';
import styles from './VisualInfosConsumo.module.css';
import { sort, select } from '../../utils/CSV';
import { LineChart } from '../../components/Charts/LineChart';
import { ExportCsv } from '../Components/Buttons/ExportCsv';
import { WhiteCard } from '../../components/Layout/Container/WhiteCard';
import { Table } from '../../components/Table/Table';
import { useState } from 'react';
import { CSV } from 'renderer/utils/CSV';

interface VisualInfosConsumoProps {
    data: CSV,
    columns: Array<string>,
    nota: string,
}

type NumberToMonth = {
  [key: string]: string;
}

const meses: NumberToMonth = {
  '01': 'jan', '02': 'fev', '03': 'mar', '04': 'abr', '05': 'mai', '06': 'jun',
  '07': 'jul', '08': 'ago', '09': 'set', '10': 'out', '11': 'nov', '12': 'dez'
}


const formatAnomes = (anomes: string): string => `${meses[anomes.substring(4, 2)]}/${anomes.substring(0, 4)}`;


const getConsumoData = (data: CSV, columns: string[]): string[][] => {
  let ret = [['Data', ...columns]], order: Array<any> = sort(data, 'anomes', 'asc', 'number').dados;
  order.forEach((element: any) => {
      let arr: any = [];
      columns.forEach(column => { arr.push(parseFloat(element[column])) });
      ret.push([ formatAnomes(element.anomes), ...arr ])
  });
  return ret;
}

export const VisualInfosConsumo = (
    {
        data,
        columns,
        nota,
    }: VisualInfosConsumoProps
) => {
    const [chartData, setChartData] = useState<string[][]>(getConsumoData(data, ['Cons Fat (KWh)', 'Dem (KW)']));
    const [chartTitle, setChartTitle] = useState<string>('Gráfico de Consumo (KWh)');
    const [dados, setDados] = useState<CSV>(select(data, ...columns));

    return (
        <div className={styles.container}>
            <WhiteCard customClass="consumo">
                <div className={styles.whiteBoardContent}>
                    <Table
                        data={select(data, ...columns)}
                        dados={dados}
                        setDados={setDados}
                        style={{ width: '99.5%', marginTop: '.7em' }}
                        columnStyle={{ height: '40px', width: '87px', fontSize: '10px' }}
                        rowStyle={{ height: '20px', width: '85px', fontSize: '10px' }}
                        bodyStyle={{ height: '15em' }}
                        colorStyle={{backgroundColor: "#212e3e"}}
                    />
                    <ExportCsv
                        file_name={nota}
                        data={dados}
                        columns={columns}
                    />
                </div>
            </WhiteCard>

            <div className={styles.chartTitle}><h2>{chartTitle}</h2></div>

            <WhiteCard customClass="consumo_chart">
                <InfoChartButtonContainer
                    data={data}
                    setChartData={setChartData}
                    setChartTitle={setChartTitle}
                    getConsumoData={getConsumoData}
                />
                <LineChart
                    data={chartData}
                    options={{
                            // title: { chartTitle },
                            legend: { position: "bottom" },
                            x: "2.5%",
                            fill: "#fff"
                            }}
                />
            </WhiteCard>
        </div>
    );
}
