import { Modal, Button } from 'react-bootstrap';
import Global from 'utils/global';
import { Singleton, froggie } from 'utils/singleton';

interface Props {
  hideHandler: () => void;
  updateHandler: (newList: Array<froggie>) => void;
  showModal: boolean;
  title: string;
  body: string;
  imgId: string;
}

function DeleteModal({
  hideHandler,
  updateHandler,
  showModal,
  title,
  body,
  imgId,
}: Props) {
  let elementToDelete: froggie;

  const updateLocalData = () => {
    window.electron.ipcRenderer.sendMessage(Global.DB_HANDLER);

    // calling IPC exposed from preload script
    window.electron.ipcRenderer.once(Global.DB_HANDLER, (arg) => {
      const jsonObject = JSON.parse(arg);
      Singleton.setImgObject(jsonObject);
      updateHandler(Singleton.getFroggieImages());
      hideHandler();
    });
  };

  const sendMsgToImageRepository = () => {
    window.electron.ipcRenderer.sendMessage(
      Global.DELETE_RECORD,
      elementToDelete.id
    );
    window.electron.ipcRenderer.once(Global.DELETE_RECORD, (msg) => {
      if (msg === Global.SUCCESS_MSG) {
        // Do success.
        updateLocalData();
      } else if (msg === Global.FAILED_MSG) {
        // Do failed.
        console.log('Failed deletion of record');
      }
    });
  };

  const sendMsgToDeleteFile = () => {
    window.electron.ipcRenderer.sendMessage(
      Global.DELETE_IMAGE,
      elementToDelete.photoName
    );
    window.electron.ipcRenderer.once(Global.DELETE_IMAGE, (msg) => {
      if (msg === Global.SUCCESS_MSG) {
        // Do success.
        sendMsgToImageRepository();
      } else if (msg === Global.FAILED_MSG) {
        // Do failed.
        console.log('Failed deletion of file');
      }
    });
  };

  const handleDeleteImg = () => {
    const images = Singleton.getFroggieImages();
    for (let i = 0; i < images.length; i += 1) {
      if (images[i].id === imgId) {
        elementToDelete = images[i];
        break;
      }
    }
    sendMsgToDeleteFile();
  };

  return (
    <Modal
      size="sm"
      show={showModal}
      onHide={hideHandler}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <div>
          <Button
            onClick={hideHandler}
            className="closeBtn"
            variant="secondary"
          >
            Cerrar
          </Button>
          <Button
            onClick={handleDeleteImg}
            variant="danger"
            className="confirmBtn"
          >
            Borrar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
