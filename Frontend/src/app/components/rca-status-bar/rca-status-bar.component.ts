import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { RCAresetService } from 'src/app/services/rcareset.service';

@Component({
  selector: 'app-rca-status-bar',
  templateUrl: './rca-status-bar.component.html',
  styleUrls: ['./rca-status-bar.component.scss'],
})
export class RcaStatusBarComponent implements OnInit {
  @ViewChild('stepper', { read: MatStepper }) stepper!: MatStepper;
  constructor(
    private _formBuilder: FormBuilder,
    private rcareset: RCAresetService
  ) {}

  statusvalue: string = '';
  stsval: number = 0;
  defineCompleted: boolean = false;
  teamCompleted: boolean = false;
  logicTreeCompleted: boolean = false;
  relatedAssestCompleted: boolean = false;
  evidenceCollectionCompleted: boolean = false;
  recommendationCompleted: boolean = false;
  summaryCompleted: boolean = false;
  defineEditable: boolean = false;
  teamEditable: boolean = false;
  logicTreeEditable: boolean = false;
  relatedAssestEditable: boolean = false;
  evidenceCollectionEditable: boolean = false;
  recommendationEditable: boolean = false;
  summaryEditable: boolean = false;
  matIconProgress: boolean = false;

  resetStepper: boolean = true;
  ngOnInit(): void {
    this.rcareset.on<boolean>().subscribe((data) => {
      this.resetStepper = data;

      if (data == true) {
        this.resetStepper = false;

        this.stepper.reset();

        this.stsval = 0;
      }
    });
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: '',
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: '',
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: '',
  });
  isLinear = false;

  // team(){
  //   this.stsval = 28;

  // }

  defineNext() {
    console.log(this.defineCompleted);
    console.log(this.defineEditable);

    // this.isLinear = true;
    this.defineCompleted = true;

    this.stsval = 28;

    this.defineEditable = true;
  }

  TeamNext() {
    console.log(this.teamCompleted);
    console.log(this.teamEditable);

    this.teamCompleted = true;

    this.stsval = 57;
    this.teamEditable = true;
  }

  RelatedAssetsNext() {
    this.relatedAssestCompleted = true;
    this.stsval = 100;
    this.matIconProgress = true;
    this.relatedAssestEditable = true;
  }

  resetProgressBarValue() {
    this.stsval = 0;
    this.defineCompleted = false;
    this.teamCompleted = false;
    this.relatedAssestCompleted = false;
    this.logicTreeCompleted = false;
    this.matIconProgress = false;
    this.defineEditable = false;
    this.teamEditable = false;
    this.relatedAssestEditable = false;
    this.logicTreeEditable = false;
  }

  // logicTreeNext() {
  //   this.logicTreeCompleted = true;
  //   this.logicTreeEditable = true;
  // }

  TeamBack() {
    this.defineCompleted = true;
    this.defineEditable = true;
    // this.stsval = 0;
  }
  RelatedAssetsBack() {
    this.teamCompleted = true;
    this.teamEditable = true;
    // this.stsval = 28;
  }
  logicTreeBack() {
    this.relatedAssestCompleted = true;
    this.relatedAssestEditable = true;
    // this.stsval = 57;
  }
}
