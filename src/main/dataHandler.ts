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
        event.reply(Global.WRITE_DB, Global.FAILED_MSG);
      } else {
        event.reply(Global.WRITE_DB, Global.SUCCESS_MSG);
      }
    });
  }

  static copyImageToDirectory(
    file: {
      name: string;
    },
    filePath: string,
    event: IpcMainEvent
  ): void {
    const fileName = file.name;
    const pathToWrite = path.join(PATH_IMAGE_DIRECTORY, fileName);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        event.reply(Global.UPLOAD_IMAGE, Global.FAILED_MSG);
      } else {
        const buf = Buffer.from(data);
        fs.writeFile(pathToWrite, buf, (err2) => {
          if (err2) {
            event.reply(Global.UPLOAD_IMAGE, Global.FAILED_MSG);
          } else {
            event.reply(Global.UPLOAD_IMAGE, Global.SUCCESS_MSG);
          }
        });
      }
    });
  }

  static deleteRecordFromImageRepository(
    imgId: string,
    event: IpcMainEvent
  ): void {
    const indexDeleted = Singleton.deleteImageById(imgId);
    if (indexDeleted === Global.INITIAL_LOOP_VALUE) {
      event.reply(Global.DELETE_RECORD, Global.FAILED_MSG);
    } else {
      fs.writeFile(
        IMAGE_REPO_PATH,
        JSON.stringify(Singleton.imgData),
        (err2) => {
          if (err2) {
            event.reply(Global.DELETE_RECORD, Global.FAILED_MSG);
          } else {
            event.reply(Global.DELETE_RECORD, Global.SUCCESS_MSG);
          }
        }
      );
    }
  }

  static deleteImageFile(imgName: string, event: IpcMainEvent): void {
    const pathToDelete = path.join(PATH_IMAGE_DIRECTORY, imgName);
    fs.unlink(pathToDelete, (err) => {
      if (err) {
        event.reply(Global.DELETE_IMAGE, Global.FAILED_MSG);
      } else {
        event.reply(Global.DELETE_IMAGE, Global.SUCCESS_MSG);
      }
    });
  }

  static getImageDirectoryPath(): string {
    return PATH_IMAGE_DIRECTORY;
  }
}

export default DataHandler;
