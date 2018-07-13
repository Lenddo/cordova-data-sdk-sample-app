import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScoringTabComponent } from "../../components/scoring-tab/scoring-tab";
import { VerificationTabComponent } from '../../components/verification-tab/verification-tab';
import { OnboardingTabComponent } from '../../components/onboarding-tab/onboarding-tab';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1: any;
  tab2: any;
  tab3: any;

  constructor(public navCtrl: NavController) {
    this.tab1 = ScoringTabComponent;
    this.tab2 = VerificationTabComponent;
    this.tab3 = OnboardingTabComponent;
   }
}
