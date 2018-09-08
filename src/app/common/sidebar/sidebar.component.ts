import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  typeOfUser: Boolean = true;
  constructor() {
    const res = JSON.parse(sessionStorage.getItem('firstLogin'));
    if  (res != null) {
    if (res['typeOfUser'] === 'User') {
      this.typeOfUser = false;
    }
  }
  }

  ngOnInit() {
  }

}
