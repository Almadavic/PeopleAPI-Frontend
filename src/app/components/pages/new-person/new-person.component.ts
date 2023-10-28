import { Component } from '@angular/core';
import { PersonRequest } from 'src/app/interfaces/PersonRequest';
import { FormGroup } from '@angular/forms';
import { PersonService } from 'src/app/services/person/person.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent {

  btnText = 'Register';

  constructor(
    private personService: PersonService,
    private messageService: MessageService,
    private router: Router
  ) {}

  async registerHandler(formGroup: FormGroup) {

     const person: PersonRequest = this.convertFromFormGroupToPerson(formGroup);
     await this.personService.savePerson(person).subscribe((item) =>{
     this.messageService.add(item.status.message);
      this.router.navigate(['/']);
     });

  }

  convertFromFormGroupToPerson(formGroup : FormGroup) : PersonRequest {
     const personData = formGroup.value;
     const dateFormated = this.formatDate(personData.date_of_birth);
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

}
