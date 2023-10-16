import { Singleton } from 'utils/singleton';
import '../../Styles/Froggie.css';

interface Props {
  imgName: string;
  imgId: string;
}

function FroggieImage({ imgName, imgId }: Props) {
  const getImagePath = () => {
    return `${Singleton.pathToImageDirectory}/${imgName}`;
  };

  return (
    <div className="froggieWrapper col-md-4" key={imgId}>
      <img src={getImagePath()} className="imgCard" alt={imgName} key={imgId} />
    </div>
  );
}

export default FroggieImage;
