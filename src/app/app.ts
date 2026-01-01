import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Poll } from './poll/poll';

@Component({
  selector: 'app-root',
  imports: [Poll],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('poll_frontend');
}
