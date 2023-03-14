import { FiCornerDownLeft } from "react-icons/fi";
import { NotasServico } from "./NotasServico/NotasServico";
import { LinkButton } from "../Buttons/LinkButton";
import { Socket } from "socket.io-client";
import { CSV } from "renderer/utils/CSV";
import { Link } from 'react-router-dom';
import styles from './Title.module.css';
import { useState } from "react";

interface TitleProps {
    socket: Socket<any, any>,
    title: string,
    row: any,
    notasServico: CSV
}

export const Title = (
    {
        socket,
        title,
        row,
        notasServico
    }: TitleProps
) => {
    const redirect: (url: string | undefined)=>void = (url: string | undefined) => {
        if (url)
          window.api.open_url(url);
    };
    const [ sidebarWidth, setSideBarWidth ] = useState<Number>(0);
    const [ exitSize, setExitSize ] = useState<Number>(0)
    return (
        <>
            <NotasServico
                data={notasServico}
                style={{ width: `${sidebarWidth}px` }}
                setSideBarWidth={setSideBarWidth}
                exitSize={exitSize}
                setExitSize={setExitSize}
            />
            <Link to='/'>
                    <FiCornerDownLeft
                        className={styles.voltar}
                        onClick={() => { socket.emit('to_home', { user: window.api.user, row: row }); }}
                    />
            </Link>

            <h1 style={{ marginTop: '.4em', color: '#29282b', marginLeft: '-1em' }}>{title}</h1>


            <div className={styles.buttonContainer}>
                <LinkButton
                    to="http://hemerasp.edp.pt:8080/hemera/loginHemera.jsp"
                    text="HEMERA"
                    onclick={redirect}
                    style={{ backgroundColor: '#212e3e' }}
                />
                <LinkButton
                    to="https://sml.edp.com.br/"
                    text="SML"
                    onclick={redirect}
                    style={{ backgroundColor: '#212e3e' }}
                />
                <LinkButton
                    to="https://edp-wpa-po.azurewebsites.net/LockScreen?ReturnUrl=%2Fnotes%2Fa18699da-cd84-4d6c-9c43-f76c3c1a0010"
                    text="WPA"
                    onclick={redirect}
                    style={{ backgroundColor: '#212e3e' }}
                />
                <LinkButton
                    text="NOTAS DE SERVIÇO"
                    onclick={() => {
                        setSideBarWidth(500);
                        setExitSize(22);
                    }}
                    style={{ backgroundColor: '#212e3e', width: '13em' }}
                />
            </div>
        </>
    );
}
