import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent implements OnInit {
  usertyperesponse: any = [];
  deepStorage: any = [];
  secureStorage: any = [];
  highFrequency: any = [];
  model: any = {};
  deepStorageId:any;
  secureStorageId:any;
  highFrequencyId:any;
  constructor(private generalservice: GeneralService, private router:Router) { }

  ngOnInit() {
    this.getusertype();
    let loc, id, firstName, username;
    loc = location.href;
    id = loc.split('?')[1].split('id=')[1].split('&')[0];
    firstName = loc.split('?')[1].split('firstName=')[1].split('&')[0];
    username = loc.split('?')[1].split('username=')[1].split('&')[0];
    this.model.id= id;
    this.model.firstName = firstName;
    this.model.username = username;
    // this.model.id= "1";
    // this.model.firstName = "Ashutosh";
    // this.model.username = "tiwariak31@gmil.com";
  }
  getusertype () {
    const url = 'wallet/getUserType';
    this.generalservice.getUserType(url)
                        .subscribe(
                          res => {
                            this.usertyperesponse = res['data'];
                            console.log(this.usertyperesponse);
                            this.deepStorage = this.usertyperesponse.deepStorage ;
                            this.secureStorage = this.usertyperesponse.secureStorage;
                            this.highFrequency = this.usertyperesponse.highFrequency ;
                            this.deepStorageId = this.usertyperesponse.deepStorageId ;
                            this.secureStorageId = this.usertyperesponse.secureStorageId;
                            this.highFrequencyId = this.usertyperesponse.highFrequencyId ;
                          },
                          e => {
                          },
                          () => {
                          }
                        );
  }

  gotosignup(userTypeId){
    this.model.userTypeId = userTypeId;
    sessionStorage.setItem('model', JSON.stringify(this.model));
    console.log("session stotage");
    this.router.navigate(['/sign-up']);
  }

}

