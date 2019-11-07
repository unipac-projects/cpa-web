import { Component, OnInit, Input } from '@angular/core';
import { DisciplineService } from '../../../services/discipline/discipline.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Discipline } from '../../../shared/Discipline';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Professor } from 'src/app/shared/Professor';
import { ProfessorService } from 'src/app/services/professor/professor.service';

@Component({
  selector: 'app-disciplines-edit',
  templateUrl: './disciplines-edit.component.html',
  styleUrls: ['./disciplines-edit.component.sass']
})
export class DisciplinesEditComponent implements OnInit {
  @Input() discipline = new Discipline();
  disciplinesForm: FormGroup;
  id:number;
  name:string='';
  description='';
  professorId:number;
  isLoadingResults = false;
  professors: Professor[] = [];

  constructor(private api: DisciplineService,
    private professorApi: ProfessorService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name, code, shortDescription, description, professorId } = this.disciplinesForm.value;
    this.discipline = new Discipline();
    this.id = this.route.snapshot.params['id'];
    this.discipline.name = name;
    this.discipline.description = description;
    this.discipline.professorId = professorId;

    this.api.update(this.id, this.discipline)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/disciplines-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.discipline).subscribe((jobOpportunity) => {
      this.router.navigate(['/disciplines-details/' + jobOpportunity.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/disciplines']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  disciplineDetails() {
    this.router.navigate(['/disciplines-details', this.discipline.id]);
  }

  getProfessors():any{
    this.professorApi.get().subscribe(professors =>{
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
    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((discipline: Discipline) => {
      console.log(discipline);
      this.discipline.id = discipline.id;
      this.disciplinesForm.setValue({
        name: discipline.name,
        description: discipline.description,
        professorId: discipline.professorId
      });
    });

    this.disciplinesForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.required],
      'professorId' : [null, Validators.required]
    });

    this.getProfessors();
  }
}
