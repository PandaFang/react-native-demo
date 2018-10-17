package com.permissiondemo;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.provider.Settings;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MyIntentModule extends ReactContextBaseJavaModule {

    public MyIntentModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "IntentModule";
    }

    @ReactMethod
    public void goAppDetailSettingFromJS() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            try {
                Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                Uri uri = Uri.fromParts("package", currentActivity.getPackageName(), null);
                intent.setData(uri);
                currentActivity.startActivity(intent);
            } catch (Exception e) {
                throw new JSApplicationIllegalArgumentException("不能打开应用详情："+e.getMessage());
            }
        }

    }

}
