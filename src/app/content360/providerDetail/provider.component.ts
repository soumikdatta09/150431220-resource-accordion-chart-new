import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ProviderService } from './provider.service';

@Component({
  selector: 'provider',
  templateUrl: 'provider.component.html',
  styleUrls: ['provider.component.css']
})

export class ProviderComponent implements OnInit {
  @Language() lang: string;
  public busy: Subscription;
  public dataArray: any[] = [] ;
  public errorCampaign = '';
public searchParam: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private providerService: ProviderService) { }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.searchParam = params.searchText;
    });
    this.getProviderDetails(this.searchParam);
  }

   getProviderDetails(param: any): void {
    this.busy = this.providerService.getProviderContent(param)
      .subscribe((result: any) => {
        if (result !== null && result.results.length) {
          for (let i = 0; i < result.results.length ; i++ ) {
                  this.dataArray.push(result.results[i]);
              }
        }
      });
  }

  navigateToContentProvider() {
    let param = this.searchParam;
    this.router.navigate(['/home/content360/contentprovider/', param]);
  }
}


