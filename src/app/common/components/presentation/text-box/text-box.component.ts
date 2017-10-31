import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {
  @Input() private id: string
  @Input() private placeholder: string
  private value: string
  constructor() { }

  ngOnInit() {}

}
