import { Component } from '@angular/core';
import { PersonResponse } from 'src/app/interfaces/PersonResponse';
import { PersonService } from 'src/app/services/person/person.service';

import {faTimes, faEdit} from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/services/message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  people: PersonResponse[] = [];
  peopleListSize!: number;
  isRequestOk: boolean = false;
  hasError: boolean = false;
  personName!: string;
  updatePeople: Subscription | undefined;

  constructor(
    private personService: PersonService,
    private messageService: MessageService,
    private dialog: MatDialog
    ) {}

  ngOnInit() {
    this.personService.getPeople(null).subscribe({
      next: (item) => {
          this.people = item.data;
          this.isRequestOk = true;
          this.peopleListSize = item.items_amount;

      },
      error: (error) => {
        this.hasError = true;
        if(error.error && error.error.message) {
        this.onError(error.error.message);
        } else {
          this.onError("Aconteceu algum erro no servidor!")
        }

      }
    },);

    this.updatePeople = interval(20000).subscribe(() => {
      this.personService.getPeople(null).subscribe((data) =>{
         this.people = data.data;
      })
    });

  }

  removePerson(id: string) {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: 'Você deseja excluir essa pessoa?',
    });

    dialog.afterClosed().subscribe(result => {
      if(result === 'yes') {
        this.personService.removePerson(id).subscribe((item) => {
          this.messageService.add(item.message);
          this.personService.getPeople(null).subscribe(item => {
            this.people = item.data
            this.peopleListSize = item.items_amount;
          });
        });
      }
    })
  }



  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
     data: errorMessage
    });

    this.dialog.afterAllClosed.subscribe(() => {
      window.location.reload();
    })

 }

 search(event : Event) :void {

    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.personService.getPeople(value).subscribe(item => {
      setTimeout(() => {
        this.people = item.data
        this.peopleListSize = item.items_amount;
      }, 500)
    });

 }

 ngOnDestroy(): void {
  if ( this.updatePeople) {
    this.updatePeople.unsubscribe();
  }
}

}
