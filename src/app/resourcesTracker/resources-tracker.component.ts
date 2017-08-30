import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Language } from 'angular-l10n';


@Component({
  selector: 'resources-tracker',
  templateUrl: './resources-tracker.component.html',
  styleUrls: ['resources-tracker.component.css']
})

export class ResourcesTrackerComponent implements OnInit {
      @Language() lang: string;
      public selectedTab: any = 0;

       constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.getSelectedTabs();
      }
    });
       }


      ngOnInit(): void {
  }

  onLinkClick(e: any) {
    if (e.srcElement.innerText.indexOf('UTILIZATION') !== -1) {
      this.router.navigate(['/home/resourcestracker/utilization']);
    } else if (e.srcElement.innerText.indexOf('DOWNTIME') !== -1) {
      this.router.navigate(['/home/resourcestracker/downtime']);
    }  else if (e.srcElement.innerText.indexOf('CALIBRATION') !== -1) {
      this.router.navigate(['/home/resourcestracker/calibration']);
    }
  }

  getSelectedTabs() {
    let currentUrl = this.router.url;
    if (currentUrl.indexOf('home/resourcestracker/utilization') !== -1) {
      this.selectedTab = 0;
    } else if (currentUrl.indexOf('home/resourcestracker/downtime') !== -1) {
      this.selectedTab = 1;
    } else if (currentUrl.indexOf('home/resourcestracker/calibration') !== -1) {
      this.selectedTab = 2;
    }
  }
}
