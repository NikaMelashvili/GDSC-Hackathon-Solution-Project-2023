import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SigneinComponent } from "./signein/signein.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, SigneinComponent, HomeComponent]
})
export class AppComponent {
  title = 'OCEANA';
}
import { Router } from '@angular/router';
import { HomeComponent } from "./home/home.component";

