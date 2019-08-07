import { CompanyTypeService } from './../../../services/company-type/company-type.service';
import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../../../shared/Company';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CompanyType } from 'src/app/shared/CompanyType';
import { DocumentRegionService } from 'src/app/services/document-region/document-region.service';
import { PersonTypeService } from 'src/app/services/person-type/person-type.service';
import { DocumentRegion } from 'src/app/shared/DocumentRegion';
import { PersonType } from 'src/app/shared/PersonType';
import { LocalService } from 'src/app/services/local/local.service';
import { Local } from 'src/app/shared/Local';

@Component({
  selector: 'app-companys-edit',
  templateUrl: './companys-edit.component.html',
  styleUrls: ['./companys-edit.component.sass']
})
export class CompanysEditComponent implements OnInit {
  @Input() company = new Company();
  companysForm: FormGroup;
  id:number;
  name:string='';
  email: string;
  address: string;
  companyTypeId: number;
  personType: string;
  phone: string;
  mobile: string;
  documentRegion: string;
  socialId: number;
  
  nationality: string;
  isLoadingResults = false;
  companyType = new CompanyType();
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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name, email, address, companyTypeId, personType, phone, mobile, documentRegion, socialId, localId, nationality } = this.companysForm.value;
    this.company = new Company();
    this.id = this.route.snapshot.params['id'];
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

    this.companyApi.update(this.id, this.company)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/companys-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.companyApi.update(this.route.snapshot.params['id'], this.company).subscribe((companys) => {
      this.router.navigate(['/companys-details/' + companys.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.companyApi.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/companys']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  companyTypeDetails() {
    this.router.navigate(['/companys-details', this.company.id]);
  }

  getCompanyTypes(): any {
    this.companyTypeApi.get().subscribe(companyTypes => {
      this.companyTypes = companyTypes;
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
    this.getCompanyTypes();
    this.getDocumentRegions();
    this.getPersonTypes();
    this.getLocals();

    this.companyApi.getById(this.route.snapshot.params['id'])
    .subscribe((company: Company) => {
      console.log(company);
      this.company.id = company.id;
      this.company.email = company.email;
      this.company.address = company.address;
      this.company.companyTypeId = company.companyTypeId;
      this.company.personType = company.personType;
      this.company.phone = company.phone;
      this.company.mobile = company.mobile;
      this.company.documentRegion = company.documentRegion;
      this.company.socialId = company.socialId;
      this.company.localId = company.localId;
      this.company.nationality = company.nationality;

      this.companysForm.setValue({
        name: company.name,
        email: company.email,
        address: company.address,
        companyTypeId: company.companyTypeId,
        personType: company.personType,
        phone: company.phone,
        mobile: company.mobile,
        documentRegion: company.documentRegion,
        socialId: company.socialId,
        localId: company.localId,
        nationality: company.nationality
      });
    });

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
  }


}
