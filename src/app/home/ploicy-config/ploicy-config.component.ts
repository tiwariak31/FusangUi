import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../general.service';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ploicy-config',
  templateUrl: './ploicy-config.component.html',
  styleUrls: ['./ploicy-config.component.css']
})
export class PloicyConfigComponent implements OnInit {
  policy: Boolean = true;
  compilance: Boolean = false;
  showwalletfield: Boolean = false;
  showipaddress: Boolean = false;
  ipaddresslist: any = [];
  walletaddress: any = [];
  policylist: any = [];
  WalletAddressWhitelist: any = [];
  policyType: any = '';
  itemvalue: any = [];
  ownerId: any = [];
  walletaddressinfo: any = [];
  policyupdatedresponse: any = [];
  Daily: any = 'Daily';
  obj: any = {
    'minimumBalance': '',
    'transactionLimit': '',
    'transactionTimeEnd': '',
    'transactionTimeStart': '',
    'transactionUnitOfMeasure': '',
    'transactionVolumeCap': '',
    'userId': '',
    'walletAddressWhitelist': '',
    'walletAddresslist': [
    ]
   };
  constructor(private generalservice: GeneralService, private ss: SharedService, private router: Router) {
    const res = JSON.parse(sessionStorage.getItem('firstLogin'));
    if (res !== null) {
    this.ownerId = res['userId'];
    }
   }

  ngOnInit() {
    this.loadpolicies();
  }
  showpolicyconfig() {
    this.policy = true;
    this.compilance = false;
  }
  addipaddress() {
    this.showipaddress = true;
  }
addwalletaddress() {
   if (this.policylist.Maxnumberofwallet < this.WalletAddressWhitelist.length) {
     this.ss.ToasterMessage('wallet address is should be equal to Maxnumberofwallet ');
       document.getElementById('modalButton1').click();
     this. showwalletfield = false;
   } else {
     this. showwalletfield = true; }
  if (this.itemvalue.walletaddress) {
    this.WalletAddressWhitelist.push(this.itemvalue.walletaddress);
  this.obj.walletAddresslist.push(this.WalletAddressWhitelist);

  this.itemvalue.walletaddress = '';
  }
  this.obj.walletAddresslist.push(this.itemvalue.walletaddress);
}
removewalletaddress(i) {
  this.WalletAddressWhitelist.splice(i, 1);
}
removeipaddress() {
}

loadpolicies() {
const obj = {
  'userId' : this.ownerId
};
const url = 'wallet/get-policy';
this.generalservice.generalServiceInfo(url, 'post', obj)
                    .subscribe(
                      res => {
                        this.policylist = res['data'];
                        console.log(this.policylist);
                        this.WalletAddressWhitelist = this.policylist['WalletAddresslist'];
                        this.policyType = this.policylist.UserType;
                      },
                      e => {
                      },
                      () => {
                      }
                    );

}
updatedetails() {
  this.obj = {
    'minimumBalance': this.policylist.MinimumBalance,
    'transactionLimit': this.policylist.TransactionLimit,
    'transactionTimeEnd': this.policylist.TransactionTimeEnd,
    'transactionTimeStart': this.policylist.TransactionTimeStart,
    'transactionUnitOfMeasure': this.policylist.TransactionUnitOfMeasure,
    'transactionVolumeCap': this.policylist.TransactionVolumeCap,
    'userId': this.ownerId,
    'walletAddresslist': [
    ]
   };
  this.policylist['WalletAddresslist'] = [];
  if (this.itemvalue.walletaddress) {
    this.WalletAddressWhitelist.push(this.itemvalue.walletaddress);
  }
  this.walletaddressinfo.push(this.WalletAddressWhitelist);
  this.WalletAddressWhitelist.forEach(element => {
    this.obj.walletAddresslist.push(element);
  });
// this.policylist.WalletAddresslist.push(this.WalletAddressWhitelist);
this.policylist['userId'] = this.ownerId;
const url = 'wallet/update-policy';
this.generalservice.generalServiceInfo(url, 'post', this.obj)
                    .subscribe(
                      res => {
                        this.policyupdatedresponse = res['data'];
                        this.ss.ToasterMessage(this.policyupdatedresponse);
                        document.getElementById('modalButton1').click();
                        this.loadpolicies();
                        this.router.navigateByUrl('/fusang/walletcreate');
                      },
                      e => {
                      },
                      () => {
                      }
                    );
}
removewalletaddress1() {
}
cancelrequest() {
  this.router.navigate(['/fusang/walletcreate']);
}
}
