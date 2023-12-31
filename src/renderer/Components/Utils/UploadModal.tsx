import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
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
  const [fileBkg, setFileBkg] = useState(Global.NO_BKG);
  // Upload Btn
  const [btnDisabled, setBtnDisabled] = useState(true);
  // Alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');

  const uploadObjectFroggie = {
    name: fileName,
    date: fileDate,
    bkg: fileBkg,
  };

  const clearState = () => {
    setFileName('');
    setFilePath('');
    setFileBkg(Global.NO_BKG);
    setBtnDisabled(true);
    setShowAlert(false);
  };

  /**
   * This will handle whenever the user makes a selection of file from the file explorer.
   * @param fileNm -> name of file
   * @param filePth -> path of file
   * @param fileLM -> last modified value from file. This will be used to calculate the date.
   * @param btnDsbld -> if the upload button should be disabled or not. Depends on the file selection from user.
   */
  const handleFileChange = (
    fileNm: string,
    filePth: string,
    fileLM: number,
    btnDsbld: boolean
  ) => {
    setBtnDisabled(btnDsbld);
    setFileName(fileNm);
    setFilePath(filePth);
    const date = new Date(fileLM);
    setFileDate(date.toLocaleDateString('en-GB')); // Format date
  };

  const handlePhotoBkgChange = (bkg: string) => {
    setFileBkg(bkg);
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
    window.electron.ipcRenderer.sendMessage(Global.READ_DB);

    // calling IPC exposed from preload script
    window.electron.ipcRenderer.once(Global.READ_DB, (arg) => {
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
    sendMsgToCopyImageToDirectory();
  };

  const setModalBody = () => {
    switch (currentTab) {
      case Global.FROGGIE_TAB:
        return (
          <UploadModalContentFroggie
            onFileChange={handleFileChange}
            onPhotoBkgChange={handlePhotoBkgChange}
            selectedRadio={fileBkg}
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
