import styles from './NotasServico.module.css';
import { NotaAttr } from './NotasServico';

interface TitleProps {
    element: NotaAttr,
    index: any
}

export const Title = (
  {
      element,
      index
  }: TitleProps
) => {
  return (
      <h3 className={styles.title} key={`title-${index}`}>
          {String(element['DataNota']).slice(0,4)}
      </h3>
  );
}
