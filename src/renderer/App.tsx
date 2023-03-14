import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/Layout/PageLayout/NavBar/NavBar';
import { Container } from './components/Layout/Container/Container';
import { CSV, getDistinct, select } from './utils/CSV';
// import OrdemNaoFaturadoMT from './pages/OrdemNaoFaturadoMT';
// import OrdemNaoFaturado from './pages/OrdemNaoFaturado';
import { Consumo } from './pages/Consumo/Consumo';
import { useState, useEffect } from 'react';
import { Home } from './pages/Home/Home';
// import ConsumoMT from './pages/ConsumoMT';
// import RuralMT from './pages/RuralMT';
import { io } from "socket.io-client";
// import MMGDMT from './pages/MMGDMT';
// import Rural from './pages/Rural';
// import MMGD from './pages/MMGD';
import './App.css';


const socket = io("http://localhost:50001", { transports : ['websocket'] });
// const socket = io("http://10.161.248.71:50001", { transports : ['websocket'] });


function App() {
  const empty_csv: CSV = { header: {  }, dados: [] }
  const [ reclamacoes, setReclamacoes ] = useState<CSV>(empty_csv);
  const [ notasServico, setNotasServico ] = useState<CSV>(empty_csv);
  const [ medicao, setMedicao ] = useState<CSV>(empty_csv);
  const [ homeData, setHomeData ] = useState<CSV>(reclamacoes);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('user_connected', window.api.user);
    });
    socket.on('send_data', data => {
      setReclamacoes(data.reclamacoes);
      setNotasServico(data.notas_servico);
      setMedicao(data.medicao);

      setHomeData(select(getDistinct(data.reclamacoes, 'Nota'), 'id', 'Nota', 'Concl Desej', 'TipoNota', 'txt code sub', 'Instalação', 'FlagGD',
                  'Tipo Tarifa', 'ClasseTxt', 'Subgrupo', 'Modalidade', 'Empresa', 'User'));
    });
    socket.on('send_reclamacoes_data', data => {
      setReclamacoes(data);
      setHomeData(select(getDistinct(data, 'Nota'), 'id', 'Nota', 'Concl Desej', 'TipoNota', 'txt code sub', 'Instalação', 'FlagGD',
                  'Tipo Tarifa', 'ClasseTxt', 'Subgrupo', 'Modalidade', 'Empresa', 'User'));
    });
  }, []);

  return (
    <Router>
      <NavBar />
      <Container customClass="">
        <Routes>
          <Route path="/" element={<Home reclamacoes={reclamacoes} homeData={homeData} setHomeData={setHomeData} />} />
          <Route path="/consumo" element={<Consumo medicao={medicao} reclamacoes={reclamacoes} notasServico={notasServico} socket={socket} />} />
          {/* <Route path="/consumoMT" element={<ConsumoMT reclamacoes={medicao} notasServico={notasServico} socket={socket} />} />
          <Route path="/rural" element={<Rural reclamacoes={medicao} notasServico={notasServico} socket={socket} />} />
          <Route path="/ruralMT" element={<RuralMT reclamacoes={medicao} notasServico={notasServico} socket={socket} />} />
          <Route path="/MMGD" element={<MMGD reclamacoes={medicao} notasServico={notasServico} socket={socket} />} />
          <Route path="/MMGDMT" element={<MMGDMT medicao={medicao} reclamacoes={medicao} notasServico={notasServico} socket={socket} />} />
          <Route path="/OrdemNaoFaturado" element={<OrdemNaoFaturado reclamacoes={medicao} notasServico={notasServico} socket={socket} />} />
          <Route path="/OrdemNaoFaturadoMT" element={<OrdemNaoFaturadoMT reclamacoes={medicao} notasServico={notasServico} socket={socket} />} /> */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
