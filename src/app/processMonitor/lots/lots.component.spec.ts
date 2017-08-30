import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LotsComponent } from './lots.component';
import { LotsService } from './lots.service';
import { BusyModule, BusyConfig } from 'angular2-busy';

describe('Lots Component', () => {

  let comp: LotsComponent;
  let fixture: ComponentFixture<LotsComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let locale: LocaleService;
  let translation: TranslationService;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, HttpModule, MaterialModule,
        RouterTestingModule.withRoutes([]), TranslationModule.forRoot(), BusyModule.forRoot(<BusyConfig>{
          message: 'Loading...',
          backdrop: false,
          template: '<div id="busy"><img src="../assets/images/loading-blue.gif" class="image" style="width: 30px;"/>{{message}}</div>',
          delay: 200,
          minDuration: 600,
          wrapperClass: 'my-class'
        })],
      declarations: [LotsComponent],
      providers: [LotsService],
    }).createComponent(LotsComponent);

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
      'lot#': 'Lot # ',
      'errorMsgProcessArea': 'No Data to Display',
      'errorFormulation': 'No Data to Display',
      'errorUpStream': 'No Data to Display',
      'errorDownStream': 'No Data to Display',
      'source': 'Source'
    };
    translation.addConfiguration()
      .addTranslation('en', translationEN);
    translation.init().then(() => done());
  });

  beforeEach(() => {
    locale.setCurrentLanguage('en');
  });

  it('should render to tabs based on id', () => {
    de = fixture.debugElement.query(By.css('#tabs'));
    el = de.nativeElement;
    expect(el.id).toContain('tabs');
  });
});
