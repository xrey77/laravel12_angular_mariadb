import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenu } from "./nav-menu/nav-menu";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular');
}
