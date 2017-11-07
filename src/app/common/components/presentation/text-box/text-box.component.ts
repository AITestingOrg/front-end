import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {
  @Input() private id:string
  @Input() private placeholder:string
  @Input() private encryption:string
  @Input() private icon:string
  
  private value: string
  constructor() { }

  ngOnInit() {}

}
