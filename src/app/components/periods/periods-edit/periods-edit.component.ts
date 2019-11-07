import { Component, OnInit, Input } from '@angular/core';
import { PeriodService } from '../../../services/period/period.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Period } from '../../../shared/Period';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Professor } from 'src/app/shared/Professor';
import { ProfessorService } from 'src/app/services/professor/professor.service';

@Component({
  selector: 'app-periods-edit',
  templateUrl: './periods-edit.component.html',
  styleUrls: ['./periods-edit.component.sass']
})
export class PeriodsEditComponent implements OnInit {
  @Input() period = new Period();
  periodsForm: FormGroup;
  id:number;
  name:string='';
  description='';
  professorId:number;
  isLoadingResults = false;
  professors: Professor[] = [];

  constructor(private api: PeriodService,
    private professorApi: ProfessorService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name, code, shortDescription, description, professorId } = this.periodsForm.value;
    this.period = new Period();
    this.id = this.route.snapshot.params['id'];
    this.period.name = name;
    this.period.description = description;
    this.period.professorId = professorId;

    this.api.update(this.id, this.period)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/periods-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.period).subscribe((jobOpportunity) => {
      this.router.navigate(['/periods-details/' + jobOpportunity.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/periods']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  periodDetails() {
    this.router.navigate(['/periods-details', this.period.id]);
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
    .subscribe((period: Period) => {
      console.log(period);
      this.period.id = period.id;
      this.periodsForm.setValue({
        name: period.name,
        description: period.description,
        professorId: period.professorId
      });
    });

    this.periodsForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.required],
      'professorId' : [null, Validators.required]
    });

    this.getProfessors();
  }
}
