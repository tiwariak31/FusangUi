import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { GeneralService } from '../../../general.service';
import { SharedService } from '../../../shared.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-wallet-creat-info',
  templateUrl: './wallet-creat-info.component.html',
  styleUrls: ['./wallet-creat-info.component.css']
})
export class WalletCreatInfoComponent implements OnInit {
  public id: number; public name: string;
  focusedElement: any ;
  usersForm: FormGroup;
  // filteredUsers: any;
  wDetails: any = {
    'walletName' : '',
    'ownerName' : '',
    'noOfUsers' : '',
    'noOfSignatures' : '',
  };
  model: any = {
    'username' : null,
    'role' : null,
    'roleName': null
  };
  itemValue: any = {
    'username' : '',
    'role' : 'ADMIN',
    'userId' : '',
    'roleName': 'Signer',
  };
  ownerId: any = '';
  ownerRole: any = '';
  ownerName: any = '';
  //  ownerdetails: any = {
  //    'ownerId': ''
  //  };
  coinValue: any = {
    'coinType': ''
  };
  userListsearch: any = {
    'userId' : '',
  };
  userList: any = [
  ];
  initialfslde: any = false;
  userListInfo: any = [];
  response: any = [];
  roleList: any = [];
//   roleList: [
//   {
//     'name': 'Signer',
//     'value': 'ADMIN'
//   },
//   {
//     'name': 'Viewer',
//     'value': 'USER'
//   }
// ];
  coinlist: any = ['BTC'];
  autosearchresult: any = [];
  // showPageLoading: any = false;
  errmsg: any = false;
  errinrole: any = false;
  errorUserInfo: any = false;
  erroinsignsture: any = false;
  userlength: any = '';
  nofouser: any = '';
  count: any = 1;
  adduserStatus: any = true;
  noOfUsersAvail: Boolean = false;
  roleInf: any = [];
  moreAdmins: any = false;
  existinguser: any = false;
  invaliduser: any = false;
  roleselectedinfo: any = [];
  validatedUser: Boolean = false;
  selectedItem: any = '';
  compRef: any;
  color: any;
    constructor(private router: Router, private genaralservice: GeneralService, private ss: SharedService, private toastr: ToastrService,
       private fb: FormBuilder) {
    const res = JSON.parse(sessionStorage.getItem('firstLogin'));
    if (res !== null) {
    this.ownerId = res['userId'];
    this.itemValue.username = res['username'];
    this.itemValue.userId = res['userId'];
    this.userList.push(this.itemValue);
    }
    // this.userListInfo.push(this.itemValue);



  }

  ngOnInit() {
    this.compRef = this;
    this.usersForm = this.fb.group({
      userInput: null
    });
    this.getRolelist ();

  }
  public focusFunction(element) {
    this.focusedElement = element;
  }
  checkId (val, formName, type) {
    const obj = {
      'searchString': this.model.username
    };
    const url = 'user/autoSearch';
    this.genaralservice.generalServiceInfo(url, 'post', obj)
      .subscribe(
        res => {
          this.model.userId = this.ss.validVal(_.find(res['data'], function(o) { return o.username === val.toLowerCase(); })) ?
          _.find(res['data'], function(o) { return o.username === val.toLowerCase(); }).id : '';
          console.log(this.model.username);
          console.log(val);
          if (this.ss.validVal(this.model.userId)) {
            this.validatedUser = true;
            this.userListInfo.push(this.model);
            this.userList.push(this.model);
            this.validatedUser = false;
            let c;
            c = 0;
            this.userList.forEach(function(el) {
              c = (el.role === 'ADMIN') ? c + 1 : c;
            });
            if (c > this.wDetails.noOfSignatures) {
              // this.showPageLoading = false;
              // this.moreAdmins = true;
              if (this.validatedUser === true) {
              // this.toastr.error('Admin role of the added user should  be equal to  no of signatures.');
              this.ss.ToasterMessage('Signers should be equal to number of signatures.');
              document.getElementById('modalButton1').click();
              this.userList.splice(-1, 1);
              }
            }
            if (this.userList.length === this.wDetails.noOfUsers) {
              this.initialfslde = false;
            }
            this.model = {
              'username' : null,
              'role' : null,
              'roleName': null
            };
            if (type === 'create') {
              this.ss.ToasterMessage('Please click on create wallet again to complete the process.');
              document.getElementById('modalButton2').click();
            }
            formName.reset();
          } else {
            this.validatedUser = true;
            this.ss.ToasterMessage(this.model.username + ' is not registerd user.');
            document.getElementById('modalButton1').click();
          }
          this.errorUserInfo = false;
          // this.toastr.error('Number of users added does not match with count');
        },
        e => {
        },
        () => {
        });
    // return id;
  }
  addUser(addUserForm: NgForm) {
    this.roleInf = [];
    this.moreAdmins = false;
    if (this.wDetails.noOfUsers > 0 && this.wDetails.noOfSignatures > 0) {
      this.noOfUsersAvail = false;
      this.initialfslde = true;
      // let u;
      // u = this.model.username;
      const x: any = _.findIndex(this.userList, ['username', this.model.username]);
      if ((x === -1) && this.ss.validVal(this.model.username)) {
              this.checkId(this.model.username, addUserForm, '');
      } else if (x >= 0) {
      this.existinguser = true;
      this.ss.ToasterMessage('User already exist.');
      document.getElementById('modalButton1').click();
      }
    } else {
      // this.noOfUsersAvail = true;
      this.ss.ToasterMessage('Enter number of sigmatuers more than 0.');
      document.getElementById('modalButton1').click();
    }
  }
  coinSelected(item) {
    this.wDetails.coinType = item;
    this.wDetails.ownerId = this.ownerId;
  }
  roleSelected(val: any) {
    // this.roleselectedinfo = [];
    let temp: any = {};
    for (let i = 0; i < this.roleList.length; i++) {
      if (this.roleList[i].value === val) {
        temp = this.roleList[i];
      }
    }
    console.log(temp);
      this.model['role'] = temp.value;
    this.model['roleName'] = temp.name;
  }
  userroleSelected(val, index) {
    console.log(val);
    this.model['role'] = val.value;
    this.model['roleName'] = val.name;
    this.selectedItem = val.value;
      // this.userList.role = val.value;
      // this.userList.roleName = val.name;
      for (let i = 0; i < this.userList.length; i++) {
        if (i === index) {
          this.userList[i].role = val.value;
          this.userList[i].roleName = val.name;
        }
      }
  }

