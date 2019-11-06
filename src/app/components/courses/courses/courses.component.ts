import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course/course.service';
import { from } from 'rxjs';
import { Course } from '../../../shared/Course';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass']
})
export class CoursesComponent implements OnInit {

  titulo = 'Company List';
  displayedColumns: string[] = ['Id', 'Name', 'actions'];
  isLoadingResults = true;
  courses: Course[] = [];
  dataSource: MatTableDataSource<Course>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private api: CourseService,
    private router: Router) {

    this.dataSource = new MatTableDataSource(this.courses);
  }

  add() {
    this.router.navigate(['/courses-add']);
  }

  get() {
    this.api.get().subscribe(courses => {
      this.dataSource.data = courses;
      console.log(this.courses);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  delete(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        this.get()
      }, (err) => {
        console.log(err);
      }
      );
  }

  /**
* Set the paginator and sort after the view init since this component will
* be able to query its view for the initialized paginator and sort.
*/
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    console.log('');
    this.get();
  }

}
