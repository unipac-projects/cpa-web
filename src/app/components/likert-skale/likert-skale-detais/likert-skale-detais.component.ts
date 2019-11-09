import { LikertSkala } from './../../../shared/LikertSkala';
import { LikertSkalaService } from './../../../services/likert-skala/likert-skale.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-likert-skale-detais',
  templateUrl: './likert-skale-detais.component.html',
  styleUrls: ['./likert-skale-detais.component.sass']
})
export class LikertSkaleDetaisComponent implements OnInit {

  likertskala = new LikertSkala();
  id: number;
  name: string;
  isLoadingResults = true;
  constructor(private api: LikertSkalaService,
              private router: Router,
              private route: ActivatedRoute) { }

  delete(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/likertskale']);
      }, (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((likertskala: LikertSkala) => {
      console.log(likertskala);
      this.likertskala = likertskala;
      this.isLoadingResults = false;
    });
  }

}
