import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { CSV, filter } from 'renderer/utils/CSV';
import styles from './FilterButton.module.css';

interface FilterButtonProps {
    element: any,
    dados: CSV,
    reload: Dispatch<SetStateAction<CSV>>,
    column: string,
    filteredRows: Array<any>,
    setFilteredRows: (filteredRows: Array<any>)=>void,
    funcs: Array<Function>,
    setFuncs: any//Dispatch<SetStateAction<never[]>>
}

export const FilterButton = (
    {
        element,
        dados,
        reload,
        column,
        filteredRows,
        setFilteredRows,
        funcs,
        setFuncs
    }: FilterButtonProps
) => {
    const [ checked, setChecked ] = useState<boolean>(filteredRows?.includes(element));
    useEffect(() => {
        let arr: Array<Function> = funcs;
        arr.push(setChecked);
        setFuncs(arr);
    }, []);

    const handleClickButton = (event: React.ChangeEvent<HTMLInputElement>) => {
        let arr: any[] = filteredRows;
        if (!event.target.checked && arr.includes(element)) arr.splice(arr.indexOf(element), 1);
        else if (event.target.checked && !arr.includes(element)) arr.push(element);

        setFilteredRows(arr);
        setChecked(filteredRows?.includes(element));
        reload(filter(dados, column, (row) => filteredRows.includes(row)));
    }
    return (
        <div className={styles.row}>
            <input
                className={styles.checkbox}
                type="checkbox"
                defaultChecked={checked}
                checked={checked}
                onChange={(event) => { handleClickButton(event); }}
            />
            <div className={styles.text}>
                {element}
            </div>
        </div>
    );
}
