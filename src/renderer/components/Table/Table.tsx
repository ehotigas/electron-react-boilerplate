import { Dispatch, Key, SetStateAction } from 'react';
import { Header } from './Components/Header';
import { CSV } from 'renderer/utils/CSV';
import styles from './Table.module.css';
import { Link } from 'react-router-dom';
import { Row } from './Components/Row';

interface TableProps {
    data: CSV,
    dados: CSV,
    setDados: Dispatch<SetStateAction<CSV>>,
    colorStyle?: Object,
    link?: boolean,
    scroll?: boolean,
    style?: Object,
    columnStyle?: Object,
    rowStyle?: Object,
    bodyStyle?: Object
}

export const Table = (
    {
        data,
        dados,
        setDados,
        colorStyle,
        link=false,
        scroll=false,
        style={},
        columnStyle={},
        rowStyle={},
        bodyStyle={}
    }: TableProps
) => {
  return (
    <div className={`${styles.tabela} ${scroll && styles.scroll}`} style={style}>
        <Header
            reload={setDados}
            dados={dados}
            originalData={data}
            style={columnStyle}
            colorStyle={colorStyle}
        />

        <div className={`${styles.body} ${scroll && styles.scroll}`} style={bodyStyle}>
            {dados.dados.map((element: any, index: Key) => {
                let to = 'consumo';
                if (element.FlagGD !== 'Sem GD') to = 'MMGD';
                if (element['Subgrupo'])
                    to = String(element['Subgrupo']).includes('B') ? to : to + 'MT';
                // console.log(element)
                return link ? <Link
                                key={index}
                                to={to}
                                state={element}
                              >
                                 <Row
                                    object={element}
                                    customClass={Number(index) % 2 !== 0 && 'row_impar'}
                                    style={rowStyle}
                                    colorStyle={colorStyle}
                                  />
                              </Link> :
                              <Row
                                object={element}
                                customClass={Number(index) % 2 !== 0 && 'row_impar'}
                                style={rowStyle}
                                colorStyle={colorStyle}
                              />
            }

                        )}
        </div>
    </div>

)
}
