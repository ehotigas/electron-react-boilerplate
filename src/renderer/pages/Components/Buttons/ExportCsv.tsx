import { TfiImport } from "react-icons/tfi";
import styles from './ExportCsv.module.css';
import { CSV } from "renderer/utils/CSV";

interface ExportCsvProps {
    file_name: string,
    data: CSV,
    columns: string[]
}

const setColumns = (columns: any) => {
  let object: any = {};
  columns.forEach((element: keyof typeof object) => { object[element] = element });
  return object;
}

export const ExportCsv = (
    {
        file_name,
        data,
        columns
    }: ExportCsvProps
) => {
    return (
        <div
            className={styles.container}
            onClick={() => {
                        window.api.save_csv(`C:\\Users\\${window.api.user}\\Downloads\\`, file_name, data.dados, setColumns(columns));
                    }
                }
        >
            <TfiImport style={{ marginTop: '1px' }} />
        </div>
    );
}
