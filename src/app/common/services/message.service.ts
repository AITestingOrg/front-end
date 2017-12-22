import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
 
@Injectable()
export class MessageService {
    private subject = new Subject<any>();
 
    sendMessageTest(message: string) {
        this.subject.next({ text: message });
    }
 
    clearMessageTest() {
        this.subject.next();
    }
 
    getMessageTest(): Observable<any> {
        return this.subject.asObservable();
    }
}
