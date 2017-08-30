import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ManufacturingUnitComponent } from './manufacturing-unit.component';
import { ManufacturingUnitService } from './manufacturing-unit.service';
import { BusyModule, BusyConfig } from 'angular2-busy';

describe('Manufacturing Unit Component', () => {

  let comp: ManufacturingUnitComponent;
  let fixture: ComponentFixture<ManufacturingUnitComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let locale: LocaleService;
  let translation: TranslationService;

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
      declarations: [ManufacturingUnitComponent],
      providers: [ManufacturingUnitService],
    }).createComponent(ManufacturingUnitComponent);

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
      'processMonitor': 'Process'
    };
    translation.addConfiguration()
      .addTranslation('en', translationEN);
    translation.init().then(() => done());
  });

  beforeEach(() => {
    locale.setCurrentLanguage('en');
  });

  it('should display the container for manufacturing units', () => {
    de = fixture.debugElement.query(By.css('#content'));
    el = de.nativeElement;
    expect(el.id).toContain('content');
  });
});
