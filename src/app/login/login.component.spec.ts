import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Login Component', () => {

  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let locale: LocaleService;
  let translation: TranslationService;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, HttpModule, BrowserAnimationsModule,
        MaterialModule, RouterTestingModule.withRoutes([]), TranslationModule.forRoot()],
      declarations: [LoginComponent],
      providers: [LoginService],
    }).createComponent(LoginComponent);
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
      'headerLogin': 'Login',
      'submit': 'Submit',
      'appTitle': 'ALabs'
    };
    translation.addConfiguration()
      .addTranslation('en', translationEN);
    translation.init().then(() => done());
  });

  beforeEach(() => {
    locale.setCurrentLanguage('en');
  });
  it('should have expected translated <h2> text Login', (() => {
    let des: DebugElement[];
    let els: HTMLElement[] = [];
    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.css('h2'));
    for (let i = 0; i < des.length; i++) {
      els.push(des[i].nativeElement);
    }
    expect(els[0].textContent).toContain('Login');
  }));
  it('should display the email textbox as `Email', () => {
    de = fixture.debugElement.query(By.css('#textEmail'));
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.id).toContain('textEmail');
  });
  it('should display the password textbox as `Password', () => {
    de = fixture.debugElement.query(By.css('#textPassword'));
    el = de.nativeElement;
    fixture.detectChanges();
    expect(el.id).toContain('textPassword');
  });
  it('should display the Submit `button` ', (() => {
    let debugElement: DebugElement[];
    let htmlElement: HTMLElement[] = [];
    fixture.detectChanges();
    debugElement = fixture.debugElement.queryAll(By.css('#btnLogin'));
    for (let i = 0; i < debugElement.length; i++) {
      htmlElement.push(debugElement[i].nativeElement);
    }
    expect(htmlElement[0].textContent).toContain('Submit');
  }));
  // it('should render translated text', (() => {
  //   let des: DebugElement[];
  //   let els: HTMLElement[] = [];
  //   fixture.detectChanges();
  //   des = fixture.debugElement.queryAll(By.css('.headerLogo'));
  //   for (let i = 0; i < des.length; i++) {
  //     els.push(des[i].nativeElement);
  //   }
  //   expect(els[0].textContent).toContain('ALabs');
  // }));
});
