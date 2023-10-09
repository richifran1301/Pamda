import fs from 'fs';
import path from 'path';
import { IpcMainEvent } from 'electron';
import { froggie, Singleton } from '../utils/singleton';
import Global from '../utils/global';

const IMAGE_REPO_PATH = path.join(__dirname, '../../dataGen', 'imageRepo.json');

const PATH_IMAGE_DIRECTORY = path.join(
  __dirname,
  '../../dataGen',
  'photoAlbum'
);

class DataHandler {
  static createNewId(): string {
    const incrementedId = Singleton.incrementIdCounter();
    return Global.ID_CONCATENATION + incrementedId;
  }

  static saveRecordToImageRepository(
    imageObject: froggie,
    event: IpcMainEvent
  ): void {
    imageObject.id = this.createNewId(); // String id. Ex: IMG-13
    Singleton.addFroggieElement(imageObject); // Append new Froggie Element.
    fs.writeFile(IMAGE_REPO_PATH, JSON.stringify(Singleton.imgData), (err2) => {
      if (err2) {
        console.log(`WRITE ERROR: ${err2}`);
        event.reply(Global.WRITE_DB, Global.FAILED_MSG);
      } else {
        event.reply(Global.WRITE_DB, Global.SUCCESS_MSG);
      }
    });
  }

  static copyImageToDirectory(
    file: {
      photoName: string;
      photoPath: string;
    },
    event: IpcMainEvent
  ): void {
    const fileName = file.photoName;
    const pathToWrite = path.join(PATH_IMAGE_DIRECTORY, fileName);
    const pathToFile = file.photoPath;
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        console.log(`READ ERROR: ${err}`);
        event.reply(Global.UPLOAD_IMAGE, Global.FAILED_MSG);
      } else {
        const buf = Buffer.from(data);
        fs.writeFile(pathToWrite, buf, (err2) => {
          if (err2) {
            console.log(`WRITE ERROR: ${err2}`);
            event.reply(Global.UPLOAD_IMAGE, Global.FAILED_MSG);
          } else {
            event.reply(Global.UPLOAD_IMAGE, Global.SUCCESS_MSG);
          }
        });
      }
    });
  }
}

export default DataHandler;
