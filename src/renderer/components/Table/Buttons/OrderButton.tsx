import { BsCaretDownFill, BsCaretUpFill, BsCaretDown } from "react-icons/bs";
import { Dispatch, SetStateAction, useState } from 'react';
import { CSV, sort } from '../../../utils/CSV';
import styles from "./OrderButton.module.css";


interface OrderButtonProps {
    dados: CSV,
    reload: any,
    column: any,
    type: string
}

export const OrderButton = (
  {
    dados,
    reload,
    column,
    type
  }: OrderButtonProps
) => {
    const order = ['none', 'asc', 'desc'];
    const [botaoOrdem, setBotaoOrdem] = useState(order[0]);
    const getIndex = () => {
        let i = 0;
        for (; i < order.length; i++) if (botaoOrdem === order[i]) break;
        if (i === 2) return 0;
        return i + 1;
    }

    return <div
                className={styles.order}
                onClick={() => {
                    let index= getIndex();
                    setBotaoOrdem(order[index]);
                    reload(sort(dados, column, order[index], type));
                }}
            >
                { botaoOrdem === 'none' ? <BsCaretDown /> : botaoOrdem === 'asc' ? <BsCaretDownFill/> : <BsCaretUpFill/> }
            </div>
}
