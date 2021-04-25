import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { Cause } from 'src/app/model/cause';
import { CurrencyService } from 'src/app/services/currency.service';

import { CommunityService } from '../../services/community.service';
import { Community } from '../../model/community';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {



  public showingCause = true;
  public minMoney = 10000;
  public maxMoney = 10000000000;
  public display: number | null = 0;
  public values: Cause[] = [{budget: 10000, name: 'una hamburguesa de Mc Donalds', currency: 'COP'},
                  {budget: 30000, name: 'una botella de 750ml de nectar', currency: 'COP'}];
  public communities: Community[] = [];


  constructor(public dialog: MatDialog,
              public currencyService: CurrencyService,
              public communitiesService: CommunityService) { }

  // uses the slider to update the display value logarithmicaly
  updateBudget(event: MatSliderChange): void {

    const num = event.value;
    const minv = Math.log(this.minMoney);
    const maxv = Math.log(this.maxMoney);

    // calculate adjustment factor
    const scale = (maxv - minv) / (this.maxMoney - this.minMoney);

    this.display = Math.round( Math.exp(minv + scale * (num! - this.minMoney)));
     // console.log(this.display);

  }

  // returns the string that appears on top of the slider when it slides
  formatLabel(value: number): string {
    return '';
  }

  // upperbound on array
  // TODO: do it with binary search
  result(money: number): string{
    let answer = this.values[0].name;
    this.values.forEach(element => {
      if (element.budget < money){
        answer = element.name;
      }
    });

    return answer;
  }

  addCause(): void{
    const dialogRef = this.dialog.open(DialogNewCauseComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      result.budget = +result.budget;
      this.values.push(result);

      this.values.sort((a, b) => +a.budget < +b.budget ? -1 : +a.budget > +b.budget ? 1 : 0);
      console.log((this.values));
    });
  }

  showCommunity(): void{
    this.showingCause = false;
  }

  showCauses(): void {
      this.showingCause = true;
  }

  // TODO: llamar al currency service para que convierta de USD a COP
  ngOnInit(): void {
      this.communities = this.communitiesService.getCommunities();

  }

}




@Component({
  selector: 'dialog-new-cause',
  templateUrl: 'dialog_new_cause.html',
})
export class DialogNewCauseComponent {


  public cause: Cause = {budget: 0, name: '', currency: 'COP'};
  constructor(
    public dialogRef: MatDialogRef<DialogNewCauseComponent>) {}

  onNoClick(): void {

    this.dialogRef.close();
  }

}
