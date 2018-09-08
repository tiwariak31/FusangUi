import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { GeneralService } from '../../../general.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '../../../../../node_modules/@angular/forms';
// import * as c3 from 'c3';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'angular-highcharts';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-personal-wallet',
  templateUrl: './personal-wallet.component.html',
  styleUrls: ['./personal-wallet.component.css']
})
export class PersonalWalletComponent implements OnInit {

  // focusedElement: any ;

  disableSettings = true;
  focusedElement: any;
  chart: any;
  // var Highcharts = require('highcharts');
  public angularxQrCode: string = null;
  transdiv: Boolean = false;
  userdiv: Boolean = false;
  settingdiv: Boolean = false;
  auditdiv: Boolean = false;
  walletDetails: any = {
    walletName: '',
    ownerId: '',
    noOfUsers: '',
    noOfSignatures: '',
    coinType: '',
    balanceUsd: '',
  };
  walletid = '';
  url = '';
  transactionDetails: any = [];
  userDetails: any = [];
  auditTrailDetails: any = [];
  settingDetails: any = [];
  modalRef: BsModalRef;
  QrmodalRef: BsModalRef;
  itemVlue: any = {
    'username': '',
    'toaddress': '',
    'coin': '',
  };
  tractionsstatus: any = [];
  transactionInfo: any = [];
  modalrefrence: BsModalRef;
  transactions: any = [];
  roleList: any = ['ADMIN', 'USER'];
  coinlist: any = ['BTC'];
  errorGraphDetailData: any = [];
  graphData: any = [];
  graphLabel: any = [];
  graphDataPrice: any = [];
  graphDataCurrent: any = [];
  graphOptions: any = {};
  timeinstant: any = [];
  message: any = [];

  usdDetails: any = [];
  usdInfo: any = [];
  dollerInfo: any = [];

  dataoutput: any = [];
  oneUsdvalue: any = '';
  avaragePrice: any = '';
  ownerId: any = '';
  updateeResponse: any = [];
  constructor(private _domSanitizer: DomSanitizer,
    private router: Router, private genaralservice: GeneralService, private formBuilder: FormBuilder,
    private ss: SharedService, private modalService: BsModalService, private datePipe: DatePipe, private toastr: ToastrService) {
    const response = JSON.parse(sessionStorage.getItem('walletid'));
    this.walletid = response;
    const res = JSON.parse(sessionStorage.getItem('firstLogin'));
    if (res !== null) {
    this.ownerId = res['userId'];
    }

  }

  ngOnInit() {
    this.genaralservice.getBitCoin('https://blockchain.info/ticker')
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
    this.getwalletdetails();
    this.getTransactionDetails();
    this.showtransaction();
    this.btcexchangerate();
  }

  public focusFunction(element) {
    this.focusedElement = element;
  }

