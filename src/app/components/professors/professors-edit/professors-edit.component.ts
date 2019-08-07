import { Component, OnInit, Input } from '@angular/core';
import { ProfessorService } from '../../../services/professor/professor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Professor } from '../../../shared/Professor';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';

@Component({
  selector: 'app-professors-edit',
  templateUrl: './professors-edit.component.html',
  styleUrls: ['./professors-edit.component.sass']
})
export class ProfessorsEditComponent implements OnInit {
  @Input() professor = new Professor();
  professorsForm: FormGroup;
  id:number;
  name:string='';
  email: string;
  mobile: string;
  companyId: number;
  isLoadingResults = false;
  companys: Company[] = [];

  constructor(private api: ProfessorService,
    private companyApi: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name, email, mobile, shortCompetences, curriculum, companyId } = this.professorsForm.value;
    this.professor = new Professor();
    this.id = this.route.snapshot.params['id'];
    this.professor.name = name;
    this.professor.email = email;
    this.professor.mobile = mobile;
    this.professor.companyId = companyId;

    this.api.update(this.id, this.professor)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/professors-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.professor).subscribe((professor) => {
      this.router.navigate(['/professors-details/' + professor.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/professors']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  companyTypeDetails() {
    this.router.navigate(['/professors-details', this.professor.id]);
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
    .subscribe((professor: Professor) => {
      console.log(professor);
      this.professor.id = professor.id;
      this.professorsForm.setValue({
        name: professor.name,
        email: professor.email,
        mobile: professor.mobile,
        companyId: professor.companyId
      });
    });

    this.professorsForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'mobile' : [null, Validators.required],
      'companyId' : [null, Validators.required]
    });

    this.getCompanys();
  }
}
