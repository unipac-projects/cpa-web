import { Choice } from '../../../shared/Choice';
import { Component, OnInit, Input } from '@angular/core';
import { ChoiceService } from '../../../services/choice/choice.service';
import { ChoicesComponent } from '../choices/choices.component';

@Component({
  selector: 'app-choices-details',
  templateUrl: './choices-details.component.html',
  styleUrls: ['./choices-details.component.sass']
})
export class ChoicesDetailsComponent implements OnInit {

  @Input() choice: Choice;

  constructor(private choiceService: ChoiceService, private listComponent: ChoicesComponent) { }

  ngOnInit() {
  }

}
