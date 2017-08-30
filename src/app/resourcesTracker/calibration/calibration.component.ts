import {Component} from '@angular/core';
import { Language } from 'angular-l10n';


@Component({
  selector: 'calibration',
  templateUrl: './calibration.component.html',
  styleUrls: ['calibration.component.css']
})

export class CalibrationComponent {
      @Language() lang: string;
}
