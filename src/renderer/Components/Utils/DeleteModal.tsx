import { Modal, Button } from 'react-bootstrap';

interface Props {
  hideHandler: () => void;
  showModal: boolean;
  title: string;
  body: string;
  imgId: string;
}

function DeleteModal({ hideHandler, showModal, title, body, imgId }: Props) {
  const handleDeleteImg = () => {
    console.log(`Id: ${imgId}`);
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
