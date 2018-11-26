package com.bynn.diy.utils;

import android.annotation.SuppressLint;
import android.os.Environment;
import android.util.Log;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;


/**
 *  Log分类写入文件 *.ini
 *	注意需要加入权限
 *		<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>
 *		<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
 */

public class LogUtil {
	private static final long MAX_SIZE = 4 *1024 *1024; //文件上限大小
	private static final String LOCAL_PATH = Environment.getExternalStorageDirectory() + "/log/";
	private static final String ERROR = "error.txt";
	private static final String LOG = "log.txt";//普通日子
	private static final String MSG = "msg.txt";//报文信息
	private static final String KEY = "key.txt";
	private static final boolean IS_SHOW_LOGFILE = false;
	private static final boolean IS_SHOW_LOGCAT  = true;
	
	static {
		if(IS_SHOW_LOGFILE){
			//初始化文件
			File dir = new File(LOCAL_PATH);
			File error = new File(LOCAL_PATH + ERROR);
			File log = new File(LOCAL_PATH + LOG);
			File pkg = new File(LOCAL_PATH + MSG);
			File key = new File(LOCAL_PATH + KEY);

			//创建文件夹
			if (!dir.exists()) {
				dir.mkdirs();
			}
			//判断文件总大小是否超过MAX_SIZE
			long size = 0;
			if (error.exists()) {
				size += error.length(); 
			}
			if (log.exists()) {
				size += log.length(); 
			}
			if (pkg.exists()) {
				size += pkg.length(); 
			}
			if (key.exists()) {
				size += key.length(); 
			}
			
			//超过MAX_SIZE就删除所有文件
			if (size >= MAX_SIZE) {
				error.delete();
				log.delete();
				pkg.delete();
				key.delete();
			}
			//文件不存在就创建文件
			try {
				if (!error.exists()) {
					error.createNewFile();
				}
				if (!log.exists()) {
					log.createNewFile();
				}
				if (!pkg.exists()) {
					pkg.createNewFile();
				}
				if (!key.exists()) {
					key.createNewFile();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 写入错误信息
	 * @param tag 标志
	 * @param msg 日志内容
	 */
	public static synchronized void e(String tag, String msg) {
		if(IS_SHOW_LOGCAT){
			Log.e(tag, msg);
		}
		if(IS_SHOW_LOGFILE){
			writeLog(ERROR, tag,  msg);
		}
	}

	/**
	 * 写入正常打印信息
	 * @param tag 标志
	 * @param msg 日志内容
	 */
	public static synchronized void i(String tag, String msg) {
		if(IS_SHOW_LOGCAT){
			Log.i(tag, msg);
		}
		if(IS_SHOW_LOGFILE){
			writeLog(LOG, tag,  msg);
		}
	}
	
	/**
	 * 写入正常打印信息
	 * @param tag 标志
	 * @param msg 日志内容
	 */
	public static synchronized void v(String tag, String msg) {
		if(IS_SHOW_LOGCAT){
			Log.v(tag, msg);
		}
		if(IS_SHOW_LOGFILE){
			writeLog(LOG, tag,  msg);
		}
	}

	/**
	 * 写入报文信息
	 * @param tag 标志
	 * @param msg 日志内容
	 */
	public static synchronized void m(String tag, String msg) {
		if(IS_SHOW_LOGCAT){
			Log.i(tag, msg);
		}
		if(IS_SHOW_LOGFILE){
			writeLog(MSG, tag,  msg);
		}
	}

	/**
	 * 写入密钥信息
	 * @param tag 标志
	 * @param msg 日志内容
	 */
	public static synchronized void k(String tag, String msg) {
		if(IS_SHOW_LOGCAT){
			Log.i(tag, msg);
		}
		if(IS_SHOW_LOGFILE){
			writeLog(KEY, tag,  msg);
		}
	}
	
	/**
	 * 写log
	 * @param filePath
	 * @param tag
	 * @param msg
	 */
	private static void writeLog (String filePath, String tag, String msg) {
		if (filePath == null || "".equals(filePath)) {
			return;
		}
		if (tag == null || "".equals(tag)) {
			return;
		}
		if (msg == null || "".equals(msg)) {
			return;
		}
		
		File file = new File(LOCAL_PATH + filePath);
		FileWriter fw = null;
		try {
			fw = new FileWriter(file, true);
			String content = formateTime() + "\t" + tag + "\t" +msg + "\n";
			fw.append(content);
			fw.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (fw != null) {
					fw.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 创建log时间
	 * 
	 * @return time
	 */
	@SuppressLint("SimpleDateFormat")
	private static String formateTime () {
		String time = "";
		Date date = new Date();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		time = simpleDateFormat.format(date);
		
		return time;
	}

	/**
	 * 写log
	 * @param filePath
	 * @param tag
	 * @param msg
	 */
	public static void writeLog (String filePath, String msg) {
		if (filePath == null || "".equals(filePath)) {
			return;
		}
		if (msg == null || "".equals(msg)) {
			return;
		}
		File dir = new File(LOCAL_PATH);
		if(!dir.exists()){
			dir.mkdirs();
		}
		File file = new File(LOCAL_PATH + filePath);
		FileWriter fw = null;
		try {
			fw = new FileWriter(file, true);
			String content = msg + "\n";
			fw.append(content);
			fw.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (fw != null) {
					fw.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
}

