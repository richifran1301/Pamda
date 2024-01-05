import fs from 'fs';
import path from 'path';
import { IpcMainEvent, app } from 'electron';
import { froggie, Singleton } from '../utils/singleton';
import Global from '../utils/global';

let createdFileNameId: string;

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const PATH_IMAGE_DIRECTORY = path.join(RESOURCES_PATH, 'dataGen', 'photoAlbum');

const IMAGE_REPO_PATH = path.join(RESOURCES_PATH, 'dataGen', 'imageRepo.json');

class DataHandler {
  static createNewId(): string {
    const incrementedId = Singleton.incrementIdCounter();
    return Global.ID_CONCATENATION + incrementedId;
  }

  static readRepository(event: IpcMainEvent): void {
    fs.readFile(IMAGE_REPO_PATH, 'utf8', (err, jsonString) => {
      if (err) {
        const errorTemplate = (errorString: string) =>
          `Read db test failed: ${errorString}`;
        console.log('File read failed:', err);
        event.reply(Global.READ_DB, errorTemplate(`Error ${err}`));
      } else {
        Singleton.setImgObject(JSON.parse(jsonString));
        event.reply(Global.READ_DB, jsonString);
      }
    });
  }

  /**
   * Adds a new entry to the Singleton array and saves it to imageRepo.json
   * @param imageObject -> image object to be uploaded.
   * @param event -> IPC event for replying to front end.
   */
  static saveRecordToImageRepository(
    imageObject: froggie,
    event: IpcMainEvent
  ): void {
    delete imageObject.name; // Delete name property to not save it to data.
    imageObject.id = createdFileNameId; // String id. Ex: IMG-13
    Singleton.addFroggieElement(imageObject); // Append new Froggie Element.
    fs.writeFile(IMAGE_REPO_PATH, JSON.stringify(Singleton.imgData), (err2) => {
      if (err2) {
        event.reply(Global.WRITE_DB, Global.FAILED_MSG);
      } else {
        event.reply(Global.WRITE_DB, Global.SUCCESS_MSG);
      }
    });
  }

  /**
   * Copies file selected by user to the album directory.
   * @param file -> file object to be uploaded.
   * @param filePath -> path of the file to be uploaded.
   * @param event -> IPC event for replying to front end.
   */
  static copyImageToDirectory(
    file: {
      name: string;
    },
    filePath: string,
    event: IpcMainEvent
  ): void {
    const fileName = file.name;
    const extension = fileName.split('.').pop();
    const fileNameToSave = `${this.createNewId()}.${extension}`; // String id. Ex: IMG-13.jpeg
    createdFileNameId = fileNameToSave;
    const pathToWrite = path.join(PATH_IMAGE_DIRECTORY, fileNameToSave);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        event.reply(Global.UPLOAD_IMAGE, Global.FAILED_MSG);
      } else {
        // Write image data to dataGen/
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

  /**
   * Deletes image entry from the Singleton array.
   * @param imgId -> id of image to be deleted inside array. Ex: IMG_12.png
   * @param event -> IPC event for replying to front end.
   */
  static deleteRecordFromImageRepository(
    imgId: string,
    event: IpcMainEvent
  ): void {
    const indexDeleted = Singleton.deleteImageById(imgId);
    if (indexDeleted === Global.INITIAL_LOOP_VALUE) {
      event.reply(Global.DELETE_RECORD, Global.FAILED_MSG);
    } else {
      // Updates imageRepo.json with updated data object.
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

  /**
   * Deletes image file from directory
   * @param imgName -> name of image to be deleted
   * @param event -> IPC event for replying to front end.
   */
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
