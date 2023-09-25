import React from 'react';

interface Props {
  onFileChange: () => void;
}

function UploadModalContentFroggie({ onFileChange }: Props) {
  return (
    <form onSubmit={onFileChange}>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        onChange={onFileChange}
      />
    </form>
  );
}

export default UploadModalContentFroggie;
