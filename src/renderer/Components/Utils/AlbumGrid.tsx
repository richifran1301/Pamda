import React from 'react';
import FroggieImage from '../Froggie/FroggieImage';

interface Props {
  photoList: Array<{
    id: string;
    photoName: string;
    date: string;
    photoTitle?: string;
  }>;
}

function AlbumGrid({ photoList }: Props) {
  const setPhotosInGrid = () => {
    return photoList.map((item) => (
      <FroggieImage imgName={item.photoName} imgId={item.id} />
    ));
  };
  return (
    <div className="container-fluid">
      <div className="row">{setPhotosInGrid()}</div>
    </div>
  );
}

export default AlbumGrid;
