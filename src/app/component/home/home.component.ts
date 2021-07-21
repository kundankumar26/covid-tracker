import { Component, OnInit } from '@angular/core';
import { GlobalDataArray } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public totalConfirmed: number = 0;
  public totalRecovered: number = 0;
  public totalActive: number = 0;
  public totalDeath: number = 0;

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (data) => {

        data.forEach(val => {
          console.log(val);
          if (!Number.isNaN(val.confirmed)) {
            this.totalActive += val.active ? val.active : 0;
            this.totalConfirmed += val.confirmed ? val.confirmed : 0;
            this.totalDeath += val.deaths ? val.deaths : 0;
            this.totalRecovered += val.recovered ? val.recovered : 0;
          }
        })
      }
    });
  }

}
