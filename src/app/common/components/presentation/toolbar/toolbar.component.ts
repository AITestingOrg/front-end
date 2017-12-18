import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() private title:string;
  private router:Router;

  constructor(router:Router) { 
    this.router = router;
  }

  ngOnInit() {
  }

  goHome(event) {
    this.router.navigateByUrl('/login');
  }

}
