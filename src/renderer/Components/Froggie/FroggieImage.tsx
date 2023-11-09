import '../../Styles/Froggie.css';
import { Singleton } from 'utils/singleton';
import { useRef, useState } from 'react';
import Global from 'utils/global';

interface Props {
  imgName: string;
  imgDate: string;
  imgId: string;
  showDeleteAlert: (id: string) => void;
}
function FroggieImage({ imgName, imgId, imgDate, showDeleteAlert }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgClass, setImgClass] = useState('imgCard');
  const getImagePath = () => {
    return `${Singleton.pathToImageDirectory}/${imgName}`;
  };
  const onLoad = () => {
    if (!imgRef.current) return;
    const { height } = imgRef.current;
    const { width } = imgRef.current;
    if (height !== 0 && width !== 0) {
      const imgOrientation =
        height > width ? Global.VERTICAL_PHOTO : Global.HORIZONTAL_PHOTO;
      setImgClass(`${imgOrientation}`);
    }
  };

  const handleShowDeleteAlert = () => {
    showDeleteAlert(imgId);
  };

  return (
    <div className="froggieWrapper col-md-3 col-sm-2">
      <div className="froggieCard">
        <button
          type="button"
          className="btn-close deleteBtn"
          aria-label="Close"
          onClick={handleShowDeleteAlert}
        />
        <p className="dateText">{imgDate}</p>
        <img
          src={getImagePath()}
          className={imgClass}
          alt={imgName}
          key={imgId}
          ref={imgRef}
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}

export default FroggieImage;
