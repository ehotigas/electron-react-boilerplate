import { SelectAllButton } from '../Buttons/SelectAllButton';
import { Dispatch, SetStateAction, useState } from 'react';
import { FilterButton } from '../Buttons/FilterButton';
import styles from './FilterContainer.module.css';
import { CSV, getRows } from "renderer/utils/CSV";
import { AiOutlineClose } from "react-icons/ai";
import { InputFilter } from './InputFilter';

interface FilterContainerProps {
    quit: ()=>void,
    dados: CSV,
    column: any,
    reload: Dispatch<SetStateAction<CSV>>,
    originalData: CSV,
    colorStyle: any
}

export const FilterContainer = (
    {
        quit,
        dados,
        column,
        reload,
        originalData,
        colorStyle
    }: FilterContainerProps
) => {
    const [ filteredRows, setFilteredRows ] = useState(getRows(dados.dados, column));
    const [ funcs, setFuncs ] = useState([]);
    const defaultRows = getRows(originalData.dados, column);
    const [ rows, setRows ] = useState(defaultRows);


    return (
        <div className={styles.container} style={{ backgroundColor: colorStyle?.backgroundColor }}>
            <InputFilter
                reload={setRows}
                defaultRows={defaultRows}
            />
            <AiOutlineClose onClick={quit} className={styles.exit}/>
            <SelectAllButton
                originalData={originalData}
                reload={reload}
                dados={dados}
                getRows={getRows}
                column={column}
                funcs={funcs}
                setFilteredRows={setFilteredRows}
            />
            {
            rows.map((element: any) => <FilterButton
                                            key={element}
                                            element={element}
                                            reload={reload}
                                            dados={originalData}
                                            column={column}
                                            filteredRows={filteredRows}
                                            setFilteredRows={setFilteredRows}
                                            funcs={funcs}
                                            setFuncs={setFuncs}
                                        />
              )
            }
        </div>
    );
}
