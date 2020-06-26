import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {AppRouterModule} from './app.router.module';
import {AppComponent} from './app.component';
import {TranslateModule} from '@ngx-translate/core';
import {SMS} from '@ionic-native/sms/ngx';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TabsPage} from './screens/tabs/tabs.page';
import {TrackersPage} from './screens/tabs/trackers/trackers.page';
import {TrackersAddPage} from './screens/tabs/trackers/add/trackers-add.page';
import {MapPage} from './screens/tabs/map/map.page';
import {SettingsPage} from './screens/tabs/settings/settings.page';
import {FormObjectComponent} from './components/form-object/form-object.component';
import {TrackersViewPage} from './screens/tabs/trackers/view/trackers-view.page';
import {Contacts} from '@ionic-native/contacts/ngx';
import {TrackersHistoryPage} from './screens/tabs/trackers/history/trackers-history.page';
import {AppHeaderComponent} from './components/app-header/app-header.component';
import {FormatDatePipe} from './screens/screen';
import {GpsMapComponent} from './components/gps-map/gps-map.component';
import {File} from '@ionic-native/file/ngx';
import {Chooser} from '@ionic-native/chooser/ngx';

@NgModule({
    declarations: [
        // Pages
        AppComponent,
        TabsPage,
        TrackersPage,
        TrackersAddPage,
        TrackersViewPage,
        TrackersHistoryPage,
        MapPage,
        SettingsPage,
        // Components
        AppHeaderComponent,
        FormObjectComponent,
        FormatDatePipe,
        GpsMapComponent
    ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot(),
    IonicModule.forRoot({
      mode: 'md',
      animated: true,
      rippleEffect: true,
      hardwareBackButton: true,
      statusTap: false,
      swipeBackEnabled: false
    }),
    AppRouterModule,
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule
  ],
  providers: [
    SMS,
    Chooser,
    Contacts,
    Geolocation,
    AndroidPermissions,
    SplashScreen,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
