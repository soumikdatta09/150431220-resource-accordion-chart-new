import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { SourceService } from './source.service';
import { Language } from 'angular-l10n';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'source-component',
  templateUrl: 'source.component.html',
  styleUrls: ['source.component.css']
})
export class SourceComponent implements OnInit {
  @Language() lang: string;
  public img_url: string = '';
  public busy: Subscription;
  public error = '';
  public dataError: boolean;
  public name: any;
  public id: any;
  public unitName: any;
  public paramId: any;
  public paramName: any;
  public unit_measure: any;
  public process_range_low: any;
  public process_range_high: any;
  public normal_operating_range_low: any;
  public normal_operating_range_high: any;
  public actual_value: any;
  public parameter_type: any;

  constructor(private sourceService: SourceService, public dialogRef: MdDialogRef<SourceComponent>) { }

  ngOnInit() {
    this.getParametersList(this.paramId);
  }
  getParametersList(paramId: any): void {
    this.busy = this.sourceService.getParametersList(this.paramId)
      .subscribe((result: any) => {
        this.paramName = result.name;
        this.unit_measure = result.unit;
        this.process_range_low = result.process_range_low;
        this.process_range_high = result.process_range_high;
        this.normal_operating_range_low = result.normal_operating_range_low;
        this.normal_operating_range_high = result.normal_operating_range_high;
        this.actual_value = result.actual_value;
        this.parameter_type = result.parameter_type;
        switch ((String(result.status)).toUpperCase()) {
          case 'R': this.img_url = '../../../assets/images/R.png';
            break;
          case 'A': this.img_url = '../../../assets/images/A.png';
            break;
          case 'G': this.img_url = '../../../assets/images/G.png';
            break;
          default: this.img_url = '../../../assets/images/W.png';
        }
      }, (err: any) => {
        if (err === 422) {
          this.error = 'sourceComponent.errorMsg';
        } else if (err != null) {
          this.dataError = true;
        }

      });
  }
}
