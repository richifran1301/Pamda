import React from 'react';
import { Button } from 'react-bootstrap';

interface Props {
  showModal: () => void;
}

function UploadBtn({ showModal }: Props) {
  return (
    <Button variant="primary" onClick={showModal}>
      Launch vertically centered modal
    </Button>
  );
}

export default UploadBtn;
