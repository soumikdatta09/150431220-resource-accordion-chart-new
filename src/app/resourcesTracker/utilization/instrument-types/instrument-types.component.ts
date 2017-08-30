import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { InstrumentTypesService } from './instrument-types.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { environment } from '../../../../environments/environment';
import { Color } from 'ng2-charts';


@Component({
    selector: 'instrument-types',
    templateUrl: 'instrument-types.component.html',
    styleUrls: ['instrument-types.component.css']
})

export class InstrumentTypesComponent implements OnInit {
    @Language() lang: string;
    public busy: Subscription;
    public instrumentTypes: any[] = [];
    public instrumentsByInstrumentTypeId: any[] = [];
    public errorResourceCategory: any;
    public flagInstrumentTypes: any;
    public flagInstrumentsByInstrumentTypeId: any;
    public errorInstruments: any;
    public mfs_id: any;
    public mfs_name: any;
    public selectedTab = 0;
    public decimalPrecision: any = environment.precision;
    public dataError: boolean;

    type: string = 'doughnut';


    colorsEmptyObject: Array<Color> = ['#f4ed11', '#fab600', '#7ed321'];



    constructor(public instrumentTypesService: InstrumentTypesService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.mfs_id = params.mfsId;
            this.mfs_name = params.mfsName;
        });
        this.instrumentTypesByMfsId(this.mfs_id);
    }
    instrumentTypesByMfsId(mfs_id: any) {
        this.busy = this.instrumentTypesService.getInstrumentTypesMfsId(mfs_id)
            .subscribe((result: any) => {
                if (result.length === 0) {
                    this.errorInstruments = 'instrumentTypesComponent.errorResourceCategory';
                } else {
                    for (let resultIndex = 0; resultIndex < result.length; resultIndex++) {
                        this.flagInstrumentTypes = true;
                        this.instrumentTypes.push(result[resultIndex]);
                        this.instrumentTypesService.getinstrumentsByInstrumentTypeIdAndMfsId(this.mfs_id, result[resultIndex].id)
                            .subscribe((resultType: any) => {
                                this.instrumentsByInstrumentTypeId = [];

                                for (let resultTypeIndex = 0; resultTypeIndex < resultType.length; resultTypeIndex++) {
                                    this.flagInstrumentsByInstrumentTypeId = true;


                                    let data = [{
                                        data: [resultType[resultTypeIndex].rag_totals.R.toFixed(1),
                                        resultType[resultTypeIndex].rag_totals.A.toFixed(1),
                                        (100 - (resultType[resultTypeIndex].rag_totals.R +
                                            resultType[resultTypeIndex].rag_totals.A)).toFixed(1)],
                                        backgroundColor: ['#ffb324', '#f4ed11', '#b3ea32']
                                    }];
                                    let datalabel = ['Off', 'Idle', 'Operating'];

                                    resultType[resultTypeIndex]['dataset'] = data;
                                    resultType[resultTypeIndex]['label'] = datalabel;
                                    this.instrumentsByInstrumentTypeId.push(resultType[resultTypeIndex]);

                                }

                                this.instrumentTypes[resultIndex]['instruments'] = this.instrumentsByInstrumentTypeId;

                                if (this.flagInstrumentsByInstrumentTypeId === false) {
                                    this.errorInstruments = 'instrumentTypesComponent.errorResourceCategory';
                                }
                            }, (err: any) => {
                                if (err === 422) {
                                    this.errorResourceCategory = 'instrumentTypesComponent.errorResourceCategory';
                                } else if (err === 0) {
                                    this.dataError = err;
                                }
                            });
                    }
                }
                if (this.flagInstrumentTypes === false) {
                    this.errorInstruments = 'instrumentTypesComponent.errorResourceCategory';
                }
            }, (err: any) => {
                if (err === 422) {
                    this.errorResourceCategory = 'instrumentTypesComponent.errorResourceCategory';
                } else if (err != null) {
                    this.dataError = true;
                }


            });
    }
    getmfsPageForResourceUtilization() {
        this.router.navigate(['/home/resourcestracker/utilization']);
    }
}
