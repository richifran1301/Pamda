import { Modal, Button } from 'react-bootstrap';
import { useState, ChangeEvent } from 'react';
import Global from 'utils/global';
// import Singleton from 'utils/singleton';
import UploadModalContentFroggie from '../Froggie/UploadModalContentFroggie';

interface Props {
  onHide: () => void;
  show: boolean;
  modalTitle: string;
  currentTab: string;
}

function UploadModal({ onHide, show, modalTitle, currentTab }: Props) {
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [fileDate, setFileDate] = useState('');
  const [photoTitle, setPhotoTitle] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const uploadObjectFroggie = {
    photoPath: filePath,
    photoName: fileName,
    photoDate: fileDate,
    titlePhoto: photoTitle,
  };

  const clearState = () => {
    setFileName('');
    setFilePath('');
    setPhotoTitle('');
    setBtnDisabled(true);
  };

  const checkRequiredFields = (
    photoTitleEvent: string,
    filePathEvent: string
  ) => {
    const filePathIn = filePathEvent !== '';
    const photoTitleIn = photoTitleEvent !== '';
    console.log(photoTitle);
    console.log(filePath);
    if (photoTitleIn && filePathIn) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Check if event.target.files is 'null'
    if (!event.target.files) return;
    setFileName(event.target.files[0].name);
    setFilePath(event.target.files[0].path);
    const date = new Date(event.target.files[0].lastModified); // Format date
    setFileDate(date.toLocaleDateString('en-GB'));
    checkRequiredFields(photoTitle, event.target.files[0].path);
  };

  const handlePhotoTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhotoTitle(event.target.value);
    checkRequiredFields(event.target.value, filePath);
  };

  const handleSendMsgToUpdateImageRepository = () => {
    window.electron.ipcRenderer.sendMessage(
      Global.WRITE_DB,
      uploadObjectFroggie
    );
    window.electron.ipcRenderer.once(Global.WRITE_DB, (msg) => {
      if (msg === Global.SUCCESS_MSG) {
        // Do success.
        console.log(`msg: ${msg}`);
        clearState();
      } else if (msg === Global.FAILED_MSG) {
        // Do failed.
        console.log(`msg: ${msg}`);
      }
    });
  };

  const handleUploadAction = () => {
    // Ping backend to handle copy image.
    window.electron.ipcRenderer.sendMessage(
      Global.UPLOAD_IMAGE,
      uploadObjectFroggie
    );
    // Wait for image to be copied.
    window.electron.ipcRenderer.once(Global.UPLOAD_IMAGE, (msg) => {
      if (msg === Global.SUCCESS_MSG) {
        // Do success.
        console.log(`msg: ${msg}`);
        handleSendMsgToUpdateImageRepository();
      } else if (msg === Global.FAILED_MSG) {
        // Do failed.
        console.log(`msg: ${msg}`);
      }
    });
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
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{setModalBody()}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cerrar</Button>
        <Button onClick={handleUploadAction} disabled={btnDisabled}>
          Subir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadModal;
