import { ApplicationPartnerData, VerificationDataName, VerificationData, VerificationDataPhone, VerificationAddress } from "cordova-plugin-lenddo"
import { Component } from '@angular/core';
import { Lenddo, Provider, ClientOptions } from "cordova-plugin-lenddo";
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'verification-tab',
  templateUrl: 'verification-tab.html'
})
export class VerificationTabComponent {
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
  provider: Provider;
  providerAccessToken: String;
  providerId: String;
  tokenExpiration: Number
  extraData: String;
  service: Lenddo;

  constructor(private toastCtrl: ToastController) {
    this.service = Lenddo.getInstance();
  }

  sendPartnerApplicationData() {
    var self = this;
    var applicationPartnerData = new ApplicationPartnerData();
    applicationPartnerData.application = new ApplicationPartnerData;
    applicationPartnerData.reference_number = this.referenceNumber;

    applicationPartnerData.verification_data = new VerificationData;

    applicationPartnerData.verification_data.name = new VerificationDataName;
    applicationPartnerData.verification_data.name.first = self.firstName;
    applicationPartnerData.verification_data.name.middle = self.middleName;
    applicationPartnerData.verification_data.name.last = self.lastName;

    applicationPartnerData.verification_data.phone = new VerificationDataPhone;
    applicationPartnerData.verification_data.phone.home = self.homePhone;
    applicationPartnerData.verification_data.phone.mobile = self.mobilePhone;

    applicationPartnerData.verification_data.mothers_maiden_name = new VerificationDataName;
    applicationPartnerData.verification_data.mothers_maiden_name.first = self.motherFirstName;
    applicationPartnerData.verification_data.mothers_maiden_name.middle = self.motherMiddleName;
    applicationPartnerData.verification_data.mothers_maiden_name.last = self.motherLastName;
    if (self.dateOfBirth !== null) {
      applicationPartnerData.verification_data.date_of_birth = self.dateOfBirth.toDateString();
    }

    applicationPartnerData.verification_data.university = self.university;
    applicationPartnerData.verification_data.employer = self.employer;

    applicationPartnerData.verification_data.address = new VerificationAddress;
    applicationPartnerData.verification_data.address.line_1 = self.line1;
    applicationPartnerData.verification_data.address.line_2 = self.line2;
    applicationPartnerData.verification_data.address.city = self.city;
    applicationPartnerData.verification_data.address.administrative_division = self.administrativeDivision;
    applicationPartnerData.verification_data.address.postal_code = self.postcalCode;
    applicationPartnerData.verification_data.address.latitude = self.latitude;
    applicationPartnerData.verification_data.address.longitude = self.longitude;

    this.service.setupDataIfNeeded(new ClientOptions).then(()=>{
      return this.service.submitApplicationData(applicationPartnerData)
    }).then(function (status) {
      self.toastCtrl.create({ message: "Application Sent"}).present();
    }).catch(function (error) {
      let toast = self.toastCtrl.create({ message: "error: " + error.message, showCloseButton: true });
      toast.present();
    });
  }

  sendPartnerToken() {
    let self = this;
    this.service.submitProviderToken(this.provider,
      this.providerAccessToken,
      this.providerId,
      this.tokenExpiration,
      this.extraData).then(function (status) {
        self.toastCtrl.create({ message: "success: " + status }).present();
      }).catch((error) => {
        self.toastCtrl.create({ message: "error: " + error.message, showCloseButton: true }).present(); })
  }
}
