import { Modal, Button } from 'react-bootstrap';
import { useState, ChangeEvent } from 'react';
import Global from 'utils/global';
import { Singleton, froggie } from 'utils/singleton';
import Alert from './Alert';
import UploadModalContentFroggie from '../Froggie/UploadModalContentFroggie';

interface Props {
  onHide: () => void;
  show: boolean;
  modalTitle: string;
  currentTab: string;
  handleUpdatePhotoList: (newList: Array<froggie>) => void;
}

function UploadModal({
  onHide,
  handleUpdatePhotoList,
  show,
  modalTitle,
  currentTab,
}: Props) {
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [fileDate, setFileDate] = useState('');
  const [photoTitle, setPhotoTitle] = useState('');
  // Upload Btn
  const [btnDisabled, setBtnDisabled] = useState(true);
  // Alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');

  const uploadObjectFroggie = {
    photoName: fileName,
    photoDate: fileDate,
    titlePhoto: photoTitle,
  };

  const clearState = () => {
    setFileName('');
    setFilePath('');
    setPhotoTitle('');
    setBtnDisabled(true);
    setShowAlert(false);
  };

  const checkRequiredFields = (
    photoTitleEvent: string,
    filePathEvent: string
  ) => {
    const filePathIn = filePathEvent !== '';
    const photoTitleIn = photoTitleEvent !== '';
    if (photoTitleIn && filePathIn) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Check if event.target.files is 'null'
    if (!event.target.files) return;
    if (event.target.files.length === 0) {
      setBtnDisabled(true);
      return;
    }
    const file = event.target.files[0];
    setFileName(file.name);
    setFilePath(file.path);
    const date = new Date(file.lastModified);
    setFileDate(date.toLocaleDateString('en-GB')); // Format date
    checkRequiredFields(photoTitle, event.target.files[0].path);
  };

  const handlePhotoTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhotoTitle(event.target.value);
    checkRequiredFields(event.target.value, filePath);
  };

  const showUploadStateMsg = (uploadState: string, msgToShow: string) => {
    setAlertMsg(msgToShow);
    setAlertType(uploadState);
    setShowAlert(true);
  };

  const handleCloseAction = () => {
    clearState();
    setShowAlert(false);
    onHide();
  };

  const updateLocalData = () => {
    window.electron.ipcRenderer.sendMessage(Global.DB_HANDLER);

    // calling IPC exposed from preload script
    window.electron.ipcRenderer.once(Global.DB_HANDLER, (arg) => {
      const jsonObject = JSON.parse(arg);
      Singleton.setImgObject(jsonObject);
      handleUpdatePhotoList(Singleton.getFroggieImages());
      handleCloseAction();
    });
  };

  const sendMsgToUpdateImageRepository = () => {
    window.electron.ipcRenderer.sendMessage(
      Global.WRITE_DB,
      uploadObjectFroggie
    );
    window.electron.ipcRenderer.once(Global.WRITE_DB, (msg) => {
      if (msg === Global.SUCCESS_MSG) {
        // Do success.
        updateLocalData();
      } else if (msg === Global.FAILED_MSG) {
        // Do failed.
        showUploadStateMsg(
          Global.FAILED_MSG,
          'No se ha podido leer la base de datos.'
        );
      }
    });
  };

  const sendMsgToCopyImageToDirectory = () => {
    // Ping backend to handle copy image.
    window.electron.ipcRenderer.sendMessage(
      Global.UPLOAD_IMAGE,
      uploadObjectFroggie,
      filePath
    );
    // Wait for image to be copied.
    window.electron.ipcRenderer.once(Global.UPLOAD_IMAGE, (msg) => {
      if (msg === Global.SUCCESS_MSG) {
        // Do success.
        sendMsgToUpdateImageRepository();
      } else if (msg === Global.FAILED_MSG) {
        // Do failed.
        showUploadStateMsg(
          Global.FAILED_MSG,
          'No se ha podido subir la imagen.'
        );
      }
    });
  };

  const handleUploadAction = () => {
    setBtnDisabled(true);
    const duplicatedName = Singleton.searchForDuplicatedName(fileName);
    if (!duplicatedName) {
      sendMsgToCopyImageToDirectory();
    } else {
      showUploadStateMsg(Global.FAILED_MSG, 'Foto duplicada.');
      console.log('Duplicated image');
    }
  };

  const setModalBody = () => {
    switch (currentTab) {
      case Global.FROGGIE_TAB:
        return (
          <UploadModalContentFroggie
            onFileChange={handleFileChange}
            onPhotoTitleChange={handlePhotoTitleChange}
          />
        );
      default:
        return <div>Tab no existente</div>;
    }
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={handleCloseAction}>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{setModalBody()}</Modal.Body>
      <Modal.Footer className="uploadModalFooter">
        <Alert alertType={alertType} alertMsg={alertMsg} show={showAlert} />
        <div>
          <Button
            onClick={handleCloseAction}
            className="closeBtn"
            variant="secondary"
          >
            Cerrar
          </Button>
          <Button
            onClick={handleUploadAction}
            className="confirmBtn"
            disabled={btnDisabled}
          >
            Subir
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadModal;
