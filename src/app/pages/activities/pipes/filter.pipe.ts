/**
 * @author Nahum Martinez
 * @returns servicios de Filtrado, para TreeView
 * @name FilterPipe
 * @alias _filterPipe
 * @version 1.0.0
 * @fecha 04/04/2019
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  // Creacion del Pipe
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;

    const resultSectores = [];

    for (const sectors of value) {
      // Primer Nivel
      if (sectors.label.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultSectores.push(sectors);
      } else {
        // Segundo Nivel
        for (let index = 0; index < sectors.children.length; index++) {
          const element = sectors.children[index];

          if (element.label.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
            resultSectores.push(element);
          } else {
            // Valida que tenga hijos
            if (element.children.length !== 0) {
              // Terce Nivel
              for (let indexn = 0; indexn < element.children.length; indexn++) {
                const element2 = element.children[indexn];

                if (element2.label.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
                  resultSectores.push(element2);
                } else {
                  // Cuarto Nivel
                  // Valida que tenga hijos
                  if (element2.children.length !== 0) {
                    for (let index1 = 0; index1 < element2.length; index1++) {
                      const element3 = element2.children[index1];

                      if (element3.label.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
                        resultSectores.push(element3);
                      }
                    }
                  } // Fin Cuarto Nivel
                }
              } // Fin Tercer Nivel
            }
          }
        } // Fin Segundo Nivel
      };
    };
    return resultSectores;
  }

}
