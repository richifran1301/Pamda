import { useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import Global from 'utils/global';
import DeleteModal from './DeleteModal';
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
  const [showAlert, setShowAlert] = useState(false);
  const [idSelected, setIdSelected] = useState('');

  const handleShowDeleteAlert = (id: string) => {
    setShowAlert(true);
    setIdSelected(id);
  };

  const setPhotosInGrid = () => {
    return photoList.map((item) => (
      <FroggieImage
        key={item.id}
        imgName={item.photoName}
        imgId={item.id}
        imgDate={item.photoDate}
        showDeleteAlert={(id: string) => handleShowDeleteAlert(id)}
      />
    ));
  };
  return (
    <>
      <DeleteModal
        showModal={showAlert}
        hideHandler={() => setShowAlert(false)}
        title={Global.DELETE_ALERT_TITLE}
        body={Global.DELETE_ALERT_BODY}
        imgId={idSelected}
      />
      <div className="container-fluid">
        <div className="row">{setPhotosInGrid()}</div>
      </div>
    </>
  );
}

export default AlbumGrid;
