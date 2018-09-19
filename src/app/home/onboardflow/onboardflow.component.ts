import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApproverInformation } from '../users/invite-customers/approverInfo';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { GeneralService } from '../../general.service';
import { SharedService } from '../../shared.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-onboardflow',
  templateUrl: './onboardflow.component.html',
  styleUrls: ['./onboardflow.component.css']
})
export class OnboardflowComponent implements OnInit {
  ExpandText: any = '';
  x: { 'name': string; 'id': number; 'visible': boolean; 'icon': string; 'role': string[]; }[];
  filteredValues: any = [];
  totalFilteredValues: any = [];
  showEdit: Boolean = true;
  modalRef: BsModalRef;
  model: any = {};
  rejectRef: BsModalRef;
  confirmRef: BsModalRef;
  workflowType: any = '';
  workflow: any = [];
  approve: any = '';
  reject: any = '';
  workflowObject: any = {};
  onbordingDetails: any = [];
  transactionDetails: any = [];
  usdDetails: any = [];
  oneUsdvalue: any = '';
  usdInfo: any = [];
  dollerInfo: any = [];
  insightsInfo: any = {};
  departmentdetails: any = [];
  workflowbtn = 'Verify';
  dataList: any;
  cType: boolean;
  allExpandState: any;
  // tslint:disable-next-line:max-line-length
  constructor(private modalService: BsModalService, private gs: GeneralService, private ss: SharedService, private toastr: ToastrService, private router: Router) {}
  ngOnInit() {
this.workflowObject = JSON.parse(sessionStorage.getItem('workflowObject1'));
this.workflowType = this.workflowObject.workflowType;

  if (this.workflowObject.ticketStatus === 'Open') {
    this.allExpandState = false;
    this.ExpandText = 'Expand';
  } else {
    this.allExpandState = true;
    this.ExpandText = 'Collapse';
  }



  this.getinvitedata();
      this.getWorkflow();
      this.getdetials();
// servicid 41
// trns servie 23
this.gs.getBitCoin('https://blockchain.info/ticker')
      .subscribe(
        res => {
          this.usdDetails = res;
          this.oneUsdvalue = this.usdDetails.USD.last;
        },
        e => {
        },
        () => {
        }
      );
    // this.workflow = [
    //   {
    //     'status': 'Pending',
    //     'isDone': true
    //   },
    //   {
    //     'status': 'I-Verified',
    //     'isDone': true
    //   },
    //   {
    //     'status': 'I-Checked',
    //     'isDone': true
    //   },
    //   {
    //     'status': 'I-Approved',
    //     'isDone': false
    //   },
    //   {
    //     'status': 'SignedUp',
    //     'isDone': false
    //   },
    //   {
    //     'status': 'S-Verified',
    //     'isDone': false
    //   },
    //   {
    //     'status': 'S-Checked',
    //     'isDone': false
    //   },
    //   {
    //     'status': 'S-Approved',
    //     'isDone': false
    //   },
    //   {
    //     'status': 'Active',
    //     'isDone': false
    //   }
    // ];
  }
  expand() {
    this.allExpandState = !this.allExpandState;
    if (this.allExpandState) {
      this.ExpandText = 'Collapse';
  } else {
    this.ExpandText = 'Expand';
  }
  }
  editCustomerInfo() {
    this.showEdit = false;
  }
  resetCustomerInfo() {
    this.showEdit = true;
  }
  saveCustomerInfo() {
    this.showEdit = true;
  }
  getinvitedata() {
    this.x = ApproverInformation.data;
    const url = 'department/getDepartmentList';
    this.gs.generalServiceInfo(url, 'post', '')
  .subscribe(
    res => {
        this.x = res['data'];
       },
      e => {

      },
      () => {

        }
      );
  }
  policyinsight(bittransfer: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    bittransfer,
    Object.assign({}, { class: 'policypopup modal-lg' })
  );
}

