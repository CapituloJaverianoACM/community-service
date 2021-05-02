import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';

const routes: Routes = [
  {path: 'main' , component: MainComponent},
  {path: '' , component: TutorialComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
