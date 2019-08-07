import { PersonType } from './../../../shared/PersonType';
import { DocumentRegionService } from './../../../services/document-region/document-region.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../services/company/company.service';
import { CompanyTypeService } from './../../../services/company-type/company-type.service';
import { Company } from '../../../shared/Company';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CompanyType } from 'src/app/shared/CompanyType';
import { DocumentRegion } from 'src/app/shared/DocumentRegion';
import { PersonTypeService } from 'src/app/services/person-type/person-type.service';
import { LocalService } from 'src/app/services/local/local.service';
import { Local } from 'src/app/shared/Local';

@Component({
  selector: 'app-companys-add',
  templateUrl: './companys-add.component.html',
  styleUrls: ['./companys-add.component.sass']
})
export class CompanysAddComponent implements OnInit {

  //Melhoria trazendo o Objeto
  @Input() company = new Company(); //{id: '', nome: '', descricao: ''};
  name: string;
  email: string;
  address: string;
  companyTypeId: number;
  personType: string;
  phone: string;
  mobile: string;
  documentRegion: string;
  socialId: number;
  localId: number;
  nationality: string;
  companysForm: FormGroup;
  isLoadingResults = false;
  companyTypes: CompanyType[] = [];
  documentRegions: DocumentRegion[] = [];
  personTypes: PersonType[] = [];
  locals: Local[] = [];

  constructor(private companyApi: CompanyService, 
              private companyTypeApi: CompanyTypeService, 
              private documentRegionApi: DocumentRegionService,
              private personTypeApi: PersonTypeService,
              private localApi: LocalService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { name, email, address, companyTypeId, personType, phone, mobile, documentRegion, socialId, localId, nationality } = this.companysForm.value;
  this.company = new Company();
  this.company.name = name;
  this.company.email = email;
  this.company.address = address;
  this.company.companyTypeId = companyTypeId;
  this.company.personType = personType;
  this.company.phone = phone;
  this.company.mobile = mobile;
  this.company.documentRegion = documentRegion;
  this.company.socialId = socialId;
  this.company.localId = localId;
  this.company.nationality = nationality;

  this.companyApi.add(this.company)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/companys-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.companyApi.add(this.company).subscribe((res) => {
      this.router.navigate['/companys'];
    }, (err) => {
        console.log(err);
    });
  }

  getCompanyTypes(): any {
    this.companyTypeApi.get().subscribe(companyTypes => {
      this.companyTypes = companyTypes;
      console.log(this.companyTypes);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  getDocumentRegions(): any {
    this.documentRegionApi.get().subscribe(documentRegions => {
      this.documentRegions = documentRegions;
      console.log(this.documentRegions);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  getPersonTypes(): any {
    this.personTypeApi.get().subscribe(personTypes => {
      this.personTypes = personTypes;
      console.log(this.personTypes);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  getLocals(): any {
    this.localApi.get().subscribe(locals => {
      this.locals = locals;
      console.log(this.locals);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.companysForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'address' : [null, Validators.required],
      'companyTypeId' : [null, Validators.required],
      'personType' : [null, Validators.required],
      'phone' : [null, Validators.required],
      'mobile' : [null, Validators.required],
      'documentRegion' : [null, Validators.required],
      'socialId' : [null, Validators.required],
      'localId' : [null, Validators.required],
      'nationality' : [null, Validators.required]
    });

    this.getCompanyTypes();
    this.getDocumentRegions();
    this.getPersonTypes();
    this.getLocals();
  }
 
}
