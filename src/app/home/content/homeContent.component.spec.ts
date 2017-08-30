import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HomeContentComponent } from './homeContent.component';
import { RouterLinkStubDirective } from '../../testing/router-stubs';
import { RouterOutletStubComponent } from '../../testing/router-stubs';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { RouterTestingModule } from '@angular/router/testing';
let comp: HomeContentComponent;
let fixture: ComponentFixture<HomeContentComponent>;
let debugEle: DebugElement;
let el: HTMLElement;
let locale: LocaleService;
let translation: TranslationService;
describe('HomeContentComponent & TestModule', () => {
  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, HttpModule, BrowserAnimationsModule,
        MaterialModule, TranslationModule.forRoot(), RouterTestingModule.withRoutes([])],
      declarations: [HomeContentComponent, RouterLinkStubDirective, RouterOutletStubComponent],
      providers: []
    }).createComponent(HomeContentComponent);
    comp = fixture.componentInstance;
  }));
  tests();
});
import { AppModule } from '../../app.module';
import { routing } from '../../app.routing';
describe('HomeContentComponent & AppModule', () => {
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
        fixture = TestBed.createComponent(HomeContentComponent);
        comp = fixture.componentInstance;
      });
  }));
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
      'processMonitor': 'Process',
      'resourcesTracker': 'Resources',
      'content360': 'Content',
      'patternView': 'Pattern'
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
    expect(links.length).toBe(4, 'should have 4 links');
    expect(links[0].linkParams).toBe('/home/processmonitor', '1st link should go to process monitor');
    expect(links[1].linkParams).toBe('/home/resourcestracker', '2nd link should go to resources tracker');
    expect(links[2].linkParams).toBe('/home/content360', '3rd link should go to content360');
    expect(links[3].linkParams).toBe('/home/patternview', '4th link should go to patternview');
  });
  it('can click Process Monitor link in template', () => {
    const linkDe = linkDes[0];
    const link = links[0];
    expect(link.navigatedTo).toBeNull('link should not have navigated yet');
    linkDe.triggerEventHandler('click', '/home/processmonitor');
    fixture.detectChanges();
    expect(link.navigatedTo).toBe('/home/processmonitor');
  });
  it('can click Resources Tracker link in template', () => {
    const linkDe = linkDes[1];
    const link = links[1];
    expect(link.navigatedTo).toBeNull('link should not have navigated yet');
    linkDe.triggerEventHandler('click', '/home/resourcestracker');
    fixture.detectChanges();
    expect(link.navigatedTo).toBe('/home/resourcestracker');
  });
  it('can click content360 link in template', () => {
    const linkDe = linkDes[2];
    const link = links[2];
    expect(link.navigatedTo).toBeNull('link should not have navigated yet');
    linkDe.triggerEventHandler('click', '/home/content360');
    fixture.detectChanges();
    expect(link.navigatedTo).toBe('/home/content360');
  });
  it('can click patternview link in template', () => {
    const linkDe = linkDes[3];
    const link = links[3];
    expect(link.navigatedTo).toBeNull('link should not have navigated yet');
    linkDe.triggerEventHandler('click', '/home/patternview');
    fixture.detectChanges();
    expect(link.navigatedTo).toBe('/home/patternview');
  });
  it('should render introImage inside Home Content', () => {
    fixture = TestBed.createComponent(HomeContentComponent);
    comp = fixture.componentInstance;
    debugEle = fixture.debugElement.query(By.css('#introImage'));
    el = debugEle.nativeElement;
    fixture.detectChanges();
    expect(el.id).toContain('introImage');
  });

  // it('should render processCard inside Home Content', () => {
  //   fixture = TestBed.createComponent(HomeContentComponent);
  //   comp = fixture.componentInstance;
  //   debugEle = fixture.debugElement.query(By.css('#processCard'));
  //   el = debugEle.nativeElement;
  //   fixture.detectChanges();
  //   expect(el.id).toContain('processCard');
  // });

  it('should render Lab scientist div inside Home Content', () => {
    fixture = TestBed.createComponent(HomeContentComponent);
    comp = fixture.componentInstance;
    debugEle = fixture.debugElement.query(By.css('#labScientist'));
    el = debugEle.nativeElement;
    fixture.detectChanges();
    expect(el.id).toContain('labScientist');
  });

  it('should render resourceCard inside Home Content', () => {
    fixture = TestBed.createComponent(HomeContentComponent);
    comp = fixture.componentInstance;
    debugEle = fixture.debugElement.query(By.css('#resourceCard'));
    el = debugEle.nativeElement;
    fixture.detectChanges();
    expect(el.id).toContain('resourceCard');
  });
  it('should render contentCard inside Home Content', () => {
    fixture = TestBed.createComponent(HomeContentComponent);
    comp = fixture.componentInstance;
    debugEle = fixture.debugElement.query(By.css('#contentCard'));
    el = debugEle.nativeElement;
    fixture.detectChanges();
    expect(el.id).toContain('contentCard');
  });
  it('should render patternCard inside Home Content', () => {
    fixture = TestBed.createComponent(HomeContentComponent);
    comp = fixture.componentInstance;
    debugEle = fixture.debugElement.query(By.css('#patternCard'));
    el = debugEle.nativeElement;
    fixture.detectChanges();
    expect(el.id).toContain('patternCard');
  });
}
