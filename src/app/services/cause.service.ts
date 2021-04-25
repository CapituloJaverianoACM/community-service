import { Injectable } from '@angular/core';
import { Cause } from '../model/cause';

@Injectable({
  providedIn: 'root'
})
export class CauseService {

  constructor() { }

  // TODO: read from text file
  getAllCauses(): Cause[]{
    const causeArray = [{product: 'Hamburguesa de Mc Donals\'s', value: 10000, currency: 'COP'},
                         {value: 30000, product: 'una botella de 750ml de nectar', currency: 'COP'}];
  
    return causeArray;
  }
}
