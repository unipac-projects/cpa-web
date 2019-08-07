import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplineService } from '../../../services/discipline/discipline.service';
import { Discipline } from '../../../shared/Discipline';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-disciplines-add',
  templateUrl: './disciplines-add.component.html',
  styleUrls: ['./disciplines-add.component.sass']
})
export class DisciplinesAddComponent implements OnInit {

  //Melhoria trazendo o Objeto
  @Input() discipline = new Discipline(); //{id: '', nome: '', descricao: ''};
  name: string;
  disciplinesForm: FormGroup;
  isLoadingResults = false;

  constructor(private api: DisciplineService, 
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { name } = this.disciplinesForm.value;
  this.discipline = new Discipline();
  this.discipline.name = name;

  this.api.add(this.discipline)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/disciplines-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.discipline).subscribe((res) => {
      this.router.navigate['/disciplines'];
    }, (err) => {
        console.log(err);
    });
  }
  
  ngOnInit() {
    this.disciplinesForm = this.formBuilder.group({
      'name' : [null, Validators.required]
    });
  }
}
