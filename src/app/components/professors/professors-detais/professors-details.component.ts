import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../../services/professor/professor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Professor } from 'src/app/shared/Professor';

@Component({
  selector: 'app-professors-details',
  templateUrl: './professors-details.component.html',
  styleUrls: ['./professors-details.component.sass']
})
export class ProfessorsDetailsComponent implements OnInit {
  Professor = new Professor();
  id: number;
  name: string;
  isLoadingResults = true;
  constructor(private api: ProfessorService, 
              private router: Router,
              private route: ActivatedRoute) { }

  delete(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/professors']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((Professor: Professor) => {
      console.log(Professor);
      this.Professor = Professor;
      this.isLoadingResults = false;
    });
  }
}
