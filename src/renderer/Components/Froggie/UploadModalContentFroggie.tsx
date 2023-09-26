import { ChangeEvent } from 'react';

interface Props {
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function UploadModalContentFroggie({ onFileChange }: Props) {
  return (
    <input type="text" id="message" name="message" onChange={onFileChange} />
  );
}

export default UploadModalContentFroggie;
