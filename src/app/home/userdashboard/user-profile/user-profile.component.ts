import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../general.service';
import { SharedService } from '../../../shared.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  loginResponse: any = JSON.parse(sessionStorage.getItem('firstLogin'));
  invalidphone = false;
  focusedElement: any;
  imageUrl: any = './assets/images/sidebar/profile.png';
  model: any = {
    country: '',
    lastName: '',
    phoneNumber: '',
    firstName : '',
    email: ''
  };
  countrylist: any = [];
  getProfileInfo: any;
  constructor(private toastr: ToastrService,
    private gs: GeneralService, private shared: SharedService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getcountrylist();
  }
  public focusFunction(element) {
    this.focusedElement = element;
  }
  getcountrylist() {
    const url = '/assets/countrylist.json';
    this.gs.localfileinfo(url)
    .subscribe(
      res => {
        this.countrylist = res['countrylist'];
        this.getProfileDetails();
      },
      e => {
      },
      () => {
      }
    );
  }
  public getProfileDetails() {
    this.gs
    .generalServiceInfo('user/getUserProfileDetails', 'post', '')
    .subscribe(
      res => {
        this.getProfileInfo = res['data'];
        this.model['firstName'] = this.getProfileInfo.firstName;
        this.model['lastName'] = this.getProfileInfo.lastName;
        this.model['phoneNumber'] = this.getProfileInfo.phoneNumber;
        // for (let i = 0; i < this.countrylist.length; i++) {
        //   if (this.countrylist[i].name === this.getProfileInfo.country) {
        //     this.model['country'] = this.countrylist[i].name;
        //   }
        // }
        this.countrylist.forEach(element => {
            if (element.name === this.getProfileInfo.country) {
            this.model['country'] = element.name;
          }
        });
        this.model['email'] = this.getProfileInfo.emailId;
        this.imageUrl = this.getProfileInfo.imageUrl;
        if ( this.imageUrl === null ) {
          this.imageUrl = './assets/images/sidebar/profile.png';
        }
        this.loginResponse.profilePicUrl = this.imageUrl;
        this.shared.FirstLogin(this.loginResponse);
      },
      e => {
      },
      () => {


      }
    );
  }
  onChange(val) {
      if (val.tostring().length  === 10) {
        this.invalidphone = false;
      } else {
        this.invalidphone = true;
      }
  }
  public profileUpdate() {
    const reqParam = {
      'country': this.model.country,
      'firstName': this.model.firstName,
      'lastName': this.model.lastName,
      'phoneNumber': this.model.phoneNumber
    };
    this.gs
    .generalServiceInfo('user/update', 'post', reqParam)
    .subscribe(
      res => {
        this.getProfileDetails();
        this.shared.ToasterMessage('Profile updated successfully');
        document.getElementById('modalButton').click();
      },
      e => {
        this.shared.ToasterMessage('Profile update unsuccessfull');
        document.getElementById('modalButton1').click();
      },
      () => {


      }
    );
  }
  public readURL(arg) {
    if (arg.currentTarget.files && arg.currentTarget.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {};
      reader.readAsDataURL(arg.target.files[0]);
      const formData = new FormData();
      const filename =
      arg.currentTarget.files[0].name.slice(arg.currentTarget.files[0].name.indexOf('.') + 1 , arg.currentTarget.files[0].name.length);
      // this.uploadedFile.push(arg.currentTarget.files[0]);
      if ((arg.currentTarget.files[0].size < 2078630) &&
       (filename === 'jpeg' || filename === 'png' || filename === 'jpg')) {
      formData.append('file', arg.target.files[0]);
      this.gs
        .fileuploadService('user/upload/profile', formData)
        .subscribe(
          res => {
            this.shared.ToasterMessage('Profile image updated successfully');
            document.getElementById('modalButton').click();
            this.getProfileDetails();
          },
          e => {
            this.shared.ToasterMessage('Profile image update unsuccessfull');
            document.getElementById('modalButton1').click();
          },
          () => {


          }
        );
      } else {
          this.shared.ToasterMessage('Please upload image of type png/jpeg/jpg with size less than 2mb');
          document.getElementById('modalButton1').click();
        }
    }
  }

}
