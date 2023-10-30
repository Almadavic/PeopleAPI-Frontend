import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonResponse } from 'src/app/person/model/PersonResponse';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
})
export class PersonFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<FormGroup>();
  @Input() btnText!: string;
  @Input() personData: PersonResponse | null = null;

  personForm!: FormGroup;
  dateMask = '00/00/0000';

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.personForm = new FormGroup({
      name: new FormControl(this.personData ? this.personData.name : '', [
        Validators.required,
      ]),
      email: new FormControl(this.personData ? this.personData.email : '', [
        Validators.required,
        Validators.email,
      ]),
      date_of_birth: new FormControl(
        this.personData ? this.formatDate(this.personData.date_of_birth) : '',
        [Validators.required]
      ),
      gender: new FormControl(
        this.personData ? this.personData.gender.toLowerCase() : '',
        [Validators.required]
      ),
      country: new FormControl(
        this.personData ? this.personData.address.country : '',
        [Validators.required]
      ),
      state: new FormControl(
        this.personData ? this.personData.address.state : '',
        [Validators.required]
      ),
      city: new FormControl(
        this.personData ? this.personData.address.city : '',
        [Validators.required]
      ),
    });
  }

  formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  get name() {
    return this.personForm.get('name')!;
  }

  get email() {
    return this.personForm.get('email')!;
  }

  get date_of_birth() {
    return this.personForm.get('date_of_birth')!;
  }

  get gender() {
    return this.personForm.get('gender')!;
  }

  get country() {
    return this.personForm.get('country')!;
  }

  get state() {
    return this.personForm.get('state')!;
  }

  get city() {
    return this.personForm.get('city')!;
  }

  submit() {
    if (this.personForm.invalid) {
      return;
    }
    this.onSubmit.emit(this.personForm);
  }
}
