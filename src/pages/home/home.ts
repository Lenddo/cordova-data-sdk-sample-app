import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScoringTabComponent } from "../../components/scoring-tab/scoring-tab";
import { VerificationTabComponent } from '../../components/verification-tab/verification-tab';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1: any;
  tab2: any;

  constructor(public navCtrl: NavController) {
    this.tab1 = ScoringTabComponent;
    this.tab2 = VerificationTabComponent;
   }
}
