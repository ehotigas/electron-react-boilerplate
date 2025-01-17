import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.api.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  // console.log(arg);
});
// window.api.ipcRenderer.sendMessage('ipc-example', ['ping']);
