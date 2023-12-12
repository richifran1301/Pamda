import '../../Styles/Froggie.css';
import { Singleton } from 'utils/singleton';
import { useRef, useState } from 'react';
import Global from 'utils/global';

interface Props {
  imgDate: string;
  imgId: string;
  imgBkg: string;
  // eslint-disable-next-line react/require-default-props
  showDeleteAlert?: (id: string) => void; // Making this as optional to use in upload modal.
}

function FroggieImage({ imgId, imgDate, imgBkg, showDeleteAlert }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgClass, setImgClass] = useState('imgCard');
  const getImagePath = () => {
    return `${Singleton.pathToImageDirectory}/${imgId}`;
  };

  /*
    Sets the image orientation based on widht and height.
    If:
    Widht > height -> image orientation -> horizontal.
    Widht < height -> image orientation -> vertical.
  */
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

  const setImageBkg = () => {
    switch (imgBkg) {
      case Global.FROG_BKG:
        return 'froggieCard froggieBkg';

      case Global.HEART_BKG:
        return 'froggieCard heartBkg';

      case Global.NO_BKG:
        return 'froggieCard noBkg';

      case Global.STARS_BKG:
        return 'froggieCard starsBkg';

      case Global.HEART_STOPPER_BKG:
        return 'froggieCard heartStopperBkg';

      default:
        return 'froggieCard heartBkg';
    }
  };

  const handleShowDeleteAlert = () => {
    if (showDeleteAlert !== undefined) {
      showDeleteAlert(imgId);
    }
  };

  return (
    <div className="froggieWrapper col-lg-3 col-md-4 col-sm-6">
      <div className={setImageBkg()}>
        <button
          type="button"
          className={
            showDeleteAlert === undefined ? 'nonDisplay' : 'btn-close deleteBtn'
          }
          aria-label="Close"
          onClick={handleShowDeleteAlert}
        />
        <p className="dateText">{imgDate}</p>
        <img
          src={getImagePath()}
          className={imgClass}
          alt={imgId}
          key={imgId}
          ref={imgRef}
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}

export default FroggieImage;
