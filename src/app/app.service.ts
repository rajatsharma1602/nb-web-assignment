import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AppService {
  API_KEY = '5acbe442';
  constructor(private _http: HttpClient) { }

  getData(search?:string, year?:Number): Observable<any> {
    const searchString = search !== undefined ? search : 'x-men';
    let url = `http://www.omdbapi.com/?apikey=${this.API_KEY}&s=${searchString}`;
    url = year !== undefined ? url+`&y=${year}` : url;
    return this._http.get(url);
  }

  getDetail(id: string): Observable<any> {
    const url = `http://www.omdbapi.com/?apikey=${this.API_KEY}&i=${id}`;
    return this._http.get(url);
  }

  getPoster(): Observable<any> {
    const url = `http://img.omdbapi.com/?apikey=${this.API_KEY}`
    return this._http.get(url);
  }

}