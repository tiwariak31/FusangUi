import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../general.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  showticket = Boolean(false);
  showCustomer = Boolean(true);
  tableData: any = [];

  columns: string[] = ['ticketNumber', 'info', 'createdDate', 'status'];
  newColumns: any[] = [
    {
      'name': 'Ticket Number',
      'value': 'ticketNumber'
    },
    {
      'name': 'Info',
      'value': 'info'
    },
    {
      'name': 'Time',
      'value': 'createdDate'
    },
    {
      'name': 'Type',
      'value': 'workflowType'
    },
    {
      'name': 'Status',
      'value': 'status'
    }
  ];
  constructor(private gs: GeneralService, private ss: SharedService) { }

  ngOnInit() {
    this.ticketList();
  }

  ticketList() {
    const reqParam = {
    };
    this.gs.generalServiceInfo('service/getTicketList?page=0&size=0', 'post', reqParam)
      .subscribe(
        res => {
          if ( res['status'].toString() === 'success') {
            // this.ss.TotalTableData(res['data']);
            sessionStorage.setItem('workflowObject', JSON.stringify(res['data']));
          res['data'].forEach((element) => {
                this.tableData.push({ 'ticketNumber': element.ticketNumber,
               'info': element.info,
               'createdDate': element.createdDate,
               'workflowType': element.workflowType,
               'status': element.ticketStatus,
               'id': element.id
              });
      });
      this.ss.TableData(this.tableData);
      this.ss.DisplayedColumn(this.newColumns);
    } else {

    }
        },
        e => {
            // }
              },
        () => {
        }
      );
  }

}
