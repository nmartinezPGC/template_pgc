import { NbMenuItem } from '@nebular/theme';

import * as _ from 'lodash';

const roles = [1, 2, 3, 4, 5, 6, 7];
const token = localStorage.getItem('auth_app_token');
const identity = localStorage.getItem('identity');

// decode the token to get its payload

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
  },
  {
    title: 'Proyectos',
    icon: 'ion-folder',
    // link: '/pages/activities',
    children: [
      {
        title: 'Ingreso de Proyecto',
        link: '/pages/activities/new-activity',
      },
      {
        title: 'Editar de Proyecto',
        link: '/pages/activities/new-activity',
        hidden: true,
      },
    ],
  },
  { // Menu de Mantenimientos NAM | 2018-12-12 | Se creo el menu de raiz del Modulo de Mantenimientos
    title: 'Mantenimientos',
    icon: 'nb-gear',
    // link: '/pages/activities',
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
      },
      {
        title: 'Ubicación',
        link: '/pages/forms/layouts',
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
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
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
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
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
  console.log('testing -- ' + userRole);
  return (_.find(allowedRoles, function (
    item: any
  ) {
    return item == userRole;
  })) ? true : false;
}
