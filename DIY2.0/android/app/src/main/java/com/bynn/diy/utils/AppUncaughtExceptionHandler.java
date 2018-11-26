package com.bynn.diy.utils;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.text.TextUtils;
import android.util.Log;

public class AppUncaughtExceptionHandler implements Thread.UncaughtExceptionHandler {

    private Context applicationContext;

    private AppUncaughtExceptionHandler() {}

    public static AppUncaughtExceptionHandler getInstance() {
        return AppUncaughtExceptionHandlerHolder.sAppUncaughtExceptionHandler;
    }

    public void init(Context context) {
        applicationContext = context.getApplicationContext();
        Thread.setDefaultUncaughtExceptionHandler(this);
    }

    @Override
    public void uncaughtException(Thread thread, Throwable throwable) {

        Log.e("---Crash---", throwable.getMessage());
        // 打印异常信息
        throwable.printStackTrace();
//        restart();
    }

    /**
     * 杀死进程
     * 重启App
     */
    private void restart() {
        // 杀死进程
        android.os.Process.killProcess(android.os.Process.myPid());
        System.exit(0);
        // 重启App
        Intent intent = applicationContext.getPackageManager().getLaunchIntentForPackage(applicationContext.getPackageName());
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        applicationContext.startActivity(intent);
    }

    /**
     * 获取异常信息
     * @param ex
     * @return
     */
    private String getCrashReport(Throwable ex) {
        PackageInfo packageInfo = null;
        try {
            packageInfo = applicationContext.getPackageManager().getPackageInfo(applicationContext.getPackageName(), 0);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }

        StringBuffer exceptionStr = new StringBuffer();
        if (packageInfo != null) {
            if (ex != null) {
                //app版本信息
                exceptionStr.append("App Version：" + packageInfo.versionName);
                exceptionStr.append("_" + packageInfo.versionCode + "\n");

                //手机系统信息
                exceptionStr.append("OS Version：" + Build.VERSION.RELEASE);
                exceptionStr.append("_");
                exceptionStr.append(Build.VERSION.SDK_INT + "\n");

                //手机制造商
                exceptionStr.append("Vendor: " + Build.MANUFACTURER+ "\n");

                //手机型号
                exceptionStr.append("Model: " + Build.MODEL+ "\n");

                String errorStr = ex.getLocalizedMessage();
                if (TextUtils.isEmpty(errorStr)) {
                    errorStr = ex.getMessage();
                }
                if (TextUtils.isEmpty(errorStr)) {
                    errorStr = ex.toString();
                }
                exceptionStr.append("Exception: " + errorStr + "\n");
                StackTraceElement[] elements = ex.getStackTrace();
                if (elements != null) {
                    for (int i = 0; i < elements.length; i++) {
                        exceptionStr.append(elements[i].toString() + "\n");
                    }
                }
            } else {
                exceptionStr.append("no exception. Throwable is null\n");
            }
            return exceptionStr.toString();
        } else {
            return "";
        }
    }

    private static class AppUncaughtExceptionHandlerHolder {
        private static final AppUncaughtExceptionHandler sAppUncaughtExceptionHandler = new AppUncaughtExceptionHandler();
    }
}
