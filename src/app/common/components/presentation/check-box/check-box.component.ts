import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {

  @Input() private label: string
  @Input() private color: string
  @Input() private checkboxValue:boolean  

  @Output() checkboxChange:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange(newValue) {
    this.checkboxValue = newValue;
    console.log("The checkbox value is: " + newValue);
    this.checkboxChange.emit(newValue);
  }

}
