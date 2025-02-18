import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from '@service/appconfigservice';
import { AppMenuComponent } from './menu/app.menu.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';
import { JsonService } from '@service/jsonservice';
import { AutoCompleteModule } from 'primeng/autocomplete';

describe('AppComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [AppComponent, AppTopBarComponent, AppMenuComponent, RouterTestingModule, FormsModule, BrowserAnimationsModule, AutoCompleteModule, HttpClientModule],
            providers: [JsonService, AppConfigService]
        }).compileComponents();
    }));

    it('should create the app', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
