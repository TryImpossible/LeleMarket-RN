# -*- coding: UTF-8 -*-
import os, sys, re;
# filePath1 = '/Users/barry/ReactNative/Temp/v1.5.6/ios/iber/Info.plist';

def updateAndroid(file_path, build_version, build_number):
    file = open(file_path, 'r');
    file_data = '';
    # 遍歷build.gradle文件，修改版本信息
    for line in file:
        if (re.search(r'\s*versionCode \d+', line)):
            temp = re.split(r'versionCode \d+', line);
            line = line.replace(line, temp[0] + 'versionCode ' + build_number + temp[1]);
        if (re.search( r'\s*versionName .+', line)):
            temp = re.split(r'versionName .+', line);
            line = line.replace(line, temp[0] + 'versionName ' + "'" + build_version + "'" + temp[1]);
        file_data += line;
    file.close();

    # 重新寫入build.gradle
    f = open(file_path, 'w');
    f.write(file_data);
    f.close();

def updateIOS(file_path, build_version, build_number):
    file = open(file_path, 'r');
    searchBuildVersion = False
    searchBuildNumber = False
    file_data = ''
    # 遍歷info.plist文件，修改版本信息
    for line in file:
        if (searchBuildVersion):
            temp = re.split(r'<string>.+</string>', line);
            line = line.replace(line, temp[0] + '<string>' + build_version + '</string>' + temp[1]);
            searchBuildVersion = False;
        if (searchBuildNumber):
            temp = re.split(r'<string>.+</string>', line);
            line = line.replace(line, temp[0] + '<string>' + build_number + '</string>' + temp[1]);
            searchBuildNumber = False;
        if ('<key>CFBundleShortVersionString</key>' in line):
            searchBuildVersion = True
        if ('<key>CFBundleVersion</key>' in line):
            searchBuildNumber = True
        file_data += line;
    file.close();

    # 重新寫入info.plist
    f = open(file_path, 'w');
    f.write(file_data);
    f.close();

def updateVersionInfo(android_file_path, ios_file_path, build_version, build_number):
    # build_version = os.getenv('BUILD_VERSION');
    # build_number = os.getenv('BUILD_NUMBER');
    try:
        updateAndroid(android_file_path, build_version, build_number);
        updateIOS(ios_file_path, build_version, build_number);
        return True;
    except Exception, e:
        print 'Exception', e
        return False

if updateVersionInfo(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]):
    print '版本信息修改成功';
else:
    print '版本信息修改失敗';
