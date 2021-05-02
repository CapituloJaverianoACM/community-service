import { Component, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
  }

} 


