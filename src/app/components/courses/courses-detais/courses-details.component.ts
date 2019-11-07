import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/shared/Course';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.sass']
})
export class CoursesDetailsComponent implements OnInit {

  course = new Course();
  id: number;
  name: string;
  isLoadingResults = true;
  constructor(private api: CourseService,
              private router: Router,
              private route: ActivatedRoute) { }

  delete(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/courses']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((course: Course) => {
      console.log(course);
      this.course = course;
      this.isLoadingResults = false;
    });
  }
}
