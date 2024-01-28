import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TagInputComponent} from "./tag-input/tag-input.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TagInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProtectLine';
}
