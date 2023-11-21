import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonResponse } from 'src/app/interfaces/PersonResponse';
import { FormGroup } from '@angular/forms';
import { PersonRequest } from 'src/app/interfaces/PersonRequest';
import { MessageService } from 'src/app/services/message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

  personResponse!: PersonResponse;
  btnText = 'Editar';

  constructor(
    private personService: PersonService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog : MatDialog
  ) {}

   ngOnInit(): void {
    const personId = String(this.route.snapshot.paramMap.get("id"));
    this.personService.getPerson(personId).subscribe({
      next: (data) => {
        this.personResponse = data.data;
      }, error: (error) => {
         this.onError(error.error.message);
         this.router.navigate(['/']);
      }
    })
  }

  updateHandler(formGroup: FormGroup) {

   const personRequest = this.convertFromFormGroupToPerson(formGroup);
    this.personService.updatePerson(personRequest, this.personResponse.id).subscribe((item) => {
      this.messageService.add(item.status.message);
      this.router.navigate(['/']);
    })
  }

  convertFromFormGroupToPerson(formGroup : FormGroup) : PersonRequest {
    const personData = formGroup.value;
    const dateFormated : string = this.formatDate((personData.date_of_birth));
   return {
     name: personData.name,
     email: personData.email,
     date_of_birth: new Date(dateFormated),
     gender: personData.gender,
     address: {
       country: personData.country,
       state: personData.state,
       city: personData.city
     }
   };
 }

  formatDate(date_of_birth: string): string {

    date_of_birth = date_of_birth.replaceAll("/", "");

    let partsDate : string [] = [
      date_of_birth.substring(0, 2),
      date_of_birth.substring(2, 4),
      date_of_birth.substring(4, 8)
    ];


    let newDateFormated : string = '';

    for(let i= 0; i < partsDate.length; i++) {
      newDateFormated = (`${partsDate[i]}-`) + newDateFormated;
    }

    return newDateFormated.substring(0, newDateFormated.length-1);
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
     data: errorMessage
    })
 }

}
