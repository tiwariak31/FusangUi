import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { GeneralService } from '../../../general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../shared.service';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/core';
import { ApproverInformation } from './approverInfo';
import * as _ from 'lodash';

@Component({
  selector: 'app-invite-customers',
  templateUrl: './invite-customers.component.html',
  styleUrls: ['./invite-customers.component.css']
})
export class InviteCustomersComponent implements OnInit {
  typeObj={
  "primary":'',
    "backup":'',
    "userRole":''
  }
  dpControl = new FormControl('', [
    Validators.email,
    
  ]);
  phoneNumber: any = '';
  model: any = {};
  modalRef: BsModalRef;
  basic:Boolean = true;
  approver:Boolean = false;
  cusclass:any=[];
  countrylist:any=[];
  countrylist1:any=[];
  basicmodel:any={firstName:'',
                  lastName: '',
                  country:'',
                  phoneNo:'',
                  email:''
                };
  x:any = [];
  fullformData:any={};
  userRelationshipManagerMap: any = [];
  relationshipManagerDetails: any = [];
  dataList: any = {};
  filteredOptions: Observable<string[]>;
  filteredValues: any = [];
  totalFilteredValues: any = [];
  code: any;
  phonelength: any;
  successRef: BsModalRef;
  complianceRef: BsModalRef;
  policyRef: BsModalRef;
  signupsuccessRef: BsModalRef;
  rejectRef: BsModalRef;
  confirmRef: BsModalRef;
  departmentLists: any = [];
  departmentSubListsVerfier: any;
  basicForm: any;
  approverForm: any;
  appService: any;
  msg: any;
  Yubikey: boolean=false;
  googleAuth: boolean=true;
  verificationCodeValid: boolean=false;
  googleCode:any;
  countryPhonelen: any;
  phonelenth: any;
  assignroles: boolean;
  roleDepartmentDetails:any=[];
  roleDepartmentObj:any={};
  userDetailsList:any=[];
  filterdDetailsList:any=[];
  roleList: any;
  tempObj:any={};
  constructor(private _domSanitizer: DomSanitizer, private modalService: BsModalService,
    private router: Router, private gs: GeneralService, private ss: SharedService, private toastr: ToastrService,
     private titlecasePipe: TitleCasePipe,private fb: FormBuilder ) { }

