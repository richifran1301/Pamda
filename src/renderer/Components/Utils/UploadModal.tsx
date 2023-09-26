import { Modal, Button } from 'react-bootstrap';
import { ChangeEvent } from 'react';
import Global from 'utils/global';
import UploadModalContentFroggie from '../Froggie/UploadModalContentFroggie';

interface Props {
  onHide: () => void;
  show: boolean;
  modalTitle: string;
  currentTab: string;
}

function UploadModal({ onHide, show, modalTitle, currentTab }: Props) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const setModalBody = () => {
    switch (currentTab) {
      case Global.FROGGIE_TAB:
        return <UploadModalContentFroggie onFileChange={handleFileChange} />;
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
        <Button type="submit">Subir</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadModal;
