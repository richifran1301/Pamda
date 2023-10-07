import fs from 'fs';
import path from 'path';
import { froggie, Singleton } from '../utils/singleton';
import Global from '../utils/global';

const IMAGE_REPO_PATH = path.join(__dirname, '../../dataGen', 'imageRepo.json');

class DataHandler {
  static createNewId(): string {
    const counterId = Singleton.imgData.idCounter;
    const incrementedId = counterId + 1;
    return Global.ID_CONCATENATION + incrementedId;
  }

  static saveRecordToImageRepository(imageObject: froggie): void {
    const newId = this.createNewId(); // String id. Ex: IMG-13
    imageObject.id = newId;
    Singleton.addFroggieElement(imageObject); // Append new Froggie Element.
    fs.writeFile(IMAGE_REPO_PATH, JSON.stringify(Singleton.imgData), (err2) => {
      if (err2) {
        console.log(`WRITE ERROR: ${err2}`);
      } else {
        // No error
      }
    });
  }
}

export default DataHandler;
