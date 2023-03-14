import { ClientInfoCard } from './Layout/ClientInfoCard';
import { DescrNotas } from './Layout/DescrNotas';
import { Socket } from 'socket.io-client';
import { CSV } from 'renderer/utils/CSV';
import styles from '../Page.module.css';
import { Title } from './Layout/Title';
import { ReactElement } from 'react';

interface PageLayoutProps {
    row: any,
    socket: Socket<any, any>,
    children: JSX.Element | ReactElement<any, any>,
    title: string,
    notasServico: CSV
}

export const PageLayout = (
    {
        row,
        socket,
        children,
        title,
        notasServico
    }: PageLayoutProps
) => {
    return (
        <div className={styles.container}>
            <Title
                title={title}
                socket={socket}
                row={row}
                notasServico={notasServico}
            />
            <ClientInfoCard clientInfos={ row } />
            <DescrNotas clientInfos={ row } />
            {children}
        </div>
    );
}
