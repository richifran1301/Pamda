import { ChangeEvent } from 'react';
import Global from 'utils/global';
import Form from 'react-bootstrap/Form';

interface Props {
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPhotoBkgChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedRadio: string;
}

function UploadModalContentFroggie({
  onFileChange,
  onPhotoBkgChange,
  selectedRadio,
}: Props) {
  const bkgOptions = [
    Global.NO_BKG,
    Global.FROG_BKG,
    Global.HEART_BKG,
    Global.STARS_BKG,
    Global.HEART_STOPPER_BKG,
  ];

  const getLabel = (option: string) => {
    switch (option) {
      case Global.FROG_BKG:
        return '🐸';

      case Global.HEART_BKG:
        return '💕';

      case Global.NO_BKG:
        return '🚫';

      case Global.STARS_BKG:
        return '⭐';

      case Global.HEART_STOPPER_BKG:
        return '🎞️';

      default:
        return '🐸';
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Fondo:</Form.Label>
        <div>
          {bkgOptions.map((option) => (
            <Form.Check
              onChange={onPhotoBkgChange}
              inline
              label={getLabel(option)}
              name={option}
              type="radio"
              checked={option === selectedRadio}
              key={option}
            />
          ))}
        </div>
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
