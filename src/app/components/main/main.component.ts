import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { Router } from '@angular/router';
import { Cause } from 'src/app/model/cause';
import { CurrencyService } from 'src/app/services/currency.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CauseService } from 'src/app/services/cause.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public billsIllustrationPath = environment.billsIllustrationPath;



  public showingCause = true;
  public minMoney = 10000;
  public maxMoney = 10000000000;
  public display: number = this.minMoney;
  public values: Cause[];
  public price = this.display;


  constructor(public dialog: MatDialog,
              public currencyService: CurrencyService,
              private causeService: CauseService) {

    this.values = causeService.getAllCauses();
  }

  changeCause(c: Cause): void{
    this.display = c.budget;

    const minv = Math.log(this.minMoney);
    const maxv = Math.log(this.maxMoney);

    // calculate adjustment factor
    const scale = (maxv - minv) / (this.maxMoney - this.minMoney);

    this.price = ((Math.log(c.budget) - minv) / scale) + this.minMoney;
    console.log(this.price);
  }


  // uses the slider to update the display value logarithmicaly
  updateBudget(event: MatSliderChange): void {

    console.log(event.value);
    this.display = this.expo(event.value!);
  }

  private expo(num: number): number{
    const minv = Math.log(this.minMoney);
    const maxv = Math.log(this.maxMoney);

    // calculate adjustment factor
    const scale = (maxv - minv) / (this.maxMoney - this.minMoney);

    return Math.round( Math.exp(minv + scale * (num! - this.minMoney)));
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
      if (element.budget <= money){
        answer = element.name;
      }
    });

    return answer;
  }

  addCause(): void{
    const dialogRef = this.dialog.open(DialogNewCauseComponent, {
      width: '300px'
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

  // TODO: llamar al currency service para que convierta de USD a COP
  ngOnInit(): void {

  }

}




@Component({
  selector: 'dialog-new-cause',
  templateUrl: 'dialog_new_cause.html',
  styleUrls: ['./main.component.scss']

})
export class DialogNewCauseComponent {

  public form: FormGroup;

  public cause: Cause = {budget: 0, name: '', currency: 'COP'};
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<DialogNewCauseComponent>) {

      this.form = this.fb.group({
        name: ['', Validators.required],
        budget: ['', [Validators.required, Validators.min(0)]],
        currency: ['', Validators.required]
      });
    }

  onNoClick(): void {

    this.dialogRef.close();
  }

}
