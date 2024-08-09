/* =====================================================================
Image Service - Service to be injected into components as a dependency
1) Handles requests and responses from the server and updates components
======================================================================== */

// import HttpClient module
import { HttpClient } from '@angular/common/http';

// import Injectable class from Angular Core
import { Injectable } from '@angular/core';

// import browser modules from Angular Platform Browser module
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// import Subject class from RxJS
import { Subject } from 'rxjs';

// get server api endpoint from environment
import { environment } from '../environments/environment';

// Injectable decorator
@Injectable({
  providedIn: 'root'
})

// decalre Image Service
export class ImagesService {
  // setup onImageEvent Rxjs subject
  onImageEvent: Subject<any> = new Subject<any>();

  // declare class properties
  filename: string = '';
  imageUrl: string = '';
  imageFile: string = '';
  imageSrc: SafeUrl = '';

  // set urlEndpoint to value from environment
  urlEndpoint = environment.API_URL as unknown as string;

  // class constructor method
  // inject httpclient as a dependency
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  // uploadImage method called from upload button event-listener on MainComponent
  uploadImage(image: File) {
    // setup imageData variable
    const imageData = new FormData();
    imageData.append('image', image);

    // make a POST Request to server api endpoint
    this.http.post<{ message: string, filename: string }>(`${this.urlEndpoint}api/images`, imageData)
      .subscribe((data) => {
        // setup properties with the response
        this.filename = data.filename;
        // emit onImageEvent subject
        this.onImageEvent.next({ filename: data.filename, canConvertFlag: true, isConvertedFlag: false });
      });
  }

  // sendImageToSharipise method called from convert button event-listener on MainComponent
  sendImageToSharipise() {
    // make a GET Request to server api endpoint with filename as a query parameter
    this.http.get<{ filename: string, imageUrl: string }>(`${this.urlEndpoint}api/images?filename=${this.filename}`)
      .subscribe((data) => {
        // emit onImageEvent subject
        this.onImageEvent.next({ filename: data.filename, canConvertFlag: true, isConvertedFlag: true });
      });
  }

  // downloadImage method called from download button event-listener on MainComponent
  downloadImage(imageName: string) {
    // create an anchor dom link to download the .webp image by sending a download request to the server
    const link = document.createElement('a');
    // set href to api endpoint to download the image
    link.href = `${this.urlEndpoint}api/images/downloads/${imageName}`;
    // download image from the imageName function parameter
    link.download = imageName;
    // set target to _blank to start download without redirect
    link.target = '_blank';
    // simulate a button click on the created dom element
    link.click();
    // emit onImageEvent subject
    this.onImageEvent.next({ filename: this.filename, canConvertFlag: false, isConvertedFlag: false });
  }

}
