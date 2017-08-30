import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ProcessMonitorComponent } from './processMonitor/process-monitor.component';
import { ResourcesTrackerComponent } from './resourcesTracker/resources-tracker.component';
import { ContentComponent } from './content360/content.component';
import { CriticalPathsComponent } from './criticalPaths/critical-paths.component';
import { PatternComponent } from './pattern/pattern.component';
import { HomeContentComponent } from './home/content/homeContent.component';
import { CampaignComponent } from './processMonitor/campaign/campaign.component';
import { LotsComponent } from './processMonitor/lots/lots.component';
import { ManufacturingUnitComponent } from './processMonitor/manufacturingUnit/manufacturing-unit.component';
import { ProjectCampaignComponent } from './processMonitor/project/campaign/project-campaign.component';
import { MolecularFormatComponent } from './processMonitor/molecularFormat/molecularFormat.component';
import { UtilizationComponent } from './resourcesTracker/utilization/utilization.component';
import { DownTimeComponent } from './resourcesTracker/downtime/downtime.component';
import { CalibrationComponent } from './resourcesTracker/calibration/calibration.component';
import { InstrumentTypesComponent } from './resourcesTracker/utilization/instrument-types/instrument-types.component';
import { ContentProviderComponent } from './content360/contentProvider/content-provider.component';
import { ProviderComponent } from './content360/providerDetail/provider.component';
const appRoutes: Routes = [
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: 'index', component: HomeContentComponent },
            // { path: 'processmonitor', component: ProcessMonitorComponent },
            {
                path: 'resourcestracker', component: ResourcesTrackerComponent,
                children: [
                    { path: '', redirectTo: 'utilization', pathMatch: 'full' },
                    { path: 'utilization', component: UtilizationComponent, pathMatch: 'full' },
                    { path: 'utilization/instrument-types/:mfsId/:mfsName', component: InstrumentTypesComponent },
                    { path: 'downtime', component: DownTimeComponent, pathMatch: 'full' },
                    { path: 'calibration', component: CalibrationComponent, pathMatch: 'full' },
                ]
            },
            {
                path: 'content360', component: ContentComponent
            },
            { path: 'content360/contentprovider', component: ContentProviderComponent, pathMatch: 'full' },
            { path: 'content360/contentprovider/:searchText', component: ContentProviderComponent },
            { path: 'content360/providerdetails/:searchText', component: ProviderComponent },
            { path: 'criticalpaths', component: CriticalPathsComponent },
            { path: 'patternview', component: PatternComponent },
            {
                path: 'processmonitor', component: ProcessMonitorComponent,
                children: [
                    { path: '', redirectTo: 'site/manufacturingunits', pathMatch: 'full' },
                    { path: 'site', redirectTo: 'site/manufacturingunits', pathMatch: 'full' },
                    { path: 'site/manufacturingunits', component: ManufacturingUnitComponent },
                    { path: 'site/campaign/:id/:mfsName', component: CampaignComponent },
                    { path: 'site/lots/:id/:campaignName/:processAreaName/:mfsName/:mfsId', component: LotsComponent },
                    { path: 'project', redirectTo: 'project/campaigns', pathMatch: 'full' },
                    { path: 'project/campaigns', component: ProjectCampaignComponent, pathMatch: 'full' },
                    { path: 'molecularformat', component: MolecularFormatComponent, pathMatch: 'full' },
                ]
            },
            { path: '', redirectTo: 'index', pathMatch: 'full' }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'login/:sessionExpired', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes);
