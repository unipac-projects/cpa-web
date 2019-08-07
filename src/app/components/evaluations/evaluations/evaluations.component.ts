import { Evaluation } from '../../../shared/Evaluation';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../../../services/evaluation/evaluation.service';
import { from } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.sass']
})
export class EvaluationsComponent implements OnInit {

  titulo = 'Evaluation List';
  displayedColumns: string[] = ['Id', 'Name', 'Date', 'actions'];
  isLoadingResults = true;
  evaluations: Evaluation[] = [];
  dataSource: MatTableDataSource<Evaluation>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: EvaluationService,
    private router: Router) {
    this.dataSource = new MatTableDataSource(this.evaluations);
  }

  add() {
    this.router.navigate(['/evaluations-add']);
  }

  get() {
    this.api.get().subscribe(evaluations => {
      this.dataSource.data = evaluations;
      console.log(this.evaluations);
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
