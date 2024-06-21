import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'task-manager-frontend';
}
