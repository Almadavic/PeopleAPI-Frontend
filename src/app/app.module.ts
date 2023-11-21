import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/pages/home/home.component';
import { LogsComponent } from './components/pages/logs/logs.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonComponent } from './components/pages/person/person.component';
import { MessageComponent } from './components/message/message.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { NewPersonComponent } from './components/pages/new-person/new-person.component';
import { EditPersonComponent } from './components/pages/edit-person/edit-person.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {DatePipe} from "@angular/common";
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AppMaterialModule } from './shared/app-material/app-material.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LogsComponent,
    PersonComponent,
    MessageComponent,
    PersonFormComponent,
    NewPersonComponent,
    EditPersonComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    NgxMaskDirective,
    AppMaterialModule
  ],
  providers: [provideNgxMask(), DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
