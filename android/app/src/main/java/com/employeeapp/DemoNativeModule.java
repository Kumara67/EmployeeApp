package com.employeeapp;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DemoNativeModule extends ReactContextBaseJavaModule {
    DemoNativeModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "DemoNativeModule";
    }

    @ReactMethod
    public void calculateResult(int a, int b, Callback successCallback, Callback errorCallback) {
        try {
            int result = a * b;
            successCallback.invoke(result);
        } catch (Exception e) {
            errorCallback.invoke("Failed from  Java");
        }

        //getCurrentActivity().finish();

    }
}
