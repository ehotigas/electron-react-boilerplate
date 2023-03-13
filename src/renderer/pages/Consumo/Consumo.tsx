import { VisualInfosConsumo } from '../Components/VisualInfosConsumo';
import { PageLayout } from '../Components/PageLayout';
import { useLocation } from 'react-router-dom';
import { CSV, filter } from '../../utils/CSV';
import { InitPage } from '../pageFunctions';
import { Socket } from 'socket.io-client';
import styles from '../Page.module.css';

interface ConsumoProps {
    medicao: CSV,
    socket: Socket<any, any>,
    notasServico: CSV,
    reclamacoes: CSV
}

export const Consumo = (
    {
        medicao,
        socket,
        notasServico,
        reclamacoes
    }: ConsumoProps
) => {
    let row = useLocation().state;
    row = filter(reclamacoes, 'id', x => x === row.id).dados[0];
    let medicaoFiltrada = filter(medicao, 'Instalação', x => x === row['Instalação'])
    let notasServicoFiltradas = filter(notasServico, 'Instalação', x => x === row['Instalação'])
    InitPage(row, socket);
    let columns = [
        'DocFat', 'tipofat', 'Medidor', 'Exercício Período', 'DataLeitura', 'TipoLeitura', 'ML', 'NtLei', 'IRR/S', 'Registrador', 'Leitura',
        //'Medicao (KWh)',
        'Cons Fat (KWh)', 'Cons Reg (KWh)', 'Valor Fatura', 'Dias'
    ];


    return (
        <div className={styles.container}>
            <PageLayout
                row={row}
                socket={socket}
                title={`Nota ${row['Nota']}`}
                notasServico={notasServicoFiltradas}
            >
                <VisualInfosConsumo
                    data={medicaoFiltrada}
                    columns={columns}
                    nota={row.Nota}
                />
            </PageLayout>
        </div>
    );
}
