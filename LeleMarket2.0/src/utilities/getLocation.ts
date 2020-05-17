import PermissionHelper from './PermissionHelper';

export default async function getLocation() {
  const getCurrentPosition = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        location => {
          resolve(location);
        },
        error => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000 }
      );
    });

  try {
    await PermissionHelper.requestLocation();
    return getCurrentPosition();
  } catch (error) {
    return Promise.reject(error);
  }
}
