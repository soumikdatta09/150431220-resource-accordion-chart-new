import { Component, OnInit, Input } from '@angular/core';
import { LotsService } from './lots.service';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { Language } from 'angular-l10n';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SourceComponent } from '../source/source.component';

@Component({
    selector: 'lots',
    templateUrl: './lots.component.html',
    styleUrls: ['lots.component.css']
})
export class LotsComponent implements OnInit {
    @Language() lang: string;
    errorProcessAreas = '';
    public upStreamLots: any[] = [];
    public downStreamLots: any[] = [];
    public formulationLots: any[] = [];
    public flagUpStream: boolean = false;
    public flagdownStream: boolean = false;
    public flagFormulation: boolean = false;
    public errorUpStream = '';
    public errorDownStream = '';
    public errorFormulation = '';
    public dataError: boolean;
    public camp_id: string;
    public selectedTab: any = 0;
    public processAreaName: any;
    public campaignName: any;
    public mfsName: any;
    public mfsId: any;
    busy: Subscription;
    public cppFlag: boolean = false;
    public count = 0;
    public pageDisplay = '';

    @Input() campaignId: number;
    @Input() page: any;
    constructor(
        private router: Router, private route: ActivatedRoute,
        private lotsService: LotsService, public dialog: MdDialog) {
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.camp_id = params.id;
            if (this.camp_id === undefined) {
                this.camp_id = this.campaignId + '';
            }
            this.campaignName = params.campaignName;
            this.processAreaName = params.processAreaName;
            this.mfsName = params.mfsName;
            this.mfsId = params.mfsId;
        });
        this.getTabsLocaleValues();
        this.getCampaigns(this.camp_id);
    }
    getTabsLocaleValues() {
        switch (this.processAreaName) {
            case 'Upstream': this.selectedTab = 0;
                break;
            case 'Downstream': this.selectedTab += 1;
                if (this.selectedTab >= 3) {
                    this.selectedTab = 0;
                }
                break;
            case 'Formulation': this.selectedTab += 2;
                if (this.selectedTab >= 3) {
                    this.selectedTab = 0;
                }
                break;
            default: this.selectedTab = 0;
        }
    }
    getCampaigns(camp_id: any): void {
        this.busy = this.lotsService.getCampaigns()
            .subscribe((result: any) => {
                for (let i = 0; i < result.length; i++) {
                    if (result.length === 0 || result[i] === '' || result[i] === null) {
                        this.errorProcessAreas = 'lotsComponent.errorMsgProcessArea';
                    } else {
                        let resultId = result[i].id + '';
                        if (resultId === camp_id) {
                            for (let j = 0; j < result[i].process_areas.length; j++) {
                                if (result[i].process_areas[j].name === 'Upstream') {
                                    for (let k = 0; k < result[i].process_areas[j].lots.length; k++) {
                                        this.flagUpStream = true;
                                        this.upStreamLots.push(result[i].process_areas[j].lots[k]);
                                    }
                                } else if (result[i].process_areas[j].name === 'Downstream') {
                                    for (let m = 0; m < result[i].process_areas[j].lots.length; m++) {
                                        this.flagdownStream = true;
                                        this.downStreamLots.push(result[i].process_areas[j].lots[m]);
                                    }
                                } else if (result[i].process_areas[j].name === 'Formulation') {
                                    for (let n = 0; n < result[i].process_areas[j].lots.length; n++) {
                                        this.flagFormulation = true;
                                        this.formulationLots.push(result[i].process_areas[j].lots[n]);
                                    }
                                }
                            }
                            if (this.flagUpStream === false) {
                                this.errorUpStream = 'lotsComponent.errorMsgProcessArea';
                            }
                            if (this.flagdownStream === false) {
                                this.errorDownStream = 'lotsComponent.errorMsgProcessArea';
                            }
                            if (this.flagFormulation === false) {
                                this.errorFormulation = 'lotsComponent.errorMsgProcessArea';
                            }
                        }
                    }
                }
            }, (err: any) => {
                if (err === 422) {
                    this.errorProcessAreas = 'lotsComponent.errorMsgProcessArea';
                }else if (err != null) {
                    this.dataError = true;
                }

            });
    }
    getmfsPage() {
        this.router.navigate(['/home/processmonitor/site/campaign/', this.mfsId, this.mfsName]);
    }

    openDialog(lotId: any, lotName: any, unitName: any, paramId: any, paramName: any) {
        let dialogRef: MdDialogRef<SourceComponent> = this.dialog.open(SourceComponent, {
            height: '35%',
            width: '80%',
        });
        dialogRef.componentInstance.id = lotId;
        dialogRef.componentInstance.name = lotName;
        dialogRef.componentInstance.unitName = unitName;
        dialogRef.componentInstance.paramId = paramId;
        dialogRef.componentInstance.paramName = paramName;
    }
}
