import { Discipline } from '../../../shared/Discipline';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplineService } from '../../../services/discipline/discipline.service';
import { from } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.sass']
})
export class DisciplinesComponent implements OnInit {

  titulo = 'Discipline List';
  displayedColumns: string[] = ['Id', 'Name', 'actions'];
  isLoadingResults = true;
  disciplines: Discipline[] = [];
  dataSource: MatTableDataSource<Discipline>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: DisciplineService,
    private router: Router) {
    this.dataSource = new MatTableDataSource(this.disciplines);
  }

  add() {
    this.router.navigate(['/disciplines-add']);
  }

  get() {
    this.api.get().subscribe(disciplines => {
      this.dataSource.data = disciplines;
      console.log(this.disciplines);
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
