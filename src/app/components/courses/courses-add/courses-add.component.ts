import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course/course.service';
import { Course } from '../../../shared/Course';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/Company';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.sass']
})
export class CoursesAddComponent implements OnInit {

  //Melhoria trazendo o Objeto
  @Input() course = new Course(); //{id: '', nome: '', descricao: ''};
  name: string;
  companyId: number;
  coursesForm: FormGroup;
  isLoadingResults = false;
  companys: Company[] = [];

  constructor(private api: CourseService, 
              private companyApi: CompanyService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { name, code, shortDescription, companyId } = this.coursesForm.value;
  this.course = new Course();
  this.course.name = name;
  this.course.companyId = companyId;

  this.api.add(this.course)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/courses-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.course).subscribe((res) => {
      this.router.navigate['/courses'];
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
    this.coursesForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'companyId' : [null, Validators.required]
    });

    this.getCompanys();
  }
}
