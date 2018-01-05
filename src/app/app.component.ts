import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Lenddo } from 'cordova-plugin-lenddo';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      Lenddo.setInstance('55e01d35aa96122b9a8dd197', 'xskK9oro19LZ1aHawIa9JDY8cNxaGnMae1IV4ttrPzT3IJN7hpzF0tNAIqTEWB/OHSileJbsmdK4vNF/X/1FEQ==');
    });
  }
}

