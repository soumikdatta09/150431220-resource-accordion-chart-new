import { Component } from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
  selector: 'molecular-format',
  template: `<h3>Inside Molecular Format Tab</h3>`
})
export class MolecularFormatComponent {
  @Language() lang: string;
}
