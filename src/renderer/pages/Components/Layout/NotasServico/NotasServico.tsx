import { AiOutlineClose } from "react-icons/ai";
import styles from './NotasServico.module.css';
import { BsCircleFill } from "react-icons/bs";
import { CSV } from "renderer/utils/CSV";
import { Servico } from "./Servico";
import { Title } from "./Title";

export interface NotaAttr {
    id?: Number,
    Nota?: string,
    'Instalação'?: string | Number,
    Descricao?: string,
    TipoNota?: string,
    DataNota?: string,
    Status?: string,
    Empresa?: string
}

interface NotasServicoProps {
    data: CSV,
    style: Object,
    setSideBarWidth: (size: Number)=>void,
    exitSize: Number,
    setExitSize: (size: Number)=>void
}

export const NotasServico = (
    {
        data,
        style,
        setSideBarWidth,
        exitSize,
        setExitSize
    }: NotasServicoProps
) => {
    let ano: string = '';
    return (
        <div
            className={styles.notasServico}
            style={style}
        >
            <AiOutlineClose
                onClick={() => {
                    setSideBarWidth(0);
                    setExitSize(0);
                }}
                className={styles.close}
                style={{ width: `${exitSize}px`, transition: '.5s' }}
            />
            <h2>Notas de Serviço</h2>

            <div className={styles.notas}>
                {
                data.dados.map((element: NotaAttr, index: any) => {
                    if (ano != String(element['DataNota']).slice(0,4)) {
                        ano = String(element['DataNota']).slice(0,4);
                        return (
                            <>
                                <Title element={element} index={index} />
                                <Servico element={element} index={index} />
                            </>
                        );
                    }
                    return <Servico element={element} index={index} />;
                })
                }
            </div>
            <div className={styles.legenda}>
                <BsCircleFill style={{ float: 'left', marginRight: '4px', fontSize: '13px', color: '#05c905' }} /> Concluido<br/>
                <BsCircleFill style={{ float: 'left', marginRight: '4px', fontSize: '13px', color: '#ff0000' }} />Aberto
            </div>
        </div>
    );
}
