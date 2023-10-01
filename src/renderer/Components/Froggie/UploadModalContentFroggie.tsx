import { ChangeEvent } from 'react';

interface Props {
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPhotoTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function UploadModalContentFroggie({
  onFileChange,
  onPhotoTitleChange,
}: Props) {
  return (
    <>
      <input
        type="text"
        id="message"
        name="message"
        onChange={onPhotoTitleChange}
      />
      <input
        type="file"
        id="froggie-file"
        name="message"
        onChange={onFileChange}
      />
    </>
  );
}

export default UploadModalContentFroggie;
