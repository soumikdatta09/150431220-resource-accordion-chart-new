import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContentProviderService {
  public token: string;

  constructor(private http: Http) { }

  getContentProviders(): Observable<any> {
    return this.http.get('assets/content-provider.json')
      .map((res: any) => res.json());
  }

  getProvidersResultCount(searchParam: any): Observable<any> {
    if (window.sessionStorage.getItem('currentUser')) {
      this.token = JSON.parse(window.sessionStorage.getItem('currentUser')).token;
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.token
      });
      let body = JSON.stringify({ q: searchParam });
      return this.http.post(environment.contentUrl, body, { headers })
        .map((res: Response) => res.json()
        ).catch((res: Response) => Observable.throw(res.status));
    }
  }
}
