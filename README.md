IONIC SAMPLE APP FOR THE LENDDO DATA SDK
========================================

## Introduction

This is a sample app that demonstrates the use of the lenddo cordova plugin using the ionic framework. For details on how to incorporate this into your own app and other advanced options availble on the data SDK itself, please visit the cordova lenddo plugin guide [here](https://placeholderurl)

## Running the Sample App

First make sure you meet the requirements for running the android platform under cordova. This means you need to make sure you have the appropriate version of node and npm installed on your machine as well as android studio or the android SDK.

Please refer to the Cordova Documentation [here](https://cordova.apache.org/docs/en/latest/guide/platforms/android)

Before you run the app make sure that you have a partnerScript Id and secret from your Lenddo ready and then edit the src/app/app.component.ts file:

```typescript
...
   platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      Lenddo.setInstance('PARTNER_SCRIPT_ID', 'SECRET');
    });

...
```

change the vaklue of PARTNER_SCRIPT_ID and SECRET to the correct value.

After that, make sure an emulator is running or you have a device attached and then run:

```bash
ionic cordova run android
```

This should launch the app onto the attached device.

## Overview of the Sample App Features

The sample app contains sample code on how to start the data SDK (Scoring) and submit a form for verification.

The files you need to look at can be found at src/components/scoring-tab/scoring-tab.ts and src/components/verification-tab/verifiation-tab.ts