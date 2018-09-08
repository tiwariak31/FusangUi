import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { GeneralService } from '../../../general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../shared.service';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-invite-customers',
  templateUrl: './invite-customers.component.html',
  styleUrls: ['./invite-customers.component.css']
})
export class InviteCustomersComponent implements OnInit {
  dpControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  modalRef: BsModalRef;
  basic:Boolean = false;
  approver:Boolean = false;
  cusclass:any=[];
  countrylist:any=[];
  countrylist1:any=[];
  basicmodel:any={firstName:'',
                  lastName: '',
                  country:'',
                  phoneNo:'',
                  email:''};
  approvermodel:any;
  x:any;
  filteredOptions: Observable<string[]>;
  code: any;
  phonelength: any;
  successRef: BsModalRef;
  complianceRef: BsModalRef;
  policyRef: BsModalRef;
  signupsuccessRef: BsModalRef;
  rejectRef: BsModalRef;
  confirmRef: BsModalRef;
  constructor(private _domSanitizer: DomSanitizer, private modalService: BsModalService,
    private router: Router, private gs: GeneralService, private ss: SharedService, private toastr: ToastrService,
     private titlecasePipe: TitleCasePipe,private fb: FormBuilder ) { }

  ngOnInit() {
    this.getcountrylist();
    this.getinvitedata();
    this.filteredOptions = this.dpControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        return this._filter(value)})
    );
    this.showbasic();
    // this.showapprover();
  }
  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    // console.log(event.option.value);
    this.basicmodel.country=event.option.value;

    this.countrylist.forEach((element) => {
      if(event.option.value.toLowerCase()===element.name.toLowerCase()){
        this.code = element.dial_code;
        console.log(this.code);
        this.phonelength = element.length;
        this.basicmodel.phoneNo= this.code+" ";
      }
    });

  }

  inviteCustomer(invitetemplate: TemplateRef<any>, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(invitetemplate,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countrylist1.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  getcountrylist() {
    const url = '/assets/countrylist.json';
    this.gs.localfileinfo(url)
    .subscribe(
      res => {
        this.countrylist = res['countrylist'];
        this.countrylist.forEach((element) => {
          this.countrylist1.push(element.name);
        });
      },
      e => {
      },
      () => {
      }
    );
  }
  invitedSuccessfull(successtemplate: TemplateRef<any>, template: TemplateRef<any>){
    this.modalRef.hide();
    this.successRef = this.modalService.show(successtemplate,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }

  signupSuccess(signupsuccess: TemplateRef<any>, template: TemplateRef<any>){
    this.signupsuccessRef = this.modalService.show(signupsuccess,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }


  policyInsights(policyinsights: TemplateRef<any>, template: TemplateRef<any>) {
    this.policyRef = this.modalService.show(policyinsights,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }
  complianceInsights(complianceinsights: TemplateRef<any>, template: TemplateRef<any>) {
    this.complianceRef = this.modalService.show(complianceinsights,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }
  confirmChecking(confirmchecking: TemplateRef<any>){
    this.confirmRef = this.modalService.show(confirmchecking,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }
  rejectVerification(rejectverification: TemplateRef<any>){
    this.rejectRef = this.modalService.show(rejectverification,Object.assign({}, { class: 'invite-cus-pop modal-lg' }));
  }
  getinvitedata(){
    const url = '/assets/json/inviteaccordion.json';
    this.gs.localfileinfo(url)
    .subscribe(
      res => {
        this.x = res;
      },
      e => {
      },
      () => {
      }
    );
  }
  showbasic() {
    this.basic = true;
    this.approver = false;
  }
  showapprover() {
    this.basic = false;
    this.approver = true;
  }
  nexttab(){
    console.log(this.basicmodel);
    this.showapprover()
  }
  // openFunc(i){
  //   i.visibal=true;
  // }
  // closeFunc(i){
  //   i.visibal=false;
  // }
}
