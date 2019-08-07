import { Student } from '../../../shared/Student';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../services/student/student.service';
import { from } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass']
})
export class StudentsComponent implements OnInit {

  titulo = 'Student List';
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Mobile', 'actions'];
  isLoadingResults = true;
  students: Student[] = [];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: StudentService,
    private router: Router) {

    this.dataSource = new MatTableDataSource(this.students);
  }

  add() {
    this.router.navigate(['/students-add']);
  }

  get() {
    this.api.get().subscribe(students => {
      this.dataSource.data = students;
      console.log(this.students);
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
