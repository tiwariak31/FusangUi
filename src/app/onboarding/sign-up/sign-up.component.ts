import { Component, OnInit , TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { GeneralService } from '../../general.service';
import { ToastrService } from 'ngx-toastr';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared.service';

// import { FormControl, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // signupForm: FormGroup;
  submitted = false;
  countrylist: any = [];
  title = 'Sign up';
  modalRef: BsModalRef;
  isAgreed: Boolean = false;
  errmsg: Boolean = false;
  countrycode: any = '';
  countryPhonelen: any;
  invalidphone: Boolean = false;
  focusedElement: any;
  selectedcountrylist: any;
  searchVal: any;
  model: any = {
    country: '',
    lastName: '',
    phoneNumber: '',
    repassword: '',
    searchVal : '',
    password: ''
  };
  itemValue = {
    'userName': '',
    'userEmailid': '',
    'userrole': ''  };
    public showPasswordCaution = false;
  constructor(private router: Router,
     private modalService: BsModalService,
      private gs: GeneralService,
      private toastr: ToastrService,
      // private formBuilder: FormBuilder,
      private ss: SharedService) { }

  ngOnInit() {
    this.getcountrylist();
    let loc, id, firstName, username;
    loc = location.href;
    id = loc.split('?')[1].split('id=')[1].split('&')[0];
    firstName = loc.split('?')[1].split('firstName=')[1].split('&')[0];
    username = loc.split('?')[1].split('username=')[1].split('&')[0];

    this.model.id = id;
    this.model.firstName = firstName;
    this.model.username = username;

   }
   public focusFunction(element) {
    this.focusedElement = element;
  }
  register() {
    if (this.ss.validVal(this.model.country)) {
      this.errmsg = false;
    } else {
      this.errmsg = true;
    }

      if (
        this.model.password !== this.model.repassword ||
        this.model.password === '' ||
        this.model.repassword === '' ||
        this.model.password === undefined ||
        this.model.repassword === undefined
      ) {
        this.showPasswordCaution = true;
        return false;
      } else {
        this.showPasswordCaution = false;
        // return true;
        this.model.phoneNumber = this.model.phoneNumber.toString();
        if (this.invalidphone === true) {
          this.invalidphone = true;
        } else {
          this.invalidphone = false;
          this.gs.loginService('auth/signup', this.model)
      .subscribe(
        res => {
          // if (res['statusMessage'] === 'FAILURE') {
          //   this.toastr.error(res['message']);
          // } else {
            this.ss.ToasterMessage(res['data']);
            document.getElementById('modalButton').click();
            this.router.navigate(['/sign-in']);
          // }
        },
        e => {
          this.ss.ToasterMessage(e['message']);
          document.getElementById('modalButton1').click();
        },
        () => {
        }
      );
        }
      }
    }
    // this.router.navigateByUrl('/sign-in');
  // }/
  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }
  countrySelected(val) {
    console.log(val);
    if (val !== null && val !== undefined && val !== '') {
    this.model.country = val.name;
    this.countrycode = val.dial_code;
    this.countryPhonelen = val.length;
    this.model.phoneNumber = '';
    } else {
      this.countrycode = '';
      this.model.country = '';
      this.model.phoneNumber = '';
    }
  }
  isChecked(e) {
    if (e.target.checked) {
      this.isAgreed = true;
    } else {
      this.isAgreed = false;
    }
  }

     openModal(template: TemplateRef<any>) {
     this.modalRef = this.modalService.show(template);
   }
  //  onFilterChange(eve: any) {
  // }
  uncheck(val) {
    this.isAgreed = val;
  }
  openModalWithClass(template: TemplateRef<any>) {
    this.itemValue.userName = '';
   this.itemValue.userEmailid = '';
   this.itemValue.userrole = '';
   if (!this.isAgreed) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
   }
  }



  getcountrylist() {
    const url = '/assets/countrylist.json';
    this.gs.localfileinfo(url)
    .subscribe(
      res => {
        this.countrylist = res['countrylist'];
      },
      e => {
      },
      () => {
      }
    );
  }
  onChange(val) {
    if (this.ss.validVal(val)) {
      val = val.toString();
      if (val.length  ===  parseInt(this.countryPhonelen, 10)) {
        this.invalidphone = false;
      } else {
        this.invalidphone = true;
      }
    } else {
      this.model.phoneNumber = '';
    }
  }
  onOptionsSelected(val) {
    if (this.model.password !== val) {
      this.showPasswordCaution = true;
    } else {
      this.showPasswordCaution = false;
    }
  }
}
