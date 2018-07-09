import { ApplicationPartnerData, VerificationDataName, VerificationData, VerificationDataPhone, VerificationAddress, FormDataCollector, GovernmentId } from "cordova-plugin-lenddo"
import { Component } from '@angular/core';
import { Lenddo, OnboardingCallback } from "cordova-plugin-lenddo";
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'onboarding-tab',
  templateUrl: 'onboarding-tab.html'
})
export class OnboardingTabComponent implements OnboardingCallback {
  referenceNumber: String;
  applicationJsonPayload: String;
  firstName: String;
  middleName: String;
  lastName: String;
  motherFirstName: String;
  motherMiddleName: String;
  motherLastName: String;
  dateOfBirth: Date = null;
  line1: String;
  line2: String;
  city: String;
  email: String;
  employer: String;
  university: String;
  mobilePhone: String;
  homePhone: String;
  administrativeDivision: String;
  country: String;
  postcalCode: String;
  latitude: Number;
  longitude: Number;
  service: Lenddo;
  governmentIds: Array<GovernmentId>;

  disableStartOnboardingButton: Boolean = false;

  constructor(private toastCtrl: ToastController) {
    this.service = Lenddo.getInstance();
    console.log("OnboardingTabComponent");
  }

  startLenddoOnboarding() {
    var self = this;
    var applicationPartnerData = new ApplicationPartnerData();
    applicationPartnerData.application = new ApplicationPartnerData;
    applicationPartnerData.reference_number = this.referenceNumber;

    var verification_data = new VerificationData;

    verification_data.name = new VerificationDataName;
    verification_data.name.first = self.firstName;
    verification_data.name.middle = self.middleName;
    verification_data.name.last = self.lastName;

    verification_data.phone = new VerificationDataPhone;
    verification_data.phone.home = self.homePhone;
    verification_data.phone.mobile = self.mobilePhone;

    verification_data.mothers_maiden_name = new VerificationDataName;
    verification_data.mothers_maiden_name.first = self.motherFirstName;
    verification_data.mothers_maiden_name.middle = self.motherMiddleName;
    verification_data.mothers_maiden_name.last = self.motherLastName;
    if (self.dateOfBirth !== null) {
      verification_data.date_of_birth = self.dateOfBirth.toDateString();
    }

    verification_data.university = self.university;
    verification_data.employer = self.employer;

    verification_data.address = new VerificationAddress;
    verification_data.address.line_1 = self.line1;
    verification_data.address.line_2 = self.line2;
    verification_data.address.city = self.city;
    verification_data.address.administrative_division = self.administrativeDivision;
    verification_data.address.postal_code = self.postcalCode;
    verification_data.address.latitude = self.latitude;
    verification_data.address.longitude = self.longitude;

    var governmentId1 = new GovernmentId();
    governmentId1.type = "Passport";
    governmentId1.value = "adfjh183xf891lcdjfd3d92kjs971km38s";

    var governmentId2 = new GovernmentId();
    governmentId2.type = "Selfie";
    governmentId2.value = "adfjh183xf891lcdjfd3d92kjs971km38s";

    this.governmentIds = [governmentId1, governmentId2];
    verification_data.government_ids = this.governmentIds;

    var formDataCollector = new FormDataCollector();
    formDataCollector.applicationId = this.referenceNumber;
    formDataCollector.partnerScriptId = '5671d773aa961243c55ee6ad';
    formDataCollector.verification_data = verification_data;

    self.service.setOnboardingCompleteCallback(self); //register global error handlers for onboarding
    self.service.startOnboarding(formDataCollector);
    self.disableStartOnboardingButton = true;
    console.log("startOnboarding");
    self.toastCtrl.create({ message: "Application Sent"}).present();
  }

  onOnboardingSuccess(result) {
    console.log("success: " + JSON.stringify(result));
    if (result.code == 200) {
      this.disableStartOnboardingButton = false;
    }
  }

  onOnboardingError(error) {
    console.log("error: " + JSON.stringify(error));
      this.disableStartOnboardingButton = false;
  }
}
