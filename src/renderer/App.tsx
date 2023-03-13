import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// import { getDistinct, select } from './components/Table/Functions';
// import OrdemNaoFaturadoMT from './pages/OrdemNaoFaturadoMT';
// import OrdemNaoFaturado from './pages/OrdemNaoFaturado';
// import Container from './components/layout/Container';
// import NavBar from './components/layout/NavBar';
import { useState, useEffect } from 'react';
// import ConsumoMT from './pages/ConsumoMT';
// import RuralMT from './pages/RuralMT';
import { io } from "socket.io-client";
// import Consumo from './pages/Consumo';
// import MMGDMT from './pages/MMGDMT';
// import Rural from './pages/Rural';
// import MMGD from './pages/MMGD';
// import Home from './pages/Home';
import './App.css';


const socket = io("http://localhost:50001", { transports : ['websocket'] });
// const socket = io("http://10.161.248.71:50001", { transports : ['websocket'] });


function App() {
  const [ reclamacoes, setReclamacoes ] = useState({ header: {  }, dados: [] });
  const [ notasServico, setNotasServico ] = useState({ header: {  }, dados: [] });
  const [ medicao, setMedicao ] = useState({ header: {  }, dados: [] });
  const [ homeData, setHomeData ] = useState(reclamacoes);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('user_connected', window.api.user);
    });
    socket.on('send_data', data => {
      setReclamacoes(data.reclamacoes);
      setNotasServico(data.notas_servico);
      setMedicao(data.medicao);
      // console.log(data.reclamacoes)

      setHomeData(select(getDistinct(data.reclamacoes, 'Nota'), 'id', 'Nota', 'Concl Desej', 'TipoNota', 'txt code sub', 'Instalação', 'FlagGD',
                  'Tipo Tarifa', 'ClasseTxt', 'Subgrupo', 'Modalidade', 'Empresa', 'User'));
    });
    socket.on('send_reclamacoes_data', data => {
      setReclamacoes(data);
      setHomeData(select(getDistinct(data, 'Nota'), 'id', 'Nota', 'Concl Desej', 'TipoNota', 'txt code sub', 'Instalação', 'FlagGD',
                  'Tipo Tarifa', 'ClasseTxt', 'Subgrupo', 'Modalidade', 'Empresa', 'User'));
    });
  }, []);

  // console.log(reclamacoes);
  // console.log(notasServico);

  // let MedicaoFiltrada = filter(medicao, 'Instalacao', x => x === "0075215951")
  // console.log(MedicaoFiltrada);
  return (
    <Router>
      <NavBar socket={socket} />
      <Container customClass="">
        <Routes>
          <Route path="/" element={<Home reclamacoes={reclamacoes} homeData={homeData} setHomeData={setHomeData} />} />
          <Route path="/consumo" element={<Consumo medicao={medicao} reclamacoes={reclamacoes} notasServico={notasServico} socket={socket} />} />
          <Route path="/consumoMT" element={<ConsumoMT reclamacoes={medicao} notasServico={notasServico} socket={socket} />} />
          <Route path="/rural" element={<Rural reclamacoes={medicao} notasServico={notasServico} socket={socket} />} />
          <Route path="/ruralMT" element={<RuralMT reclamacoes={medicao} notasServico={notasServico} socket={socket} />} />
          <Route path="/MMGD" element={<MMGD reclamacoes={medicao} notasServico={notasServico} socket={socket} />} />
          <Route path="/MMGDMT" element={<MMGDMT medicao={medicao} reclamacoes={medicao} notasServico={notasServico} socket={socket} />} />
          <Route path="/OrdemNaoFaturado" element={<OrdemNaoFaturado reclamacoes={medicao} notasServico={notasServico} socket={socket} />} />
          <Route path="/OrdemNaoFaturadoMT" element={<OrdemNaoFaturadoMT reclamacoes={medicao} notasServico={notasServico} socket={socket} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
