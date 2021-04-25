import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public logoPath = environment.logoPath;
  public commuServiceLogoPath = environment.commuServiceLogoPath;

  constructor() { }

  ngOnInit(): void {
  }

}
