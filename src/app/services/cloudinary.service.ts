import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { skipApiKey } from './interceptor/skipApiKey';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(private _http:HttpClient) { }

  uploadImage(vals:FormData):Observable<any>{
    let data = vals;
    return this._http.post("https://api.cloudinary.com/v1_1/da0oko2wt/image/upload",data,{ context: skipApiKey() })
  }
}
