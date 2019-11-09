import { LikertSkalaService } from './../../../services/likert-skala/likert-skale.service';
import { LikertSkala } from './../../../shared/LikertSkala';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-likert-skale-edit',
  templateUrl: './likert-skale-edit.component.html',
  styleUrls: ['./likert-skale-edit.component.sass']
})
export class LikertSkaleEditComponent implements OnInit {

  @Input() likertskale = new LikertSkala();
  likertskaleForm: FormGroup;
  id:number;
  name:string='';
  isLoadingResults = false;

  constructor(private api: LikertSkalaService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name } = this.likertskaleForm.value;
    this.likertskale = new LikertSkala();
    this.id = this.route.snapshot.params['id'];
    this.likertskale.name = name;


    this.api.update(this.id, this.likertskale)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/likertskale-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.likertskale).subscribe((likertskale) => {
      this.router.navigate(['/likertskale-details/' + likertskale.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/likertskale']);
      }, (err) => {
        console.log(err);
      }
    );
  }

  likertSkaleDetails() {
    this.router.navigate(['/likertskale-details', this.likertskale.id]);
  }

  ngOnInit() {
    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((likertskale: LikertSkala) => {
      console.log(likertskale);
      this.likertskale.id = likertskale.id;
      this.likertskaleForm.setValue({
        name: likertskale.name
      });
    });

    this.likertskaleForm = this.formBuilder.group({
      'name' : [null, Validators.required]

    });
  }
}


