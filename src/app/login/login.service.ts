import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';


@Injectable()
export class LoginService {
    public token: string;

    constructor(private http: Http) {
        const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let body = JSON.stringify({ email: email, password: password });
        return this.http.post(environment.loginUrl, body, { headers })
            .map((res: Response) => res.json()
            ).catch((res: Response) => Observable.throw(res.status));
    }

    logout(): void {
        this.token = null;
        window.sessionStorage.removeItem('currentUser');
    }
}

