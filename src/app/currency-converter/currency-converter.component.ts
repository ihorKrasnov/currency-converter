import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyService } from '../../shared/currency/currency.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'app-currency-converter',
    templateUrl: './currency-converter.component.html',
    styleUrls: ['./currency-converter.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ]
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
    amount1: number = 1;
    amount2: number = 0;
    currency1: string = 'UAH';
    currency2: string = 'USD';
    rates: Record<string, number> = {};
    currencies: { value: string }[] = [];

    private ratesSubscription: Subscription|undefined = undefined;

    constructor(private currencyService: CurrencyService) {}

    ngOnDestroy(): void {
        if (this.ratesSubscription) {
            this.ratesSubscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.ratesSubscription = this.currencyService.rates$.subscribe(data => {
            this.rates = data;
            this.currencies = Object.entries(data).map(([key]) => ({
                value: key
            }));
            this.convertCurrency(1);
        });
    }

    convertCurrency(direction: number) {
        if (direction === 1) {
          // Перетворення з currency1 в currency2
          const rate1ToUAH = this.rates[this.currency1];
          const rate2ToUAH = this.rates[this.currency2];
          if (rate1ToUAH && rate2ToUAH) {
            this.amount2 = this.roundToNearest(this.amount1 * (rate1ToUAH / rate2ToUAH));
          }
        } else {
          // Перетворення з currency2 в currency1
          const rate1ToUAH = this.rates[this.currency1];
          const rate2ToUAH = this.rates[this.currency2];
          if (rate1ToUAH && rate2ToUAH) {
            this.amount1 = this.roundToNearest(this.amount2 * (rate2ToUAH / rate1ToUAH));
          }
        }
      }

    roundToNearest(value: number, step: number = 0.01): number {
        return +(Math.round(value / step) * step).toFixed(2);
    }
}
