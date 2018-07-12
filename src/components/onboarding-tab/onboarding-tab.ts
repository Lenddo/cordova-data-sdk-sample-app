import { ApplicationPartnerData, VerificationDataName, VerificationEmploymentPeriod, VerificationData, VerificationDataPhone, VerificationAddress, FormDataCollector, GovernmentId, CancelDialogText, OnboardingHelper } from "cordova-plugin-lenddo"
import { Component } from '@angular/core';
import { Lenddo, OnboardingCallback, ClientOptions } from "cordova-plugin-lenddo";
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
  employmentStartDate: Date = null;
  employmentEndDate: Date = null;
  university: String;
  mobilePhone: String;
  homePhone: String;
  administrativeDivision: String;
  country: String;
  countryCode: String;
  postalCode: String;
  latitude: Number;
  longitude: Number;
  service: Lenddo;

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
      verification_data.date_of_birth = new Date(self.dateOfBirth).toLocaleDateString('en-US');
    }

    verification_data.email = self.email;
    verification_data.university = self.university;
    verification_data.employer = self.employer;
    verification_data.employment_period = new VerificationEmploymentPeriod;
    if (self.employmentStartDate !== null) {
      verification_data.employment_period.start_date = new Date(self.employmentStartDate).toISOString();
    }
    if (self.employmentEndDate !== null) {
      verification_data.employment_period.end_date = new Date(self.employmentEndDate).toISOString();
    }

    verification_data.address = new VerificationAddress;
    verification_data.address.line_1 = self.line1;
    verification_data.address.line_2 = self.line2;
    verification_data.address.city = self.city;
    verification_data.address.administrative_division = self.administrativeDivision;
    verification_data.address.country_code = self.countryCode;
    verification_data.address.postal_code = self.postalCode;
    verification_data.address.latitude = self.latitude;
    verification_data.address.longitude = self.longitude;

    // To add government ids
    verification_data.government_ids = this.generateGovernmentIds();

    var formDataCollector = new FormDataCollector();
    formDataCollector.applicationId = this.referenceNumber;
    formDataCollector.verification_data = verification_data;

    var cancelDialogText = new CancelDialogText();
    cancelDialogText.title = "Ayaw mo na?";
    cancelDialogText.message = "Cgurado ka na bang aalis ka?";
    cancelDialogText.okButton = "Oo";
    cancelDialogText.cancelButton = "Hindi";

    var helper = new OnboardingHelper();
    helper.formDataCollector = formDataCollector;
    helper.cancelDialogText = cancelDialogText;

    self.service.setOnboardingCompleteCallback(self); //register global error handlers for onboarding

    var clientOptions = new ClientOptions();
    clientOptions.setEnableLogDisplay(true);

    this.service.setupDataIfNeeded(clientOptions).then(()=>{
      console.log("startOnboarding");
      self.disableStartOnboardingButton = true;
      return self.service.startOnboarding(helper);
    }).then(function (status) {
      console.log("setupDataIfNeeded successful");
    }).catch(function (error) {
      console.log("setupDataIfNeeded failed");
    });
  }

  onOnboardingSuccess(result) {
    console.log("success: " + JSON.stringify(result));
    if (result.code == 200 || result.code == 300) {
      this.disableStartOnboardingButton = false;
      let toast = this.toastCtrl.create({message: 'Application Sent', showCloseButton: true});
      toast.present();
    }
  }

  onOnboardingError(error) {
     console.log("error: " + JSON.stringify(error));
     this.disableStartOnboardingButton = false;
  }

  private generateGovernmentIds(): Array<GovernmentId> {
      let governmentIds = new Array<GovernmentId>();

      var governmentId1 = new GovernmentId();
      governmentId1.type = "Passport";
      governmentId1.value = "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";

      var governmentId2 = new GovernmentId();
      governmentId2.type = "Selfie";
      governmentId2.value = "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";

      governmentIds = [governmentId1, governmentId2];
      return governmentIds;
  }
}
