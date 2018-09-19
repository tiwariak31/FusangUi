import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../general.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logout = false;
  userName = '';
  imageUrl: any;
  roles: any;
  role: string;
  constructor(private ss: SharedService, private generalService: GeneralService, private router: Router, private toastr: ToastrService) {

    const res = JSON.parse(sessionStorage.getItem('firstLogin'));
      if ( res === null) {
        this.router.navigate(['']);
      } else {
    this.userName = res['firstName'];
    this.imageUrl = res['profilePicUrl'];
    this.roles= res['roles'];
    this.roles.forEach(element => {
      if(element.toLowerCase()=="user"){
        this.role="Customer";
      }
      else if(element.toLowerCase()=="admin"){
        this.role="Admin";
      }
      else{
        this.role="User";
      }
    });
    if ( this.imageUrl === null ) {
      this.imageUrl = './assets/images/sidebar/profile.png';
    }
      }

      this.ss.firstLogin$.subscribe(message => {
        this.userName = message['firstName'];
        this.imageUrl = message['profilePicUrl'];
        if ( this.imageUrl === null ) {
          this.imageUrl = './assets/images/sidebar/profile.png';
        }

  });

  }

  ngOnInit() {

document.getElementById('loggedInImage').setAttribute('src', this.imageUrl);
  }
  showDropDown() {
    if (this.logout === false) {
    this.logout = true;
    } else {
      this.logout = false;
    }
  }
  showDropDown1(event) {
    this.logout = event;
  }
  onClickOutside(event) {
    if (event && event['value'] === true) {
      this.hideLogout();
    }
  }
  hideLogout() {
    this.logout = false;
  }
  logOut() {

    this.generalService.generalServiceInfo('auth/logout', 'post', '')
    .subscribe(
      res => {
this.ss.ToasterMessage(res['message']);
document.getElementById('modalButton').click();
this.logout = false;
sessionStorage.removeItem('firstLogin');
sessionStorage.removeItem('useremailid');
sessionStorage.removeItem('accessToken');
this.router.navigate(['']);
      },
      e => {
        if (e.status === 403 ) {
          this.router.navigate(['']);
          this.ss.ToasterMessage('Your Session has Expired');
          document.getElementById('modalButton1').click();
          sessionStorage.removeItem('firstLogin');
          sessionStorage.removeItem('useremailid');
          sessionStorage.removeItem('accessToken');
        } else {
        this.ss.ToasterMessage(e['message']);
        document.getElementById('modalButton1').click();
      }
            },
      () => {
      }
    );
  }
  // profile() {
  //   alert("test profile")
  // }
  cointypeSelected() {
  }
}
