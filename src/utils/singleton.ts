import Global from './global';

export interface froggie {
  id: string;
  name?: string; // Not saved in data, thus not required. Only used to get extension of file.
  bkg: string; // Background selected of photo.
  date: string; // Date of photo.
}

interface dataObject {
  idCounter: number;
  froggieImages: Array<froggie>;
}

export class Singleton {
  static imgData: dataObject;
  /* Structure:
      {"idCounter":0, "froggieImages":[]}
  */

  static pathToImageDirectory: string;

  static setImgObject(data: dataObject): void {
    this.imgData = data;
  }

  // Only used once to set the Directory path.
  static setPathToImageDirectory(path: string): void {
    this.pathToImageDirectory = path;
  }

  static incrementIdCounter(): number {
    this.imgData.idCounter += 1;
    return this.imgData.idCounter;
  }

  static getFroggieImages(): Array<froggie> {
    // Check if imgData is null.
    if (!this.imgData) return [];
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
}

export default Singleton;
