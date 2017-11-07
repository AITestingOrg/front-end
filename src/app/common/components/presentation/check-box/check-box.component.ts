import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {

  @Input() private label: string
  @Input() private color: string

  constructor() { }

  ngOnInit() {
  }

}
