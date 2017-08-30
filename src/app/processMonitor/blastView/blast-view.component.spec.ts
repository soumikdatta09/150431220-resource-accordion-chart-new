import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule, MdDialogRef, MdDialogModule } from '@angular/material';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BlastViewComponent } from './blast-view.component';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { MdTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { BlastViewService } from './blast-view.service';

class MdDialogRefMock {
}

describe('Blast View Component ', () => {

    let comp: BlastViewComponent;
    let fixture: ComponentFixture<BlastViewComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let locale: LocaleService;
    let translation: TranslationService;
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [BrowserModule, FormsModule, HttpModule, MaterialModule,
                RouterTestingModule.withRoutes([]), CdkTableModule, MdTableModule, MdDialogModule, TranslationModule.forRoot(),
                BusyModule.forRoot(<BusyConfig>{
                    message: 'Loading...',
                    backdrop: false,
                    template: '<div id="busy"><img src="../assets/images/loading-blue.gif"'
                     + 'class="image" style="width: 30px;"/>{{message}}</div>',
                    delay: 200,
                    minDuration: 600,
                    wrapperClass: 'my-class'
                })],
            declarations: [BlastViewComponent],
            providers: [
                { provide: MdDialogRef, useClass: MdDialogRefMock }, BlastViewService
            ]
        }).createComponent(BlastViewComponent);

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
            'campaign': 'Campaign',
            'table_title': 'Path to Critical Process Paramters',
            'process': 'Process',
            'lot': 'Lot',
            'unit_op': 'Unit Operation',
            'parameter': 'Parameter',
            'status': 'Status'
        };
        translation.addConfiguration()
            .addTranslation('en', translationEN);
        translation.init().then(() => done());
    });

    beforeEach(() => {
        locale.setCurrentLanguage('en');
    });

    it('should create comp', () => {
        expect(comp).toBeTruthy();
    });
    it('should display close button', () => {
        de = fixture.debugElement.query(By.css('.divCloseModal'));
        el = de.nativeElement;
        expect(el.innerText).toContain('X');
    });
    it('should render to Campaign Name Id ', () => {
        de = fixture.debugElement.query(By.css('#campName'));
        el = de.nativeElement;
        expect(el.id).toContain('campName');
    });
    it('should render to pop up Id ', () => {
        de = fixture.debugElement.query(By.css('#blastViewId'));
        el = de.nativeElement;
        expect(el.id).toContain('blastViewId');
    });

});
