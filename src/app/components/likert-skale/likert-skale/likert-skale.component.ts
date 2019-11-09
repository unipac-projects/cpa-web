import { LikertSkalaService } from './../../../services/likert-skala/likert-skale.service';
import { LikertSkala } from './../../../shared/LikertSkala';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-likert-skale',
  templateUrl: './likert-skale.component.html',
  styleUrls: ['./likert-skale.component.sass']
})
export class LikertSkaleComponent implements OnInit {

  titulo = 'LikertSkale List';
  displayedColumns: string[] = ['Id', 'Name', 'actions'];
  isLoadingResults = true;
  likertskalas: LikertSkala[] = [];
  dataSource: MatTableDataSource<LikertSkala>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: LikertSkalaService,
    private router: Router) {
    this.dataSource = new MatTableDataSource(this.likertskalas);
  }

  add() {
    this.router.navigate(['/likertskale-add']);
  }

  get() {
    this.api.get().subscribe(likertskalas => {
      this.dataSource.data = likertskalas;
      console.log(this.likertskalas);
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


