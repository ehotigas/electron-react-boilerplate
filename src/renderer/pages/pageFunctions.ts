import { Socket } from 'socket.io-client';
import { useEffect } from 'react';

export const InitPage = (row: any, socket: Socket<any, any>) => {
    useEffect(() => {
        socket.emit('row_click', { user: window.api.user, row_id: row.id, numero_nota: row['Nota'] });
    }, []);
}

export const getDate = (): Number => {
    let today: string = new Date().toISOString();
    return Number(today.slice(0, 4) + today.slice(5, 7) + today.slice(8, 10));
}
