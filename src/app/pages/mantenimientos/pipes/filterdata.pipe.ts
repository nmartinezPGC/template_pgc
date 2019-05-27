/**
 * @author Nahum Martinez
 * @returns servicios de Actividades
 * @name FilterdataPipe
 * @alias _filterdataPipe
 * @version 1.0.0
 * @fecha 10/01/2019
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdata',
})
export class FilterdataPipe implements PipeTransform {
  transform(items: any[], value: string, label: string): any[] {
    if (!items) return [];
    if (!value) return items;
    if (value === '' || value === null) return[];
    return items.filter(e => e[label].indexOf(value) > -1);
  }
}
