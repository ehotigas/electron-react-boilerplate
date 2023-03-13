import { CSV, getDistinct, select } from '../../utils/CSV';
import CircularProgress from '@mui/material/CircularProgress';
import { Table } from '../../components/Table/Table';
import { Dispatch, SetStateAction } from 'react';
import styles from './Home.module.css';


interface HomeProps {
  reclamacoes: CSV;
  homeData: CSV;
  setHomeData: Dispatch<SetStateAction<CSV>>
}


export const Home = (
    {
        reclamacoes,
        homeData,
        setHomeData
    }: HomeProps
) => {
    const data: CSV = select(getDistinct(reclamacoes, 'Nota'), 'id', 'Nota', 'Concl Desej',
        'TipoNota', 'txt code sub', 'Instalação', 'FlagGD', 'Tipo Tarifa', 'ClasseTxt',
        'Subgrupo', 'Modalidade', 'Empresa', 'User');
    return (
        <div className={styles.content}>
            <div className={styles.teste}><h1>Reclamações</h1></div>
            {
            reclamacoes.dados.length > 0 ?
                <Table
                    data={data}
                    link={true}
                    dados={homeData}
                    setDados={setHomeData}
                    style={{ width: '86%' }}
                    columnStyle={{ height: '40px', maxWidth: '88px', fontSize: '9px' }}
                    rowStyle={{ height: '100px', maxWidth: '88px', fontSize: '9px' }}
                    colorStyle={{backgroundColor: "#212e3e"}}
                /> :
                <CircularProgress className={styles.MuiCircularProgress_colorPrimary} />
            }

        </div>
    );
}
