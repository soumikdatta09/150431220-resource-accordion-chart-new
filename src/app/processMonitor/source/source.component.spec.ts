import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule, MdDialogRef, MdDialogModule } from '@angular/material';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SourceComponent } from './source.component';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { MdTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { SourceService } from './source.service';

class MdDialogRefMock {
}

describe('Source Component ', () => {

    let comp: SourceComponent;
    let fixture: ComponentFixture<SourceComponent>;
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
                    template: `<div id="busy"><img src="../assets/images/loading-blue.gif" 
                                class="image" style="width: 30px;"/>{{message}}</div>`,
                    delay: 200,
                    minDuration: 600,
                    wrapperClass: 'my-class'
                })],
            declarations: [SourceComponent],
            providers: [
                { provide: MdDialogRef, useClass: MdDialogRefMock }, SourceService
            ]
        }).createComponent(SourceComponent);

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
            'unitOperation': 'Unit Operation',
            'parameter': 'Parameter',
            'unitOfMeasure': 'Unit of Measure',
            'processRangeLo': 'Process Range (LO)',
            'processRangeHi': 'Process Range (HI)',
            'normOpRangeLolo': 'Normal Operating Range (LOLO)',
            'normOpRangeHihi': 'Normal Operating Range (HIHI)',
            'absoluteValue': 'Absolute Value',
            'classification': 'Classification',
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
    it('should render to lot Name Id lot#', () => {
        de = fixture.debugElement.query(By.css('#lotsNameId1'));
        el = de.nativeElement;
        expect(el.id).toContain('lotsNameId1');
    });
    it('should render to lot Name Id ', () => {
        de = fixture.debugElement.query(By.css('#lotsNameId2'));
        el = de.nativeElement;
        expect(el.id).toContain('lotsNameId2');
    });

    it('should render div Class Name  ', () => {
        de = fixture.debugElement.query(By.css('.divCloseModal'));
        el = de.nativeElement;
        expect(el.className).toContain('divCloseModal');
    });

});
