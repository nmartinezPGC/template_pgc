/**
* @author Nahum Martinez
* @returns Listado de los Menu con sus permisos
* @name MenuItems
* @alias _menuItems
* @version 1.0.0
* @fecha 25-06-2019
*/

import { NbMenuItem } from '@nebular/theme';
import * as _ from 'lodash';
import decode from 'jwt-decode';

// Definicion de variables de uso
const token = localStorage.getItem('auth_app_token');
const rolUser = localStorage.getItem('rolUser');

// decode the token to get its payload
let tokenPayload: any = [];
if (token) {
  tokenPayload = decode(token);
}


export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'MENU PGC',
    group: true,
    hidden: !findRole([1, 2, 7], Number(rolUser)),
  },
  {
    title: 'Proyectos',
    icon: 'ion-folder',
    // hidden: !findRole([1, 2, 7], Number(tokenPayload.userRole)),
    hidden: !findRole([1, 2, 3, 4, 5], Number(rolUser)),
    children: [
      {
        title: 'Ingreso de Proyecto',
        link: '/pages/activities/new-activity',
        hidden: !findRole([1, 2, 3, 4, 5], Number(rolUser)),
      },
      {
        title: 'Editar de Proyecto',
        link: '/pages/activities/new-activity',
        hidden: !findRole([1, 2, 3, 4, 5], Number(rolUser)),
      },
    ],
  },
  { // Menu de Mantenimientos NAM | 2018-12-12 | Se creo el menu de raiz del Modulo de Mantenimientos
    title: 'Mantenimientos',
    icon: 'nb-gear',
    // link: '/pages/mantenimientos',
    hidden: !findRole([1], Number(rolUser)),
    children: [
      {
        title: 'Espacios de Trabajo',
        // icon: 'fa fa-address-book',
        link: '/pages/mantenimientos/mant-espacios-trabajo',
      },
      { // Menu de Mantenimientos NAM | 2018-12-19 | Se creo el menu de raiz del Modulo de Mantenimientos / Mant. Seguridad / Usuarios D
        title: 'Seguridad',
        // icon: 'fa fa-users',
        link: '/pages/mantenimientos/mant-seguridad',
      },
    ],
  },
  {
    title: 'Reportes',
    icon: 'ion-clipboard',
    children: [
      {
        title: 'Sectores y ODS',
        link: '/pages/forms/inputs',
        hidden: !findRole([1, 2, 3, 4, 5], Number(rolUser)),
      },
      {
        title: 'Ubicación',
        link: '/pages/forms/layouts',
        hidden: !findRole([1, 2, 3, 4, 5], Number(rolUser)),
      },
    ],
  },
  {
    title: 'Mapas',
    icon: 'nb-location',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
        hidden: !findRole([1, 2, 3, 4, 5], Number(rolUser)),
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
        hidden: !findRole([1, 2, 3, 4, 5], Number(rolUser)),
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
        hidden: !findRole([1, 2, 3, 4, 5], Number(rolUser)),
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
        hidden: !findRole([1, 2, 3, 4, 5], Number(rolUser)),
      },
    ],
  },
  {
    title: 'Gráficos',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
        hidden: !findRole([1, 2, 3, 4, 5], Number(rolUser)),
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
        hidden: !findRole([1, 2, 3, 4, 5], Number(rolUser)),
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
        hidden: !findRole([1, 2, 3, 4, 5], Number(rolUser)),
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
  {
    title: 'UI Features',
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Buttons',
        link: '/pages/ui-features/buttons',
      },
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Modals',
        link: '/pages/ui-features/modals',
      },
      {
        title: 'Popovers',
        link: '/pages/ui-features/popovers',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
      {
        title: 'Tabs',
        link: '/pages/ui-features/tabs',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'nb-compose',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
    ],
  },
  {
    title: 'Components',
    icon: 'nb-gear',
    children: [
      {
        title: 'Tree',
        link: '/pages/components/tree',
      }, {
        title: 'Notifications',
        link: '/pages/components/notifications',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'nb-title',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables',
    icon: 'nb-tables',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'nb-shuffle',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
];

/**
 * @name findRole
 * @param allowedRoles
 * @param userRole
 */
function findRole(allowedRoles, userRole) {
  if (Number.isNaN(userRole)) {
    return false;
  }
  // console.log('testing -- ' + userRole);
  return (_.find(allowedRoles, function (
    item: any,
  ) {
    return item === userRole;
  })) ? true : false;
}
