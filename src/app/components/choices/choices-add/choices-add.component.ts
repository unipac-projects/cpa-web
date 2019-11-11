import { ChoiceService } from '../../../services/choice/choice.service';
import { Choice } from '../../../shared/Choice';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LikertSkala } from 'src/app/shared/LikertSkala';
import { LikertSkalaService } from 'src/app/services/likert-skala/likert-skale.service';

@Component({
  selector: 'app-choices-add',
  templateUrl: './choices-add.component.html',
  styleUrls: ['./choices-add.component.sass']
})
export class ChoicesAddComponent implements OnInit {

  @Input() choice = new Choice();
  description: string;
  point: number;
  likertsSkalesId: number;
  choicesForm: FormGroup;
  isLoadingResults = false;
  likertsSkales: LikertSkala[] = [];

  constructor(private api:ChoiceService,
    private likertSkaleApi: LikertSkalaService,
    private router: Router,
    private formBuilder: FormBuilder) { }

    onFormSubmit(form:NgForm) {
      this.isLoadingResults = true;

    const { description, point, likertsSkalesId } = this.choicesForm.value;
    this.choice = new Choice();
    this.choice.description = description;
    this.choice.point = point;
    this.choice.likertsSkalesId = likertsSkalesId;

    this.api.add(this.choice)
      .subscribe(res => {
          console.log(res);
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/choices-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }

    add() {
      this.api.add(this.choice).subscribe((res) => {
        this.router.navigate['/choices'];
      }, (err) => {
          console.log(err);
      });
    }

    getLikertsSkales(): any {
      this.likertSkaleApi.get().subscribe(likertsSkales => {
        this.likertsSkales = likertsSkales;
        console.log(this.likertsSkales);
        function sayHi() {
          alert('Hello');
        }
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
      });
    }

    ngOnInit() {
      this.choicesForm = this.formBuilder.group({
        'description' : [null, Validators.required],
        'point' : [null, Validators.required],
        'likertsSkalesId' : [null, Validators.required]
      });

      this.getLikertsSkales();
    }

}
