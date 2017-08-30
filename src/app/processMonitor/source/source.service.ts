import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';

@Injectable()
export class SourceService {
    public token: string;

    constructor(private http: Http) { }

    getParametersList(paramId: any): Observable<any> {
        if (window.sessionStorage.getItem('currentUser')) {
            this.token = JSON.parse(window.sessionStorage.getItem('currentUser')).token;
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.token
            });
            return this.http.get(environment.parametersUrl + paramId, { headers })
                .map((res: Response) => res.json()
                ).catch((res: Response) => Observable.throw(res.status));
        }
    }
}
