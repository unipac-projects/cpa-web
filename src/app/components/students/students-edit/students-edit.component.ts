import { Component, OnInit, Input } from '@angular/core';
import { ProfessorService } from '../../../services/professor/professor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../../shared/Student';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-students-edit',
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.sass']
})
export class StudentsEditComponent implements OnInit {
  @Input() student = new Student();
  studentsForm: FormGroup;
  id:number;
  name:string='';
  email: string;
  mobile: string;
  companyId: number;
  isLoadingResults = false;
  companys: Company[] = [];

  constructor(private api: StudentService,
    private companyApi: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name, email, mobile, companyId } = this.studentsForm.value;
    this.student = new Student();
    this.id = this.route.snapshot.params['id'];
    this.student.name = name;
    this.student.email = email;
    this.student.mobile = mobile;
    this.student.companyId = companyId;

    this.api.update(this.id, this.student)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/students-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.student).subscribe((student) => {
      this.router.navigate(['/students-details/' + student.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/students']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  companyTypeDetails() {
    this.router.navigate(['/students-details', this.student.id]);
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
    .subscribe((student: Student) => {
      console.log(student);
      this.student.id = student.id;
      this.studentsForm.setValue({
        name: student.name,
        email: student.email,
        mobile: student.mobile,
        companyId: student.companyId
      });
    });

    this.studentsForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'mobile' : [null, Validators.required],
      'companyId' : [null, Validators.required]
    });

    this.getCompanys();
  }
}
