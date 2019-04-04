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
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;

    const resultSectores = [];

    for (const sectors of value) {
      if (sectors.label.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        for (let index = 0; index < sectors.children.length; index++) {
          const element = sectors.children[index];
          // console.log(element.label);
          if (element.label.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
            // Valida que tenga hijos
            if (element.children !== undefined) {
              resultSectores.push(element);
            } else {
              resultSectores.push(sectors);
            }
          }
        }
      };
    };
    return resultSectores;
  }

}
