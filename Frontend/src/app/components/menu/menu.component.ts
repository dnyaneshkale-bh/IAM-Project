import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DeleteRefreshService } from 'src/app/services/delete-refresh.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(
    private api: ApiService,
    private _eventService: EventService,
    private _deleteRefresh: DeleteRefreshService
  ) {}

  ngOnInit(): void {
    this._eventService.on<boolean>().subscribe((data) => {
      this.getAllRca();
    });

    this.api.deletercaInfo$.subscribe((id) => {
      this.api.deleteRCA(id).subscribe({
        next: (res) => {
          console.log('deleting from menu component');

          console.log(res);
          this.getAllRca();
        },
        error: (err) => {
          console.log(err);
        },
      });
      console.log('delted rca');

      // window.location.reload();
    });

    this.api.shareRca$.subscribe((data) => {
      console.log('shared data');
      console.log(data);
      this.api.getRCA().subscribe({
        next: (data) => {
          console.table(data.message);
          this.cards = data.message;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });

    // this.api.deletercaInfo$.subscribe(
    //   id=>{
    //     this.api.deleteRCA(id).subscribe({
    //       next:(res)=>{
    //         console.log(res);

    //       },
    //       error:(err)=>{
    //         console.log(err);

    //       },
    //     })
    //     console.log("delted rca");

    //     this.getAllRca();
    //     window.location.reload();
    //   }

    // )
    this.api.getRCA().subscribe({
      next: (res) => {
        console.log(res.message);
        this.cards = res.message;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._deleteRefresh.on<string>().subscribe((data) => {
      this.getAllRca();
      if (data == 'deleted') {
        this.getAllRca();
      }
    });
  }
  toggle: boolean = true;
  bool: boolean = true;
  countCards: number = 0;
  filteredString: string = '';

  setBool() {
    this.bool = true;
  }

  unsetBool() {
    this.bool = false;
  }
  cards = [{}];
  // cards = [
  //   {
  //     rca_id: '245687',
  //     rca_name: 'NDE bearing distressed',
  //     facility_name: 'Distilation Tower Plant/Coker Unit',
  //     severity: 'High Risk',
  //     status: 'open',
  //   },
  //   {
  //     rca_id: '245688',
  //     rca_name: 'This is closed',
  //     facility_name: 'Distilation Tower Plant/Coker Unit',
  //     severity: 'High Risk',
  //     status: 'closed',
  //   },
  //   {
  //     rca_id: 'RCA ID',
  //     rca_name: 'RCA Name',
  //     facility_name: 'Facility Name',
  //     severity: 'Severity',
  //     status: 'open',
  //   },
  //   {
  //     rca_id: '245689',
  //     rca_name: 'Test Name',
  //     facility_name: 'Power Tower Plant/Pepsi Unit',
  //     severity: 'High Risk',
  //     status: 'open',
  //   },
  //   {
  //     rca_id: '245690',
  //     rca_name: 'NDE bearing distressed',
  //     facility_name: 'Distilation Tower Plant/Coker Unit',
  //     severity: 'High Risk',
  //     status: 'open',
  //   },
  //   {
  //     rca_id: '245691',
  //     rca_name: 'NDE bearing distressed',
  //     facility_name: 'Distilation Tower Plant/Coker Unit',
  //     severity: 'High Risk',
  //     status: 'open',
  //   },
  //   {
  //     rca_id: '245692',
  //     rca_name: 'NDE bearing distressed',
  //     facility_name: 'Distilation Tower Plant/Coker Unit',
  //     severity: 'High Risk',
  //     status: 'open',
  //   },
  //   {
  //     rca_id: '245693',
  //     rca_name: 'NDE bearing distressed',
  //     facility_name: 'Distilation Tower Plant/Coker Unit',
  //     severity: 'High Risk',
  //     status: 'open',
  //   },
  //   {
  //     rca_id: '245694',
  //     rca_name: 'NDE bearing distressed',
  //     facility_name: 'Distilation Tower Plant/Coker Unit',
  //     severity: 'High Risk',
  //     status: 'open',
  //   },
  //   {
  //     rca_id: '245695',
  //     rca_name: 'NDE bearing distressed',
  //     facility_name: 'Distilation Tower Plant/Coker Unit',
  //     severity: 'High Risk',
  //     status: 'open',
  //   },
  //   {
  //     rca_id: '245696',
  //     rca_name: 'NDE bearing distressed',
  //     facility_name: 'Distilation Tower Plant/Coker Unit',
  //     severity: 'High Risk',
  //     status: 'open',
  //   },
  //   {
  //     rca_id: '245678',
  //     rca_name: 'NDE bearing distressed',
  //     facility_name: 'Distilation Tower Plant/Coker Unit',
  //     severity: 'High Risk',
  //     status: 'closed',
  //   },
  // ];
  //  deleteRca(){
  //   this.deleteRca().subscribe({
  //     next: (res) => {
  //       console.log(res.message);
  //       this.cards = res.message;
  //   })
  //  }
  // deleteRCA(){
  //   this.api.deletercaInfo$.subscribe(
  //     id=>{
  //       this.api.deleteRCA(id).subscribe({
  //         next:(res)=>{
  //           console.log("deleting from menu component");

  //           console.log(res);
  //           this.getAllRca();
  //         },
  //         error:(err)=>{
  //           console.log(err);

  //         },
  //       })
  //       console.log("delted rca");

  //      // window.location.reload();
  //     }

  //   )
  // }

  getAllRca() {
    this.api.getRCA().subscribe({
      next: (res) => {
        // console.table(res.message);
        let arr = [...res.message];
        this.cards = arr;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