onDeptSelect(item) {
  // const url = '/assets/json/deptList' + item.id + '.json';
  const url = 'department/getUserDepartmentRoleList';

  // this.gs.localfileinfo(url)
  let data: any;
  data = {
    'id': item.id
  };
  this.gs.generalServiceInfo(url, 'post', data)
  .subscribe(
    res => {
      // this.x = res;
      this.dataList = res['data'];
    },
    e => {
    },
    () => {
    }
  );
}
onFocus(val) {
  // console.log(val);
  this.filteredValues = this.dataList[val];
  this.totalFilteredValues = this.dataList[val];
}
onValChange(val, mod) {
  if (typeof(val) === 'string' || val === '') {
    // console.log('number');
    this.filteredValues = _.filter(this.totalFilteredValues, (o) => {
      return o.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  } else {
  }
}

confirmChecking(confirmchecking: TemplateRef<any>) {
  this.confirmRef = this.modalService.show(confirmchecking, Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
}
rejectVerification(rejectverification: TemplateRef<any>) {
  this.rejectRef = this.modalService.show(rejectverification, Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
}

getWorkflow() {
  this.cType = false;
  // this.ss.workflowObject$.subscribe(
  //   res => {
  //     this.workflowObject = res;
  //     console.log(this.workflowObject);
  //     this.workflowType = this.workflowObject.workflowType;
  //    }
  //  );
  const url = 'service/getWorkflowStatus?serviceRequestId=' + this.workflowObject['id'];
  this.gs.generalServiceInfo(url, 'post', '')
  .subscribe(
    res => {
         this.workflow = res['data'];
         this.workflow.forEach(element => {
          element.statusType = 'notActive';
          element.status = element.status.split('Pre').join('');
          element.status = element.status.split('Post').join('');
          if (element.status === 'Active') {
            element.status = 'SignIn';
          }
         });
         if (this.workflowType === 'CustomerInvite') {
          this.cType = _.find(this.workflow, function(o) { return o.status === 'SignUp'; }).isDone;
         } else if (this.workflowType === 'Transaction') {
          this.cType = true;
         } else {
           this.cType = false;
         }
        //  this.cType = (_.find(this.workflow, function(o) { return o.status === 'SignUp'; }).isDone);
         for (let i = 0 ; i < this.workflow.length ; i++) {
           if (this.workflow[i]['isDone'] === false) {
            this.workflow[i].statusType = 'Active';
            break;
           }
         }
         for (let i = 0 ; i < this.workflow.length ; i++) {
          if (this.workflow[i]['statusType'] === 'Active') {
               if (this.workflow[i]['status'] === 'Checked') {
                    this.workflowbtn = 'Check';
               } else if (this.workflow[i]['status'] === 'Verified') {
                    this.workflowbtn = 'Verify';
               } else if (this.workflow[i]['status'] ===  'Approved') {
                    this.workflowbtn = 'Approve';
               }
          }
        }
    },
    e => {

    },
    () => {
    }
  );
}
// geting onbording and transaction workflow information
getdetials() {
  const url = 'service/getUserDetails?serviceRequestId=' + this.workflowObject['id'];
  // const url = 'service/getUserDetails?serviceRequestId=41' + this.workflowObject['41'];
  this.gs.generalServiceInfo(url, 'post', '')
        .subscribe(
          res => {
            this.onbordingDetails = res['data'];
            if (this.onbordingDetails['userDepartmentRoleDetails'] !== null) {
            this.departmentdetails = this.onbordingDetails['userDepartmentRoleDetails'];
            this.departmentdetails.forEach(element => {
              let deptId: any;
              deptId = element.id;
              element.userList.forEach(el => {
                let roleType: any, userType: any;
                roleType = el.roleType;
                userType = el.userType;
                this.model[userType + '_' + deptId + '_' + roleType.toUpperCase()] = el.userDetails;
              });
            });
          }
          if (this.onbordingDetails['transactionDetailsResponseDTO'] !== null) {
            this.transactionDetails = this.onbordingDetails['transactionDetailsResponseDTO'];
          }
            this.insightsInfo = this.onbordingDetails['insight'];
            this.dollerInfo = this.usdDetails.USD;
            this.usdInfo = this.transactionDetails.btc * this.dollerInfo.last;
          },
          e => {
          },
          () => {
          }
        );
}
displayFn(user): string {
  if (user === null || user === undefined || user === '') {
    return '';
  } else {
    return user ? user.name : user;
  }
}
updateDetail(dataValue) {
  const url = 'service/updateTicketDetail';
  let Notedata;
  if (dataValue === 'Close') {
    Notedata = this.approve;
  } else {
    Notedata = this.reject;
  }
  const data = {
    'note': Notedata,
    'ticketId': this.workflowObject.id,
    'ticketStatus': dataValue
  };
  this.gs.generalServiceInfo(url, 'post', data)
  .subscribe(
    res => {
      let msg: any;
      msg = '';
      if (this.workflowbtn === 'Check') {
        msg = 'Record Checked Successfully';
      } else if (this.workflowbtn === 'Verify') {
        msg = 'Record Verified Successfully';
      } else if (this.workflowbtn === 'Approve') {
        msg = 'Record Approved Successfully';
      }
      if (res['status'].toString() === 'success') {
        if (dataValue === 'Close') {
          this.confirmRef.hide();
        } else {
          this.rejectRef.hide();
        }

        this.ss.ToasterMessage(msg);
          document.getElementById('modalButton').click();
        this.getWorkflow();
        this.router.navigate(['/fusang/ticket']);
      } else {
        this.ss.ToasterMessage(res['message']);
          document.getElementById('modalButton1').click();
      }
    },
    e => {

    },
    () => {
    }
  );
}
}
