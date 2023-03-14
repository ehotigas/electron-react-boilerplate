import styles from './NotasServico.module.css';
import { NotaAttr } from './NotasServico';

interface ServicoProps {
    element: NotaAttr,
    index: any
}

export const Servico = (
  {
      element,
      index
  }: ServicoProps
) => {
  // const [ height, setHeight ] = useState(0);
  // const handleClickRow = () => {
  //     setHeight(height === 0 ? 100 : 0);
  // }
  let style = element['Status'] === 'Concluido' ? { color: '#05c905' } : { };
  return (
      <div
          className={styles.nota}
          key={index}
          style={style}
          // onClick={handleClickRow}
      >
          [{`${String(element['DataNota']).slice(6,8)}/${String(element['DataNota']).slice(4,6)}/${String(element['DataNota']).slice(0,4)}`}] {element['Descricao']}
          {/* <div
              // style={{ 'width': `${height}px` }}
              className={style.descr}
          >
              [{element['Status']}] {element['Descricao']}
          </div> */}
      </div>
  );
}
