import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Language } from 'angular-l10n';
import { Router, NavigationEnd } from '@angular/router';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

    @Language() lang: string;
    headerValue = '';
    @Output() headerChange = new EventEmitter();
    public date: any;
    public data: string;
    public role: string;
    public token: string;
    jwtHelper: JwtHelper = new JwtHelper();
    sessionExpired: string = 'SessionExpired';
    public currentUser: any;
    @Input()
    get headerData() {
        return this.headerValue;
    }

    constructor(private _router: Router) {
        this.currentUser = window.sessionStorage.getItem('currentUser');
        this.date = new Date();
        _router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.processUrl();
                this.tokenExpiry();
            }
        });
    }

    ngOnInit() {
        if (this.currentUser) {
            this.data = JSON.parse(this.currentUser).name;
            this.role = JSON.parse(this.currentUser).role;
        }
        this.openNav();
    }

    processUrl() {
        let currentUrl = this._router.url;
        if (currentUrl.indexOf('/home/index') !== -1) {
            this.home();
        }else if (currentUrl.indexOf('/home/processmonitor') !== -1) {
            this.process();
        }else if (currentUrl.indexOf('/home/resourcestracker') !== -1) {
            this.resources();
        }else if (currentUrl.indexOf('/home/content360') !== -1) {
            this.content();
        }else if (currentUrl.indexOf('/home/patternview') !== -1) {
            this.pattern();
        }
    }
    set headerData(val) {
        this.headerValue = val;
        this.headerChange.emit(this.headerValue);
    }

    home() {
        this.headerData = '';
    }

    process() {
        this.headerData = 'homeComponent.processMonitor';
    }

    resources() {
        this.headerData = 'homeComponent.resourcesTracker';
    }

    content() {
        this.headerData = 'homeComponent.content360';
    }

    pattern() {
        this.headerData = 'homeComponent.patternView';
    }

    tokenExpiry() {

        if (this.currentUser) {
            this.token = JSON.parse(this.currentUser).token;
            if (this.jwtHelper.isTokenExpired(this.token)) {
                if (this.token != null) {
                    this._router.navigate(['/login', this.sessionExpired]);
                    return false;
                }
            }
        }
    }

    openNav() {
        document.getElementById('mySidenav').style.width = '18%';
        document.getElementById('main').style.marginLeft = '18%';
        document.getElementById('divToggle').style.marginRight = '15%';
    }

    toggleNav() {
        let sidenav = document.getElementById('mySidenav');
        let main = document.getElementById('main');
        let home = document.getElementById('spanHome');
        let process = document.getElementById('spanProcess');
        let resource = document.getElementById('spanResource');
        let content = document.getElementById('spanContent');
        let pattern = document.getElementById('spanPattern');
        let toggleIcon = document.getElementById('spanToggleIcon');
        let toggleIconArrow = document.getElementById('spanToggleIconArrow');
        let divToggle = document.getElementById('divToggle');

        if (sidenav.style.width === '18%') {
            sidenav.style.width = '5%';
            main.style.marginLeft = '5%';
            home.style.display = 'none';
            process.style.display = 'none';
            resource.style.display = 'none';
            content.style.display = 'none';
            pattern.style.display = 'none';
            toggleIcon.style.display = 'none';
            toggleIconArrow.style.display = 'block';
            divToggle.style.marginRight = '32%';
        } else {
            sidenav.style.width = '18%';
            main.style.marginLeft = '18%';
            home.style.display = 'inline';
            process.style.display = 'inline';
            resource.style.display = 'inline';
            content.style.display = 'inline';
            pattern.style.display = 'inline';
            toggleIcon.style.display = 'inline';
            toggleIconArrow.style.display = 'none';
            divToggle.style.marginRight = '15%';
        }
    }
}
