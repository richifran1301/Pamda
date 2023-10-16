import { createRoot } from 'react-dom/client';
import Global from 'utils/global';
import { Singleton } from 'utils/singleton';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

window.electron.ipcRenderer.sendMessage(Global.DB_HANDLER);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once(Global.DB_HANDLER, (arg) => {
  const jsonObject = JSON.parse(arg);
  Singleton.setImgObject(jsonObject);
});

window.electron.ipcRenderer.sendMessage(Global.PATH_IMG_DIRECTORY);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once(Global.PATH_IMG_DIRECTORY, (path) => {
  Singleton.setPathToImageDirectory(path);
  console.log(Singleton.pathToImageDirectory);
});
