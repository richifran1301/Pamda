import { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPhotoTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function UploadModalContentFroggie({
  onFileChange,
  onPhotoTitleChange,
}: Props) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Título:</Form.Label>
        <Form.Control
          type="text"
          placeholder="..."
          onChange={onPhotoTitleChange}
        />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Foto:</Form.Label>
        <Form.Control
          accept=".png, .jpg, .jpeg"
          type="file"
          onChange={onFileChange}
        />
      </Form.Group>
    </Form>
  );
}

export default UploadModalContentFroggie;
