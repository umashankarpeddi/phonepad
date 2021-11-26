import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CombinationsService {

  private baseUrl = 'http://localhost:8000/combinations';
  constructor(private http:HttpClient) { }

  getCombinations() {
    return this.http.get<any>(this.baseUrl);
  }

  updateCombinations(combinations: any) {
    return this.http.post<any>(this.baseUrl, combinations);
  }
}
