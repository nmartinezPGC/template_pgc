/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
const envIN = 'prod';

export const environment = {
  production: true,
  // apiUrl: 'http://localhost:8090/api/v1',
  //apiUrl: 'http://172.17.0.128:8090/API-Rest-PGC/api/v1', // DAP - 2018-12-19 - Se Actulizo la Url del servidor de Pruebas
  apiUrl: 'http://172.17.0.128:8090/api/v1', // DAP - 2018-12-19 - Se Actulizo la Url del servidor de Pruebas
  env: envIN,
};
