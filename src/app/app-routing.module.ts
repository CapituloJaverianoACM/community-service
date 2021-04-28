import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { BillComponent } from './components/bill/bill.component';

const routes: Routes = [{ path: '', component: MainComponent }, 
                        { path: 'bill', component: BillComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
