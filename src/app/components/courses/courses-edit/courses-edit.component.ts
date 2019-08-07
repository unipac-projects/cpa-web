import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../../../shared/Course';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';

@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.sass']
})
export class CoursesEditComponent implements OnInit {
  @Input() course = new Course();
  coursesForm: FormGroup;
  id:number;
  name:string='';
  companyId: number;
  isLoadingResults = false;
  companys: Company[] = [];

  constructor(private api: CourseService,
    private companyApi: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name, code, shortDescription, companyId } = this.coursesForm.value;
    this.course = new Course();
    this.id = this.route.snapshot.params['id'];
    this.course.name = name;
    this.course.companyId = companyId;

    this.api.update(this.id, this.course)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/courses-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.course).subscribe((jobOpportunity) => {
      this.router.navigate(['/courses-details/' + jobOpportunity.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/courses']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  companyTypeDetails() {
    this.router.navigate(['/courses-details', this.course.id]);
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
    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((course: Course) => {
      console.log(course);
      this.course.id = course.id;
      this.coursesForm.setValue({
        name: course.name,
        companyId: course.companyId
      });
    });

    this.coursesForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'companyId' : [null, Validators.required]
    });

    this.getCompanys();
  }
}
