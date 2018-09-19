import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../general.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnInit {

  focusedElement: any;
  userName: any;
  scretKey = '';
  firstLoginn;
  googleauth: Boolean = true;
  model: any = {
    secretKey: '',
    verificationCode: ''

  };
  username = '';
  url = '';
  ress = '';
  secondurl = '';
  response: any = [];
  userId: any = [];
  // url = 'https://www.google.com/chart?chs=200x200&chld=M%7C0&cht=qr&chl=otpauth://totp/fusang%3A'
  verificationCodeValid: Boolean = true;
  imageUrl: any = '';
  constructor(private gs: GeneralService, private router: Router,
    private ss: SharedService,
     private toastr: ToastrService) {
      let res = JSON.parse(sessionStorage.getItem('firstLogin'));
      if (res !== null) {
      this.userId = res['userId'];
      this.firstLoginn = res['isFirstLogin'];
      this.model.secretKey = res['userSecret'];
      this.userName = res['firstName'];
      this.imageUrl = res['profilePicUrl'];
      if ( this.imageUrl === null ) {
        this.imageUrl = './assets/images/sidebar/profile.png';
      }
    } else {
      this.firstLoginn = 1;
      this.ss.firstLogin$.subscribe(res1 => res = res1 );
    }

      this.username = window.sessionStorage.getItem('useremailid');
     const uri = this.username;
     if (uri !== null) {
      this.ress = encodeURIComponent(uri);
     }
     this.secondlogin(this.model.secretKey);
     }

  ngOnInit() {
       const res = JSON.parse(sessionStorage.getItem('firstLogin'));
       if ( this.imageUrl === null || this.imageUrl === '') {
        this.imageUrl = './assets/images/sidebar/profile.png';
      }
       document.getElementById('loggedInImage').setAttribute('src', this.imageUrl);
    if (this.firstLoginn === 1) {
    this.authType(2);

    }
  }
  public focusFunction(element) {
    this.focusedElement = element;
  }
  authType(id) {
    this.gs.generalServiceInfo('user/chooseAuthType?authType=' + id, 'post', '')
      .subscribe(
        res => {
          this.model.secretKey = res['data']['userSecret'];
          this.firstlogin(this.model.secretKey);
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


  firstlogin(val) {
    const basicurl = 'https://chart.googleapis.com/chart?chs=95x95&chld=M%7C0&cht=qr&chl=otpauth://totp/fusang%3A';
     this.url = basicurl + this.ress + '%3Fsecret%3D' + val + '%26issuer%3Dfusang' ;
      }

  yubikeyauth(val, id) {
    this.googleauth = !this.googleauth;
    this.authType(id);
  }
  vcValidation(event) {
    if (event.length === 6) {
      this.verificationCodeValid = false;
    } else {
      this.verificationCodeValid = true;
    }
  }
  validate() {
    // tslint:disable-next-line:prefer-const
    const obj: any = {};
    obj.verificationCode = this.model.verificationCode;

    this.gs.generalServiceInfo('user/validate', 'post', obj)
      .subscribe(
        res => {
          const response: any = res.status;
          if (response === 'success') {
            this.ss.ToasterMessage(res['message']);
            document.getElementById('modalButton').click();
          this.lastloggedin();
          } else {
            this.ss.ToasterMessage(res['message']);
            document.getElementById('modalButton1').click();
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
 secondlogin(val) {
   const basicurl = 'https://chart.googleapis.com/chart?chs=95x95&chld=M%7C0&cht=qr&chl=otpauth://totp/fusang%3A';
  this.secondurl = basicurl + this.ress + '%3Fsecret%3D' + val + '%26issuer%3Dfusang';

   }

   lastloggedin() {

    const url = 'user/login/save';
    const obj = {
        'userId' : this.userId,
      };
      this.gs.generalServiceInfo(url, 'post', obj)
      .subscribe(
        res => {
          this.response = res;
          this.router.navigate(['/fusang/walletcreate']);
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
  }
