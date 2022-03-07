// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyBfHTpi0JfpkS8R61r08x-LQ6yYNIZ3M5o",
        authDomain: "portal-media.firebaseapp.com",
        projectId: "portal-media",
        storageBucket: "portal-media.appspot.com",
        messagingSenderId: "523322569053",
        appId: "1:523322569053:web:64396bc04c2116ce11b8b4",
        measurementId: "G-P42GXZV7BL"
    },
    firebaseRtdbUrl: "https://portal-media-default-rtdb.firebaseio.com/",
    firebaseRtdbKeluhanUrl: "https://keluhan-warga-default-rtdb.firebaseio.com/",
    secretKey: {
        localStorageKey: "mahkota_pemuda_kreatif",
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
