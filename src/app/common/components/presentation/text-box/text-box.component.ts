import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit, OnChanges {

  @Input() private id: string;
  @Input() private placeholder: string;
  @Input() private encryption: string;
  @Input() private icon: string;
  @Input() private textboxValue: string;
  ngOnChanges(changes: SimpleChanges): void {}

  //@Output() textboxChange: EventEmitter<String> = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {}

  onChange(event) {
  }

}
