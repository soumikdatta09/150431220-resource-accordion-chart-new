import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home.component';
import { RouterLinkStubDirective } from '../testing/router-stubs';
import { RouterOutletStubComponent } from '../testing/router-stubs';
import { LoginService } from '../login/login.service';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { RouterTestingModule } from '@angular/router/testing';
let comp: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;
let debugEle: DebugElement;
let el: HTMLElement;
let locale: LocaleService;
let translation: TranslationService;
let originalTimeout: any;
describe('HomeComponent & TestModule', () => {
    beforeEach(async(() => {
        fixture = TestBed.configureTestingModule({
            imports: [BrowserModule, FormsModule, HttpModule, BrowserAnimationsModule,
                MaterialModule, TranslationModule.forRoot(), RouterTestingModule.withRoutes([])],
            declarations: [HomeComponent, RouterLinkStubDirective, RouterOutletStubComponent],
            providers: [LoginService]
        }).createComponent(HomeComponent);
        comp = fixture.componentInstance;
    }));
   beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    tests();
});
import { AppModule } from '../app.module';
import { routing } from '../app.routing';
describe('HomeComponent & AppModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule, MaterialModule, RouterTestingModule]
        })
            .overrideModule(AppModule, {
                remove: {
                    imports: [routing]
                },
                add: {
                    declarations: [RouterLinkStubDirective, RouterOutletStubComponent]
                }
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(HomeComponent);
                comp = fixture.componentInstance;
            });
    }));
        beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    tests();
});
function tests() {
    let links: RouterLinkStubDirective[];
    let linkDes: DebugElement[];
    beforeEach(() => {
        fixture.detectChanges();
        linkDes = fixture.debugElement
            .queryAll(By.directive(RouterLinkStubDirective));
        links = linkDes
            .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    });
    beforeEach((done) => {
        locale = TestBed.get(LocaleService);
        translation = TestBed.get(TranslationService);
        locale.addConfiguration()
            .disableStorage()
            .addLanguages(['en'])
            .defineLanguage('en');
        const translationEN: any = {
            'home': 'Home',
            'processMonitor': 'Process Monitor',
            'resourcesTracker': 'Resources Tracker',
            'content360': 'Content 360',
            // 'criticalPaths': 'Critical Paths',
            'patternView': 'Pattern View',
            'appTitle': 'ALabs',
            'logout': 'Logout',
            'about': 'About',
            'contact': 'Contact'
        };
        translation.addConfiguration()
            .addTranslation('en', translationEN);
        translation.init().then(() => done());
    });
    beforeEach(() => {
        locale.setCurrentLanguage('en');
    });
    it('can instantiate it', () => {
        expect(comp).not.toBeNull();
    });
    it('can get RouterLinks from template', () => {
        expect(links.length).toBe(9, 'should have 9 links');
        expect(links[0].linkParams).toBe('/login', '1st link should go to login Page');
        expect(links[1].linkParams).toBe('/home/index', '2nd link should go to index');
        expect(links[2].linkParams).toBe('/home/processmonitor', '3rd link should go to process monitor');
        expect(links[3].linkParams).toBe('/home/resourcestracker', '4th link should go to resources tracker');
        expect(links[4].linkParams).toBe('/home/content360', '5th link should go to content360');
        // expect(links[3].linkParams).toBe('/home/criticalpaths', '4th link should go to criticalpaths');
        expect(links[5].linkParams).toBe('/home/patternview', '6th link should go to pattern view');
        expect(links[6].linkParams).toBe('/home/index', '1st link should go to index');
        expect(links[7].linkParams).toBe('', ' 8th link should go to about Page');
        expect(links[8].linkParams).toBe('', ' 9th link should go to contact Page');
    });
    it('can click logout link in template', () => {
        const linkDe = linkDes[0];
        const link = links[0];
        expect(link.navigatedTo).toBeNull('link should not have navigated yet');
        linkDe.triggerEventHandler('click', '/login');
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('/login');
    });
    it('can click index link in template', () => {
        const linkDe = linkDes[1];
        const link = links[1];
        expect(link.navigatedTo).toBeNull('link should not have navigated yet');
        linkDe.triggerEventHandler('click', '/home/index');
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('/home/index');
    });
    it('can click Process Monitor link in template', () => {
        const linkDe = linkDes[2];
        const link = links[2];
        expect(link.navigatedTo).toBeNull('link should not have navigated yet');
        linkDe.triggerEventHandler('click', '/home/processmonitor');
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('/home/processmonitor');
    });
    it('can click Resources Tracker link in template', () => {
        const linkDe = linkDes[3];
        const link = links[3];
        expect(link.navigatedTo).toBeNull('link should not have navigated yet');
        linkDe.triggerEventHandler('click', '/home/resourcestracker');
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('/home/resourcestracker');
    });
    it('can click content360 link in template', () => {
        const linkDe = linkDes[4];
        const link = links[4];
        expect(link.navigatedTo).toBeNull('link should not have navigated yet');
        linkDe.triggerEventHandler('click', '/home/content360');
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('/home/content360');
    });
    it('can click patternview link in template', () => {
        const linkDe = linkDes[5];
        const link = links[5];
        expect(link.navigatedTo).toBeNull('link should not have navigated yet');
        linkDe.triggerEventHandler('click', '/home/patternview');
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('/home/patternview');
    });
    it('can click home link in footer', () => {
        const linkDe = linkDes[6];
        const link = links[6];
        expect(link.navigatedTo).toBeNull('link should not have navigated yet');
        linkDe.triggerEventHandler('click', '/home/index');
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('/home/index');
    });
    it('can click about link in footer', () => {
        const linkDe = linkDes[7];
        const link = links[7];
        expect(link.navigatedTo).toBeNull('link should not have navigated yet');
        linkDe.triggerEventHandler('click', '');
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('');
    });
    it('can click contact link in footer', () => {
        const linkDe = linkDes[8];
        const link = links[8];
        expect(link.navigatedTo).toBeNull('link should not have navigated yet');
        linkDe.triggerEventHandler('click', '');
        fixture.detectChanges();
        expect(link.navigatedTo).toBe('');
    });
    // it('should display Process text in the menu bar', () => {
    //     fixture = TestBed.createComponent(HomeComponent);
    //     comp = fixture.componentInstance;
    //     debugEle = fixture.debugElement.query(By.css('#processMonitor'));
    //     el = debugEle.nativeElement;
    //     fixture.detectChanges();
    //     expect(el.textContent).toContain('Process');
    // });
    it('should display Resources text in the menu bar', () => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
        debugEle = fixture.debugElement.query(By.css('#resourcesTracker'));
        el = debugEle.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('Resources');
    });
    it('should display Content text in the menu bar', () => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
        debugEle = fixture.debugElement.query(By.css('#content360'));
        el = debugEle.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('Content');
    });
    it('should display Pattern text in the menu bar', () => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
        debugEle = fixture.debugElement.query(By.css('#PatternView'));
        el = debugEle.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('Pattern');
    });
    it('should display the title logout ', () => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
        debugEle = fixture.debugElement.query(By.css('#Logout'));
        el = debugEle.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('Logout');
    });
    it('should display Home text', () => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
        debugEle = fixture.debugElement.query(By.css('#footerHome'));
        el = debugEle.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('Home');
    });
    it('should display About text', () => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
        debugEle = fixture.debugElement.query(By.css('#footerAbout'));
        el = debugEle.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('About');
    });
    it('should display Contact text', () => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
        debugEle = fixture.debugElement.query(By.css('#footerContact'));
        el = debugEle.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('Contact');
    });
}
