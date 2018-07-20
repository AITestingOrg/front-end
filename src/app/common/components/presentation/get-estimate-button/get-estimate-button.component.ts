import { Component, OnInit, Input, Output, HostListener, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-get-estimate-button',
  templateUrl: './get-estimate-button.component.html',
  styleUrls: ['./get-estimate-button.component.scss']
})
export class GetEstimateButtonComponent implements OnInit {

  @Input() private label: string;
  @Input() private color: string;
  @Input() private disabled: string;

  @Output() public clickEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  click(event) {
    //this.clickEvent.emit(event);
  }
}
