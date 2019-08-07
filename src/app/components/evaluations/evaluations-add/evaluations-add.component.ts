import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../../../services/evaluation/evaluation.service';
import { Evaluation } from '../../../shared/Evaluation';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluations-add',
  templateUrl: './evaluations-add.component.html',
  styleUrls: ['./evaluations-add.component.sass']
})
export class EvaluationsAddComponent implements OnInit {

  //Melhoria trazendo o Objeto
  @Input() evaluation = new Evaluation(); //{id: '', nome: '', descricao: ''};
  name: string;
  description: string;
  date: string;
  evaluationsForm: FormGroup;
  isLoadingResults = false;

  constructor(private api: EvaluationService, 
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { name, description, date } = this.evaluationsForm.value;
  this.evaluation = new Evaluation();
  this.evaluation.name = name;
  this.evaluation.description = description;
  this.evaluation.date = date;

  this.api.add(this.evaluation)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/evaluations-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.evaluation).subscribe((res) => {
      this.router.navigate['/evaluations'];
    }, (err) => {
        console.log(err);
    });
  }
  
  ngOnInit() {
    this.evaluationsForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.required],
      'date' : [null, Validators.required]
    });
  }
}
