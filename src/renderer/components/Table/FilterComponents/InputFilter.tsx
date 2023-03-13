import { Dispatch, SetStateAction } from 'react';
import styles from './InputFilter.module.css';
import { CSV } from 'renderer/utils/CSV';

interface InputFilterProps {
    reload: Dispatch<SetStateAction<any[]>>,
    defaultRows: Array<string>
}

export const InputFilter = (
    {
        reload,
        defaultRows
    }: InputFilterProps
) => {
    const filter = (text: string) => {
      let array: Array<string> = [];
      defaultRows.forEach(element => {
          if (String(element).toLowerCase().includes(text)) array.push(element);
      });
      return array;
    }

    return <input
                className={styles.filter}
                type="text"
                placeholder="filter"
                onChange={(event) => {
                    let input = String(event.target.value).toLowerCase();
                    if (input === '' || input === undefined) reload(defaultRows);
                    else reload(filter(input));
                }}
            />
}
