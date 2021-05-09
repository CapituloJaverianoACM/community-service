import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
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

  async showTutorial(): Promise<void>{
    this.showTut = true;
    await new Promise(resolve => setTimeout(resolve, 100));
    window.scrollTo(0, document.body.scrollHeight);
    return;
    console.log('antes del delay');
    delay(1000);
    // const element = document.getElementById('tuto');
    //element!.scrollIntoView();
    window.scrollTo(0,document.body.scrollHeight);
    console.log('despues del scroll');
  }


  // returns the string that appears on top of the slider when it slides
  formatLabel(value: number): string {
    return '';
  }

  ngOnInit(): void {
  }

}
