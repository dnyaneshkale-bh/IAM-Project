import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RcaFormService } from '../../services/rca-form.service';
import { EventService } from 'src/app/services/event.service';
import { ApiService } from 'src/app/services/api.service';
import { MenuComponent } from '../menu/menu.component';
import { RCAresetService } from 'src/app/services/rcareset.service';
import { DeleteRefreshService } from 'src/app/services/delete-refresh.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
export interface Doc {
  docName: string;
  docId: number;
}

const ELEMENT_DATA: Doc[] = [
  { docName: 'first', docId: 1 },
  { docName: 'second', docId: 2 },
  { docName: 'third', docId: 3 },
];

@Component({
  selector: 'app-rca-form',
  templateUrl: './rca-form.component.html',
  styleUrls: ['./rca-form.component.scss'],
})
export class RcaFormComponent implements OnInit {
  rcaInputName = '';
  constructor(
    private _formBuilder: FormBuilder,
    private menu: MenuComponent,
    private _rcaService: RcaFormService,
    private _eventService: EventService,
    private _getCards: ApiService,
    private rcareset: RCAresetService,
    private _deleteRefresh: DeleteRefreshService,
    private _snackbar: SnackbarService
  ) {}

  displayedColumns: string[] = ['docName', 'docId'];
  dataSource: any;
  fileInput: Doc[] = [];

  update: boolean = false;
  updatedRca_id!: any;
  resetStepper: boolean = false;
  ngOnInit(): void {
    this._eventService.on<string>().subscribe((data) => {
      this.rcaInputName = data;
      console.log(this.rcaInputName);
    });
    this._getCards.rcaDataSource$.subscribe((obj) => {
      console.log('component interaction');
      this.update = true;
      console.log(obj);
      this.updatedRca_id = obj.rca_id;
      this.firstFormGroup.controls['facilityName'].patchValue(
        obj.facility_name
      );
      this.firstFormGroup.controls['severity'].patchValue(obj.severity);
      this.firstFormGroup.controls['creationDate'].patchValue(
        obj.creation_date
      );
      this.firstFormGroup.controls['targetDate'].patchValue(obj.target_date);
      this.firstFormGroup.controls['problemDescription'].patchValue(
        obj.problem_description
      );
      this.firstFormGroup.controls['safetyImpact'].patchValue(
        obj.safety_impact
      );
      this.firstFormGroup.controls['enviornmentImpact'].patchValue(
        obj.enviornment_impact
      );
      this.firstFormGroup.controls['reputationImpact'].patchValue(
        obj.reputation_impact
      );
      this.firstFormGroup.controls['revenueImpact'].patchValue(
        obj.revenue_impact
      );
      this.firstFormGroup.controls['assetImpact'].patchValue(obj.asset_impact);
      this.firstFormGroup.controls['rcaName'].patchValue(obj.rca_name);

      this.firstFormGroup.patchValue({
        rcaName: obj.rca_name,
        caseId: obj.case_id,
        source: obj.source,
        owner: obj.owner,
        status: obj.status,
      });
    });

    this._getCards.getRCA().subscribe({
      next: (res) => {
        console.log(res.message);
        this.menu.cards = res.message;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.dataSource = ELEMENT_DATA;
    console.log(this.dataSource);

    this.rcareset.on<boolean>().subscribe((data) => {
      this.resetStepper = data;

      if (data == true) {
        this.firstFormGroup.reset();
        this.update = false;
      }
    });

    this._deleteRefresh.on<string>().subscribe((data) => {
      if (data == 'deleted') {
        this.firstFormGroup.reset();
        this.update = false;
      }
    });
  }

  firstFormGroup = this._formBuilder.group({
    facilityName: [''],
    severity: [''],
    creationDate: [],
    targetDate: [],
    problemDescription: [],
    safetyImpact: [],
    enviornmentImpact: [],
    revenueImpact: [],
    reputationImpact: [],
    assetImpact: [],
    rcaName: [''],
    caseId: [''],
    source: [''],
    owner: [''],
    status: [''],
  });

  severities: string[] = ['Low Risk', 'Medium Risk', 'High Risk'];
  isEditable = false;

  onfileSubmit(event: any) {
    if (event.target.files.length > 0) {
      let fileLength = event.target.files.length;
      let files = event.target.files;
      let i = 0;
      this.fileInput.length = 0;
      while (i < fileLength) {
        let obj: Doc = { docName: files[i].name, docId: i };

        this.fileInput.push(obj);
        this.fileInput = [...this.fileInput];
        i++;
      }

      this.dataSource = this.fileInput;
    }
  }

  submitForm() {
    console.log(this.firstFormGroup.value);
    console.log(this.dataSource);
  }

  submitRCA() {
    this.firstFormGroup.patchValue({
      rcaName: this.rcaInputName,
    });
    console.log(this.update);
    if (this.update == true) {
      console.log(this.update);
      console.log('777777777777777777777777777777');
      console.log(this.firstFormGroup.value);
      this._rcaService
        .update(this.firstFormGroup.value, this.updatedRca_id)
        .subscribe({
          next: (res: any) => {
            this._snackbar.alert('RCA form updated successfully');

            console.log(res.message);
            this.setLocalStorage(res.message[0]);
            this._eventService.emit<boolean>(true);
            this._getCards.getRCA().subscribe({
              next: (res1) => {
                console.log(res1.message);
                this.menu.cards = res1.message;
              },
              error: (err) => {
                console.log(err);
              },
            });
          },
          error: () => {
            this._snackbar.alert('Error Creating RCA');
          },
        });
    } else {
      // let obj = localStorage.getItem('UserInfo');
      // let appShellOwner = JSON.parse(obj as string).name;

      this.firstFormGroup.patchValue({
        rcaName: this.rcaInputName,
        caseId: '0',
        source: 'Edge',
        // owner: appShellOwner != null ? appShellOwner : 'defaultOwner',
        owner: 'owner',
        status: 'open',
      });
      console.log(this.firstFormGroup.value);
      this._rcaService.register(this.firstFormGroup.value).subscribe({
        next: (res: any) => {
          this._snackbar.alert('RCA form submitted successfully');

          console.log(res.message);
          this.setLocalStorage(res.message[0]);
          this._eventService.emit<boolean>(true);
          this._getCards.getRCA().subscribe({
            next: (res1) => {
              console.log(res1.message);
              this.menu.cards = res1.message;
            },
            error: (err) => {
              console.log(err);
            },
          });
          //this._getCards.getRCA();
        },
        error: () => {
          this._snackbar.alert('Error Creating RCA');
        },
      });
    }

    //  this._getCards.getRCA().subscribe({
    //   next:(res:any)=>{
    //     console.log("SAVE");

    //     console.table(res.message);
    //     },
    //     error: () => {
    //       alert('Error getting RCA');
    //     },
    // });
  }

  sharedRca() {
    this._getCards.shareRCA(this.menu.cards);
  }

  setLocalStorage(resObject: any) {
    sessionStorage.setItem('rca_id', resObject.rca_id);
    localStorage.setItem('rca_id', resObject.rca_id);
    localStorage.setItem('case_id', resObject.case_id);
    localStorage.setItem('source', resObject.source);
    localStorage.setItem('creation_date', resObject.creation_date);
    localStorage.setItem('owner', resObject.owner);
    localStorage.setItem('status', resObject.status);
  }
}
