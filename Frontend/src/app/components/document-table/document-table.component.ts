import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/app/services/event.service';
import {
  documentinfo,
  FileuploaderService,
} from 'src/app/services/fileuploader.service';

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss'],
})
export class DocumentTableComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileuploaderService,
    private _eventService: EventService
  ) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      files: [null],
    });
    this._eventService.on<string>().subscribe((data) => {
      console.log('inside doc');
      console.log(data);

      this.getAllfiles();
    });
  }

  allfiles: any = [];
  displayedColumns: string[] = ['document_name', 'document_id'];
  dataSource: any;

  getAllfiles() {
    let rcaid = sessionStorage.getItem('rca_id');
    this.fileUploadService.getfiles(rcaid).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = res.data;
      },
    });
  }

  uploadFile(event: any) {
    const files = event.target.files;
    if (files) {
      this.allfiles = files;
    }

    const formData: any = new FormData();
    for (let file of this.allfiles) {
      formData.append('document', file);
    }

    let rcaid = sessionStorage.getItem('rca_id');
    let resData: any = [];
    this.fileUploadService.uploadfiles(rcaid, formData).subscribe((res) => {
      // console.log("done");
      for (let i = 0; i < res.data.length; i++) {
        resData.push(res.data[i]);
      }
      this.dataSource = resData;
    });
    // console.log(resData);
  }
}
