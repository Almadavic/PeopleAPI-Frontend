import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/services/person/person.service';
import { PersonResponse } from 'src/app/interfaces/PersonResponse';
import { MessageService } from 'src/app/services/message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {

  person!: PersonResponse;

  constructor(
    private personService: PersonService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
    ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.personService.getPerson(id).subscribe({
      next: (item) => {
          this.person = item.data;
      },
      error: (error) => {
        this.onError(error.error.message);
        this.router.navigate(['/']);
      }
    })
}

  removePerson(id: string) {
    this.personService.removePerson(id).subscribe((item) => {
      this.messageService.add(item.message);
        this.router.navigate(['/']);
    });

  }

  onError(errorMessage: string) {
     this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
     })
  }

}
