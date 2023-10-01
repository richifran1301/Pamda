import { Modal, Button } from 'react-bootstrap';
import { useState, ChangeEvent } from 'react';
import Global from 'utils/global';
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
  const [photoTitle, setPhotoTitle] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Check if event.target.files is 'null'
    if (!event.target.files) return;
    setFileName(event.target.files[0].name);
    setFilePath(event.target.files[0].path);
  };

  const handlePhotoTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhotoTitle(event.target.value);
  };

  const buildUploadObject = () => {
    const uploadObject = {
      photoPath: filePath,
      photoName: fileName,
      titlePhoto: photoTitle,
    };

    return uploadObject;
  };

  const handleUploadAction = () => {
    const objectToSend = buildUploadObject();
    console.log(objectToSend);
    window.electron.ipcRenderer.sendMessage(Global.UPLOAD_IMAGE, objectToSend);
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
        <Button onClick={handleUploadAction}>Subir</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadModal;
