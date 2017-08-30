import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Language } from 'angular-l10n';

@Component({
  selector: 'process-monitor',
  templateUrl: './process-monitor.component.html',
  styleUrls: ['process-monitor.component.css']
})
export class ProcessMonitorComponent implements OnInit {
  @Language() lang: string;
  public selectedTab: any = 0;
  public role: string;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getSelectedTabs();
      }
    });
  }
  ngOnInit(): void {
    if (window.sessionStorage.getItem('currentUser')) {
      this.role = JSON.parse(window.sessionStorage.getItem('currentUser')).role;
    }
  }
  onLinkClick(e: any) {
    if (e.srcElement.innerText.indexOf('SITE') !== -1) {
      this.router.navigate(['/home/processmonitor/site/manufacturingunits']);
    }
    if (e.srcElement.innerText.indexOf('PROJECT') !== -1) {
      this.router.navigate(['/home/processmonitor/project/campaigns']);
    }
    if (e.srcElement.innerText.indexOf('MOLECULAR FORMAT') !== -1) {
      this.router.navigate(['/home/processmonitor/molecularformat']);
    }
  }
  getSelectedTabs() {
    let currentUrl = this.router.url;
    if (currentUrl.indexOf('home/processmonitor/site') !== -1) {
       this.selectedTab = 0;
    }
    if (currentUrl.indexOf('home/processmonitor/project') !== -1) {
      this.selectedTab = 1;
    }
    if (currentUrl.indexOf('home/processmonitor/molecularformat') !== -1) {
      this.selectedTab = 2;
    }
  }
}
