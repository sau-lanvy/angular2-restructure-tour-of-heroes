import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService }               from './shared/services/in-memory-data.service';

// Import the components
import { AppComponent }  from './app.component';
import { HeroDetailComponent } from './heroes/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent }  from './heroes/hero-search.component';

// Import the services that should be able to access from anywhere in the app
import { HeroService } from './shared/services/hero.service';
import { routing } from './app.routing';

@NgModule({
    imports:
    [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule
    ],
    declarations:
    [
        AppComponent,
        HeroDetailComponent,
        HeroesComponent,
        DashboardComponent,
        HeroSearchComponent
    ],
    providers:
    [
        HeroService,
        { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
        { provide: SEED_DATA, useClass: InMemoryDataService }     // in-mem server data
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
