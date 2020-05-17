import { PermissionsAndroid } from 'react-native';

class PermissionHelper {
  static async requestPhoto() {
    if (__IOS__) return Promise.resolve(true);
    const permissions = [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE];
    try {
      const granteds = await PermissionsAndroid.requestMultiple(permissions);
      if (
        granteds[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED &&
        granteds[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        return Promise.resolve(true);
      } else {
        return Promise.reject(new Error('unauthorized'));
      }
    } catch (err) {
      return Promise.reject(new Error(err));
    }
  }

  static async requestLocation() {
    if (__IOS__) return Promise.resolve(true);
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return Promise.resolve(true);
      } else {
        return Promise.reject(new Error('unauthorized'));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default PermissionHelper;
