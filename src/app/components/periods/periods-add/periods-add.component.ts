import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodService } from '../../../services/period/period.service';
import { Period } from '../../../shared/Period';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Professor } from 'src/app/shared/Professor';
import { ProfessorService } from 'src/app/services/professor/professor.service';

@Component({
  selector: 'app-periods-add',
  templateUrl: './periods-add.component.html',
  styleUrls: ['./periods-add.component.sass']
})
export class PeriodsAddComponent implements OnInit {

  //Melhoria trazendo o Objeto
  @Input() period = new Period(); //{id: '', nome: '', descricao: ''};
  name: string;
  description: String;
  professorId: number;
  periodsForm: FormGroup;
  isLoadingResults = false;
  professors: Professor[] = [];

  constructor(private api: PeriodService,
              private professorApi: ProfessorService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { name, description, professorId } = this.periodsForm.value;
  this.period = new Period();
  this.period.name = name;
  this.period.description = description;
  this.period.professorId = professorId;

  this.api.add(this.period)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/periods-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.period).subscribe((res) => {
      this.router.navigate['/periods'];
    }, (err) => {
        console.log(err);
    });
  }

  getProfessors(): any{
    this.professorApi.get().subscribe(professors => {
      this.professors = professors;
      console.log(this.professors);
      function sayHi(){
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err =>{
      console.log(err);
    });
  }

  ngOnInit() {
    this.periodsForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.required],
      'professorId' : [null, Validators.required]
    });

    this.getProfessors();
  }
}
