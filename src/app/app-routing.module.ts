import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { CompanyTypesComponent } from './components/company-types/company-types/company-types.component';
import { CompanyTypesAddComponent } from './components/company-types/company-types-add/company-types-add.component';
import { CompanyTypesEditComponent } from './components/company-types/company-types-edit/company-types-edit.component';
import { CompanyTypesDetailsComponent } from './components/company-types/company-types-detais/company-types-details.component';
import { CompanysComponent } from './components/companys/companys/companys.component';
import { CompanysAddComponent } from './components/companys/companys-add/companys-add.component';
import { CompanysEditComponent } from './components/companys/companys-edit/companys-edit.component';
import { CompanysDetailsComponent } from './components/companys/companys-detais/companys-details.component';
import { StudentsComponent } from './components/students/students/students.component';
import { StudentsAddComponent } from './components/students/students-add/students-add.component';
import { StudentsEditComponent } from './components/students/students-edit/students-edit.component';
import { StudentsDetailsComponent } from './components/students/students-detais/students-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfessorsComponent } from './components/professors/professors/professors.component';
import { ProfessorsAddComponent } from './components/professors/professors-add/professors-add.component';
import { ProfessorsDetailsComponent } from './components/professors/professors-detais/professors-details.component';
import { ProfessorsEditComponent } from './components/professors/professors-edit/professors-edit.component';
import { CoursesComponent } from './components/courses/courses/courses.component';
import { CoursesAddComponent } from './components/courses/courses-add/courses-add.component';
import { CoursesEditComponent } from './components/courses/courses-edit/courses-edit.component';
import { CoursesDetailsComponent } from './components/courses/courses-detais/courses-details.component';
import { EvaluationsComponent } from './components/evaluations/evaluations/evaluations.component';
import { EvaluationsAddComponent } from './components/evaluations/evaluations-add/evaluations-add.component';
import { EvaluationsEditComponent } from './components/evaluations/evaluations-edit/evaluations-edit.component';
import { EvaluationsDetailsComponent } from './components/evaluations/evaluations-detais/evaluations-details.component';
import { PeriodsComponent } from './components/periods/periods/periods.component';
import { PeriodsAddComponent } from './components/periods/periods-add/periods-add.component';
import { PeriodsEditComponent } from './components/periods/periods-edit/periods-edit.component';
import { PeriodsDetailsComponent } from './components/periods/periods-detais/periods-details.component';
import { TableOverviewExampleComponent } from './components/table-overview-example/table-overview-example.component';
import { DisciplinesComponent } from './components/disciplines/disciplines/disciplines.component';
import { DisciplinesAddComponent } from './components/disciplines/disciplines-add/disciplines-add.component';
import { DisciplinesDetailsComponent } from './components/disciplines/disciplines-detais/disciplines-details.component';
import { DisciplinesEditComponent } from './components/disciplines/disciplines-edit/disciplines-edit.component';

const routes: Routes = [
  {
    path: 'professors',
    component: ProfessorsComponent,
    data: { title: 'List professors'},
    canActivate: [AuthGuardService]
  },
  {
   path:'professors-add',
   component: ProfessorsAddComponent,
   data: { title: 'Add professors'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'professors-details/:id',
    component: ProfessorsDetailsComponent,
    data: { title: 'Details of professors'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'professors-edit/:id',
    component: ProfessorsEditComponent,
    data: { title: 'Edit professors'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'company-types',
    component: CompanyTypesComponent,
    data: { title: 'List companys'},
    canActivate: [AuthGuardService]
  },
  {
   path:'company-types-add',
   component: CompanyTypesAddComponent,
   data: { title: 'Add companys'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'company-types-details/:id',
    component: CompanyTypesDetailsComponent,
    data: { title: 'Details of companys'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'company-types-edit/:id',
    component: CompanyTypesEditComponent,
    data: { title: 'Edit companys'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'companys',
    component: CompanysComponent,
    data: { title: 'List companys'},
    canActivate: [AuthGuardService]
  },
  {
   path:'companys-add',
   component: CompanysAddComponent,
   data: { title: 'Add companys'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'companys-details/:id',
    component: CompanysDetailsComponent,
    data: { title: 'Details of companys'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'companys-edit/:id',
    component: CompanysEditComponent,
    data: { title: 'Edit companys'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'courses',
    component: CoursesComponent,
    data: { title: 'List courses'},
    canActivate: [AuthGuardService]
  },
  {
   path:'courses-add',
   component: CoursesAddComponent,
   data: { title: 'Add Course'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'courses-details/:id',
    component: CoursesDetailsComponent,
    data: { title: 'Details of courses'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'courses-edit/:id',
    component: CoursesEditComponent,
    data: { title: 'Edit companys'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'periods',
    component: PeriodsComponent,
    data: { title: 'List periods'},
    canActivate: [AuthGuardService]
  },
  {
   path:'periods-add',
   component: PeriodsAddComponent,
   data: { title: 'Add periods'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'periods-details/:id',
    component: PeriodsDetailsComponent,
    data: { title: 'Details of periods'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'periods-edit/:id',
    component: PeriodsEditComponent,
    data: { title: 'Edit periods'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'disciplines',
    component: DisciplinesComponent,
    data: { title: 'List disciplines'},
    canActivate: [AuthGuardService]
  },
  {
   path:'disciplines-add',
   component: DisciplinesAddComponent,
   data: { title: 'Add disciplines'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'disciplines-details/:id',
    component: DisciplinesDetailsComponent,
    data: { title: 'Details of disciplines'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'disciplines-edit/:id',
    component: DisciplinesEditComponent,
    data: { title: 'Edit disciplines'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'students',
    component: StudentsComponent,
    data: { title: 'List students'},
    canActivate: [AuthGuardService]
  },
  {
   path:'students-add',
   component: StudentsAddComponent,
   data: { title: 'Add students'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'students-details/:id',
    component: StudentsDetailsComponent,
    data: { title: 'Details of students'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'students-edit/:id',
    component: StudentsEditComponent,
    data: { title: 'Edit students'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'evaluations',
    component: EvaluationsComponent,
    data: { title: 'List evaluations'},
    canActivate: [AuthGuardService]
  },
  {
   path:'evaluations-add',
   component: EvaluationsAddComponent,
   data: { title: 'Add evaluations'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'evaluations-details/:id',
    component: EvaluationsDetailsComponent,
    data: { title: 'Details of evaluations'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'evaluations-edit/:id',
    component: EvaluationsEditComponent,
    data: { title: 'Edit evaluations'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Alteração de Tipo de Servicos'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'table',
    component: TableOverviewExampleComponent,
    data: { title: 'Teste de Tabela'},
    canActivate: [AuthGuardService]
  },
  //auth
  {path: 'auth', component: AuthComponent, runGuardsAndResolvers: 'always'},
  {path: '', component: AuthComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
