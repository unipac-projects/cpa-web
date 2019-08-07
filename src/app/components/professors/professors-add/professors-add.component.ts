import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from '../../../services/professor/professor.service';
import { Professor } from '../../../shared/Professor';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/Company';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-professors-add',
  templateUrl: './professors-add.component.html',
  styleUrls: ['./professors-add.component.sass']
})
export class ProfessorsAddComponent implements OnInit {

  @Input() professor = new Professor();
  name: string;
  email: string;
  mobile: string;
  companyId: number;
  professorsForm: FormGroup;
  isLoadingResults = false;
  companys: Company[] = [];
  
  constructor(private api: ProfessorService, 
              private companyApi: CompanyService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { name, email, mobile, shortCompetences, curriculum, companyId } = this.professorsForm.value;
  this.professor = new Professor();
  this.professor.name = name;
  this.professor.email = email;
  this.professor.mobile = mobile;
  this.professor.companyId = companyId;

  this.api.add(this.professor)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/professors-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.professor).subscribe((res) => {
      this.router.navigate['/professors'];
    }, (err) => {
        console.log(err);
    });
  }

  getCompanys(): any {
    this.companyApi.get().subscribe(companys => {
      this.companys = companys;
      console.log(this.companys);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }
  
  ngOnInit() {
    this.professorsForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'mobile' : [null, Validators.required],
      'companyId' : [null, Validators.required]
    });

    this.getCompanys();
  }
}
