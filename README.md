IONIC SAMPLE APP FOR THE LENDDO DATA SDK
========================================

## Introduction

This is a sample app that demonstrates the use of the cordova-plugin-lenddo using the ionic framework. For details on how to incorporate this into your own app and other advanced options availble on the data SDK itself, please visit the cordova-plugin-lenddo guide [here](https://github.com/Lenddo/cordova-data-sdk)

## Running the Sample App

First make sure you meet the requirements for running the android platform under cordova. This means you need to make sure you have the appropriate version of node and npm installed on your machine as well as android studio or the android SDK.

Please refer to the Cordova Documentation [here](https://cordova.apache.org/docs/en/latest/guide/platforms/android)

Before you run the app make sure that you have a Partner Script Id and API Secret from your Lenddo representative and then edit the config.xml, place your Partner Script Id and API Secret into the meta-data tag values as shown below:

```xml

<widget id="io.ionic.starter" ... >
  ...
  <platform name="android">
      ...
      
      <custom-config-file parent="./application" target="AndroidManifest.xml">
        <meta-data android:name="partnerScriptId" android:value="PARTNER_SCRIPT_ID" />
        <meta-data android:name="partnerApiSecret" android:value="API_SECRET" />
      </custom-config-file>
  </platform>
  ...
  <plugin name="cordova-custom-config" spec="^5.0.2" />
</widget>
```

change the value of PARTNER_SCRIPT_ID and SECRET to the correct value.

After that, make sure an emulator is running or you have a device attached and then run:

```bash
ionic cordova run android
```

This should launch the app onto the attached device.

## Overview of the Sample App Features

The sample app contains sample code on how to start the Lenddo Data SDK (Scoring), how to submit a form for verification and how to start the Lenddo Onboarding SDK.

The files you need to look at can be found at src/components/scoring-tab/scoring-tab.ts, src/components/verification-tab/verifiation-tab.ts and src/components/onboarding-tab/onboarding-tab.ts. For more info please visit the guide of the cordova-plugin-lenddo guide [here](https://github.com/Lenddo/cordova-data-sdk).

