import {Component} from '@angular/core';
import { Language } from 'angular-l10n';


@Component({
  selector: 'downtime',
  templateUrl: './downtime.component.html',
  styleUrls: ['downtime.component.css']
})

export class DownTimeComponent {
      @Language() lang: string;
}
