import { Choice } from '../../../shared/Choice';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChoiceService } from '../../../services/choice/choice.service';
import { from } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.sass']
})
export class ChoicesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ChoiceService, private router: Router) {
    this.dataSource = new MatTableDataSource(this.choices);
  }

  titulo = 'Choice List';
  displayedColumns: string[] = ['Id', 'Description', 'Point', 'actions'];
  isLoadingResults = true;
  choices: Choice[] = [];
  dataSource: MatTableDataSource<Choice>;

  add() {
    this.router.navigate(['/choices-add']);
  }

  get() {
    this.api.get().subscribe(choices => {
      this.dataSource.data = choices;
      console.log(this.choices);
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
