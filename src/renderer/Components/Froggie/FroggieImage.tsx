import '../../Styles/Froggie.css';
import { Singleton } from 'utils/singleton';
import { useRef, useState } from 'react';
import Global from 'utils/global';

interface Props {
  imgName: string;
  imgDate: string;
  imgId: string;
}
function FroggieImage({ imgName, imgId, imgDate }: Props) {
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
  return (
    <div className="froggieWrapper col-md-3" key={imgId}>
      <div className="froggieCard">
        <img
          src={getImagePath()}
          className={imgClass}
          alt={imgName}
          key={imgId}
          ref={imgRef}
          onLoad={onLoad}
        />
        <p className="dateText">{imgDate}</p>
      </div>
    </div>
  );
}

export default FroggieImage;
