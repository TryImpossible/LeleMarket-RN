import NavigationService from './NavigationService';

class NavigationApi {
  static startMain() {
    NavigationService.resetTo('Main');
  }
}

export default NavigationApi;
