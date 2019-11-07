import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplineService } from '../../../services/discipline/discipline.service';
import { Discipline } from '../../../shared/Discipline';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Professor } from 'src/app/shared/Professor';
import { ProfessorService } from 'src/app/services/professor/professor.service';

@Component({
  selector: 'app-disciplines-add',
  templateUrl: './disciplines-add.component.html',
  styleUrls: ['./disciplines-add.component.sass']
})
export class DisciplinesAddComponent implements OnInit {

  //Melhoria trazendo o Objeto
  @Input() discipline = new Discipline(); //{id: '', nome: '', descricao: ''};
  name: string;
  description: String;
  professorId: number;
  disciplinesForm: FormGroup;
  isLoadingResults = false;
  professors: Professor[] = [];

  constructor(private api: DisciplineService,
              private professorApi: ProfessorService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { name, description, professorId } = this.disciplinesForm.value;
  this.discipline = new Discipline();
  this.discipline.name = name;
  this.discipline.description = description;
  this.discipline.professorId = professorId;

  this.api.add(this.discipline)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/disciplines-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.discipline).subscribe((res) => {
      this.router.navigate['/disciplines'];
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
    this.disciplinesForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.required],
      'professorId' : [null, Validators.required]
    });

    this.getProfessors();
  }
}
