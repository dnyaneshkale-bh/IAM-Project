import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { TeamServiceService } from 'src/app/services/team-service.service';
import { EventService } from 'src/app/services/event.service';
import { ApiService } from 'src/app/services/api.service';

export interface teamdataSource {
  name: string;
  email: string;
  role: string;
  edit: any;
}

const ELEMENT_DATA: teamdataSource[] = [];

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.css'],
})
export class TeamTableComponent implements OnInit, AfterViewInit {
  rcaId: any;
  displayedColumns: string[] = ['select', 'name', 'email', 'role', 'edit'];
  dataSource = new MatTableDataSource<teamdataSource>(ELEMENT_DATA);

  constructor(
    public dialog: MatDialog,
    private _service: TeamServiceService,
    private _eventService: EventService,
    private _getCards: ApiService
  ) {}

  ngOnInit(): void {
    this._eventService.on<boolean>().subscribe((data) => {
      if (data == true) {
        this.getFreshData();
      }
    });
    this._getCards.rcaDataSource$.subscribe((obj) => {
      let x = obj;

      this.getFreshData();
    });
  }

  public getFreshData() {
    // let rcaId = "cfc16d56-29d3-11ed-a261-0242ac120002";
    let rcaId = localStorage.getItem('rca_id');
    this._service.getTeamData(rcaId).subscribe({
      next: (res) => {
        // console.table(res);
        this.dataSource.data = res;
      },
      error: () => {
        alert('failed..!');
      },
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<teamdataSource>(true, []);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filteredString: string = '';
  team: any;

  teamOpenDialog() {
    this.team = 'team';
    this.openDialog2(this.team);
  }

  teamUpdateOpenDialog(element: any) {
    this.team = 'updateTeam';
    this.openDialog(this.team, element);
  }

  deleteTeam(element: any) {
    this.team = 'deleteTeam';
    this.openDialog(this.team, element);
    // let rcaId = localStorage.getItem('rca_id');
    // console.log(element.rca_id+ "''"+ rcaId+";;;;;;;;;;;;"+element.assetId);
  }

  openDialog(pageDetails: any, element: any) {
    // console.log("====>" + pageDetails);
    // console.table("======element=======>" + element.member_role);
    this.dialog
      .open(DialogComponent, {
        data: {
          page: {
            pageName: pageDetails,
            elementData: element,
          },
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.getFreshData();
      });
  }

  openDialog2(pageDetails: any) {
    console.log('====>' + pageDetails);
    this.dialog
      .open(DialogComponent, {
        data: {
          page: {
            pageName: pageDetails,
          },
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.getFreshData();
      });
  }

  ngAfterViewInit() {
    this.getFreshData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
