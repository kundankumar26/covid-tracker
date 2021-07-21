import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalDataArray } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl: string = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-20-2021.csv';
  public globalData: GlobalDataArray[] = [];
  constructor(private http: HttpClient) { }

  getGlobalData() {
    return this.http.get(this.globalDataUrl, {responseType: 'text'})
    .pipe(map(data => {
        let raw = new Map();
        let rows = data.split('\n');
        rows.splice(0, 1);
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          let globalDataObj: GlobalDataArray = {
            state: cols[2],
            country: cols[3],
            last_updated: new Date(cols[4]),
            lat_: +cols[5],
            long_: +cols[6],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
            combined_Key: +cols[11],
            incident_Rate: +cols[12],
            case_Fatality_Ratio: +cols[13]
          };
          this.globalData.push(globalDataObj);
          let temp = raw.get(globalDataObj.country);
          if(temp){
            temp.active += globalDataObj.active;
            temp.confirmed += globalDataObj.confirmed;
            temp.deaths += globalDataObj.deaths;
            temp.recovered += globalDataObj.recovered;

            raw.set(globalDataObj.country, temp);
          } else {
            raw.set(globalDataObj.country, globalDataObj);
          }
        })
        return raw;
      })
    );
  }
}
