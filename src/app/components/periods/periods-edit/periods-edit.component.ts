import { Component, OnInit, Input } from '@angular/core';
import { PeriodService } from '../../../services/period/period.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Period } from '../../../shared/Period';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-periods-edit',
  templateUrl: './periods-edit.component.html',
  styleUrls: ['./periods-edit.component.sass']
})
export class PeriodsEditComponent implements OnInit {
  @Input() period = new Period();
  periodsForm: FormGroup;
  id:number;
  name:string='';
  isLoadingResults = false;

  constructor(private api: PeriodService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name } = this.periodsForm.value;
    this.period = new Period();
    this.id = this.route.snapshot.params['id'];
    this.period.name = name;

    this.api.update(this.id, this.period)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/periods-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.period).subscribe((periods) => {
      this.router.navigate(['/periods-details/' + periods.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/periods']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  periodDetails() {
    this.router.navigate(['/periods-details', this.period.id]);
  }

  ngOnInit() {
    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((period: Period) => {
      console.log(period);
      this.period.id = period.id;
      this.periodsForm.setValue({
        name: period.name
      });
    });

    this.periodsForm = this.formBuilder.group({
      'name' : [null, Validators.required]
    });
  }


}
