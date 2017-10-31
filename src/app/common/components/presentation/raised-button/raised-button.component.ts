import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raised-button',
  templateUrl: './raised-button.component.html',
  styleUrls: ['./raised-button.component.scss']
})
export class RaisedButtonComponent implements OnInit {

  label = 'Sign In'
  
  constructor() { }

  ngOnInit() {
  }

}
