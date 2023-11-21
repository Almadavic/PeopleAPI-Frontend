import { Component } from '@angular/core';

import { Log } from 'src/app/interfaces/Log';

import { LogsService } from 'src/app/services/logs/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent {

  logs: Log[] = [];
  displayedColumns: string[] = ['id', 'event', 'event_time'];

  constructor(
    private logService: LogsService,
    ) {}

  async ngOnInit() {
    await this.logService.getLogs().subscribe(item => this.logs = item.data);
  }

}
