/* ==========================================
Image Mime Type Custom  Async Validator - image-mimetype.validator.ts
============================================= */

// import AbstractControl from Angular Forms
import { AbstractControl } from "@angular/forms";

// import rxjs modules
import { Observable, Observer, of } from 'rxjs'

// create image mime type validator
export const imageMimeType = (control: AbstractControl): Promise<null | { [key: string]: any }> | Observable<null | { [key: string]: any }> => {
  if (typeof (control.value) === 'string') {
    return of(null);
  }
  // setup file
  const file = control.value as File;
  const fileReader = new FileReader();

  // setup file reader observable
  const frObs = new Observable((observer: Observer<null | { [key: string]: any }>) => {
    // read file
    fileReader.readAsArrayBuffer(file);;
    // file loaded event listener
    // user hexa values to check if image is of .png, .jpeg or .jpg values
    fileReader.addEventListener('loadend', () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header: string = '';
      let isValid = false;
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      switch (header) {
        case "89504e47":
          isValid = true;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isValid = true;
          break;
        default:
          isValid = false;
          break;
      }
      // check if mime type is valid and call next middleware
      if (isValid) {
        observer.next(null);
      } else {
        observer.next({ invalidMimeType: false });
      }
      observer.complete();
    });
  });
  // return async validator promise
  return frObs;
};
