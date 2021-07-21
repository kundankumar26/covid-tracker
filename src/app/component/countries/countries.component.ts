import { Component, OnInit } from '@angular/core';
import { GlobalDataArray } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  public globalData: GlobalDataArray[] = [];
  public countryList: string[] = [];

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({next: data => {
      data.forEach((val, key: string) => {
        this.countryList.push(key);
      })
      console.log(this.countryList);
    }})
  }

}
