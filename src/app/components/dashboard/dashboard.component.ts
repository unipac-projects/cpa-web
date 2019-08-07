import { Dash } from './../../shared/Dash';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  dash: Dash[] = [
    {id: 1, nome: 'Sentence 1', descricao: 'kkk', cols: 1, rows: 1, color: 'lightblue'},
    {id: 2, nome: 'Sentence 2', descricao: 'kkk', cols: 1, rows: 1, color: 'lightgreen'},
    {id: 3, nome: 'Sentence 3', descricao: 'kkk', cols: 1, rows: 1, color: 'lightpink'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
