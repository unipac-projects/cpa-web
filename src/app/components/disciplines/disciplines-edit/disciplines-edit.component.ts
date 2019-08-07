import { Component, OnInit, Input } from '@angular/core';
import { DisciplineService } from '../../../services/discipline/discipline.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Discipline } from '../../../shared/Discipline';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-disciplines-edit',
  templateUrl: './disciplines-edit.component.html',
  styleUrls: ['./disciplines-edit.component.sass']
})
export class DisciplinesEditComponent implements OnInit {
  @Input() discipline = new Discipline();
  disciplinesForm: FormGroup;
  id:number;
  name:string='';
  isLoadingResults = false;

  constructor(private api: DisciplineService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name } = this.disciplinesForm.value;
    this.discipline = new Discipline();
    this.id = this.route.snapshot.params['id'];
    this.discipline.name = name;

    this.api.update(this.id, this.discipline)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/disciplines-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.discipline).subscribe((disciplines) => {
      this.router.navigate(['/disciplines-details/' + disciplines.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/disciplines']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  disciplineDetails() {
    this.router.navigate(['/disciplines-details', this.discipline.id]);
  }

  ngOnInit() {
    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((discipline: Discipline) => {
      console.log(discipline);
      this.discipline.id = discipline.id;
      this.disciplinesForm.setValue({
        name: discipline.name
      });
    });

    this.disciplinesForm = this.formBuilder.group({
      'name' : [null, Validators.required]
    });
  }


}
