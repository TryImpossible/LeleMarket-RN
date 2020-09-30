import * as NavigationService from './NavigationService';

class NavigationApi {
  static startMain() {
    NavigationService.resetTo('Main');
    // NavigationService.resetRoot('Main');
  }
}

export default NavigationApi;
