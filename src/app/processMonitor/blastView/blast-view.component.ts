import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { BlastViewService } from './blast-view.service';
import { Language } from 'angular-l10n';
import { MdPaginator } from '@angular/material';
import { MdSort } from '@angular/material';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { SourceComponent } from '../source/source.component';
@Component({
  selector: 'blastView-component',
  templateUrl: 'blast-view.component.html',
  styleUrls: ['blast-view.component.css']
})
export class BlastViewComponent implements OnInit {
  @Language() lang: string;
  camp_id: any;
  campaignName: any;
  public error: any;
  displayedColumns = ['processId', 'lotId', 'unitopId', 'parameterId', 'statusId', 'sourceId'];
  dataSource: BlastViewDataSource | null;
  blastViewDatabase: any;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;
  constructor(private blastViewService: BlastViewService, public dialogRef: MdDialogRef<BlastViewComponent>, public dialog: MdDialog, ) { }
  ngOnInit() {
    this.blastViewDatabase = new BlastViewDatabase(this.blastViewService, this.camp_id, this.error, this);
    this.dataSource = new BlastViewDataSource(this.blastViewDatabase, this.paginator, this.sort);
  }
  openDialog(lotName: any, unitName: any, paramId: any, paramName: any) {
    let dialogRef: MdDialogRef<SourceComponent> = this.dialog.open(SourceComponent, {
      height: '35%',
      width: '80%',
    });
    dialogRef.componentInstance.name = lotName;
    dialogRef.componentInstance.unitName = unitName;
    dialogRef.componentInstance.paramId = paramId;
    dialogRef.componentInstance.paramName = paramName;
  }
}
export interface BlastViewData {
  process: string;
  lot: string;
  unit_op: string;
  parameterName: string;
  status: string;
  source: string;
  parameterId: any;
}
export class BlastViewDatabase {
  dataChange: BehaviorSubject<BlastViewData[]> = new BehaviorSubject<BlastViewData[]>([]);
  get data(): BlastViewData[] { return this.dataChange.value; }
  constructor(private blastViewService?: BlastViewService, camp_id?: any, error_data?: any, obj?: BlastViewComponent) {
    this.blastViewService.geBlastViewDetails(camp_id)
      .subscribe((result: any) => {
        for (let i = 0; i < result.parameters.length; i++) {
          this.addDetailsOfBlastView(result.parameters[i]);
        }
      },
        (err: any) => {
        if (err != null) {
        obj.error = 'genericError';
        }
      });
  }
  addDetailsOfBlastView(_result: any) {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewBlastViewDetails(_result));
    this.dataChange.next(copiedData);
  }
  private createNewBlastViewDetails(result_values: any) {
    return {
      process: result_values.process,
      lot: result_values.lot,
      unit_op: result_values.unit_operation,
      parameterName: result_values.name,
      status: result_values.status,
      source: 'SOURCE',
      parameterId: result_values.id
    };
  }
}
export class BlastViewDataSource extends DataSource<any> {
  constructor(private _blastViewDatabase: BlastViewDatabase, private _paginator: MdPaginator, private _sort: MdSort) {
    super();
  }
  connect(): Observable<BlastViewData[]> {
    const displayDataChanges = [
      this._blastViewDatabase.dataChange,
      this._paginator.page,
      this._sort.mdSortChange
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return (this.getSortedData(startIndex, this._paginator.pageSize));
    });
  }
  disconnect() { }
  getSortedData(startIndex: any, pageSize: any): BlastViewData[] {
    const data = this._blastViewDatabase.data.slice().splice(startIndex, pageSize);
    if (!this._sort.active || this._sort.direction === '') { return data; }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'process': [propertyA, propertyB] = [a.process, b.process]; break;
        case 'lot': [propertyA, propertyB] = [a.lot, b.lot]; break;
        case 'unit_op': [propertyA, propertyB] = [a.unit_op, b.unit_op]; break;
        case 'parameter': [propertyA, propertyB] = [a.parameterName, b.parameterName]; break;
        case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
      }
      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
