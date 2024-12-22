import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public photoService: PhotoService) {}

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
  
  async ngOnInit() {
    await this.photoService.loadSaved();
  }
  deletePhoto(index: number) {
    this.photoService.photos.splice(index, 1); 
    Preferences.set({
      key: this.photoService.PHOTO_STORAGE,
      value: JSON.stringify(this.photoService.photos),
    });
  }
  
  async retakePhoto(index: number) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
  
    const savedImageFile = await this.photoService.savePicture(capturedPhoto);
    this.photoService.photos[index] = savedImageFile;
    Preferences.set({
      key: this.photoService.PHOTO_STORAGE,
      value: JSON.stringify(this.photoService.photos),
    });
  }
  

  
}
