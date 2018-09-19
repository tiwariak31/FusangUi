import { Component, OnInit, ViewChild, Input, AfterViewInit, TemplateRef } from '@angular/core';
import {MatSort, MatTableDataSource, MatAutocompleteSelectedEvent, MatPaginator} from '@angular/material';
import { GeneralService } from '../../general.service';
import { SharedService } from '../../shared.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit {
  statusList: any = [
    'All',
    'Invited',
    'Verified',
    'Checked',
    'Approved',
    'Rejected'
  ];
  @Input() hideIncustomer: boolean;
  @Input() hideInticket: boolean;
  displayedColumns: any[] = [];
  tableColumns: any[] = [];
  data = new MatTableDataSource();
  totalTableData = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obj: (o: {}) => string[];
  tabData: any = [];
  totalTabData: any = [];
  mycolumns: string[];
  showSearch = false;
  constructor(private router: Router,
     private fb: FormBuilder, private gs: GeneralService, private ss: SharedService, private modalService: BsModalService) {
    this.obj = Object.keys;
   }


  ngOnInit() {

    this.ss.displayedColumn.subscribe(
      res => {
        this.tableColumns = res;
        res.forEach(element => {
          this.displayedColumns.push(element.value);
        });
       }
     );
     this.ss.tableData.subscribe(res => {
       this.tabData = [];
     this.tabData = res;
     this.totalTabData = res;
     this.data = new MatTableDataSource(res);
     this.data.sort = this.sort;
     this.data.paginator = this.paginator;
    });
}

public showOnboarding(index, value) {
  this.totalTableData = [];
  // this.ss.totalTableData$.subscribe(
  //   res => {
  //     totalTableData = res[index];
  //     this.ss.WorkflowObject(totalTableData);
  //     console.log(this.ss.WorkflowObject(totalTableData));
  //    }
  //  );
  this.totalTableData = JSON.parse(sessionStorage.getItem('workflowObject'));
  this.totalTableData.forEach(element => {
    this.displayedColumns.push(element.value);
    if (element.id === value.id ) {
      sessionStorage.setItem('workflowObject1', JSON.stringify(element));
    }
  });
   this.router.navigate(['/fusang/onboarding']);
}

public searchClick() {
  this.showSearch = true;
}

statusChange(value) {
  this.tabData = [];
  this.totalTableData = [];
  this.totalTabData.forEach(element => {
    if ( value.toLowerCase() === element.status.toLowerCase() ) {
      this.tabData.push(element);
      this.totalTableData.push(element);
    } else if ( value.toLowerCase() === 'all') {
      this.tabData = this.totalTabData;
      this.totalTableData = this.totalTabData;
    }
  });
  this.data = new MatTableDataSource(this.tabData);
  this.data.sort = this.sort;
  this.data.paginator = this.paginator;
}
inviteCustomer() {
  document.getElementById('invitPopups').click();
}



}
