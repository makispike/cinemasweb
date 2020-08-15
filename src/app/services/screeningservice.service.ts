import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScreeningserviceService {

  private screenings: any = [];

  constructor(private httpClient: HttpClient) { }

  getAllScreeningsFromServer() {
    this.httpClient
      .get<any[]>('http://localhost:8080/screening/')
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log('Error calling the screenings API: ' + error);
        }
      );
  }
}
