/* ==========================================
Main Component - main.component.ts
Selector: 'app-main'
Template: 'main.component.html
Style: 'main.component.css
============================================= */

// import Component, OnInit, OnDestory from Angular Core
import { Component, OnInit, OnDestroy } from '@angular/core';
// import Router from Angular Router
import { Router } from '@angular/router';
// import Form modules from Angular Forms
import { FormGroup, FormControl, Validators } from '@angular/forms';

// import Subscription class from Rxjs library
import { Subscription } from 'rxjs';

// import imageMimeType utility function
import { imageMimeType } from 'src/app/utilities/image-mimetype.validator';

// import ImageService
import { ImagesService } from '../images.service';

// component decorator
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

// declare MainComponent class that implements OnInit and OnDestroy methods
export class MainComponent implements OnInit, OnDestroy {

  // component properties
  // instantiate imageSubscription from Subscription class from Rxjs
  imageSubscription: Subscription = new Subscription();
  // instantiate form
  form: any;

  // component properties
  imagePreview: string = '';
  imageName: string = '';
  canConvertFlag: boolean = false;
  isConvertedFlag: boolean = false;
  timeIntervalId: any;

  // class constructor
  // inject imageService and router dependency
  constructor(private imagesService: ImagesService, private router: Router) { }

  // OnInit virtual method
  ngOnInit(): void {
    // setup form as an instance of FormGroup class
    // setup image
    this.form = new FormGroup({
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [imageMimeType] })
    });

    // assign imageSubscription as an rxjs observable
    // update component properties on image event
    this.imageSubscription = this.imagesService.onImageEvent.subscribe(data => {
      this.imageName = data.filename;
      this.canConvertFlag = data.canConvertFlag;
      this.isConvertedFlag = data.isConvertedFlag;
    });

  }

  // OnDestroy virtual method
  ngOnDestroy() {
    // unsubscribe from imageSubscription when component is destroyed
    this.imageSubscription.unsubscribe();
    if (this.timeIntervalId) {
      clearTimeout(this.timeIntervalId);
    }
  }

  // onUploadImage button listener
  onUploadImage(event: Event) {
    // setup image upload
    const file = (event.target as HTMLInputElement)?.files?.[0];
    // get image from form
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    // set imageName from uploaded image
    this.imageName = file?.name as string;

    // setup reader to change imagePreview component property
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file as Blob);

    // call uploadPhoto method on imageService
    this.imagesService.uploadImage(file as File);
  }

  // onConvertImage button listener
  onConvertImage() {
    // if form is invalid return
    if (this.form.invalid) return;
    // else send image to rest api to be consumed by sharp api endpoint on the server
    this.imagesService.sendImageToSharipise();
  }

  // onDownloadImage button listener
  onDownloadImage() {
    // download image from the server through imagesService
    this.imagesService.downloadImage(this.imageName);
    // reset imagePreview property
    this.imagePreview = '/assets/img/bg.png';
    // reset imageName property
    this.imageName = '';
    // reload page after 3 seconds post successful download

    this.timeIntervalId = setTimeout(() => {
      // navigate to app route
      this.router.navigate(['/app']);
    }, 3000);
  }
}
