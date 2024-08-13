import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GetAPIService } from '../services/get-api.service';
import { IData } from '../interfaces/i-data';
import { SpinnerComponent } from "../spinner/spinner.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf ,HttpClientModule, SpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  selected !: string[];
  dataAPI!: IData[];
  spinnerBool: boolean = false;
  constructor(private _GetAPIService: GetAPIService) {
  }
  getSelect(event: any) {
    console.log(event.target.value);
    let value = event.target.value;
    if (value == 'all') {
      this.getAPIData()
    } else {
      this.setSelectedProduct(value);
    }

  }
  setSelectedProduct(value : string)
  {
    this.spinnerBool = true;


    this._GetAPIService.setSelectedProduct(value).subscribe({
      next: (res) => {
        this.spinnerBool = false;
        this.dataAPI = res;


      },
      error: (err) => {
        console.log(err.message)
      }
   })
  }
  getAPIData() {
    this.spinnerBool = true;

    this._GetAPIService.getAPI().subscribe({
      next: (res) => {
        this.dataAPI = res;
        this.spinnerBool = false;
      },
      error: (err) => {
        console.log(err.message)
      }

    });
  }
  ngOnInit(): void {
    this.spinnerBool = true;

    this.getAPIData()
    this._GetAPIService.getSelectedProduct().subscribe({

      next: (res) => {
        this.selected = res;
        this.spinnerBool = false;

      },
      error: (err) => {
        console.log(err.message)
      }
    }
)
  }


}
