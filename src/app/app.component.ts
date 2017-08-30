import { Component, OnInit } from '@angular/core';
import { LocaleService, Language } from 'angular-l10n';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
    @Language() lang: string;

    constructor(public locale: LocaleService) { }

    ngOnInit(): void {
      this.locale.setCurrentLanguage('en');
    }
}