  // tslint:disable-next-line:member-ordering
  settings = {
    mode: 'external',
    hideSubHeader: true,
    pager: {
      display: true,
      perPage: 10,
    },
    delete: {
      confirmDelete: true
    },
    actions: false,
    columns: {
      txid: {
        title: 'Transaction ID'
      },
      time: {
        title: 'Time',
        type: 'html',
        valuePrepareFunction: (value) => {
          const myDate = new Date(value * (1000));
          return value = myDate.toLocaleString();
        }
      }

    }
  };
  // tslint:disable-next-line:member-ordering
  usersettings = {
    mode: 'inline',
    hideSubHeader: true,
    pager: {
      display: false,
      perPage: 20,
    },
    delete: {
      confirmDelete: true
    },
    actions: false,
    columns: {
      profilePic: {
      title: '',
    filter: false,
    type: 'html',
    width: '20px',
    valuePrepareFunction: (profilePic) => {
        return this._domSanitizer.bypassSecurityTrustHtml(`<img src="${profilePic}" alt="Smiley face" height="32" width="32"
        style="border-radius: 50%">`);
    }
  },
      firstname: {
        title: 'First Name',
        valuePrepareFunction: (value) => {
          return value = value;
        },
      },
      username: {
        title: 'Email ID',
      },
      role: {
        title: 'Role'
      },
      status: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (value) => {
          //   value = this.CBBdata
          if (value === 'Completed') {
            return `<img src='assets/images/dashboard/oval-4.png' > Active`;
          } else if (value === 'Invited') {
            return `<img src='assets/images/dashboard/Critical.png' > InActive`;
          }
        }
      }
    }
  };

  // tslint:disable-next-line:member-ordering
  auditsettings = {
    mode: 'external',
    hideSubHeader: true,
    pager: {
      display: false,
      perPage: 20,
    },
    delete: {
      confirmDelete: true
    },
    actions: false,
    columns: {
      message: {
        title: 'Message'
      },
      dataTime: {
        title: 'Time',
        type: 'html',
        valuePrepareFunction: (value) => {
          return value = this.datePipe.transform(value, 'dd-MM-yyyy HH:mm');
        }
      }
    }
  };


  // tslint:disable-next-line:member-ordering
  showtransaction() {
    this.transdiv = true;
    this.userdiv = false;
    this.settingdiv = false;
    this.auditdiv = false;
  }
  showusers() {
    this.transdiv = false;
    this.userdiv = true;
    this.settingdiv = false;
    this.auditdiv = false;
  }
  showsettings() {
    this.transdiv = false;
    this.userdiv = false;
    this.settingdiv = true;
    this.auditdiv = false;
  }
  showaudittrail() {
    this.transdiv = false;
    this.userdiv = false;
    this.settingdiv = false;
    this.auditdiv = true;
  }

  coinSelected(item) {
    // this.wDetails.coinType = item;
    // this.wDetails.ownerId = this.ownerId;
  }
  // calling API for getting Audittrails and othre wallet info fo perticular wallet...
  getwalletdetails() {
    const obj = { 'walletId': this.walletid };
    const url = 'wallet/get';
    this.genaralservice.generalServiceInfo(url, 'post', obj)
      .subscribe(
        res => {
          this.walletDetails = res['data'];
          this.transactionDetails = this.walletDetails['transactionList'];
          this.userDetails = this.walletDetails['userList'];
          // for (let i = 0; i < this.userDetails.length; i++) {
          //   if (this.userDetails[i]['profilePic'] === null) {
          //     this.userDetails[i]['profilePic'] = './assets/images/sidebar/profile.png';
          //   }
          // }
          this.userDetails.forEach((element) => {
            if (element['profilePic'] === null) {
              element['profilePic'] = './assets/images/sidebar/profile.png';
              this.userDetails['profilePic'] = element['profilePic'];
                }
          });
          this.auditTrailDetails = this.walletDetails['auditTrail'];
          this.settingDetails = this.walletDetails['walletInfo'];
          this.angularxQrCode = this.walletDetails.address;
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
  // opening share qr code popup modal..............
  ShareQrCode(walletAddress: TemplateRef<any>) {
    this.QrmodalRef = this.modalService.show(walletAddress,
      Object.assign({}, { class: 'share_modal_content' }));
  }
  // opening SEND FUND popup and calling api for getting dollar info.....
  openBTC(bittransfer: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
      bittransfer,
      Object.assign({}, { class: 'btcpopup modal-lg' })
    );
    this.itemVlue = {
      'username': '',
      'toaddress': '',
      'coin': '',
    };
    this.usdInfo = '';
    this.itemVlue.username = this.walletDetails.ownerId;
     }
  // fund transfer from one wallet to an other
  transaction(bittransfer) {
    const url = 'wallet/transaction/transfer';
    const obj = {
      'walletId': this.walletid, 'toAddress': this.itemVlue.toaddress, 'coins': this.itemVlue.coin, 'note': this.itemVlue.note,
      'userId' : this.ownerId,
    };
    this.genaralservice.generalServiceInfo(url, 'post', obj)
      .subscribe(
        res => {
          this.tractionsstatus = res;
          if (this.tractionsstatus.message === 'Sucess') {
            this.message = this.tractionsstatus.data;
            this.ss.ToasterMessage(this.tractionsstatus['data']);
            document.getElementById('modalButton').click();
            this.getTransactionDetails();
            this.modalRef.hide();

          } else {
            this.ss.ToasterMessage(this.tractionsstatus['data']);
            document.getElementById('modalButton1').click();
            this.itemVlue.toaddress = '';
            this.itemVlue.coin = '';
            this.itemVlue.note = '';
          }
        },
        e => {
          console.log(e);
          if (e.status === 403) {
            this.router.navigate(['']);
            this.ss.ToasterMessage('Your Session has Expired');
            document.getElementById('modalButton1').click();
            sessionStorage.removeItem('firstLogin');
            sessionStorage.removeItem('useremailid');
            sessionStorage.removeItem('accessToken');
          } else if (e.status === 'BAD_REQUEST') {
            this.ss.ToasterMessage(e.message);
            document.getElementById('modalButton1').click();
          }
        },
        () => {
        }
      );
  }
  // update wallet info .......
  updateWallet() {
    const obj = {
      'walletId': this.walletDetails.walletId,
      'walletName': this.walletDetails.walletName,
      'ownerId': this.ownerId,
      'noOfSignatures': this.walletDetails.noOfSignatures,
    };
    const url = 'wallet/update';
    this.genaralservice.generalServiceInfo(url, 'post', obj)
      .subscribe(
        res => {
          this.updateeResponse = res['data'];
          this.ss.ToasterMessage(this.updateeResponse);
          document.getElementById('modalButton').click();
        },
        e => {
        },
        () => {
        }
      );
  }
  // get perticular wallet details.....
  getTransactionDetails() {
    const obj = {
      'walletId': this.walletid,
      'from': 0,
      'to': 20,
    };
    const url = 'wallet/transaction/list';
    this.genaralservice.generalServiceInfo(url, 'post', obj)
      .subscribe(
        res => {
          this.transactionInfo = res['data'];
          if (this.transactionInfo['items'] !== undefined) {
            this.transactions = this.transactionInfo['items'];
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
  btcexchangerate() {
    this.graphData = [];
    this.graphLabel = [];
    this.graphDataPrice = [];
    this.graphDataCurrent = [];
    this.genaralservice.getBitCoin('https://mining-profit.com/api/btc-chart?range=1d&exchanges=[%22bitstamp%22]')
      .subscribe(res => {
        this.errorGraphDetailData = JSON.parse(res['prices']);
        this.graphData = this.errorGraphDetailData['bitstamp'];
        // for (let i = 0; i < this.graphData.length; i++) {
        //   this.graphDataCurrent.push(this.graphData[0].date);
        //   this.graphDataPrice.push(this.graphData[0].price);
        // }
        this.graphData.forEach((elem) => {
          this.graphDataCurrent.push(elem.date);
           this.graphDataPrice.push(elem.price);
        });
        this.graphLabel = this.errorGraphDetailData['date'];

        this.graphData.forEach(element => {
          const a: any = [];
          // tslint:disable-next-line:radix
          a.push(this.convertDate(element.date));
          // tslint:disable-next-line:radix
          a.push(element.price);
          this.dataoutput.push(a);
        });


        this.avaragePrice = this.dataoutput[this.dataoutput.length - 1][1] - this.dataoutput[0][1];

        this.chart = new Chart({
          chart: {
            type: 'spline'
          },
          credits: {
            enabled: false
          },
          title: {
            text: null
          },
          yAxis: {
            visible: false,
            tickLength: 0,
            labels: {
              enabled: true
            },
            title: {
              enabled: null
            }
          },
          xAxis: {
            visible: false,
            tickLength: 0,
            title: {
              enabled: null
            },
            labels: {
              enabled: false
            }
          },
          legend: {
            enabled: false
          },
          series: [
            {
              name: 'Exchange Rate',
              data: this.dataoutput
            }
          ],

        });
        this.dataoutput = this.graphData.map(function (obj) {
          return Object.keys(obj).sort().map(function (key) {
            return obj[key];
          });
        });


        this.graphLabel = this.errorGraphDetailData['date'];
      },
        e => {
        });
  }
  public convertDate(date1) {
    const a = new Date(date1 * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
    //     const date=new Date(Number(date1));
    //  return date.getUTCDate() + '-' + (date.getUTCMonth() + 1)+ '-' + date.getUTCFullYear();
  }
  // convertion from bitcoin to usd
  onChange(val) {
    this.dollerInfo = this.usdDetails.USD;
      this.usdInfo = val * this.dollerInfo.last;
  }
  myFunction(val) {
    console.log(val);
  }
  onCustom(event) {
    alert('tets');
  }
}
