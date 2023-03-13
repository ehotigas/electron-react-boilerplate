import { FilterContainer } from '../FilterComponents/FilterContainer';
import { OrderButton } from "../Buttons/OrderButton";
import { CSV } from 'renderer/utils/CSV';
import styles from './Column.module.css';
import { Dispatch, SetStateAction, useState } from 'react';


interface ColumnProps {
    item: any,
    openFilter: (click: boolean, setClick: (click: boolean)=>void)=>void,
    dados: CSV,
    reload: Dispatch<SetStateAction<CSV>>,
    originalData: CSV,
    colorStyle?: any,
    style?: Object
}

export const Column = (
    {
        item,
        openFilter,
        dados,
        reload,
        originalData,
        colorStyle,
        style={}
    }: ColumnProps
) => {
    const [click, setClick] = useState(false);

    return (
        <div className={styles.column} key={item} style={style}>
            {
                !click ? <p onClick={() => { openFilter(click, setClick) }}>{item}</p> :
                <>
                    <div className={styles.column}><p onClick={() => { openFilter(click, setClick) }}>{item}</p></div>
                        <FilterContainer
                            quit={() => { openFilter(click, setClick) }}
                            dados={dados}
                            column={item}
                            reload={reload}
                            originalData={originalData}
                            colorStyle={colorStyle}
                    />
                </>
            }
            {dados.header[item] && !click && <OrderButton reload={reload} dados={dados} column={item} type={dados.header[item]}/>}
        </div>
    );
}
