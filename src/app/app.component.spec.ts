// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { HttpModule } from '@angular/http';
// import { By, BrowserModule } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { MaterialModule } from '@angular/material';
// import { AppComponent } from './app.component';
// import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
// import { FormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';


// describe('AppComponent', () => {

//     let comp: AppComponent;
//     let fixture: ComponentFixture<AppComponent>;
//     let des: DebugElement[];
//     let els: HTMLElement[] = [];

//     let locale: LocaleService;
//     let translation: TranslationService;

//     beforeEach(() => {
//         fixture = TestBed.configureTestingModule({
//             imports: [BrowserModule, FormsModule, HttpModule, MaterialModule,
//                 RouterTestingModule.withRoutes([]), TranslationModule.forRoot()],
//             declarations: [AppComponent]
//         }).createComponent(AppComponent);

//         comp = fixture.componentInstance;
//     });

//     beforeEach((done) => {
//         locale = TestBed.get(LocaleService);
//         translation = TestBed.get(TranslationService);

//         locale.addConfiguration()
//             .disableStorage()
//             .addLanguages(['en', 'it'])
//             .defineLanguage('en');

//         const translationEN: any = {
//         };
//         translation.addConfiguration()
//             .addTranslation('en', translationEN);
//         translation.init().then(() => done());
//     });

//     beforeEach(() => {
//         locale.setCurrentLanguage('en');     
//     });    
// });
