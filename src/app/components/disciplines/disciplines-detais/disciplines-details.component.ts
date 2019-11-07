import { Component, OnInit } from '@angular/core';
import { DisciplineService } from '../../../services/discipline/discipline.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Discipline } from 'src/app/shared/Discipline';

@Component({
  selector: 'app-disciplines-details',
  templateUrl: './disciplines-details.component.html',
  styleUrls: ['./disciplines-details.component.sass']
})
export class DisciplinesDetailsComponent implements OnInit {

  discipline = new Discipline();
  id: number;
  name: string;
  description: string;
  isLoadingResults = true;
  constructor(private api: DisciplineService, 
              private router: Router,
              private route: ActivatedRoute) { }

  delete(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/disciplines']);
      }, (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((discipline: Discipline) => {
      console.log(discipline);
      this.discipline = discipline;
      this.isLoadingResults = false;
    });
  }
}
