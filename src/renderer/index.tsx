import { createRoot } from 'react-dom/client';
import Global from 'utils/global';
import { Singleton } from 'utils/singleton';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

window.electron.ipcRenderer.sendMessage(Global.READ_DB);

// Get persistent data from imageRepo.json to data object in Singleton.
window.electron.ipcRenderer.once(Global.READ_DB, (arg) => {
  const jsonObject = JSON.parse(arg);
  Singleton.setImgObject(jsonObject);
  root.render(<App />);
});

window.electron.ipcRenderer.sendMessage(Global.PATH_IMG_DIRECTORY);

// Get path to 'dataGen/photoAlbum'
window.electron.ipcRenderer.once(Global.PATH_IMG_DIRECTORY, (path) => {
  Singleton.setPathToImageDirectory(path);
});
