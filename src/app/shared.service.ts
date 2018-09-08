// tslint:disable-next-line:import-blacklist
import { Subject ,  Observable } from 'rxjs';
import { AppComponent } from './app.component';
import {Injectable, Component} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import * as _ from 'lodash';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

// @Injectable({
//   providedIn: 'root'
// })

export class SharedService {

    // Variable Decalarations
    public loc = location.href;
    public locSplit = this.loc.split('/');
    public fbaseUrl = this.locSplit[0] + '//' + this.locSplit[2];
    private newBaseUrl = this.fbaseUrl;
    xsrfToken: any;
    editInfo: any;



    // Observable string sources
    private yubiInfo = new Subject<any>();
    public firstLogin = new Subject<any>();
    public walletid = new Subject<any>();
    public toasterMessage = new Subject<any>();

  private openuserinvite = new Subject <any>();
  private loadSubject = new Subject<any>();
public loadSubject$ = this.loadSubject.asObservable();
    // Observable string streams
    public yubiInfo$ = this.yubiInfo.asObservable();
    public firstLogin$ = this.firstLogin.asObservable();
    public walletid$ = this.walletid.asObservable();
    public openuserinvite$ = this.openuserinvite.asObservable();
    public toasterMessage$ = this.toasterMessage.asObservable();
    token: any = '';

    Openmodel() {
      this.openuserinvite.next();
    }


    getValid(param) {
      this.yubiInfo.next(param);
    }
    setToken(token) {
      return sessionStorage.setItem('accessToken', token);
    }
    getToken() {
      return sessionStorage.getItem('accessToken');
    }
    ToasterMessage(val) {
      this.toasterMessage.next(val);
   }
    FirstLogin(val) {
       this.firstLogin.next(val);
      sessionStorage.setItem('firstLogin', JSON.stringify(val));
    }
    Walletid(val) {
      this.walletid.next(val);
      sessionStorage.setItem('walletid', JSON.stringify(val));
    }
    showLoading(param: boolean) {
      if (param === true) {
        this.loadSubject.next(true);
      } else {
        this.loadSubject.next(false);
      }
    }
    validVal(val) {
      if (val === undefined || val === null || val === '') {
        return false;
      } else {
        return true;
      }
    }
  }
