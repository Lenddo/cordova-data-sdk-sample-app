import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ScoringTabComponent } from '../components/scoring-tab/scoring-tab';
import { VerificationTabComponent } from '../components/verification-tab/verification-tab';
import { OnboardingTabComponent } from '../components/onboarding-tab/onboarding-tab';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ScoringTabComponent,
    VerificationTabComponent,
    OnboardingTabComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ScoringTabComponent,
    VerificationTabComponent,
    OnboardingTabComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
