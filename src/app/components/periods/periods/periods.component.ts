import { Period } from '../../../shared/Period';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodService } from '../../../services/period/period.service';
import { from } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.sass']
})
export class PeriodsComponent implements OnInit {

  titulo = 'Period List';
  displayedColumns: string[] = ['Id', 'Name'];
  isLoadingResults = true;
  periods: Period[] = [];
  dataSource: MatTableDataSource<Period>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: PeriodService,
    private router: Router) { 
      this.dataSource = new MatTableDataSource(this.periods);
    }

  add() {
    this.router.navigate(['/periods-add']);
  }

  get() {
    this.api.get().subscribe(periods => {
      this.dataSource.data = periods;
      console.log(this.periods);
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
