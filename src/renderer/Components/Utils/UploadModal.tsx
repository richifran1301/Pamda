import { ReactNode } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Props {
  onHide: () => void;
  show: boolean;
  modalTitle: string;
  children: ReactNode;
}

function UploadModal({ onHide, show, modalTitle, children }: Props) {
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
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cerrar</Button>
        <Button type="submit">Subir</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadModal;
