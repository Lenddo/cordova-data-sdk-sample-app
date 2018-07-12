IONIC SAMPLE APP FOR THE LENDDO DATA SDK
========================================

## Introduction

This is a sample app that demonstrates the use of the cordova-plugin-lenddo using the ionic framework. For details on how to incorporate this into your own app and other advanced options availble on the data SDK itself, please visit the cordova-plugin-lenddo guide [here](https://github.com/Lenddo/cordova-data-sdk)

## Running the Sample App

First make sure you meet the requirements for running the android platform under cordova. This means you need to make sure you have the appropriate version of node and npm installed on your machine as well as android studio or the android SDK.

Please refer to the Cordova Documentation [here](https://cordova.apache.org/docs/en/latest/guide/platforms/android)

***Setting up credentials***
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

***Add android platform into ionic project***

```bash
  ionic cordova platform add android
```

***Additional hook .sh file before_build.*** 
Make sure below script is executable.
```bash
  chmod +x scripts/overwriteMainActivity.sh
```

After making sure the the script is executable build the android project
```bash
  ionic cordova build android
```

***If you encounter the following error during build process***

```
* What went wrong:
Could not resolve all files for configuration ':cordova-plugin-lenddo:lenddosdk:debugCompileClasspath'.
> Could not find runtime.jar (android.arch.lifecycle:runtime:1.0.0).
  Searched in the following locations:
      https://jcenter.bintray.com/android/arch/lifecycle/runtime/1.0.0/runtime-1.0.0.jar

```

Please make sure to add **google()** as primary repositories and place it above other repositories in **/platform/android/build.gradle** file

```gradle
    buildscript {
        repositories {
            google() // place google() above other repository
            jcenter()
            maven {
                url "https://maven.google.com"
            }
        }
        dependencies {
            // NOTE: Do not place your application dependencies here; they belong
            // in the individual module build.gradle files
            classpath 'com.android.tools.build:gradle:3.0.1'
        }
    }

    allprojects {
        repositories {
            google() // place google() above other repository
            jcenter()
            maven {
                url "https://maven.google.com"
            }
        }
    }

```

***Running the Sample-App***
After everything is settle, make sure an emulator is running or you have a device attached and then run:

```bash
  ionic cordova run android
```

This should launch the app onto the attached device.

## Overview of the Sample App Features

The sample app contains sample code on how to start the Lenddo Data SDK (Scoring), how to submit a form for verification and how to start the Lenddo Onboarding SDK.

The files you need to look at can be found at src/components/scoring-tab/scoring-tab.ts, src/components/verification-tab/verifiation-tab.ts and src/components/onboarding-tab/onboarding-tab.ts. For more info please visit the guide of the cordova-plugin-lenddo guide [here](https://github.com/Lenddo/cordova-data-sdk).

