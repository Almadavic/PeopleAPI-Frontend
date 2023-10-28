import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { LogsComponent } from './components/pages/logs/logs.component';
import { PersonComponent } from './components/pages/person/person.component';
import { NewPersonComponent } from './components/pages/new-person/new-person.component';
import { EditPersonComponent } from './components/pages/edit-person/edit-person.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'people', component: HomeComponent},
  {path:'people/new', component: NewPersonComponent},
  {path: 'people/edit/:id', component: EditPersonComponent},
  {path:'people/:id', component: PersonComponent},
  {path: 'logs', component: LogsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
