import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cause } from '../model/cause';
import data from 'src/assets/causes.json';

const filePath = 'src/assets/causes.json';

@Injectable({
  providedIn: 'root'
})

// This class gets a list of causes from a local json file
export class CauseService {


  private file: any = data;

  constructor() {}


  getAllCauses(): Cause[]{
    let causeArray: Cause[] = [];
    try{
      causeArray  = this.file;
      console.log('succesfully got array');
    }catch (e){
      console.log('the file contains errors');
      console.log(e);
    }


    causeArray.sort((a, b) => +a.budget < +b.budget ? -1 : +a.budget > +b.budget ? 1 : 0);

    return causeArray;
  }
}
