import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from '../dialog/dialog.component';
import { AssetServiceService } from 'src/app/services/asset-service.service';
import { ApiService } from 'src/app/services/api.service';
import { EventService } from 'src/app/services/event.service';

export interface assetdataSource {
  plant: string;
  processArea: string;
  asset: string;
  assetId: number;
  edit: any;
}

const ELEMENT_DATA: assetdataSource[] = [];

@Component({
  selector: 'app-asset-table',
  templateUrl: './asset-table.component.html',
  styleUrls: ['./asset-table.component.css'],
})
export class AssetTableComponent implements OnInit {
  rcaId: any;
  displayedColumns: string[] = [
    'select',
    'plant',
    'processArea',
    'asset',
    'assetId',
    'edit',
  ];
  dataSource = new MatTableDataSource<assetdataSource>(ELEMENT_DATA);
  updatedRca_id!: any;
  constructor(
    public dialog: MatDialog,
    private _service: AssetServiceService,
    private _getCards: ApiService,
    private _eventService: EventService,
    private changeDetectorRefs: ChangeDetectorRef
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

    this._service.getAssetData(rcaId).subscribe({
      next: (res) => {
        // console.table(res);
        this.dataSource.data = res;
        // alert("in freshdata ..!");
      },
      error: () => {
        alert('failed..!');
      },
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<assetdataSource>(true, []);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filteredString: string = '';
  asset: any;

  assetOpenDialog() {
    this.asset = 'asset';
    this.openDialog2(this.asset);
  }

  assetUpdateOpenDialog(element: any) {
    this.asset = 'updateAsset';
    this.openDialog(this.asset, element);
  }

  deleteAsset(element: any) {
    this.asset = 'deleteAsset';
    this.openDialog(this.asset, element);
    // let rcaId = localStorage.getItem('rca_id');
    // console.log(element.rca_id+ "''"+ rcaId+";;;;;;;;;;;;"+element.assetId);
  }

  openDialog(pageDetails: any, element: any) {
    // console.log("====>qqq" + pageDetails);
    // console.log("===============element=================>" + element);
    this.dialog
      .open(DialogComponent, {
        // panelClass: 'mat-dialog-container2',

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
    // console.log("====>" + pageDetails);
    this.dialog
      .open(DialogComponent, {
        // panelClass: 'mat-dialog-container2',

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
    // this.getFreshData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
