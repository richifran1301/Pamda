const fs = require('fs');
const path = require('path');

const filePathImageRepo = path.join(__dirname, '../dataGen/imageRepo.json');

class Data {
  numberPlaces: Number;

  tripImages: Array<object>;

  coupleImages: Array<object>;

  goalImages: Array<object>;

  places: Array<object>;

  constructor() {
    this.numberPlaces = 0;
    this.tripImages = [];
    this.coupleImages = [];
    this.goalImages = [];
    this.places = [];
  }

  static readImageRepository(dataObject: Data) {
    console.log('Corri');
    fs.readFile(
      filePathImageRepo,
      'utf8',
      (err: string, jsonString: string) => {
        if (err) {
          console.log('File read failed:', err);
        } else {
          const images = JSON.parse(jsonString);
          dataObject.tripImages = images.trips;
          dataObject.coupleImages = images.couple;
          dataObject.goalImages = images.goals;
          dataObject.places = images.places;
          dataObject.numberPlaces = dataObject.places.length;
        }
      }
    );
  }

  /*   static indexOfImage(toFind, imageName) {
    let index = -1;
    for (let i = 0; i < toFind.length; i++) {
      if (toFind[i].name === imageName) {
        index = i;
        break;
      }
    }
    return index;
  }

  static checkForExistingPlace(placeValue, places) {
    const radioButtonsElement = document.getElementById('trip-type');
    if (this.indexOfImage(places, placeValue) === -1) {
      radioButtonsElement.style.display = 'block';
    } else {
      radioButtonsElement.style.display = 'none';
    }
  }

  static getJsonObject(trips, couple, goals, places) {
    return {
      trips: trips,
      couple: couple,
      goals: goals,
      places: places,
    };
  }

  static updateImageRepo(trips, couple, goals, places) {
    const toWrite = this.getJsonObject(trips, couple, goals, places);
    const textToFile = JSON.stringify(toWrite);
    const pathToWrite = filePathImageRepo;
    fs.writeFile(pathToWrite, textToFile, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  static updateImagesPlaceIndex(indexToErase, dataObject) {
    let intNumber;
    for (let i = 0; i < data.tripImages.length; i++) {
      if (dataObject.tripImages[i].placeId > indexToErase) {
        intNumber = parseInt(dataObject.tripImages[i].placeId);
        intNumber--;
        dataObject.tripImages[i].placeId = intNumber.toString();
      }
    }
  } */
}

export default Data;
