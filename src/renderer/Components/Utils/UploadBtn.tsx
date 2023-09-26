import React from 'react';
import { Button } from 'react-bootstrap';
// import uploadIcon from '../../../../assets/icons/uploadIcon.png';
import '../../Styles/Utils.css';

interface Props {
  showModal: () => void;
}

function UploadBtn({ showModal }: Props) {
  return (
    <Button className="uploadBtn" variant="primary" onClick={showModal}>
      Subir foto
    </Button>
  );
}

export default UploadBtn;
