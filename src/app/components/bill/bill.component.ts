import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  public piggyPath = environment.piggyPath;
  public communityBillPath = environment.communityBillPath;
  public boyPath = environment.boyPath;
  public budget: number;

  public community: number;

  public people: number;

  public cause: string;

  public currency: string;

  public calculation : number;
  public showButton = true;

  constructor(private route: ActivatedRoute) {
       this.budget = this.route.snapshot.params.budget;
       this.community = this.route.snapshot.params.community;
       this.people = this.route.snapshot.params.people;
       this.cause = this.route.snapshot.params.cause;
       this.currency = this.route.snapshot.params.currency;
       this.calculation = this.route.snapshot.params.calculation;
   }

   downloadImage(): void{

    this.showButton = false;
    const container = document.getElementById("Bill"); //specific element on page
    window.scrollTo(0,0);  
    html2canvas(container!,{
     backgroundColor: null,
     height: container!.scrollHeight + 50,
     width: container!.scrollWidth + 10}).then((canvas) => {

      let link = document.createElement('a');
      document.body.appendChild(link);
      link.download = "bill.png";
      link.href = canvas.toDataURL("image/png");
      link.target = '_blank';
      link.click();
      this.showButton = true;
      
  });
}

  ngOnInit(): void {
  }

} 


