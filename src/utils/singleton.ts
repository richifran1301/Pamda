class Singleton {
  static dataObject: object;

  static setDataObject(data: object): void {
    this.dataObject = data;
  }
}

export default Singleton;
