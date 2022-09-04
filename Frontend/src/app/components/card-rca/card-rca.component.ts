import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MenuComponent } from '../menu/menu.component';
import { EventService } from 'src/app/services/event.service';
import { DeleteRefreshService } from 'src/app/services/delete-refresh.service';
@Component({
  selector: 'app-card-rca',
  templateUrl: './card-rca.component.html',
  styleUrls: ['./card-rca.component.css'],
})
export class CardRCAComponent implements OnInit {
  @Input() public hero: any;
  constructor(
    private _api: ApiService,
    public dialog: MatDialog,
    private menu: MenuComponent,
    private _eventService: EventService,
    private _deleteRefresh: DeleteRefreshService
  ) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog
      .open(DeleteDialogComponent, {
        width: '500px',
        data: this.hero,
        enterAnimationDuration,
        exitAnimationDuration,
      })
      .afterClosed()
      .subscribe((val) => {
        // this.menu.getAllRca();
        this._deleteRefresh.emit<string>('deleted');
        if (val == 'deleted') {
          console.log(val);
        }
      });
  }

  ngOnInit(): void {
    console.log('ng oninit card');
  }
  editRCA() {
    localStorage.setItem('rca_id', this.hero.rca_id);

    sessionStorage.setItem('rca_id', this.hero.rca_id);
    this._eventService.emit<boolean>(false);
    // console.table(this.hero);
    this._api.sendRcaData(this.hero);
  }

  deleteRCA() {
    // console.table(this.hero);
    this._api.deleteRcaData(this.hero.rca_id);
    // this.menu.getAllRca();
    this.ngOnInit();
  }

  id_number = '245687';
  title_name = 'NDE bearing distressed';
  subtitle_name = 'Distilation Tower Plant/Coker Unit';
  tag_name = 'High Risk';
}
