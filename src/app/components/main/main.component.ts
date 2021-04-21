import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public minMoney = 10000;
  public maxMoney = 10000000000;
  public display: number | null = 0;
  public values =[{value: 10000, product: 'una hamburguesa de Mc Donalds'},
                  {value: 30000, product: 'una botella de 750ml de nectar'}];
  

  constructor() { }

  // logarithmic
  updateBudget(event: MatSliderChange) {

    const num = event.value;
    let minv = Math.log(this.minMoney);
    let maxv = Math.log(this.maxMoney);
  
    // calculate adjustment factor
    const scale = (maxv-minv) / (this.maxMoney-this.minMoney);

    this.display = Math.round( Math.exp(minv + scale*(num! -this.minMoney)));
     //console.log(this.display);
  
  }


  formatLabel(value: number) {
    return '';
  }

  // upperbound on array
  // TODO: do it with binary search
  result(money: number): string{
    let answer = this.values[0].product;
    this.values.forEach(element => {
      if(element.value < money){
        answer = element.product;
      }
    });

    return answer;
  }

  ngOnInit(): void {
  }

}
