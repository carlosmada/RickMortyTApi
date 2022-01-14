import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataAPI } from './interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://rickandmortyapi.com';

  constructor(
    private http: HttpClient
  ) { }

  getCharacter( page:string = '0', name:string = ''){
    return this.http.get<DataAPI>(`${this.baseUrl}/api/character?page=${ page }&name=${ name }`);
  }

  getSingleCharacter( name: string ){
    return this.http.get<any>(`${this.baseUrl}/api/character/?name=${ name }`);
  }

}
