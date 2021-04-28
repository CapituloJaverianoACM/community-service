import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cause } from '../model/cause';
import data from '/Users/camiloserrano/Documents/universidad/acm/desarrollo web/commu-service/src/assets/causes.json';

const filePath = 'src/assets/causes.json';

@Injectable({
  providedIn: 'root'
})

// This class gets a list of causes from a local json file
export class CauseService {


  private file: any = data;

  constructor() {}


  // TODO: read from text file
  getAllCauses(): Cause[]{
    let causeArray: Cause[] = [];
    try{
      causeArray  = this.file;
      console.log('succesfully got array');
    }catch (e){
      console.log('the file contains errors');
      console.log(e);
    }

    return causeArray;
  }
}
