import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/shared/Student';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.sass']
})
export class StudentsDetailsComponent implements OnInit {
  student = new Student();
  id: number;
  name: string;
  isLoadingResults = true;
  constructor(private api: StudentService, 
              private router: Router,
              private route: ActivatedRoute) { }

  delete(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/students']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((student: Student) => {
      console.log(student);
      this.student = student;
      this.isLoadingResults = false;
    });
  }
}
