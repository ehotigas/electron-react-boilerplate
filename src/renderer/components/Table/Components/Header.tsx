import { Dispatch, Key, SetStateAction } from 'react';
import { CSV } from 'renderer/utils/CSV';
import styles from './Header.module.css';
import { Column } from './Column';

interface HeaderProps {
    reload: Dispatch<SetStateAction<CSV>>,
    dados: CSV,
    originalData: CSV,
    colorStyle?: any,
    style?: Object
}

export const Header = (
    {
        reload,
        dados,
        originalData,
        colorStyle,
        style={}
    }: HeaderProps
) => {
    const openFilter = (click: boolean, setClick: (click: boolean)=>void) => { setClick(!click); }
    return (
        <div className={styles.header} style={{ backgroundColor: colorStyle?.backgroundColor }}>
            {
            Object.keys(dados.header).map((item, id: Key) =>
                <Column
                    key={id}
                    item={item}
                    openFilter={openFilter}
                    dados={dados}
                    reload={reload}
                    originalData={originalData}
                    style={style}
                    colorStyle={colorStyle}
                />
            )
            }
        </div>
    );
}
