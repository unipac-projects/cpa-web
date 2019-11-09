import { LikertSkala } from './../../../shared/LikertSkala';
import { LikertSkalaService } from './../../../services/likert-skala/likert-skale.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-likert-skale-add',
  templateUrl: './likert-skale-add.component.html',
  styleUrls: ['./likert-skale-add.component.sass']
})
export class LikertSkaleAddComponent implements OnInit {

  @Input() likertskale = new LikertSkala();
  name: string;
  likertskaleForm: FormGroup;
  isLoadingResults = false;

  constructor(private api: LikertSkalaService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;

    const { name  } = this.likertskaleForm.value;
    this.likertskale = new LikertSkala();
    this.likertskale.name = name;

    this.api.add(this.likertskale)
      .subscribe(res => {
          console.log(res);
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/likertskale-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }

  add() {
    this.api.add(this.likertskale).subscribe((res) => {
      this.router.navigate['/likertskale'];
    }, (err) => {
        console.log(err);
    });
  }

  ngOnInit() {
    this.likertskaleForm = this.formBuilder.group({
      'name' : [null, Validators.required]
    });
  }

}

