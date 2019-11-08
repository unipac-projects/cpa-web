import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule } from "@angular/material";
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthComponent } from './components/auth/auth.component';
import { CompanyTypesComponent } from './components/company-types/company-types/company-types.component';
import { CompanyTypesAddComponent } from './components/company-types/company-types-add/company-types-add.component';
import { CompanyTypesEditComponent } from './components/company-types/company-types-edit/company-types-edit.component';
import { CompanyTypesDetailsComponent } from './components/company-types/company-types-detais/company-types-details.component';
import { CompanysComponent } from './components/companys/companys/companys.component';
import { CompanysAddComponent } from './components/companys/companys-add/companys-add.component';
import { CompanysEditComponent } from './components/companys/companys-edit/companys-edit.component';
import { CompanysDetailsComponent } from './components/companys/companys-detais/companys-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfessorsComponent } from './components/professors/professors/professors.component';
import { ProfessorsAddComponent } from './components/professors/professors-add/professors-add.component';
import { ProfessorsDetailsComponent } from './components/professors/professors-detais/professors-details.component';
import { ProfessorsEditComponent } from './components/professors/professors-edit/professors-edit.component';
import { CoursesComponent } from './components/courses/courses/courses.component';
import { CoursesAddComponent } from './components/courses/courses-add/courses-add.component';
import { CoursesEditComponent } from './components/courses/courses-edit/courses-edit.component';
import { CoursesDetailsComponent } from './components/courses/courses-detais/courses-details.component';
import { StudentsComponent } from './components/students/students/students.component';
import { StudentsAddComponent } from './components/students/students-add/students-add.component';
import { StudentsEditComponent } from './components/students/students-edit/students-edit.component';
import { StudentsDetailsComponent } from './components/students/students-detais/students-details.component';
import { EvaluationsComponent } from './components/evaluations/evaluations/evaluations.component';
import { EvaluationsAddComponent } from './components/evaluations/evaluations-add/evaluations-add.component';
import { EvaluationsEditComponent } from './components/evaluations/evaluations-edit/evaluations-edit.component';
import { EvaluationsDetailsComponent } from './components/evaluations/evaluations-detais/evaluations-details.component';
import { PeriodsComponent } from './components/periods/periods/periods.component';
import { PeriodsAddComponent } from './components/periods/periods-add/periods-add.component';
import { PeriodsEditComponent } from './components/periods/periods-edit/periods-edit.component';
import { PeriodsDetailsComponent } from './components/periods/periods-detais/periods-details.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TableOverviewExampleComponent } from './components/table-overview-example/table-overview-example.component';
import { DisciplinesComponent } from './components/disciplines/disciplines/disciplines.component';
import { DisciplinesAddComponent } from './components/disciplines/disciplines-add/disciplines-add.component';
import { DisciplinesDetailsComponent } from './components/disciplines/disciplines-detais/disciplines-details.component';
import { DisciplinesEditComponent } from './components/disciplines/disciplines-edit/disciplines-edit.component';
import { ChoicesComponent } from './components/choices/choices/choices.component';
import { ChoicesAddComponent } from './components/choices/choices-add/choices-add.component';
import { ChoicesDetailsComponent } from './components/choices/choices-details/choices-details.component';
import { ChoicesEditComponent } from './components/choices/choices-edit/choices-edit.component';
import { QuestionsComponent } from './components/questions/questions/questions.component';
import { QuestionsAddComponent } from './components/questions/questions-add/questions-add.component';
import { QuestionsDetailsComponent } from './components/questions/questions-details/questions-details.component';
import { QuestionsEditComponent } from './components/questions/questions-edit/questions-edit.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AuthComponent,
    CompanyTypesComponent,
    CompanyTypesAddComponent,
    CompanyTypesEditComponent,
    CompanyTypesDetailsComponent,
    CompanysComponent,
    CompanysAddComponent,
    CompanysEditComponent,
    CompanysDetailsComponent,
    DashboardComponent,
    ProfessorsComponent,
    ProfessorsAddComponent,
    ProfessorsDetailsComponent,
    ProfessorsEditComponent,
    CoursesComponent,
    CoursesAddComponent,
    CoursesEditComponent,
    CoursesDetailsComponent,
    StudentsComponent,
    StudentsAddComponent,
    StudentsEditComponent,
    StudentsDetailsComponent,
    EvaluationsComponent,
    EvaluationsAddComponent,
    EvaluationsEditComponent,
    EvaluationsDetailsComponent,
    PeriodsComponent,
    PeriodsAddComponent,
    PeriodsEditComponent,
    PeriodsDetailsComponent,
    DisciplinesComponent,
    DisciplinesAddComponent,
    DisciplinesDetailsComponent,
    DisciplinesEditComponent,
    TableOverviewExampleComponent,
    ChoicesComponent,
    ChoicesAddComponent,
    ChoicesDetailsComponent,
    ChoicesEditComponent,
    QuestionsComponent,
    QuestionsAddComponent,
    QuestionsDetailsComponent,
    QuestionsEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
