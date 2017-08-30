import { Component, OnInit } from '@angular/core';
import { ManufacturingUnits } from '../../models/manufacturingUnits';
import { CampaignService } from './campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Language } from 'angular-l10n';
import { Subscription } from 'rxjs/Rx';
import { MdDialog, MdDialogRef } from '@angular/material';
import { BlastViewComponent } from '../blastView/blast-view.component';

@Component({
  selector: 'campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['campaign.component.css']
})
export class CampaignComponent implements OnInit {
  @Language() lang: string;
  MUnits: ManufacturingUnits[];
  error = '';
  dataError: boolean;
  public mfs: any;
  public idSucess: string;
  public idWarning: string;
  public idDanger: string;
  public campaigns: any;
  public length: any;
  public campaignsDatas: any[] = [];
  public mfsName: any;
  public mfsId: any;
  public localeValues: any;
  public busy: Subscription;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private campaignService: CampaignService, public dialog: MdDialog) { }

  ngOnInit(): void {
    this.getCampaignList(this.mfsId);
    this.route.params.subscribe(params => {
      this.mfsId = params.id;
      this.mfsName = params.mfsName;
    });

  }

  getCampaignList(mfsId: any): void {
    this.busy = this.campaignService.getCampaignList()
      .subscribe((result: any) => {
        this.mfs = result;
        this.length = this.mfs.length;
        for (let i = 0; i < result.length; i++) {
          let resultId = result[i].id + '';
          if (this.mfsId === resultId) {
            for (let j = 0; j < result[i].campaigns.length; j++) {
              this.campaignsDatas.push(result[i].campaigns[j]);
            }
          }
        }
      }, (err: any) => {
        if (err === 422) {
          this.error = 'campaignComponent.errorMsg';
        }else if (err != null) {
          this.dataError = true;
        }
      });
  }
  getCampaigns(id: number, campaignName: string, processAreaName: String): void {
    this.router.navigate(['/home/processmonitor/site/lots/', id, campaignName, processAreaName, this.mfsName, this.mfsId]);
  }
  openDialog(campaign_id: any, campaignName: any, e: any) {
    e.stopPropagation();
    e.preventDefault();
    let dialogRef: MdDialogRef<BlastViewComponent> = this.dialog.open(BlastViewComponent, {
      height: '80%',
      width: '80%',
    });
    dialogRef.componentInstance.camp_id = campaign_id;
    dialogRef.componentInstance.campaignName = campaignName;
  }
}
