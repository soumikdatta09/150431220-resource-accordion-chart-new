import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ManufacturingUnits } from '../../../models/manufacturingUnits';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../environments/environment';
import { LotsService } from '../../lots/lots.service';
@Injectable()
export class ProjectCampaignService {
    public token: string;
    public ManufacturingUnits: ManufacturingUnits;
    constructor(private http: Http, private lotsService: LotsService) { }

    getManufacturingUnits(): Observable<any> {
        if (window.sessionStorage.getItem('currentUser')) {
            this.token = JSON.parse(window.sessionStorage.getItem('currentUser')).token;
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.token
            });
            return this.http.get(environment.manufacturingUnitUrl, { headers })
                .map((res: Response) => res.json()
                ).catch((res: Response) => Observable.throw(res.status));
        }
    }

    getCampaignList(): Observable<any> {
        if (window.sessionStorage.getItem('currentUser')) {
            this.token = JSON.parse(window.sessionStorage.getItem('currentUser')).token;
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.token
            });
            return this.http.get(environment.manufacturingUnitUrl, { headers })
                .map((res: Response) => res.json()
                ).catch((res: Response) => Observable.throw(res.status));
        }
    }

}
