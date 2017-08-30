import { Component, OnInit } from '@angular/core';
import { Language } from 'angular-l10n';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { List } from 'linqts';
import { ContentService } from './content.service';
import { Provider } from '../models/provider';
import { Category } from '../models/category';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['content.component.css']
})

export class ContentComponent implements OnInit {
  @Language() lang: string;
  public categories: any[];
  public contents: any;
  public busy: Subscription;
  public contentList: List<Provider>;
  public categoryList: List<Category>;
  public category: Category;
  public providerDataSource: any[];
  public errorContent = '';
  public selectedAll: any;
  public selectedPrimarySources = true;
  public disabledCheckbox = false;
  public searchText: any;
  public selectedProviders: any[] = [];

  constructor(
    private router: Router,
    private contentService: ContentService) { }

  ngOnInit(): void {
    this.categoryList = new List<Category>();
    this.contentList = new List<Provider>();
    this.getCategories();
  }

  getCategories(): void {
    this.busy = this.contentService.getContentProviders()
      .subscribe((result: any) => {
        if (result !== null && result.length > 0) {
          this.contentList.AddRange(result);
          this.categories = this.contentList.DistinctBy(x => x.providerCategory).Select(x => x.providerCategory).ToArray();
          for (let i = 0; i < this.categories.length; i++) {
            this.category = new Category();
            this.category.name = this.categories[i];
            this.category.providers = this.contentList.Where(x => x.providerCategory === this.categories[i]).ToArray();
            this.categoryList.Add(this.category);
          }
          this.contents = this.categoryList.ToArray();
          this.selectPrimarySources();
        } else {
          this.errorContent = 'content360Component.errorMsgContent';
        }
      });
  }

  selectAll() {
    for (let i = 0; i < (this.contents.length); i++) {
      for (let j = 0; j < this.contents[i].providers.length; j++) {
        if (this.selectedAll === true) {
          this.contents[i].providers[j].selected = this.selectedAll;
        } else if (this.selectedAll === false && this.contents[i].providers[j].providerName !== 'PubMed') {
          this.contents[i].providers[j].selected = this.selectedAll;
        }

        this.contents[i].selected = false;
      }
    }

    if (this.selectedAll === false && this.selectedPrimarySources === true) {
      this.selectPrimarySources();
    }
  }
  checkIfAllSelected() {
    for (let i = 0; i < this.contents.length; i++) {
      this.contents[i].selected = '';
      this.selectedPrimarySources = false;
      for (let j = 0; j < this.contents[i].providers.length; j++) {
        this.selectedAll = this.contents.every(function (item: any) {
          return item.selected === true;
        });
      }
    }
  }
  selectPrimarySources() {
    for (let i = 0; i < this.contents.length; i++) {
      for (let j = 0; j < this.contents[i].providers.length; j++) {
        this.contents[i].selected = false;
      }
    }
    for (let i = 0; i < this.contents.length; i++) {
      for (let j = 0; j < this.contents[i].providers.length; j++) {
        if (this.contents[i].providers[j].isPrimary === 'true') {
          if (this.selectedPrimarySources === true) {
            this.contents[i].providers[j].selected = this.selectedPrimarySources;
          } else if (this.selectedPrimarySources === false && this.contents[i].providers[j].providerName !== 'PubMed') {
            this.contents[i].providers[j].selected = this.selectedPrimarySources;
          }
        }
      }
    }
  }
  selectCategory(contentName: any) {
    for (let i = 0; i < this.contents.length; i++) {
      if (contentName === this.contents[i].name) {
        for (let j = 0; j < this.contents[i].providers.length; j++) {
          this.selectedAll = '';
          this.selectedPrimarySources = false;
          this.contents[i].providers[j].selected = false;
        }
      }
    }
  }
  getContentProvider(): void {
    this.selectedProviders = [];

    let el = document.getElementsByClassName('cardClass');
    for (let i = 0; i < el.length; i++) {
      if (el[i].className.includes('mat-checkbox-checked')) {
        let strProviderID = (el[i].firstElementChild.children[0].firstElementChild.id).replace('input-', '');
        this.selectedProviders.push(strProviderID);
      }
    }

    window.localStorage.setItem('selectedProviders',
      JSON.stringify({ providerIDs: this.selectedProviders }));

    let searchParam = this.searchText;
    this.router.navigate(['/home/content360/contentprovider/', searchParam]);
  }
}

