import { Component, ViewChild } from '@angular/core';
import { Lenddo, ClientOptions,  DataSendingCallback, InstallationInformation} from 'cordova-plugin-lenddo';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ScoringTabComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'scoring-tab',
  templateUrl: 'scoring-tab.html'
})
export class ScoringTabComponent implements DataSendingCallback {
  @ViewChild('uid') applicationIdField ;
  service: Lenddo

  applicationId: String = null;

  //data collection settings
  dataMode: String = "wifi_and_mobile";
  enableLog: Boolean = true;
  enableSMS: Boolean = true;
  enableCallLogs: Boolean = true;
  enableContacts: Boolean = true;
  enableCalendarEvents: Boolean = true;
  enableInstalledApps: Boolean = true;
  enableBrowserHistory: Boolean = true;
  enableLocationData: Boolean = true;
  enableBatterycharge: Boolean = true;
  enableGalleryMetaData: Boolean = true;
  enableSMSbody: Boolean = false;

  //Hashing
  enablePhoneNumberHashing: Boolean = false;
  enableContactsNameHashing: Boolean = false;
  enableContactsEmailHashing: Boolean = false;
  enableCalendarOrganizerHashing: Boolean = false;
  enableCalendarDisplayNameHashing: Boolean = false;
  enableCalendarEmailHashing: Boolean = false;
  enableCustomMPermission: Boolean = false;
  apiGatewayUrl: String = "https://gateway.partner-service.link";

  hasStatistics: Boolean = false;
  disableStartButton: Boolean = false;
  stopButtonEnabled: Boolean = false;

  currentApplicationId: String;
  currentInstallationId: String;
  currentServiceToken: String;
  currentDeviceId : String;
  uploadMode : String;
  dataSendingCallback : String;

  constructor(plt: Platform, private toastCtrl: ToastController) {
    var self = this;
    this.service = Lenddo.getInstance();

    plt.ready().then((value) => {
      if (value === "cordova") {
        return self.service.hasStatistics();
      }

      return Promise.reject("not cordova");
    }).then((value) => {
      if (value) {
        self.hasStatistics = value;
        self.populateInfo(value);
      }
    }).catch((reason) => {
      console.log(reason);
    });
  }

  private populateInfo(value: Boolean) {
    var self = this;
    if (value) {
      this.service.installInformation().then(function (info: InstallationInformation) {
        self.currentApplicationId = info.applicationId;
        self.currentInstallationId = info.installationId;
        self.currentServiceToken = info.serviceToken;
        self.currentDeviceId = info.deviceId;

        if (self.dataMode === "wifi_only") {
          self.uploadMode = "Wifi Only"
        } else {
          self.uploadMode = "Wifi + Mobile"
        }
        self.dataSendingCallback = "Success";
      });
    }
  }

  startLenddo() {
    var self = this;
    if (self.applicationId !== null && self.applicationId !== "") {
      let toast = self.toastCtrl.create({message: 'Data SDK Collection Starting ...', showCloseButton: true});
      toast.present();
      self.disableStartButton = true;
      self.stopButtonEnabled = true;
      
      self.service.setDataSendingCompleteCallback(self); //register global error handlers for data sending

      self.service.setup(this.setupOptions()).then(()=> {
        self.hasStatistics = true;
        self.dataSendingCallback = "process currently running";
        return this.service.start(self.applicationId).then((param) => {
            toast.dismiss();
            self.toastCtrl.create({ message: "Data SDK successfully started", duration: 2000, showCloseButton: true}).present();
            return this.service.hasStatistics();
          }).then((value) => {
            self.hasStatistics = value;
            self.populateInfo(value)
          })
      }).catch((message) => { 
        toast.dismiss();
        self.dataSendingCallback = "Failed";
        self.toastCtrl.create({ message: "Error: " + message.message, showCloseButton: true }).present();
        self.disableStartButton = false
      });
    } else {
      this.applicationIdField.setFocus();
      self.toastCtrl.create({ message: "Error: Application ID field is empty", showCloseButton: true}).present();
    }
  }

  onDataSendingSuccess(result) {
    this.populateInfo(true);
  }

  onDataSendingError(result) {
    console.log("error: " + result);
  }

  clearLenddo() {
    this.service.clear();
    this.hasStatistics = false; this.populateInfo(false);
    this.stopButtonEnabled = false;
    this.disableStartButton = false;
    this.currentApplicationId = "";
    this.currentInstallationId = "";
    this.currentServiceToken = "";
    this.currentDeviceId = "";
    this.uploadMode = "";
    this.dataSendingCallback = "";
  }

  private setupOptions(): ClientOptions {
    let options = new ClientOptions;

    if (this.dataMode === 'wifi_and_mobile') {
      options.setWifiOnly(true);
    } else {
      options.setWifiOnly(false);
    }

    if (!this.enableCallLogs) {
      options.setDisableCallLogData(true);
    }

    if (!this.enableContacts) {
      options.setDisableContactData(true);
    }

    if (!this.enableCalendarEvents) {
      options.setDisableCalendarEventData(true);
    }

    if (!this.enableInstalledApps) {
      options.setDisableInstalledAppData(true);
    }

    if (!this.enableBrowserHistory) {
      options.setDisableBrowserHistoryData(true);
    }

    if (!this.enableLocationData) {
      options.setDisableLocationData(true);
    }

    if (!this.enableBatterycharge) {
      options.setDisableBatteryChargeData(true);
    }

    if (!this.enableGalleryMetaData) {
      options.setDisableGalleryMetaData(true);
    }

    if (!this.enableSMS) {
      options.setDisableSmsData(true);
    }

    if (!this.enableSMSbody) {
      options.setDisableSmsBody(true);
    }

    if (this.enablePhoneNumberHashing) {
      options.setEnablePhoneNumberHashing(true);
    }

    if (this.enableContactsNameHashing) {
      options.setEnableContactsNameHashing(true);
    }

    if (this.enableContactsEmailHashing) {
      options.setEnableContactsEmailHashing(true);
    }

    if (this.enableCalendarOrganizerHashing) {
      options.setEnableCalendarOrganizerHashing(true);
    }

    if (this.enableCalendarDisplayNameHashing) {
      options.setCalendarDisplayNameHashing(true);
    }

    if (this.enableCalendarEmailHashing) {
      options.setCalendarEmailHashing(true);
    }

    options.setEnableLogDisplay(this.enableLog);
    options.setApiGatewayUrl(this.apiGatewayUrl);
    return options;
  }
}
