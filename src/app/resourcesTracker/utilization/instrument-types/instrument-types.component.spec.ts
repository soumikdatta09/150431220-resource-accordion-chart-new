import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { InstrumentTypesComponent } from './instrument-types.component';
import { InstrumentTypesService } from './instrument-types.service';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { ChartsModule } from 'ng2-charts';

describe('Instrument Types Component', () => {
  let comp: InstrumentTypesComponent;
  let fixture: ComponentFixture<InstrumentTypesComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let locale: LocaleService;
  let translation: TranslationService;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, HttpModule, MaterialModule, ChartsModule,
        RouterTestingModule.withRoutes([]), TranslationModule.forRoot(),
        BusyModule.forRoot(<BusyConfig>{
          message: 'Loading...',
          backdrop: false,
          template: '<div id="busy"><img src="../assets/images/loading-blue.gif" class="image" style="width: 30px;"/>{{message}}</div>',
          delay: 200,
          minDuration: 600,
          wrapperClass: 'my-class'
        })],
      declarations: [InstrumentTypesComponent],
      providers: [InstrumentTypesService]
    }).createComponent(InstrumentTypesComponent);
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
      'errorResourceCategory': 'No Data to Display',
      'labelInstruments': 'INSTRUMENTS',
      'labelPeople': 'PEOPLE',
      'labelDevices': 'DEVICES'
    };
    translation.addConfiguration()
      .addTranslation('en', translationEN);
    translation.init().then(() => done());
  });

  beforeEach(() => {
    locale.setCurrentLanguage('en');
  });

  it('should render to instrument-types tabs based on id', () => {
    de = fixture.debugElement.query(By.css('#instrumentTypes_tabs'));
    el = de.nativeElement;
    expect(el.id).toContain('instrumentTypes_tabs');
  });

  it('should render to instrumentTypesTabs based on class name', () => {
    de = fixture.debugElement.query(By.css('.instrumentTypesTabs'));
    el = de.nativeElement;
    expect(el.className).toContain('instrumentTypesTabs');
  });

  it('should render to custom-date class inside date picker', () => {
    de = fixture.debugElement.query(By.css('.custom-date'));
    el = de.nativeElement;
    expect(el.className).toContain('custom-date');
  });
});
