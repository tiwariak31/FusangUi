import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { GeneralService } from '../../general.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { SharedService } from '../../shared.service';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  focusedElement: any;
  name = '';
  fname = '';
  inviteresult: any;
  itemValue: any = {
    userName: '',
    userEmailid: '',
    userrole: undefined,
  };
  selectedRole = 'Role of user';
  finalListArr: any;
  finalList = [];
  listUserDataCopy = [];
  listUserData = [];
  searchText = '';
  modalRef: BsModalRef;
  modalrefrence: BsModalRef;
  userName = '';
    isCollapsed = true;
    myval: any = 'select';
  constructor(private _domSanitizer: DomSanitizer, private modalService: BsModalService,
    private router: Router, private gs: GeneralService, private ss: SharedService, private toastr: ToastrService,
     private titlecasePipe: TitleCasePipe ) {

        }

  settings = {
    mode : 'inline',
        hideSubHeader : true,
        pager: {
            display: true,
            perPage: 10,
        },
        delete : {
            confirmDelete : true
        },
        // edit: {
        //   confirmSave: true,
          // editButtonContent: '<i class="fas fa-pencil-alt"></i>',
          // saveButtonContent: '<i class="fas fa-check"></i>',
          // cancelButtonContent: '<i class="fas fa-times"></i>',
        // },
        // actions: {
        //   add: false,
        //   edit: true,
        //   delete: false,
        //   position: 'right',
        // },
        actions: false,
    columns: {
      profilePic: {
        title: '',
        width: '20px',
      filter: false,
      type: 'html',
        // editable: false,
      valuePrepareFunction: (profilePic) => {
          return this._domSanitizer.bypassSecurityTrustHtml(`<img src="${profilePic}" alt="Smiley face" height="32" width="32"
          style="border-radius: 50%">`);
      }
  },
      firstName: {
        title: 'User Name',
        // editable: false,
        type: 'html',
        valuePrepareFunction: (value) => {
          return value = this.titlecasePipe.transform(value);
        },
      },
      // id: {
      //   title: 'ID'
      // },
      roles: {
        // editable: false,
        title: 'Role'
      },
      username: {
        // editable: false,
        title: 'Email ID',
      },
      // userType: {
      //   title: 'User Type',
      //   type: 'html',
      //   editor: {
      //     type: 'list',
      //     config: {
      //       list: [
      //         { value: '1', title: 'Deep Storage' },
      //         { value: '2', title: 'Secure Storage' },
      //         { value: '3', title: 'High Frequency' },
      //       ],
      //     },
      //   },
      // },

      // userType: {
      //   title: 'User Type',
      //   filter: {
      //     type: 'list',
      //     config: {
      //       selectText: 'Select...',
      //       list: [
      //         { value: '1', title: 'Deep Storage' },
      //         { value: '2', title: 'Secure Storage' },
      //         { value: '3', title: 'High Frequency' },
      //       ],
      //     },
      //   },
      // },

      status: {
        title: 'Status',
        type: 'html',
        // editable: false,
              valuePrepareFunction: (value) => {
                //   value = this.CBBdata
                if (value === 2) {
                  return `<img src='assets/images/dashboard/oval-4.png' > Active`;
                } else if (value === 1) {
                  return `<img src='assets/images/dashboard/Critical.png' > InActive`;
                }
              }
      }
    }
  };

  ngOnInit() {
    this.listUser();
  }
  openModal(template: TemplateRef<any> , successtemplate: TemplateRef<any>) {
    this.itemValue.userName = '';
    this.itemValue.userEmailid = '';
    this.itemValue.userrole = '';
    this.modalRef = this.modalService.show(template);
    // this.modalrefrence = this.modalService.hide(successtemplate);
    // this.modalrefrence.content.closeBtnName = 'Close';
  }


  listUser() {
    this.gs.generalServiceInfo('user/list', 'post', '')
      .subscribe(
        res => {
          this.listUserData = res['data'];
          this.listUserData.forEach((userdata) => {
            if (userdata['profilePic'] === null) {
              userdata['profilePic'] = './assets/images/sidebar/profile.png';
              this.listUserData['profilePic'] = userdata['profilePic'];
                }
          });
          this.listUserDataCopy = res['data'];
          this.finalListArr = [];
          this.listUserDataCopy.forEach((user) => {
            // console.log(user);
            user.roles.forEach((roleVal) => {
              user['roles'] = roleVal.name;
              this.finalListArr.push(JSON.parse(JSON.stringify(user)));
            });
          });
        },
        e => {
            if (e.status === 403) {
              this.router.navigate(['']);
              this.ss.ToasterMessage('Your Session has Expired');
              document.getElementById('modalButton1').click();
              sessionStorage.removeItem('firstLogin');
              sessionStorage.removeItem('useremailid');
              sessionStorage.removeItem('accessToken');
            }
              },
        () => {
        }
      );
  }

  public mychange(value) {
    console.log(value);
  }

  searchKeyword(event, arg) {
    this.selectedRole = 'Role of user';
    // if (event.keyCode == 13) {
      this.listUserData = [];
      this.listUserDataCopy.forEach((ele) => {
          if (ele.firstName.toUpperCase().includes(arg.toUpperCase())) {
          this.listUserData.push(ele);
        }
      });
  }
  getRole(val) {
    this.searchText = '';
    this.selectedRole = val;
    this.listUserData = [];
    if (this.selectedRole.toLowerCase() === 'all') {
      this.listUserDataCopy.forEach((userdatacopy) => {
        this.listUserData.push(userdatacopy);
      });
    } else {
      this.listUserDataCopy.forEach((userdatainfo) => {
        if (userdatainfo.roles.toLowerCase() === val.toLowerCase()) {
              this.listUserData.push(userdatainfo);
            }
      });
    }
  }

  changeroleType(role) {

  }
  inviteUser(successtemplate: TemplateRef<any>, template: TemplateRef<any>) {
    // this.showPageLoading = true;
    this.name = this.itemValue.userName;
    // this.fname = this.name.replace('');
    if ( this.name.indexOf(' ') !== -1 ) {
    this.fname = this.name.substr( 0, this.name.indexOf(' '));
  } else {
    this.fname = this.name;
  }



    let obj;
    obj = {
      'firstName': this.fname,
        'username': this.itemValue.userEmailid,
      'typeOfUser': this.itemValue.userrole
     };
     let url;
    url = 'user/invite';
     this.gs.generalServiceInfo(url, 'post', obj)
            .subscribe(
              res => {
                this.inviteresult = res;
                let stat;
                stat = res['status'];
                if (stat) {
                  // this.showPageLoading = false;
                  this.modalrefrence = this.modalService.show(successtemplate,
                    Object.assign({}, { class: 'modelHiegt' }));
                  this.listUser();
                  this.modalRef.hide();

                } else {
                  this.ss.ToasterMessage(res['message']);
                  document.getElementById('modalButton1').click();
                  // this.showPageLoading = false;

                }
              },
              e => {
                if (e.status === 403) {
                  this.router.navigate(['']);
                  this.ss.ToasterMessage('Your Session has Expired');
                  document.getElementById('modalButton1').click();
                  sessionStorage.removeItem('firstLogin');
                  sessionStorage.removeItem('useremailid');
                  sessionStorage.removeItem('accessToken');
                }
               },
          () => {
          }
      );
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.itemValue.userName = '';
   this.itemValue.userEmailid = '';
   this.itemValue.userrole = '';
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modelHiegt' })
    );
  }

  public focusFunction(element) {
    this.focusedElement = element;
  }
  // onSaveConfirm(val) {
  //   console.log(val);
    // if (window.confirm('Are you sure you want to save?')) {
    //   event.newData['name'] += ' + added in code';
    //   event.confirm.resolve(event.newData);
    // } else {
    //   event.confirm.reject();
    // }
  // }
}

