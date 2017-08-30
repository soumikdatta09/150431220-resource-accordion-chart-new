import { Component, OnInit } from '@angular/core';
import { ManufacturingUnits } from '../../models/manufacturingUnits';
import { ManufacturingUnitService } from './manufacturing-unit.service';
import { Router } from '@angular/router';
import { Language } from 'angular-l10n';
import { Subscription } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'manufacturing-unit',
  templateUrl: './manufacturing-unit.component.html',
  styleUrls: ['manufacturing-unit.component.css']
})
export class ManufacturingUnitComponent implements OnInit {
  @Language() lang: string;
  MUnits: ManufacturingUnits[];
  dataError: boolean;
  public mfs: any;
  public campaigns: any;
  public length: any;
  public busy: Subscription;
  public decimalPrecision: any = environment.precision;

  constructor(
    private router: Router,
    private manufacturingUnitService: ManufacturingUnitService) { }
  ngOnInit(): void {
    this.getManufacturingUnits();
  }
  getManufacturingUnits(): void {
    this.busy = this.manufacturingUnitService.getManufacturingUnits()
      .subscribe((result: any) => {
        this.mfs = result;
        this.length = this.mfs.length;
      },
      (err: any) => {
        if (err != null) {
          this.dataError = true;
        }

      });
  }
  getMfsDetails(id: number, name: String): void {
    this.router.navigate(['/home/processmonitor/site/campaign/', id, name]);
  }
}
