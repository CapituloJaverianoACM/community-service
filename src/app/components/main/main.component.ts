import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Cause } from 'src/app/model/cause';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CauseService } from 'src/app/services/cause.service';
import { environment } from 'src/environments/environment';

import { CommunityService } from '../../services/community.service';
import { CurrencyService } from '../../services/currency.service';
import { Community } from '../../model/community';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public billsIllustrationPath = environment.billsIllustrationPath;



  // BUDGET
  public currentExchange = 3600;
  // base values for money boundaries in COP
  private minAbsoluteMoney = 10000;
  private maxAbsoluteMoney = 10000000000;
  public minMoney = this.minAbsoluteMoney;
  public maxMoney = this.maxAbsoluteMoney;
  public displayMoney: number = this.minMoney;
  public values: Cause[] = [];
  public price = this.displayMoney;
  // TODO: change this values with a select under the slider
  public selectedCurrency = 'COP';

  // COMMUNITIES
  public chosenCommunity?: Community;
  public minPopulation = 1;
  public displayPopSize: number = this.minPopulation;
  public people = 1;
  public maxPopulation = 7794798739;
  public communities: Community[] = [];



  public showingCause = true;



  constructor(public dialog: MatDialog,
              public currencyService: CurrencyService,
              public communitiesService: CommunityService,
              private causeService: CauseService) {}


  changeCause(c: Cause): void{
    this.displayMoney = c.budget;

    const minv = Math.log(this.minMoney);
    const maxv = Math.log(this.maxMoney);

    // calculate adjustment factor
    const scale = (maxv - minv) / (this.maxMoney - this.minMoney);

    this.price = ((Math.log(c.budget) - minv) / scale) + this.minMoney;
    console.log(this.price);
  }

    // changes the selected currency
    changeCurrency(curr: string): void{
      // ignore if the currency didnt change
      if (this.selectedCurrency === curr){
        return;
      }
      // console.log(this.price);
      this.selectedCurrency = curr;
      let updatedBudget = 0;
      if (curr === 'COP'){
        this.minMoney = this.minAbsoluteMoney;
        this.maxMoney = this.maxAbsoluteMoney;
        updatedBudget = this.displayMoney * this.currentExchange;
        this.price = this.price * this.currentExchange;

        // updates cause array
        this.values.forEach(val => {
          val.budget *= this.currentExchange;
          val.currency = 'COP';
        });

      }
      else if (curr === 'USD'){
        this.minMoney = this.minAbsoluteMoney / this.currentExchange;
        this.maxMoney = this.maxAbsoluteMoney / this.currentExchange;
        updatedBudget = this.displayMoney / this.currentExchange;
        this.price = this.price / this.currentExchange;

        // updates cause array
        this.values.forEach(val => {
          val.budget /= this.currentExchange;
          val.currency = 'USD';
        });
      }


      console.log(this.values);
      this.displayMoney = updatedBudget;


    }


  // uses the slider to update the display value logarithmicaly
  updateBudget(event: MatSliderChange): void {

    // console.log(event.value);
    this.displayMoney = this.expo(event.value!);
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
      if(result){
        result.budget = +result.budget;
        this.values.push(result);
        this.values.sort((a, b) => +a.budget < +b.budget ? -1 : +a.budget > +b.budget ? 1 : 0);
      }
    });
  }

  // puts the slider on the value corresponding to the population of the selected community size
  handleCommunityChange(event: MatRadioChange): void{
    this.displayPopSize = event.value.size;

    const minv = Math.log(this.minPopulation);
    const maxv = Math.log(this.maxPopulation);

    // console.log(maxv);
    // console.log(minv);
    // calculate adjustment factor
    const scale = (maxv - minv) / (this.maxPopulation - this.minPopulation);

    this.people = ((Math.log(this.displayPopSize) - minv) / scale) + this.minPopulation;
    // this.people = 1000000000;
    console.log(this.people);

  }


  // uses the slider to update the display value logarithmicaly
  updatePopulation(event: MatSliderChange): void {

    const num = event.value;
    const minv = Math.log(this.minPopulation);
    const maxv = Math.log(this.maxPopulation);

    // calculate adjustment factor
    const scale = (maxv - minv) / (this.maxPopulation - this.minPopulation);

    this.displayPopSize = Math.round( Math.exp(minv + scale * (num! - this.minPopulation)));
  }

  addCommunity(): void{
    const dialogRef = this.dialog.open(DialogNewCommComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        result.size = +result.size;
        this.communities.push(result);
        this.communities.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
      }
    });
  }

  showCommunity(): void {
    this.showingCause = false;
  }

  calculate(): void {
      //TODO
  }

  showCauses(): void {
      this.showingCause = true;
  }

  // TODO: usar el router para ir a la pagina de la factura
  navigateToDetails(): void{

  }

  // TODO: llamar al currency service para que convierta de USD a COP
  ngOnInit(): void {
      this.communities = this.communitiesService.getCommunities();
      this.currencyService.getExchangeRate().subscribe((exchange) => {
          console.log(exchange);
          this.currentExchange = +exchange.USD_COP;
          console.log(this.currentExchange);


          this.values = this.causeService.getAllCauses();

          // converts all causes to COP
          this.values.forEach(val => {
            if (val.currency === 'USD'){
              val.budget = val.budget * this.currentExchange;
              val.currency = 'COP';
            }
          });
          // sorts the array
          this.values.sort((a, b) => +a.budget < +b.budget ? -1 : +a.budget > +b.budget ? 1 : 0);
      });

  }
  // to download an image
  /*
  downloadImage(): void{
    var container = document.getElementById("left"); //specific element on page
    html2canvas(container!).then(function(canvas) {
      let link = document.createElement('a');
      document.body.appendChild(link);
      link.download = "html_image.png";
      link.href = canvas.toDataURL("image/png");
      link.target = '_blank';
      link.click();
  });

  }*/

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

@Component({
  selector: 'dialog-new-comm',
  templateUrl: 'dialog_new_comm.html',
  styleUrls: ['./main.component.scss']

})
export class DialogNewCommComponent {

  public form: FormGroup;

  public community: Community = {name: '', size: 0};
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<DialogNewCommComponent>) {

      this.form = this.fb.group({
        name: ['', Validators.required],
        size: ['', [Validators.required, Validators.min(0)]]
      });
    }

  onNoClick(): void {

    this.dialogRef.close();
  }

}
