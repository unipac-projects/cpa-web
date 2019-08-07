import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodService } from '../../../services/period/period.service';
import { Period } from '../../../shared/Period';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-periods-add',
  templateUrl: './periods-add.component.html',
  styleUrls: ['./periods-add.component.sass']
})
export class PeriodsAddComponent implements OnInit {

  //Melhoria trazendo o Objeto
  @Input() period = new Period(); //{id: '', nome: '', descricao: ''};
  name: string;
  periodsForm: FormGroup;
  isLoadingResults = false;

  constructor(private api: PeriodService, 
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { name } = this.periodsForm.value;
  this.period = new Period();
  this.period.name = name;

  this.api.add(this.period)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/periods-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.period).subscribe((res) => {
      this.router.navigate['/periods'];
    }, (err) => {
        console.log(err);
    });
  }
  
  ngOnInit() {
    this.periodsForm = this.formBuilder.group({
      'name' : [null, Validators.required]
    });
  }
}