  deleteextrarow() {
    this.initialfslde = false;
    this.model = {
      'username' : null,
      'role' : null,
      'roleName': null
    };

  }

  onuserChange(val) {
    if (this.initialfslde === true) {
      this.initialfslde = false;
      console.log(this.model);
      this.model = {
        'username' : null,
        'role' : null,
        'roleName': null
      };
    }
    this.adduserStatus = true;
  }
  onChange(val) {
    // setTimeout(() => {
    this.nofouser = val;
    if (this.ss.validVal(val)) {
      if (val.length > 3 ) {
        const obj = {
          'searchString': val
        };
        const url = 'user/autoSearch';
        this.genaralservice.autoSearch(url, 'post', obj)
          .subscribe(
            res => {
              this.autosearchresult = res['data'];
            },
            e => {
              if (e.status === 403) {
                this.router.navigate(['']);
                this.ss.ToasterMessage('Your Session has Expired.');
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
    }
    //  }, 4000);
  }
  userSelected(val) {
   if (val.id) {
    this.model.userId = val.id;
    this.model.username = val.username;
   } else {
    this.ss.ToasterMessage('Please select the user in list');
    document.getElementById('modalButton1').click();
   }

  }
  onsignatureChange(val) {
    if (val > this.wDetails.noOfUsers) {
      this.erroinsignsture = true;
      // this.showPageLoading = false;
    } else {
      this.erroinsignsture = false;
    }
  }
    createWallet(addUserForm: NgForm) {
      this.roleInf = [];
      if (this.erroinsignsture !== true) {
        // this.showPageLoading = true;
        if (this.ss.validVal(this.model.username)) {
          this.checkId(this.model.username, addUserForm, 'create');
        } else {
        }
        let c;
        c = 0;
        this.userList.forEach(function(el) {
          c = (el.role === 'ADMIN') ? c + 1 : c;
        });


        if (this.wDetails.coinType === null || this.wDetails.coinType === undefined) {
          this.errmsg = true;
          // this.showPageLoading = false;
        } else if (this.userList.length < this.wDetails.noOfUsers) {
          if (this.validatedUser === true) {
            this.ss.ToasterMessage('Userlist should be equal to number of user.');
            document.getElementById('modalButton1').click();
          }
          // this.showPageLoading = false;
          // this.errorUserInfo = true;
          // this.toastr.error('Userlist should be equal to number of user');
        } else if (this.userList.length !== this.wDetails.noOfUsers) {
          // this.showPageLoading = false;
          if (this.validatedUser === true) {
            this.ss.ToasterMessage('Userlist should be equal to number of user.');
            document.getElementById('modalButton1').click();
          }
          this.ss.ToasterMessage('Userlist should be equal to number of user.');
          document.getElementById('modalButton1').click();
        } else if (c !== this.wDetails.noOfSignatures) {
          // this.showPageLoading = false;
          this.ss.ToasterMessage('Signers should be equal to number of signatures.');
          document.getElementById('modalButton1').click();
        } else {
          // if (!this.validatedUser) {
          //   this.toastr.error(this.model.username + ' is unavailable');
          //   return false;
          // }
          if (!this.validatedUser) {
            console.log(this.model.username);
                    if (this.userList.length > 0 ) {
                      this.validatedUser = true;
                    } else {
                      this.ss.ToasterMessage(this.model.username + ' is not registerd user.');
                      document.getElementById('modalButton1').click();
                    return false;
                    }
                  }
          this.wDetails['userList'] = this.userList;
          this.moreAdmins = false;
          const url = 'wallet/create';
          this.genaralservice.generalServiceInfo(url, 'post', this.wDetails)
            .subscribe(
              res => {
                this.response = res['data'];
                // this.showPageLoading = false;
                this.ss.ToasterMessage(this.response);
                      document.getElementById('modalButton').click();
                this.router.navigateByUrl('/fusang/walletcreate');
              },
              e => {
                this.userListInfo = [];
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

      }
    }
  canclerequest() {
    this.router.navigate(['/fusang/walletcreate']);
  }
  deleterow(i) {
            this.userList.splice(i, 1);

            this.userListInfo.splice(i, 1);
            this.userListInfo.splice(this.userListInfo.length - 1, 1);
  }
  displayFn(user) {
    if (user) { return user.name; }
  }
  filteredUsers () {
    console.log(this.usersForm.get('userInput'));
  }
  getRolelist () {
    this.genaralservice.getRolelist()
                       .subscribe(
                         res => {
                           this.roleList = res['roleList'];
                         },
                         e => {
                         },
                         () => {
                         }
                       );
  }
}
