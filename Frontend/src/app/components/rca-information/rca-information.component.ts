import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DeleteRefreshService } from 'src/app/services/delete-refresh.service';
import { EventService } from 'src/app/services/event.service';
import { RCAresetService } from 'src/app/services/rcareset.service';

@Component({
  selector: 'app-group',
  templateUrl: './rca-information.component.html',
  styleUrls: ['./rca-information.component.css'],
})
export class RcaInformationComponent implements OnInit {
  rcaName: string = '';
  show: boolean = false;
  some: boolean = true;
  getData: boolean = false;
  rcaID: string = '-';
  caseId: string = '-';
  source: string = '-';
  time: string | Date = '-';
  owner: string = '-';
  status: string = '-';
  underLine = 'false';
  flushDate: boolean = false;
  resetStepper: boolean = false;
  constructor(
    private _eventService: EventService,
    private _api: ApiService,
    private rcareset: RCAresetService,
    private _deleteRefresh: DeleteRefreshService
  ) {}

  ngOnInit(): void {
    this._api.rcaDataSource$.subscribe((obj) => {
      console.log('component interaction2');
      console.log(obj);
      this.rcaName = obj.rca_name;
      this.owner = obj.owner;
      this.rcaID = obj.rca_id;
      this.source = obj.source;
      this.status = 'RCA Pending';
      this.time = obj.creation_date;
      this.caseId = obj.case_id;
      this.flushDate = false;
      // this.rcaName.v['rcaName'].patchValue(obj.rca_name)
    });
    this._eventService.on<boolean>().subscribe((data) => {
      this.getData = data;
      if (data == true) {
        this.getDataFromStorage();
        this.flushDate = false;
      } else if (data == false) {
        this.some = true;
        this.show = false;
      }
    });
    this.rcareset.on<boolean>().subscribe((data) => {
      this.resetStepper = data;

      if (data == true) {
        this.rcaName = '';

        this.some = true;

        this.show = false;

        this.rcaID = this.caseId = this.source = this.status = this.owner = '-';

        this.flushDate = true;
      }
    });

    this._deleteRefresh.on<string>().subscribe((data) => {
      if (data == 'deleted') {
        this.rcaName = '';
        this.some = true;
        this.show = false;
        this.rcaID = this.caseId = this.source = this.status = this.owner = '-';
        this.flushDate = true;
      }
    });
  }

  focusOutFunction(event: any) {
    console.log(event.target.value);
    this._eventService.emit<any>(event.target.value);
  }

  getDataFromStorage() {
    this.rcaID = localStorage.getItem('rca_id')?.substring(28) || '-';
    this.caseId = localStorage.getItem('case_id') || '-';
    this.source = localStorage.getItem('source') || '-';

    this.time = localStorage.getItem('creation_date') || '-';
    this.owner = localStorage.getItem('owner') || '-';
    this.status = localStorage.getItem('status') || '-';
    this.some = false;
    this.show = true;
    this.underLine = 'true';
  }

  send() {
    this.rcareset.emit<boolean>(true);
  }
}
