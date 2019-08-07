import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../../../services/evaluation/evaluation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evaluation } from 'src/app/shared/Evaluation';

@Component({
  selector: 'app-evaluations-details',
  templateUrl: './evaluations-details.component.html',
  styleUrls: ['./evaluations-details.component.sass']
})
export class EvaluationsDetailsComponent implements OnInit {

  evaluation = new Evaluation();
  id: number;
  name: string;
  isLoadingResults = true;
  constructor(private api: EvaluationService, 
              private router: Router,
              private route: ActivatedRoute) { }

  delete(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/evaluations']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((evaluation: Evaluation) => {
      console.log(evaluation);
      this.evaluation = evaluation;
      this.isLoadingResults = false;
    });
  }
}
