import { Component, OnInit } from '@angular/core';
import { ManufacturingUnits } from '../../../models/manufacturingUnits';
import { ProjectCampaignService } from './project-campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Language } from 'angular-l10n';
import { List } from 'linqts';
import { Subscription } from 'rxjs/Rx';
import { CampaignLots } from '../../../models/campaignLots';
import { MdDialog, MdDialogRef } from '@angular/material';
import { BlastViewComponent } from '../../blastView/blast-view.component';
import { SourceComponent } from '../../source/source.component';
import { LotsService } from '../../lots/lots.service';
import { LotsComponent } from '../../lots/lots.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'project-campaign',
  templateUrl: './project-campaign.component.html',
  styleUrls: ['project-campaign.component.css'],
  providers: [LotsService, LotsComponent]
})
export class ProjectCampaignComponent implements OnInit {
  @Language() lang: string;
  MUnits: ManufacturingUnits[];
  dataError: boolean;
  public mfs: any;
  public campaigns: any;
  public length: any;
  public mfsName: any;
  public mfsId: string;
  public manufacturingList: List<ManufacturingUnits>;
  public selectedValue = '';
  public busy: Subscription;
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
  public processAreaName: any;
  public campaignName: any;
  public campaignLots: CampaignLots[] = [];
  public selectedIndex: any = 0;
  public errorCampaign = '';
  public decimalPrecision: any = environment.precision;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectCampaignService: ProjectCampaignService,
    private lotsComponent: LotsComponent, private lotsService: LotsService,
    public dialog: MdDialog, public dialogBlastView: MdDialog) { }

  getManufacturingUnits(): void {
    this.busy = this.projectCampaignService.getManufacturingUnits()
      .subscribe((result: any) => {
        this.manufacturingList.AddRange(result);
        this.mfs = this.manufacturingList.OrderBy(x => x.name).ToArray();
        if (this.mfs !== null && this.mfs.length > 0) {
          this.selectedValue = this.mfs[0].id;
          this.mfsId = this.mfs[0].id;
          this.getCampaigns(result);
        } else {
          this.errorCampaign = 'projectCampaignComponent.errorMsgCampaign';
        }
      },
      (err: any) => {
        if (err != null) {
          this.dataError = true;
        }

      });
  }

  ngOnInit(): void {
    this.selectedIndex = 0;
    this.manufacturingList = new List<ManufacturingUnits>();
    this.getManufacturingUnits();
    this.route.params.subscribe(params => {
      this.mfsId = params.id;
      this.mfsName = params.mfsName;
    });
  }
  private getCampaigns(result: any): void {
    for (let mfuIndex = 0; mfuIndex < result.length; mfuIndex++) {
      let resultId: string = result[mfuIndex].id;
      if (String(this.mfsId) === String(resultId)) {
        this.campaignLots = [];
        for (let campaignIndex = 0; campaignIndex < result[mfuIndex].campaigns.length; campaignIndex++) {
          let campaignLotCount: number;
          campaignLotCount = 0;
          if (result[mfuIndex].campaigns[campaignIndex].process_areas != null) {
            for (let pArea = 0; pArea < result[mfuIndex].campaigns[campaignIndex].process_areas.length; pArea++) {
              campaignLotCount += result[mfuIndex].campaigns[campaignIndex].process_areas[pArea].lots.length;
            }
          }
          let campaignLot: CampaignLots;
          campaignLot = new CampaignLots(result[mfuIndex].campaigns[campaignIndex], campaignLotCount);
          this.campaignLots.push(campaignLot);
        }
      }
    }
  }
  getCampaignList(mfsId: any): void {
    this.mfsId = mfsId;
    this.busy = this.projectCampaignService.getCampaignList()
      .subscribe((result: any) => {
        this.length = this.mfs.length;
        this.getCampaigns(result);
      });
  }

  onChange(newValue: any) {
    this.getCampaignList(newValue);
    this.selectedValue = newValue;
  }
  openDialogBlastView(campaign_id: any, campaignName: any, e: any) {
    e.stopPropagation();
    e.preventDefault();
    let dialogRef: MdDialogRef<BlastViewComponent> = this.dialogBlastView.open(BlastViewComponent, {
      height: '80%',
      width: '80%',
    });
    dialogRef.componentInstance.camp_id = campaign_id;
    dialogRef.componentInstance.campaignName = campaignName;
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
