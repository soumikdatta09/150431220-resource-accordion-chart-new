import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { ResourcesTrackerComponent } from './resources-tracker.component';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';


describe('ResourcesTracker Component', () => {
  let comp: ResourcesTrackerComponent;
  let fixture: ComponentFixture<ResourcesTrackerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let locale: LocaleService;
  let translation: TranslationService;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, HttpModule, MaterialModule,
        RouterTestingModule.withRoutes([]), TranslationModule.forRoot()],
      declarations: [ResourcesTrackerComponent]
    }).createComponent(ResourcesTrackerComponent);
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
      'resourcesTracker': 'Resources Tracker'
    };
    translation.addConfiguration()
      .addTranslation('en', translationEN);
    translation.init().then(() => done());
  });

  beforeEach(() => {
    locale.setCurrentLanguage('en');
  });

 it('should render to resource page tabs based on id', () => {
    de = fixture.debugElement.query(By.css('#labelResourceId'));
    el = de.nativeElement;
    expect(el.id).toContain('labelResourceId');
  });
});
