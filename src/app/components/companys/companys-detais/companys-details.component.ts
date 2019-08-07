import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/shared/Company';

@Component({
  selector: 'app-companys-details',
  templateUrl: './companys-details.component.html',
  styleUrls: ['./companys-details.component.sass']
})
export class CompanysDetailsComponent implements OnInit {

  company = new Company();
  id: number;
  name: string;
  isLoadingResults = true;
  constructor(private api: CompanyService, 
              private router: Router,
              private route: ActivatedRoute) { }

  delete(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/companys']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((company: Company) => {
      console.log(company);
      this.company = company;
      this.isLoadingResults = false;
    });
  }
}
