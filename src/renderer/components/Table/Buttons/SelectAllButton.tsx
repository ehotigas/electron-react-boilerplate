import { Dispatch, SetStateAction } from 'react';
import styles from './SelectAll.module.css';
import { CSV } from 'renderer/utils/CSV';

interface SelectAllButtonProps {
    originalData: CSV,
    reload: Dispatch<SetStateAction<CSV>>,
    dados: CSV,
    getRows: (data: Array<Object>, column: string)=>Array<any>,
    column: string,
    funcs: Array<(status: boolean)=>void>,
    setFilteredRows: Dispatch<SetStateAction<any[]>>
}

export const SelectAllButton = (
    {
        originalData,
        reload,
        dados,
        getRows,
        column,
        funcs,
        setFilteredRows
    }: SelectAllButtonProps
) => {
  const handleClickButton = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
        reload(originalData);
        setFilteredRows(getRows(dados.dados, column));
    }
    else {
        reload({header: originalData.header, dados: []});
        setFilteredRows([]);
    }

    funcs.forEach((element: (status: boolean)=>void) => { element(event.target.checked) });
}
    return (
        <div className={styles.container}>
            <input
                type="checkbox"
                className={styles.box}
                defaultChecked={true}
                onChange={(event) => { handleClickButton(event) }}
            />
            <h3 className={styles.selectAll}>Selecionar Tudo</h3>
        </div>
    );
}
