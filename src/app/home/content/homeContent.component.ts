import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';

@Component({
    templateUrl: 'homeContent.component.html',
    styleUrls: ['homeContent.component.css']
})

export class HomeContentComponent implements OnInit {
    @Language() lang: string;
    public data: string;
     public role: string;

    ngOnInit() {
        if (window.sessionStorage.getItem('currentUser')) {
            this.data = JSON.parse(window.sessionStorage.getItem('currentUser')).name;
             this.role = JSON.parse(window.sessionStorage.getItem('currentUser')).role;
        }
    }
}

