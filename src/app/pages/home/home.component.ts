import { Component } from '@angular/core';
import { Person } from 'src/app/shared/interfaces';
import { PEOPLE_DATA } from './home.data';

@Component({
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  people: Person[] = PEOPLE_DATA;
}
