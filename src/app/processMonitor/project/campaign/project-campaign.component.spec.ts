import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectCampaignComponent } from './project-campaign.component';
import { ProjectCampaignService } from './project-campaign.service';
import { List } from 'linqts';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { LotsComponent } from '../../lots/lots.component';
import { LotsService } from '../../lots/lots.service';

describe('ProjectCampaign Component', () => {

  let comp: ProjectCampaignComponent;
  let fixture: ComponentFixture<ProjectCampaignComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let locale: LocaleService;
  let translation: TranslationService;
  let list: List<number>;
  list = new List<number>();

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, HttpModule, MaterialModule,
        RouterTestingModule.withRoutes([]), TranslationModule.forRoot(),
        BusyModule.forRoot(<BusyConfig>{
          message: 'Loading...',
          backdrop: false,
          template: '<div id="busy"><img src="../assets/images/loading-blue.gif" class="image" style="width: 30px;"/>{{message}}</div>',
          delay: 200,
          minDuration: 600,
          wrapperClass: 'my-class'
        })],
      declarations: [ProjectCampaignComponent, LotsComponent],
      providers: [ProjectCampaignService, LotsService],
    }).createComponent(ProjectCampaignComponent);

    comp = fixture.componentInstance;
  });

  beforeEach((done) => {
    locale = TestBed.get(LocaleService);
    translation = TestBed.get(TranslationService);

    locale.addConfiguration()
      .disableStorage()
      .addLanguages(['en', 'it'])
      .defineLanguage('en');

    const translationEN: any = {
      'ProjectCampaign': 'Process'
    };

    translation.addConfiguration()
      .addTranslation('en', translationEN);
    translation.init().then(() => done());
  });

  beforeEach(() => {
    locale.setCurrentLanguage('en');
  });

  it('should display the site for manufacturing units', () => {
    de = fixture.debugElement.query(By.css('#container_Campaign'));
    el = de.nativeElement;
    expect(el.id).toContain('container_Campaign');
  });

  it('should display the container for Process page', () => {
    de = fixture.debugElement.query(By.css('#container'));
    el = de.nativeElement;
    expect(el.id).toContain('container');
  });
  it('should render to panel group based on id', () => {
    de = fixture.debugElement.query(By.css('#accordion'));
    el = de.nativeElement;
    expect(el.id).toContain('accordion');
  });
});
