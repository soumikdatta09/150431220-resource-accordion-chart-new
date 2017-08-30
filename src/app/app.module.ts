import { NgModule, APP_INITIALIZER, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslationModule, LocaleService, TranslationService } from 'angular-l10n';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { MdCardModule, MdDialogModule, MdCheckboxModule } from '@angular/material';
import { AuthGuard } from './guards/auth.guard';
import { ContentComponent } from './content360/content.component';
import { CriticalPathsComponent } from './criticalPaths/critical-paths.component';
import { ProcessMonitorComponent } from './processMonitor/process-monitor.component';
import { CampaignComponent } from './processMonitor/campaign/campaign.component';
import { HomeComponent } from './home/home.component';
import { ResourcesTrackerComponent } from './resourcesTracker/resources-tracker.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { PatternComponent } from './pattern/pattern.component';
import { RouterLinkStubDirective } from './testing/router-stubs';
import { RouterOutletStubComponent } from './testing/router-stubs';
import { CampaignService } from './processMonitor/campaign/campaign.service';
import { HomeContentComponent } from './home/content/homeContent.component';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { LotsComponent } from './processMonitor/lots/lots.component';
import { LotsService } from './processMonitor/lots/lots.service';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { ProjectCampaignComponent } from './processMonitor/project/campaign/project-campaign.component';
import { ProjectCampaignService } from './processMonitor/project/campaign/project-campaign.service';
import { MolecularFormatComponent } from './processMonitor/molecularFormat/molecularFormat.component';
import { ManufacturingUnitComponent } from './processMonitor/manufacturingUnit/manufacturing-unit.component';
import { ManufacturingUnitService } from './processMonitor/manufacturingUnit/manufacturing-unit.service';
import { SourceComponent } from './processMonitor/source/source.component';
import { SourceService } from './processMonitor/source/source.service';
import { UtilizationComponent } from './resourcesTracker/utilization/utilization.component';
import { DownTimeComponent } from './resourcesTracker/downtime/downtime.component';
import { CalibrationComponent } from './resourcesTracker/calibration/calibration.component';
import { BlastViewComponent } from './processMonitor/blastView/blast-view.component';
import { BlastViewService } from './processMonitor/blastView/blast-view.service';
import { MdTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { InstrumentTypesComponent } from './resourcesTracker/utilization/instrument-types/instrument-types.component';
import { InstrumentTypesService } from './resourcesTracker/utilization/instrument-types/instrument-types.service';
import { ContentProviderComponent } from './content360/contentProvider/content-provider.component';
import { ChartsModule } from 'ng2-charts';
import { ContentService } from './content360/content.service';
import { ContentProviderService } from './content360/contentProvider/content-provider.service';
import { ProviderService } from './content360/providerDetail/provider.service';
import { ProviderComponent } from './content360/providerDetail/provider.component';

@Injectable() export class LocalizationConfig {

    constructor(public locale: LocaleService, public translation: TranslationService) { }

    load(): Promise<void> {
        this.locale.addConfiguration()
            .addLanguages(['en', 'it'])
            .setCookieExpiration(30)
            .defineLanguage('en');

        this.translation.addConfiguration()
            .addProvider('./assets/locale-');

        return this.translation.init();
    }
}

// AoT compilation requires a reference to an exported function.
export function initLocalization(localizationConfig: LocalizationConfig): Function {
    return () => localizationConfig.load();
}

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, routing, ChartsModule,
        MaterialModule, MdTableModule, CdkTableModule,
        BrowserAnimationsModule, MdCardModule, MdDialogModule, MdCheckboxModule, TranslationModule.forRoot(),
        BusyModule.forRoot(<BusyConfig>{
            message: 'Loading...',
            backdrop: false,
            template: '<div id="busy"><img src="../assets/images/loading-blue.gif" class="image" style="width: 30px;"/>{{message}}</div>',
            delay: 200,
            minDuration: 600,
            wrapperClass: 'my-class'
        })
    ],
    declarations: [AppComponent, HomeContentComponent, LotsComponent, ContentComponent, CriticalPathsComponent,
        ProcessMonitorComponent, BlastViewComponent, CampaignComponent,
        HomeComponent, SourceComponent, ResourcesTrackerComponent, LoginComponent, PatternComponent, ManufacturingUnitComponent,
        RouterLinkStubDirective, RouterOutletStubComponent, ProjectCampaignComponent, MolecularFormatComponent, UtilizationComponent,
        DownTimeComponent, InstrumentTypesComponent, CalibrationComponent, ContentProviderComponent, ProviderComponent ],

    providers: [AuthGuard, LoginService, LotsService, LocalizationConfig, CampaignService, ManufacturingUnitService,
        SourceService, BlastViewService, InstrumentTypesService, ProjectCampaignService,
        ContentService, ContentProviderService, ProviderService,
        {
            provide: APP_INITIALIZER,
            useFactory: initLocalization,
            deps: [LocalizationConfig],
            multi: true
        }],
    entryComponents: [SourceComponent, BlastViewComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }
