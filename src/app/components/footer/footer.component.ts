import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public logoPath = environment.logoPath;
  faCofee = faCoffee;

  constructor() { }

  navigateToFacebook(): void{
    window.location.href = "https://www.facebook.com/acmjaveriana";
  }

  navigateToGithub(): void{
    window.location.href = "https://github.com/CapituloJaverianoACM";
  }

  navigateToInstagram(): void{
    window.location.href = "https://www.instagram.com/capitulojaveriano/";
  }
  ngOnInit(): void {
  }

}
