import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { ContentComponent } from './content.component';
import { ContentService } from './content.service';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BusyModule, BusyConfig } from 'angular2-busy';


describe('Content360 Component', () => {

    let comp: ContentComponent;
    let fixture: ComponentFixture<ContentComponent>;
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
                    template: `<div id="busy">
                    <img src="../assets/images/loading-blue.gif" class="image" style="width: 30px;"/>{{message}}</div>`,
                    delay: 200,
                    minDuration: 600,
                    wrapperClass: 'my-class'
                })],
            declarations: [ContentComponent],
            providers: [ContentService],
        }).createComponent(ContentComponent);

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
            'content360': 'Content',
            'tileContent': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'primarySources': 'Primary Sources',
            'selectAll': 'Select All',
            'unselect': 'Unselect'
        };
        translation.addConfiguration()
            .addTranslation('en', translationEN);
        translation.init().then(() => done());
    });

    beforeEach(() => {
        locale.setCurrentLanguage('en');
    });

    it('should render to search text box based on class name', () => {
        de = fixture.debugElement.query(By.css('.form-control'));
        el = de.nativeElement;
        expect(el.className).toContain('form-control');
    });

    it('should render to primary check box based on id', () => {
        de = fixture.debugElement.query(By.css('#chkPrimary'));
        el = de.nativeElement;
        expect(el.id).toContain('chkPrimary');
    });

    it('should render to select all check box based on id', () => {
        de = fixture.debugElement.query(By.css('#chkSelectAll'));
        el = de.nativeElement;
        expect(el.id).toContain('chkSelectAll');
    });
});
