import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import 'devextreme/data/odata/store';
import { lastValueFrom } from 'rxjs';
import { Flight } from 'src/app/shared/interfaces';

@Component({
  templateUrl: 'flights.component.html',
  providers: [
    {
      provide: DatePipe,
    },
  ],
})
export class FlightsComponent {
  flights: CustomStore;

  constructor(private http: HttpClient) {
    this.flights = new CustomStore({
      key: 'icao24',
      load: () => {
        let params: HttpParams = new HttpParams()
          .append('begin', 1517227200)
          .append('end', 1517230800);

        return lastValueFrom(
          this.http.get<Flight[]>(
            'https://opensky-network.org/api/flights/all',
            {
              params: params,
            }
          )
        )
          .then((result) => {
            return result;
          })
          .catch(() => {
            throw 'Data loading error';
          });
      },
    });
  }
}
