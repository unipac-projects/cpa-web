import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../services/student/student.service';
import { Student } from '../../../shared/Student';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/Company';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-students-add',
  templateUrl: './students-add.component.html',
  styleUrls: ['./students-add.component.sass']
})
export class StudentsAddComponent implements OnInit {

  @Input() student = new Student();
  name: string;
  email: string;
  mobile: string;
  companyId: number;
  studentsForm: FormGroup;
  isLoadingResults = false;
  companys: Company[] = [];
  
  constructor(private api:StudentService, 
              private companyApi: CompanyService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { name, email, mobile, companyId } = this.studentsForm.value;
  this.student = new Student();
  this.student.name = name;
  this.student.email = email;
  this.student.mobile = mobile;
  this.student.companyId = companyId;

  this.api.add(this.student)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/students-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.student).subscribe((res) => {
      this.router.navigate['/students'];
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
    this.studentsForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'mobile' : [null, Validators.required],
      'companyId' : [null, Validators.required]
    });

    this.getCompanys();
  }
}
