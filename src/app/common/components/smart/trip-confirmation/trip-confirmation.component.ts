import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIGatewayService } from 'app/common/services/api-gateway.service';
import { MessageService } from 'app/common/services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-confirmation',
  templateUrl: './trip-confirmation.component.html',
  styleUrls: ['./trip-confirmation.component.scss']
})
export class TripConfirmationComponent implements OnInit {
  
  subscription: Subscription;
  message: string;

  constructor(
    private apiGatewayService:APIGatewayService,
    private messageService:MessageService,
    private router:Router) {
      this.subscription = this.messageService.getMessageTest().subscribe(
        message => { 
          this.message = message.text; });
     }

  ngOnInit() {
    //this.apiGatewayService.getTrip(this.message);
  }

  confirm(event) {
    this.router.navigateByUrl('/temp');
  }

}
