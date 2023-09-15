import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
// // eslint-disable-next-line no-console
// console.log(arg);
// console.log('Corro');
// });

window.electron.ipcRenderer.once('read-db', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
  console.log('Corro el read');
});

// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
window.electron.ipcRenderer.sendMessage('read-db');
