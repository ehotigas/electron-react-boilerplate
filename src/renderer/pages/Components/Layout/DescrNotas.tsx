import { WhiteCard } from '../../../components/Layout/Container/WhiteCard';
import styles from './DescrNotas.module.css';

interface DescrNotasProps {
    clientInfos: any
}

interface DescrProps {
    element: string
}

const title = (text: string): string => {
  if (!text) return text;
  let ret = String(text[0]).toUpperCase();
  for (let i = 1; i < text.length; i++) {
      ret += String(text[i]).toLowerCase();
  }
  return ret;
}

const Descr = (
    {
        element
    }: DescrProps
) => {
    return (
        <>
            <span>{title(element)}<br/></span>
        </>
    );
}

export const DescrNotas = (
    {
        clientInfos
    }: DescrNotasProps
) => {
    return (
        <WhiteCard customClass="descr">
            <p className={styles.paragrafo}>
                <strong>Txt Code Sub: </strong> {title(clientInfos['txt code sub'])}<br/>
                <strong>Descrição: </strong> <br/>{clientInfos['Descr'] !== undefined ? clientInfos['Descr'].split('\n').map((element: string) => { if (element) return <Descr element={element} /> }) : 'err'}<br/>
            </p>
        </WhiteCard>
    );
}
