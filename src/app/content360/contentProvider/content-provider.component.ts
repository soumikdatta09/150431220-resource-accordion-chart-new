import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { List } from 'linqts';
import { ContentService } from '../content.service';
import { ContentProviderService } from './content-provider.service';
import { Provider } from '../../models/provider';
import { Category } from '../../models/category';

@Component({
  selector: 'content',
  templateUrl: './content-provider.component.html',
  styleUrls: ['content-provider.component.css']
})

export class ContentProviderComponent implements OnInit {
  @Language() lang: string;
  public categories: any[];
  public contents: any;
  public busy: Subscription;
  public contentList: List<Provider>;
  public categoryList: List<Category>;
  public category: Category;
  public providerDataSource: any[];
  public errorContent = '';
  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;
  selectedAll: any;
  selectedPrimarySources: any;
  selectedCategory: any;
  searchParam: any;
  public selectedProviders: List<string>;
  public resultCounts: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentService: ContentService,
    private ContentProviderService: ContentProviderService) { }

  ngOnInit(): void {
    this.selectedProviders = new List<string>();
    this.route.params.subscribe(params => {
      this.searchParam = params.searchText;
      this.selectedProviders.AddRange(JSON.parse(window.localStorage.getItem('selectedProviders')).providerIDs);
    });
    this.categoryList = new List<Category>();
    this.contentList = new List<Provider>();
    this.getResultCount(this.searchParam);
  }

  getCategories(count: any): void {
    this.busy = this.ContentProviderService.getContentProviders()
      .subscribe((result: any) => {
        if (result !== null && result.length > 0) {
          this.contentList.AddRange(result);

          this.contentList.ForEach(function (obj) {
            if (String(obj.providerName).toUpperCase() === 'PUBMED') {
              obj.resultCount = count;
            }
          });

          let filteredProviders = this.contentList.Where(x => this.selectedProviders.Any(y => y === String(x.providerId)));

          this.categories = filteredProviders.DistinctBy(x => x.providerCategory).Select(x => x.providerCategory).ToArray();
          for (let i = 0; i < this.categories.length; i++) {
            this.category = new Category();
            this.category.name = this.categories[i];
            this.category.providers = filteredProviders.Where(x => x.providerCategory === this.categories[i]).ToArray();
            this.categoryList.Add(this.category);
          }
          this.contents = this.categoryList.ToArray();
        } else {
          this.errorContent = 'content360Component.errorMsgContent';
        }
      });
  }

  getResultCount(param: any) {
    this.resultCounts = 0;
    this.busy = this.ContentProviderService.getProvidersResultCount(param).subscribe((res: any) => {
      if (res !== null && res.results.length > 0) {
        this.resultCounts = res.results.length;
      }

      this.getCategories(this.resultCounts);
    });
  }

  navigateToContent() {
    this.router.navigate(['/home/content360']);
  }
  navigateToProviderDetails(providerName: any) {
    if (String(providerName).toUpperCase() === 'PUBMED') {
    let searchText = this.searchParam;
    this.router.navigate(['/home/content360/providerdetails/', searchText ]);
    }
  }
}

