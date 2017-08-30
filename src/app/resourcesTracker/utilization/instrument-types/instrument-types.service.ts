import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../environments/environment';

@Injectable()
export class InstrumentTypesService {
    public token: string;

    constructor(private http: Http) { }
    getInstrumentTypesMfsId(mfs_id: any): Observable<any> {
        if (window.sessionStorage.getItem('currentUser')) {
            this.token = JSON.parse(window.sessionStorage.getItem('currentUser')).token;
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.token
            });
            return this.http.get(environment.instrumentTypesUrl + mfs_id + environment.instrumentTypes, { headers })
                .map((res: Response) => res.json()
                ).catch((res: Response) => Observable.throw(res.status));
        }
    }
    getinstrumentsByInstrumentTypeIdAndMfsId(mfs_id: any, instrument_typeId: any): Observable<any> {
        if (window.sessionStorage.getItem('currentUser')) {
            this.token = JSON.parse(window.sessionStorage.getItem('currentUser')).token;
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.token
            });
            return this.http.get(
                environment.instrumentTypesUrl + mfs_id + environment.instrumentTypesForInstruments + instrument_typeId +
                environment.instruments,
                { headers }).map((res: Response) => res.json()
                ).catch((res: Response) => Observable.throw(res.status));
        }
    }

    public getDonutJSON(): Observable<any> {
        return this.http.get('assets/resources-chart.json')
            .map((res: any) => res.json());
    }
}
