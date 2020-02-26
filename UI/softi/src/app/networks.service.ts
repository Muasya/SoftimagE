import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { anything} from './interfaces'

@Injectable({
  providedIn: 'root'
})
export class NetworksService {

  constructor(private http: HttpClient) { }





     httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/octet-stream',
        'Ocp-Apim-Subscription-Key' : 'b48cdd6fcb0f428b885029b5e3eee2c9',
        'processData': 'false'
      })
    };


  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Ocp-Apim-Subscription-Key' : 'b48cdd6fcb0f428b885029b5e3eee2c9'
    })
  };

  largePersonGroupId = '35468565'



//  interface anyi { }

  // get_home_slides(): Observable<homeslides[]>{
  //   return this.http.get<homeslides[]>('./api/resource/homeslides');
  // };

  public detect_snapshot(filebody): Observable<object>{
    return this.http.post(
      'https://centralindia.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&recognitionModel=recognition_02',
       filebody, this.httpOptions);
  };






  public compare_now(id): Observable<object>{

    return this.http.post(
      'https://centralindia.api.cognitive.microsoft.com/face/v1.0/verify',
      {
        "faceId": id.me,
        "personId": id.db,
        "largePersonGroupId": "35468565"
    }
      , this.httpOptions2);

  };


}
