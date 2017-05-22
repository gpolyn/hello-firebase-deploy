import { InjectionToken } from '@angular/core';

export const GUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
  return v.toString(16);
});

interface IAppConfig {
  latitude: number;
  longitude: number;
}

// github.com/angular/angular-cli/issues/2034
export abstract class AppConfig implements IAppConfig {
  latitude: number;
  longitude: number;
}

export const INIT_CONFIG: IAppConfig = {
  latitude: 38.9071923,
  longitude: -77.0368707
};

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
