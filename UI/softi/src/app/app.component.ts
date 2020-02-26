import { Component } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {NetworksService} from './networks.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(
    public net : NetworksService
    ) {}
  // user known
  public inuser = false;
  // scanning is active
  public activeScan = false;

  // is scanning
  public scanning = false;

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  public trigger: Subject<void> = new Subject<void>();

    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    public nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

    facedatabase = [
      {
        name:'Jack',
        p_id: '35cdd042-3bf2-4b63-9bcb-7fe5d69f6226'
      },
      {
        name:'Ben',
        p_id: '70047494-97a4-4f64-9cb8-626c5fcb4c94'
      },
      {
        name:'Steve',
        p_id: 'b3441ae7-b20c-418f-917c-8fa821f1169b'
      }
    ]

  public hello(){
   this.scanning = true;
   this.activeScan = true;
   setTimeout(() => {
    this.snapshotUpload();
  }, 2000);
  }


  public snapshotUpload(){
    this.triggerSnapshot();
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }


  public makeblob(base64file) {
    const BASE64_MARKER = ';base64,';
    const parts = base64file.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

  public handleImage(webcamImage: WebcamImage): void {

    // console.log(webcamImage);
    this.webcamImage = webcamImage;
    // console.log(webcamImage);
    this.net.detect_snapshot(this.makeblob(webcamImage.imageAsDataUrl)).subscribe( info =>{

      // console.log(info);
      if (info){
        this.comparePics(info);
      }else{

      }

    });

  }


  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }


  // 459e891e-1cb0-44fe-8754-71128c625717




public comparePics(file){

  this.facedatabase.forEach(element => {
    this.net.compare_now({
      me: file[0].faceId,
      db: element.p_id
    }).subscribe( info =>{


// this.api_count = +1;
this.tellus(info);



    })
  });



}
public user = "";
public user_image = "";
public massage = "";


public arrayfile = [];
public scanner_done =false;


public tellus(file){
 this.arrayfile.push(file.confidence);

this.goon();

}
public goon(){
  if(this.arrayfile.length == 3){
    // this.scanning = false;
    this.activeScan = false;
    this.inuser = true;
    this.scanner_done =true;
    this.somebody();
  }
};
public somebody(){
  if(this.arrayfile[0] > 0.65){
    this.user = "jack";
    this.user_image = `https://raw.githubusercontent.com/Muasya/assets/master/real_${this.user}.jpg`
    this.massage = "WELCOME";
  }else if(this.arrayfile[1] > 0.65){
    this.user = "ben";
    this.massage = "WELCOME";
    this.user_image = `https://raw.githubusercontent.com/Muasya/assets/master/real_${this.user}.jpg`
  }else if(this.arrayfile[2] > 0.65){
    this.user = "steve";
    this.massage = "WELCOME";
    this.user_image = `https://raw.githubusercontent.com/Muasya/assets/master/real_${this.user}.jpg`
  }else{
    this.massage = "ACCESS DENIED !";
    this.user = "please register with softi";
    this.user_image = `data:image/jpeg;base64,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`
  }
}
//   // console.log(file.confidence)
// if (this.api_count == 1 || file.confidence > 0.7) {

//   console.log('its jack');
//   this.api_count = 0;

// } else if (this.api_count == 2 || file.confidence > 0.7) {

//   console.log('its ben');
//   this.api_count = 0;

// } else if (this.api_count == 3 || file.confidence > 0.7) {

//   console.log('its steve');
//   this.api_count = 0;

// } else {
// {this.api_count = 0;};
// console.log('unknown');
// }

// }


}
