// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false ,
  configuration : [
    {
      name: 'starbuck',
      raiden_host : 'http://159.89.203.92:5001',
      address : '0xBdCC4678904D728A7394aabC7eeC76A3578eA4B2'
    },
    {
      name: 'thebridge',
      raiden_host : 'http://167.99.66.17:5001',
      address : '0x6ff879Fc4a3799C428B98bfD1Aec053C08EddF63'
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
