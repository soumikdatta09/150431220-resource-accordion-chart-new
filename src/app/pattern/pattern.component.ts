import { Component } from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
  selector: 'pattern',
  templateUrl: './pattern.component.html'
})
export class PatternComponent {
  @Language() lang: string;
}

