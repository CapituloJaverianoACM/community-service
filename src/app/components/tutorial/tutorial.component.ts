import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
  public tutorialIllustrationPath = environment.tutorialIllustrationPath;

  public val = 190;
  public showTut = false;
  constructor() { }

  showTutorial(): void{
    this.showTut = true;
  }


  // returns the string that appears on top of the slider when it slides
  formatLabel(value: number): string {
    return '';
  }

  ngOnInit(): void {
  }

}
