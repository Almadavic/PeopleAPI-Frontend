import { Component } from '@angular/core';
import { PersonResponse } from 'src/app/person/model/PersonResponse';
import { PersonService } from 'src/app/person/service/person/person.service';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/shared/service/message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  people: PersonResponse[] = [];
  isRequestOk: boolean = false;
  hasError: boolean = false;

  constructor(
    private personService: PersonService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.personService.getPeople().subscribe({
      next: (item) => {
        this.people = item.data;
        this.isRequestOk = true;
      },
      error: (error) => {
        this.hasError = true;
        console.log(this.hasError || this.isRequestOk);
        if (error.error && error.error.message) {
          this.onError(error.error.message);
        } else {
          this.onError('Aconteceu algum erro no servidor!');
        }
      },
    });
  }

  async removePerson(id: string) {
    await this.personService.removePerson(id).subscribe((item) => {
      this.messageService.add(item.message);
      this.personService
        .getPeople()
        .subscribe((item) => (this.people = item.data));
    });
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });

    this.dialog.afterAllClosed.subscribe(() => {
      window.location.reload();
    });
  }
}
