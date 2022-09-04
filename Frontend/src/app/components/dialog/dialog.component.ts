import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamServiceService } from 'src/app/services/team-service.service';
import { AssetServiceService } from 'src/app/services/asset-service.service';
import { TeamTableComponent } from '../team-table/team-table.component';
import { AssetTableComponent } from '../asset-table/asset-table.component';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  saveFormGroup!: FormGroup;

  asset: any;
  team: any;
  uAsset: any;
  uTeam: any;
  deleteAsset: any;
  deleteTeam: any;

  constructor(
    private AssetTable: AssetTableComponent,
    private TeamTable: TeamTableComponent,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _service: AssetServiceService,
    private _service2: TeamServiceService
  ) {}

  ngOnInit(): void {
    if (this.data.page.pageName == 'team') {
      this.team = true;
      this.asset = false;
      this.uAsset = false;
      this.uTeam = false;
      this.deleteAsset = false;
      this.deleteTeam = false;
      console.log('for team  ' + this.team);
      console.log(this.team);
    } else if (this.data.page.pageName == 'asset') {
      this.asset = true;
      this.team = false;
      this.uAsset = false;
      this.uTeam = false;
      this.deleteAsset = false;
      this.deleteTeam = false;
      console.log('for asset  ' + this.asset);
      console.log(this.asset);
    } else if (this.data.page.pageName == 'updateTeam') {
      this.uTeam = true;
      this.uAsset = false;
      this.asset = false;
      this.team = false;
      this.deleteAsset = false;
      this.deleteTeam = false;
      console.log('for uTeam  ' + this.asset);
      console.log(this.uTeam + 'uTeam');
    } else if (this.data.page.pageName == 'updateAsset') {
      this.uAsset = true;
      this.uTeam = false;
      this.asset = false;
      this.team = false;
      this.deleteAsset = false;
      this.deleteTeam = false;
      console.log('for uAsset  ' + this.asset);
      console.log(this.uAsset + 'uAsset');
    } else if (this.data.page.pageName == 'deleteAsset') {
      this.deleteAsset = true;
      this.deleteTeam = false;
      this.uAsset = false;
      this.uTeam = false;
      this.asset = false;
      this.team = false;
      console.log('for uAsset  ' + this.asset);
      console.log(this.uAsset + 'uAsset');
    } else if (this.data.page.pageName == 'deleteTeam') {
      this.deleteTeam = true;
      this.deleteAsset = false;
      this.uAsset = false;
      this.uTeam = false;
      this.asset = false;
      this.team = false;
      console.log('for uAsset  ' + this.asset);
      console.log(this.uAsset + 'uAsset');
    }

    if (this.team) {
      this.saveFormGroup = this.formBuilder.group({
        memberName: ['', [Validators.required]],
        memberEmail: ['', [Validators.required]],
        memberRole: ['', [Validators.required]],
      });
    } else if (this.uTeam) {
      this.saveFormGroup = this.formBuilder.group({
        memberName: ['', [Validators.required]],
        memberEmail: ['', [Validators.required]],
        memberRole: ['', [Validators.required]],
      });
      this.saveFormGroup.patchValue({
        memberName: this.data.page.elementData.member_name,
        memberEmail: this.data.page.elementData.member_email,
        memberRole: this.data.page.elementData.member_role,
      });
    } else if (this.asset) {
      this.saveFormGroup = this.formBuilder.group({
        plant: ['', [Validators.required]],
        processArea: ['', [Validators.required]],
        asset: ['', [Validators.required]],
      });
    } else if (this.asset || this.uAsset) {
      let rcaid: any = this.data.page.elementData.rcaId;
      let assetid: any = this.data.page.elementData.assetId;
      // console.log(rcaid+"vvvvvvvvvv"+ assetid);
      this._service.getSingleData(assetid, rcaid).subscribe((res) => {
        console.table(res);
        this.saveFormGroup.patchValue({
          plant: res[0].plant,
          processArea: res[0].processArea,
          asset: res[0].asset,
        });
      });
      this.saveFormGroup = this.formBuilder.group({
        plant: ['', [Validators.required]],
        processArea: ['', [Validators.required]],
        asset: ['', [Validators.required]],
      });
    } else if (this.deleteAsset) {
      this.saveFormGroup = this.formBuilder.group({
        plant: ['', [Validators.required]],
        processArea: ['', [Validators.required]],
        asset: ['', [Validators.required]],
      });
    } else if (this.deleteTeam) {
      this.saveFormGroup = this.formBuilder.group({
        plant: ['', [Validators.required]],
        processArea: ['', [Validators.required]],
        asset: ['', [Validators.required]],
      });
    }
  }

  saveDetailsAsset() {
    console.log(this.data.page.pageName + '  << saveDetailsTeam');
    console.log(this.saveFormGroup.value);
    // let rca_id = "cfc16d56-29d3-11ed-a261-0242ac120002";
    // console.log(rca_id);
    let rca_id = localStorage.getItem('rca_id');
    console.log(rca_id);
    this._service.saveAsset(rca_id, this.saveFormGroup.value).subscribe({
      next: (res) => {
        console.log(res);
        alert(res);
        this.AssetTable.getFreshData();
      },
      error: () => {
        alert(' Failed ! ');
      },
    });
  }

  saveDetailsTeam() {
    let rca_id = localStorage.getItem('rca_id');
    console.log(rca_id);
    this._service2.saveTeam(rca_id, this.saveFormGroup.value).subscribe({
      next: (res) => {
        console.log(res);
        alert(res);
        this.TeamTable.getFreshData();
      },
      error: () => {
        alert(' Failed ! ');
      },
    });
  }

  updateDetailsAsset() {
    let rca_id: any = this.data.page.elementData.rcaId;
    let assetId: any = this.data.page.elementData.assetId;
    this._service
      .updateAsset(rca_id, assetId, this.saveFormGroup.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert(res);
        },
        error: () => {
          alert(' Failed ! ');
        },
      });
  }

  updateDetailsTeam() {
    console.log(this.data.page.pageName + '  << saveDetailsTeam');
    console.log(this.saveFormGroup.value);
    // let rca_id = "cfc16d56-29d3-11ed-a261-0242ac120002";
    // let member_id = 9;
    // console.log(   "tttttttttt" + this.data.page.elementData.member_id);
    let rca_id = this.data.page.elementData.rca_id;
    let member_id = this.data.page.elementData.member_id;
    this._service2
      .updateTeam(rca_id, member_id, this.saveFormGroup.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert(res);
        },
        error: () => {
          alert(' Failed ! ');
        },
      });
  }

  deleteAssetm() {
    let rca_id = localStorage.getItem('rca_id');
    let assetId = this.data.page.elementData.assetId;
    this._service.deleteAsset(rca_id, assetId).subscribe({
      next: (res) => {
        console.log(res);
        alert(res);
      },
      error: () => {
        alert(' Failed ! ');
      },
    });
  }
  deleteTeamm() {
    let rca_id = localStorage.getItem('rca_id');
    let member_id = this.data.page.elementData.member_id;
    this._service2.deleteTeam(rca_id, member_id).subscribe({
      next: (res) => {
        console.log(res);
        alert(res);
      },
      error: () => {
        alert(' Failed ! ');
      },
    });
  }

  erase() {
    this.asset = false;
    this.team = false;
  }
}
