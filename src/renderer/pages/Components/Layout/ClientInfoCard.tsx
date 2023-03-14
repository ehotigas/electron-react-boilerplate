import { WhiteCard } from '../../../components/Layout/Container/WhiteCard';
import styles from './ClientInfoCard.module.css';
import { getDate } from '../../pageFunctions';

interface Infos {
    Empresa?: string,
    DataLigacaoUC?: string | string[],
    'Instalação'?: string,
    Cidade?: string,
    Subclasse?: string,
    Subgrupo?: string,
    Modalidade?:string
    'Tipo Tarifa'?: string,
    FlagGD?: string,
    InscricaoEstadual?: string,
    UnidadeLeitura?: string,
    'Concl_desj'?: string
}

interface ClientInfoCardProps {
    clientInfos: Infos
}

export const ClientInfoCard = ({
    clientInfos
}: ClientInfoCardProps) => {
    let data: Number = getDate();
    let estado = clientInfos['Empresa'] === 'EDP_SP' ? 'SP' : 'ES';
    let dataLigacao = clientInfos['DataLigacaoUC'] ? `${clientInfos['DataLigacaoUC'].slice(6,8)}/${clientInfos['DataLigacaoUC'].slice(4,6)}/${clientInfos['DataLigacaoUC'].slice(0,4)}` : '';
    return (
        <WhiteCard customClass="infos" style={{ borderRadius: '10px 0px 10px 10px' }}>
            <div className={`${styles.paragrafo} ${styles.esq}`}>
                <p>
                    <strong>Instalação: </strong> {clientInfos['Instalação']}<br/>
                    <strong>Municipio: </strong> {`${clientInfos['Cidade']} / ${estado}`}<br/>
                    <strong>Subclasse: </strong> {clientInfos['Subclasse']}<br/>
                    <strong>Subgrupo: </strong> {clientInfos['Subgrupo']}<br/>
                </p>
            </div>
            <div className={`${styles.paragrafo} ${styles.esq}`}>
                <p>
                    <strong>Modalidade: </strong> {clientInfos['Modalidade']}<br/>
                    <strong>Tipo de Tarifa: </strong> {clientInfos['Tipo Tarifa']}<br/>
                    <strong>FlagGD: </strong> {clientInfos['FlagGD']}<br/>
                    <strong>Inscrição Estadual: </strong> {clientInfos['InscricaoEstadual'] ? clientInfos['InscricaoEstadual'] : 'Sem Inscrição Estadual'}<br/>
                </p>
            </div>
            <div className={`${styles.paragrafo} ${styles.esq}`}>
                <p>
                    <strong>Data Ligação: </strong> {dataLigacao}<br/>
                    <strong>Unidade Leitura: </strong> {clientInfos['UnidadeLeitura']}<br/>
                    <span
                        // style={parseInt(clientInfos['Concl_desj']) >= data ?
                        //         {  } :
                        //         { color: 'red' }}
                    >
                        <strong>Fim Estimado: </strong> {clientInfos['Concl_desj']}<br/>
                    </span>
                </p>
            </div>
        </WhiteCard>

    );
}
