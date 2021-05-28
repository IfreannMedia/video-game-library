import { environment as env } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public getGameList(ordering: string, search?: string): Observable<ApiResponse<Game>>{
    let params = new HttpParams().set('ordering', ordering);
    let params2 = new HttpParams().set('ordering', ordering);
    if(search){
      params = new HttpParams().set('ordering', ordering).set('search', search);
      params2.set('search', search);
      console.log(params);
      console.log(params2);
      debugger;
    }

    return this.http.get<ApiResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params
    });
  }
}
