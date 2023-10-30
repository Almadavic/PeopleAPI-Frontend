import { Component } from '@angular/core';

import { Log } from 'src/app/log/model/Log';

import { LogsService } from 'src/app/log/service/logs/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent {
  logs: Log[] = [];

  constructor(private logService: LogsService) {}

  async ngOnInit() {
    await this.logService
      .getLogs()
      .subscribe((item) => (this.logs = item.data));
  }
}