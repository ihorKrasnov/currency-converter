import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    private apiUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    private ratesSubject = new BehaviorSubject<Record<string, number>>({});
    public rates$ = this.ratesSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadRates();
    }

    private loadRates(): void {
        this.http.get<any[]>(this.apiUrl).pipe(
            map(rates => {
                const ratesMap = rates.reduce((acc: Record<string, number>, rate: any) => {
                    acc[rate.cc] = rate.rate;
                    return acc;
                }, {} as Record<string, number>);

                ratesMap['UAH'] = 1;

                return ratesMap;
            })
        ).subscribe(ratesMap => {
            this.ratesSubject.next(ratesMap);
        });
    }
}