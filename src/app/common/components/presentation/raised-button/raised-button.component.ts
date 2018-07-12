import { Component, OnInit, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

@Component({
  selector: 'app-raised-button',
  templateUrl: './raised-button.component.html',
  styleUrls: ['./raised-button.component.scss']
})
export class RaisedButtonComponent implements OnInit {

  @Input() private label: string;
  @Input() private color: string;
  @Input() private disabled: string;

  @Output() public clickEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  click(event) {
    this.clickEvent.emit(event);
  }

}
