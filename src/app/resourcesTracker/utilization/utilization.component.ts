import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from 'angular-l10n';
import { Subscription } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { ManufacturingUnits } from '../../models/manufacturingUnits';
import { ManufacturingUnitService } from '../../processMonitor/manufacturingUnit/manufacturing-unit.service';
import { List } from 'linqts';

@Component({
  selector: 'utilization',
  templateUrl: './utilization.component.html',
  styleUrls: ['utilization.component.css']
})

export class UtilizationComponent implements OnInit {
  @Language() lang: string;
  MUnits: ManufacturingUnits[];
  public manufacturingUnits: any;
  public busy: Subscription;
  public manufacturingList: List<ManufacturingUnits>;
  public decimalPrecision: any = environment.precision;
  public errorCampaign = '';
  public dataError: boolean;

  constructor(
    private router: Router,
    private manufacturingUnitService: ManufacturingUnitService) { }

  ngOnInit(): void {
    this.manufacturingList = new List<ManufacturingUnits>();
    this.getManufacturingUnits();
  }

  getManufacturingUnits(): void {
    this.busy = this.manufacturingUnitService.getManufacturingUnits()
      .subscribe((result: any) => {
        if (result !== null && result.length > 0) {
          this.manufacturingList.AddRange(result);
          this.manufacturingUnits = this.manufacturingList.ToArray();
        } else {
          this.errorCampaign = 'utilizationComponent.errorMsgCampaign';
        }
      },
      (err: any) => {
        if (err != null) {
          this.dataError = true;
        }

      });
  }
  getInstrumentTypesPage(mfs_id: any, mfsName: any) {
    this.router.navigate(['/home/resourcestracker/utilization/instrument-types/', mfs_id, mfsName]);
  }
}
