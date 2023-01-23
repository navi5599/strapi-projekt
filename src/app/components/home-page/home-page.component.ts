import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchDataService } from '../../services/fetch-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  coins: any[] = [];

  constructor(public router: Router, public fetchApiData: FetchDataService) {}

  ngOnInit(): void {
    this.getKriptos();
  }

  logOut(): void {
    localStorage.clear();
  }

  getKriptos(): void {
    this.fetchApiData.getAllKriptos().subscribe((resp: any) => {
      this.coins = resp.data;
      console.log(this.coins);
      return this.coins;
    });
  }
}
