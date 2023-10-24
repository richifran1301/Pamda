import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import FroggieImage from '../Froggie/FroggieImage';

interface Props {
  photoList: Array<{
    id: string;
    photoName: string;
    photoDate: string;
    photoTitle?: string;
  }>;
}

function AlbumGrid({ photoList }: Props) {
  const setPhotosInGrid = () => {
    return photoList.map((item) => (
      <FroggieImage
        imgName={item.photoName}
        imgId={item.id}
        imgDate={item.photoDate}
      />
    ));
  };
  return (
    <div className="container-fluid">
      <div className="row">{setPhotosInGrid()}</div>
    </div>
  );
}

export default AlbumGrid;
