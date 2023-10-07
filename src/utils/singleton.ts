export interface froggie {
  id: string;
  nameOfImage: string;
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
      {
        "coupleImages": [{"id": nameOfImage, "title": photoTitle, "date": photoDate}]
      }
  
  */

  static setImgObject(data: dataObject): void {
    this.imgData = data;
  }

  static getIdCounter(): number {
    return this.imgData.idCounter;
  }

  static getFroggieImages(): dataObject['froggieImages'] {
    return this.imgData.froggieImages;
  }

  static addFroggieElement(element: froggie): void {
    this.imgData.froggieImages.push(element);
  }
}

export default Singleton;
