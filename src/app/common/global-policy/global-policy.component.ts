import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-policy',
  templateUrl: './global-policy.component.html',
  styleUrls: ['./global-policy.component.css']
})
export class GlobalPolicyComponent implements OnInit {
  policy: Boolean = false;
  compilance: Boolean = false;
  showwalletfield: Boolean = false;
  showipaddress: Boolean = false;
  view: Boolean = false;
  constructor() { }

  ngOnInit() {
  }
  showpolicyconfig() {
    this.policy = true;
    this.compilance = false;
  }
  showacompilance() {
    this.policy = false;
    this.compilance = true;
  }

}
