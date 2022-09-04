import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from './material/material.module';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CardRCAComponent } from './components/card-rca/card-rca.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './Pipes/filter.pipe';
import { HomeComponent } from './components/home/home.component';
import { DocumentTableComponent } from './components/document-table/document-table.component';
import { RcaFormComponent } from './components/rca-form/rca-form.component';
import { RcaInformationComponent } from './components/rca-information/rca-information.component';
import { RcaStatusBarComponent } from './components/rca-status-bar/rca-status-bar.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AssetTableComponent } from './components/asset-table/asset-table.component';
import { TeamTableComponent } from './components/team-table/team-table.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

 

@NgModule({
  declarations: [
    AppComponent,
    CardRCAComponent,
    MenuComponent,
    FilterPipe,
    HomeComponent,
    DocumentTableComponent,
    RcaFormComponent,
    RcaInformationComponent,
    RcaStatusBarComponent,
    DialogComponent,
    AssetTableComponent,

    TeamTableComponent,
    DeleteDialogComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CdkStepperModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MaterialModule,
    MatDialogModule,
  ],
  providers: [MenuComponent,TeamTableComponent,AssetTableComponent],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
