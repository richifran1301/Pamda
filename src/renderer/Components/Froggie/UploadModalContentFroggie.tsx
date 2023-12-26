import { ChangeEvent, useState } from 'react';
import Global from 'utils/global';
import Form from 'react-bootstrap/Form';
import FroggieImage from './FroggieImage';

interface Props {
  onFileChange: (
    fileNm: string,
    filePth: string,
    fileLM: number,
    btnDsbld: boolean
  ) => void;
  onPhotoBkgChange: (bkg: string) => void;
  selectedRadio: string;
}

function UploadModalContentFroggie({
  onFileChange,
  onPhotoBkgChange,
  selectedRadio,
}: Props) {
  const [filePathPreview, setFilePathPreview] = useState('');
  const [fileDatePreview, setFileDatePreview] = useState('');
  const [fileBkgPreview, setFileBkgPreview] = useState(Global.NO_BKG);
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Check if event.target.files is 'null'
    if (!event.target.files) return;
    if (event.target.files.length === 0) {
      // Handles when user cancels file selection. Clicks on the "x" on the file explorer.
      setFilePathPreview('');
      onFileChange('', '', 0, true);
      return;
    }
    const file = event.target.files[0];
    setFilePathPreview(file.path);
    const date = new Date(file.lastModified);
    setFileDatePreview(date.toLocaleDateString('en-GB')); // Format date
    onFileChange(file.name, file.path, file.lastModified, false);
  };

  const handlePhotoBkgChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileBkgPreview(event.target.name);
    onPhotoBkgChange(event.target.name);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Fondo:</Form.Label>
        <div>
          {bkgOptions.map((option) => (
            <Form.Check
              onChange={handlePhotoBkgChange}
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
          onChange={handleFileChange}
        />
      </Form.Group>
      <div className={filePathPreview === '' ? 'nonDisplay' : ''}>
        <FroggieImage
          imgDate={fileDatePreview}
          imgPath={filePathPreview}
          imgId={Global.MOCK_IMG_ID}
          imgBkg={fileBkgPreview}
        />
      </div>
    </Form>
  );
}

export default UploadModalContentFroggie;
