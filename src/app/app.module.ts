import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DialogNewCauseComponent, MainComponent } from './components/main/main.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FooterComponent } from './components/footer/footer.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';

import {MatDialogModule} from '@angular/material/dialog';




@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MainComponent,
    FooterComponent,
    DialogNewCauseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatSliderModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatRadioModule,
    FontAwesomeModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogNewCauseComponent
  ],
})
export class AppModule { }
