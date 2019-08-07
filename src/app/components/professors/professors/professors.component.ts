import { Professor } from '../../../shared/Professor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from '../../../services/professor/professor.service';
import { from } from 'rxjs';
import { UserType } from 'src/app/shared/UserType';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.sass']
})
export class ProfessorsComponent implements OnInit {

  titulo = 'Company List';
  displayedColumns : string[] = ['Id', 'Name', 'Email', 'Mobile', 'actions'];
  userTypes: UserType[] = [];
  isLoadingResults = true;
  professors: Professor[] = [];
  dataSource: MatTableDataSource<Professor>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private api: ProfessorService,
              private router: Router) { 
                this.dataSource = new MatTableDataSource(this.professors);
              }
 
  add() {
    this.router.navigate(['/professors-add']);
  }

  get() {
      this.api.get().subscribe(professors => {
        this.dataSource.data = professors;
        console.log(this.professors);
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
