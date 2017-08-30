import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContentService {
  public token: string;

  constructor(private http: Http) { }

  getContentProviders(): Observable<any> {
    return this.http.get('assets/content-provider.json')
      .map((res: any) => res.json());
  }
}
