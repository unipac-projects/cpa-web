import { Component, OnInit } from '@angular/core';
import { PeriodService } from '../../../services/period/period.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Period } from 'src/app/shared/Period';

@Component({
  selector: 'app-periods-details',
  templateUrl: './periods-details.component.html',
  styleUrls: ['./periods-details.component.sass']
})
export class PeriodsDetailsComponent implements OnInit {

  period = new Period();
  id: number;
  name: string;
  isLoadingResults = true;
  constructor(private api: PeriodService, 
              private router: Router,
              private route: ActivatedRoute) { }

  delete(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/periods']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((period: Period) => {
      console.log(period);
      this.period = period;
      this.isLoadingResults = false;
    });
  }
}
