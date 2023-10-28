import { Component } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  constructor(public messageService: MessageService) {}

  faTimes = faTimes;

}
