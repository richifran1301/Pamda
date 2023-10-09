export interface froggie {
  id: string;
  photoName: string;
  photoTitle: string;
  date: string;
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

  static setImgObject(data: dataObject): void {
    this.imgData = data;
  }

  static incrementIdCounter(): number {
    this.imgData.idCounter += 1;
    return this.imgData.idCounter;
  }

  static getFroggieImages(): dataObject['froggieImages'] {
    return this.imgData.froggieImages;
  }

  static addFroggieElement(element: froggie): void {
    this.imgData.froggieImages.push(element);
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
