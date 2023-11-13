import Global from './global';

export interface froggie {
  id: string;
  photoName: string;
  photoTitle: string;
  photoDate: string;
}

interface dataObject {
  idCounter: number;
  froggieImages: Array<froggie>;
}

export class Singleton {
  static imgData: dataObject;

  static pathToImageDirectory: string;
  /* Structure:
      {"idCounter":0, "froggieImages":[]}
  */

  static setImgObject(data: dataObject): void {
    this.imgData = data;
  }

  static setPathToImageDirectory(path: string): void {
    this.pathToImageDirectory = path;
  }

  static incrementIdCounter(): number {
    this.imgData.idCounter += 1;
    return this.imgData.idCounter;
  }

  static getFroggieImages(): Array<froggie> {
    return this.imgData.froggieImages;
  }

  static addFroggieElement(element: froggie): void {
    this.imgData.froggieImages.unshift(element);
  }

  static deleteImageById(imgId: string): number {
    let index = Global.INITIAL_LOOP_VALUE;
    const array = this.getFroggieImages();
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].id === imgId) {
        index = i;
        break;
      }
    }
    this.imgData.froggieImages.splice(index, 1);
    return index;
  }

  static searchForDuplicatedName(fileName: string): boolean {
    const list = this.getFroggieImages();
    const listLength = list.length;
    let exists = false;
    for (let i = 0; i < listLength; i += 1) {
      if (fileName === list[i].photoName) {
        exists = true;
        break;
      }
    }
    return exists;
  }
}

export default Singleton;
