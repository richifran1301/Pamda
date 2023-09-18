import { createRoot } from 'react-dom/client';
import Global from 'utils/global';
import Singleton from 'utils/singleton';
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
window.electron.ipcRenderer.once(Global.DB_HANDLER, (arg) => {
  // eslint-disable-next-line no-console
  const jsonObject = JSON.parse(arg);
  console.log(arg);
  console.log('Corro el read');
  Singleton.setDataObject(jsonObject);
});

// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
window.electron.ipcRenderer.sendMessage(Global.DB_HANDLER);
