import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../general.service';
import { SharedService } from '../../../shared.service';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent implements OnInit {
  res = [];
  userId = '';
  username = '';
  totalBtc: Number;
  walletsummaryinfo: any = [];
  walletList: any = [];
  invitedlist: any = false;
  // showPageLoading: any = false;
  walletId: any = '';
  walletstatus: any = [];
  lastlogin: any = '';
  model: any = {};
  usdDetails: any = [];
  oneUsdvalue: any = '';
  default: any = {'type': 'Bitcoin(BTC)', 'symbol': 'btc.svg'};
  coinlist: any = [
    {'type': 'Bitcoin(BTC)', 'symbol': 'btc.svg'}
    // , {'type' : 'Litetcoin(LTC)', 'symbol': 'lte.svg'}
  ];
  imageUrl: any;
    constructor(private toastr: ToastrService, private genralservice: GeneralService,  private ss: SharedService, private router: Router) {
      const res = JSON.parse(sessionStorage.getItem('firstLogin') );
      if (res != null) {
        this.userId = res['userId'];
        this.username = res['firstName'];
        this.lastlogin = res['lastLoggedInTime'];
        this.imageUrl = res['profilePicUrl'];
        if ( this.imageUrl === null ) {
          this.imageUrl = './assets/images/sidebar/profile.png';
        }
      }
   }

  ngOnInit() {
    const res = JSON.parse(sessionStorage.getItem('firstLogin') );
     this.userId = res['userId'];
    this.username = res['firstName'];
    this.lastlogin = res['lastLoggedInTime'];
    this.imageUrl = res['profilePicUrl'];
    if ( this.imageUrl === null ) {
      this.imageUrl = './assets/images/sidebar/profile.png';
    }
document.getElementById('loggedInImage').setAttribute('src', this.imageUrl);
    this.walletsummary();
    this.getcurrentusdvalue();
  }
  walletsummary() {
    const obj = {
      'userId' : this.userId
    };
    const url = 'user/summary';
    this.genralservice.generalServiceInfo(url, 'post', obj)
                      .subscribe(
                        res => {
                          this.walletsummaryinfo = res['data'];
                          this.walletList = this.walletsummaryinfo ['walletList'];
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
  redirect(val) {
    this.ss.Walletid(val);
    this.router.navigate(['/fusang/personalwallet']);
    // this.walletId = val;

  }
  coinSelected(type, symbol) {
    this.model.type = type;
    this.model.symbol = symbol;
  }
  navigateTo() {
    this.router.navigateByUrl('/walletcreate-info');
  }
  joinwallet(val) {
    const url = 'wallet/join';
    const obj = {
      'userId' : this.userId,
      'walletId' : val,
      'status': 'joined'
    };
    this.genralservice.generalServiceInfo(url, 'post', obj)
            .subscribe(
              res => {
                this.walletstatus = res;
                this.walletsummary();
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
                this.walletsummary();
              }
            );
  }
  cancelRequesyt(value) {
    const url = 'wallet/join';
    const obj = {
      'userId' : this.userId,
      'walletId' : value,
      'status': 'canceled'
    };
    this.genralservice.generalServiceInfo(url, 'post', obj)
            .subscribe(
              res => {
                this.walletstatus = res;
                this.walletsummary();
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
  getcurrentusdvalue() {
    this.genralservice.getBitCoin('https://blockchain.info/ticker')
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
  }

}
