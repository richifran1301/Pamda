import { useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import Global from 'utils/global';
import { froggie } from 'utils/singleton';
import DeleteModal from './DeleteModal';
import FroggieImage from '../Froggie/FroggieImage';

interface Props {
  photoList: Array<{
    id: string;
    name: string;
    date: string;
    photoTitle?: string;
  }>;
  onUpdatePhotoList: (newList: Array<froggie>) => void;
}

function AlbumGrid({ photoList, onUpdatePhotoList }: Props) {
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
        imgName={item.name}
        imgId={item.id}
        imgDate={item.date}
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
        updateHandler={(newList: Array<froggie>) => onUpdatePhotoList(newList)}
        imgId={idSelected}
      />
      <div className="container-fluid">
        <div className="row">{setPhotosInGrid()}</div>
      </div>
    </>
  );
}

export default AlbumGrid;