  ngOnInit() {
    this.basicForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required,Validators.pattern('^([0-9]{1,5})?([7-9][0-9]{7,9})$')]]
    });

    // this.approverForm = this.fb.group({
    //   account:{"verifier":['', Validators.required]},
    //   transaction:{},
    //   complience:{},
    //   policy:{},
    //   technical:{}
    // });
    // this.array= this.departmentLists.verifier

    this.getcountrylist();
    this.getinvitedata();
    this.getrolelist();
    // this.filteredOptions = this.basicForm.get('country').valueChanges.pipe(
    //   startWith(''),
    //   switchMap(value => {
    //     return this._filter(value)})
    // );
    // this.departmentLists.verifier=

    this.filteredOptions = this.basicForm
    .get('country')
    .valueChanges
    .pipe(
      map(value => {
        return this._filter(value)})
    );

    // this.phonelenth = this.basicForm
    // .get('phoneNumber')
    // .valueChanges
    // .pipe(
    //   map(value => {
    //     return this.validPhone = this.;)
    // );
    // this.showbasic();
    // this.showapprover();
  }
  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    // console.log(event.option.value);
    this.basicmodel.country = event.option.value;
    this.countrylist.forEach((element) => {
      if (event.option.value.toLowerCase() === element.name.toLowerCase()) {
        this.code = element.dial_code;
        this.countryPhonelen=element.length;
        console.log(this.countryPhonelen);
        this.phonelength = element.length;
        this.basicmodel.phoneNo = this.code + ' ';
      }
    });

  }

  inviteCustomer(invitetemplate: TemplateRef<any>, template: TemplateRef<any>) {
    // this.basicmodel=
    this.modalRef = this.modalService.show(invitetemplate,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }
  private _filter(value){
    if(value !=""){
    const filterValue = value.toLowerCase();
    return this.countrylist1.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  }
  getcountrylist() {
    const url = '/assets/countrylist.json';
    this.gs.localfileinfo(url)
    .subscribe(
      res => {
        this.countrylist = res['countrylist'];
        this.countrylist.forEach((element) => {
          this.countrylist1.push(element.name);
        });
      },
      e => {
      },
      () => {
      }
    );
  }
  invitedSuccessfull(successtemplate: TemplateRef<any>,msg, template: TemplateRef<any>){

    Object.keys(this.model).forEach((el) => {
      let deptId: any, index: any;
      deptId = '';
      deptId = el.split('_')[1];
      index = _.findIndex(this.userRelationshipManagerMap, function(o) { return o.departmentId === deptId; });
      if (index === -1) {
        this.userRelationshipManagerMap.push({'departmentId': deptId});
      }
    });

    this.userRelationshipManagerMap.forEach(dept => {
      let data: any, userTotalData: any;
      data = [], userTotalData = [];
      Object.keys(this.model).forEach((user) => {
        let type: any, deptId: any, obj: any;
        obj = {};
        type = user.split('_')[0];
        deptId = user.split('_')[1];
        if (deptId === dept.departmentId) {
          obj['userRole'] = this.model[user].userRole;
          obj['userType'] = {
            'type': type,
            'id': this.model[user].id
          };
          data.push(obj);
        }
        // console.log('data', data);
      });
      data.forEach(userObject => {
        let userData: any, userInfo: any;
        userInfo = {};
        userData = _.filter(data, (o) => {
          return o.userRole === userObject.userRole;
        });
        userData.forEach(ui => {
          userInfo['userRole'] = ui.userRole;
          userInfo[ui.userType.type] = ui.userType.id;
        });
        userTotalData.push(userInfo);
      });
      userTotalData = _.uniqBy(userTotalData, 'userRole');
      dept['relationshipManagerDetails'] = userTotalData;
    });
    this.fullformData.userRole="USER";
    this.fullformData.departmentId= null;
    this.fullformData.userRelationshipManagerMap=this.userRelationshipManagerMap;
    console.log(this.fullformData);
    const url = 'user/inviteCustomer';
    this.gs.generalServiceInfo(url,'post',this.fullformData)
    .subscribe(
      res => {
        this.msg = res["message"];
      },
      e => {
      },
      () => {
      }
    );
   //lines for model open and heid
    // this.userRelationshipManagerMap.push()
    // console.log( this.AccountManagementList);
    this.modalRef.hide();
    this.successRef = this.modalService.show(successtemplate,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }
  getinvitedata() {
    // this.x = ApproverInformation.data;
    // const url = '/assets/json/inviteaccordion.json';
    const nullobj={}
    const url= 'department/getDepartmentList'
    this.gs.generalServiceInfo(url,'post',nullobj)
    .subscribe(
      res => {
        this.x = res['data'];
        console.log(this.x);
        console.log(this.x[0]['name']);
        // this.x.forEach(element => {
        //   this.userDepList.push(element.name);
        // });
      },
      e => {
      },
      () => {
      }
    );
  }
  showbasic() {
    this.basic = true;
    this.approver = false;
    this.assignroles=false
  }
  showapprover() {
    Object.keys(this.basicForm.value).forEach(element => {
      this.fullformData[element]=this.basicForm.value[element]

    });
    this.basic = false;
    this.approver = true;
    this.assignroles=false
  }
  showassignroles(){
    Object.keys(this.basicForm.value).forEach(element => {
      this.fullformData[element]=this.basicForm.value[element]

    });
    this.basic = false;
    this.approver = false;
    this.assignroles=true;
  }
  nexttab(){
    Object.keys(this.basicForm.value).forEach(element => {
      this.fullformData[element]=this.basicForm.value[element]

    });
    console.log( this.fullformData);
    this.showapprover()
  }
  onDeptSelect(item) {
    // const url = '/assets/json/deptList' + item.id + '.json';
    const url ="department/getUserDepartmentRoleList";

    // this.gs.localfileinfo(url)
    let data: any;
    data = {
      'id': item.id
    };
    this.gs.generalServiceInfo(url, "post", data)
    .subscribe(
      res => {
        // this.x = res;
        this.dataList = res['data'];
        console.log(res);
      },
      e => {
      },
      () => {
      }
    );
  }
  onFocus(val) {
    // console.log(val);
    // debugger
    this.filteredValues = this.dataList[val];
    console.log(this.filteredValues );
    this.totalFilteredValues = this.dataList[val];
  }
  onValChange(val, mod) {
    if (typeof(val) === 'string' || val === '') {
      // console.log('number');
      this.filteredValues = _.filter(this.totalFilteredValues, (o) => {
        return o.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      // let data: any;
      // data = _.find(this.filteredValues, (o) => {
      //   return o.id === val;
      // });
      // this.model[mod] = data.name;
    }
    // this.filteredValues = _.filter(this.totalFilteredValues, (o) => {
    //   return o.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
    // });
  }

  displayFn(user): string {
    // debugger
    if (user === null || user === undefined || user === '') {
      return '';
    } else {
      return user ? user.name : user;
    }
  }

  signupSuccess(signupsuccess: TemplateRef<any>, template: TemplateRef<any>){
    this.signupsuccessRef = this.modalService.show(signupsuccess,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }


  policyInsights(policyinsights: TemplateRef<any>, template: TemplateRef<any>) {
    this.policyRef = this.modalService.show(policyinsights,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }
  complianceInsights(complianceinsights: TemplateRef<any>, template: TemplateRef<any>) {
    this.complianceRef = this.modalService.show(complianceinsights,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }
  confirmChecking(confirmchecking: TemplateRef<any>){
    this.confirmRef = this.modalService.show(confirmchecking,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }
  rejectVerification(rejectverification: TemplateRef<any>){
    this.rejectRef = this.modalService.show(rejectverification,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }

  // getinvitedata(){
  //   const url = '/assets/json/inviteaccordion.json';
  //   this.gs.localfileinfo(url)
  //   .subscribe(
  //     res => {
  //       this.x = res;
  //     },
  //     e => {
  //     },
  //     () => {
  //     }
  //   );
  // }
  authPublic(auth: TemplateRef<any>){
    this.modalRef = this.modalService.show(auth,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }
  showgooleAuth() {
    this.googleAuth = true;
    this.Yubikey = false;
  }
  showyubikey() {
    this.googleAuth = false;
    this.Yubikey = true;
  }
  validate(){
    alert('need to call API');
  }
  vcValidation(event) {
    if (event.length === 6) {
      this.verificationCodeValid = true;
    } else {
      this.verificationCodeValid = false;
    }
  }
  getLength(x) {
    return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
  }
  //invite user functions------------------------------------------------
  onDepFocus(){
    this.userDetailsList = this.x;
    this.filterdDetailsList=this.x
    console.log(this.x);
 }
 onRoleFocus(){
   this.userDetailsList = this.roleList;
   this.filterdDetailsList=this.roleList
   console.log(this.x);
}

addDepartment() {
 debugger
 this.roleDepartmentDetails.push(this.tempObj);
}

onDepSearch(val) {
 if (typeof(val) === 'string' || val === '') {
   // console.log('number');
   this.userDetailsList = _.filter(this.filterdDetailsList, (o) => {
     return o.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
   });
 } 
}

inviteUser(){
 // this.roleDepartmentDetails.push(this.roleDepartmentObj)
 console.log(this.roleDepartmentObj);
}
deleteDepartment(i){
 debugger
 this.roleDepartmentDetails.splice(i, 1)
}
onDepChanged(event: MatAutocompleteSelectedEvent){
 let departmentId = event.option.value.id;
 this.tempObj.departmentId=departmentId
 debugger

}  
onRoleChanged(event: MatAutocompleteSelectedEvent){
 let userRole = event.option.value;
 this.tempObj.userRole=userRole;
 debugger

}
getrolelist(){

  const nullobj={}
  const url= 'user/getRoleList'
  this.gs.generalServiceInfo(url,'post',nullobj)
  .subscribe(
    response => {
      this.roleList = response['data'];
      console.log(this.x);
      // console.log(this.x[0]['name']);
      // this.x.forEach(element => {
      //   this.userDepList.push(element.name);
      // });
    },
    e => {
    },
    () => {
    }
  );
}
  
}