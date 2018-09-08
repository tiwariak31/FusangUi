import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { GeneralService } from '../../general.service';
import { SharedService } from '../../shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
  focusedElement: any;
  title = 'Reset Password';
  modalRef: BsModalRef;
  modalrefrence: BsModalRef;
  model: any = {
    emailId: '',
    password:'',
    token:'',
    repassword:''
   };
   forgetResponse: any = [];
   public showPasswordCaution = false;
  constructor(private toastr: ToastrService,
    private router: Router,
    private gs: GeneralService,
    private modalService: BsModalService,
    private ss: SharedService) { }

  ngOnInit() {
    let loc, emailId, token;
    loc = location.href;
    emailId = loc.split('?')[1].split('emailId=')[1].split('&')[0];
    token = loc.split('?')[1].split('token=')[1].split('&')[0];
    this.model.emailId = emailId;
    this.model.token = token;
  }
  public focusFunction(element) {
    this.focusedElement = element;
  }
  resetPass(){
    if (
      this.model.password !== this.model.repassword ||
      this.model.password === '' ||
      this.model.repassword === '' ||
      this.model.password === undefined ||
      this.model.repassword === undefined
    ) {
      this.showPasswordCaution = true;
      return false;
    }else {
      this.showPasswordCaution = false;
      let url = 'auth/resetPassword';//url from API resetPassword
      this.gs.resetPassInfo(url, this.model)
      .subscribe(
        res => {
          this.forgetResponse = res;
          this.toastr.success(res['data']);
          this.router.navigate(['/sign-in']);
        },
        e => {
          this.toastr.error(e.message);
        },
        () => {
        }
      );
    }
    // let url = 'auth/resetPassword';//url from API resetPassword
    // this.gs.resetPassInfo(url, this.model)
    // .subscribe(
    //   res => {
    //     this.forgetResponse = res;
    //     this.toastr.success(res['data']);
    //     this.router.navigate(['/sign-in']);
    //   },
    //   e => {
    //     this.toastr.error(e.message);
    //   },
    //   () => {
    //   }
    // );
  }
  onOptionsSelected(val) {
    if (this.model.password !== val) {
      this.showPasswordCaution = true;
    } else {
      this.showPasswordCaution = false;
    }
  }
}
