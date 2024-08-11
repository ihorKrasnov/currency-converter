import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrencyHeaderComponent } from './currency-header/currency-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyConverterComponent, CurrencyHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
