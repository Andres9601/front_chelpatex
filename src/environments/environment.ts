// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'chelpa-tex-dev',
    appId: '1:361031164057:web:6b0e78e9e6951464435808',
    storageBucket: 'chelpa-tex-dev.appspot.com',
    apiKey: 'AIzaSyB7dk6aFnKivxGWuyUYThhcq7jO6ChKynE',
    authDomain: 'chelpa-tex-dev.firebaseapp.com',
    messagingSenderId: '361031164057',
    measurementId: 'G-B245FKH8Z6',
  },
  /* apiUrl: 'https://chelpatex0.azurewebsites.net/webresources/controller', */
  apiUrl: 'http://localhost:8080/webresources/controller',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
