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

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((likertSkala: LikertSkala) => {
      console.log(likertSkala);
      this.likertskala = likertSkala;
      this.isLoadingResults = false;
    });
  }
}
