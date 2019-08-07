import { Component, OnInit, Input } from '@angular/core';
import { EvaluationService } from '../../../services/evaluation/evaluation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Evaluation } from '../../../shared/Evaluation';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluations-edit',
  templateUrl: './evaluations-edit.component.html',
  styleUrls: ['./evaluations-edit.component.sass']
})
export class EvaluationsEditComponent implements OnInit {
  @Input() evaluation = new Evaluation();
  evaluationsForm: FormGroup;
  id:number;
  name:string='';
  isLoadingResults = false;

  constructor(private api: EvaluationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name, description, date } = this.evaluationsForm.value;
    this.evaluation = new Evaluation();
    this.id = this.route.snapshot.params['id'];
    this.evaluation.name = name;
    this.evaluation.description = description;
    this.evaluation.date = date;

    this.api.update(this.id, this.evaluation)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/evaluations-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.evaluation).subscribe((evaluations) => {
      this.router.navigate(['/evaluations-details/' + evaluations.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/evaluations']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  evaluationDetails() {
    this.router.navigate(['/evaluations-details', this.evaluation.id]);
  }

  ngOnInit() {
    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((evaluation: Evaluation) => {
      console.log(evaluation);
      this.evaluation.id = evaluation.id;
      this.evaluationsForm.setValue({
        name: evaluation.name,
        description: evaluation.description,
        date: new Date(evaluation.date)
      });
    });

    this.evaluationsForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.required],
      'date' : [null, Validators.required]
    });
  }


}
