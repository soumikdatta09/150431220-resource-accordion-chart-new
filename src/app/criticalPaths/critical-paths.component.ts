import { Component } from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
  selector: 'critical-paths',
  templateUrl: './critical-paths.component.html'
})
export class CriticalPathsComponent {
  @Language() lang: string;
}


