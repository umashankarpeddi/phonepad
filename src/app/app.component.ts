import {Component, OnInit} from '@angular/core';
import {CombinationsService} from "./service/combinations.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public invalidPhoneNumber: boolean;
  public combinations: [];
  pageNumber = 1;

  constructor(private combinationsService: CombinationsService) {

  }

  ngOnInit(): void {

  }

  validatePhoneNumber(phoneNumber: string) {
    this.invalidPhoneNumber = true;
    this.combinations = [];
    const phoneRegex = "^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{0,3})[- .]?\\d{3,4}[- .]?\\d{4}$";

    if (phoneNumber.match(phoneRegex)) {
      this.invalidPhoneNumber = false;
      this.calculateCombinations(phoneNumber);
    }
  }

  public calculateCombinations(phoneNumber: string) {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker('./app.worker', {type: 'module'});
      worker.onmessage = ({data}) => {
        this.combinationsService.updateCombinations(data).subscribe(response => {
          this.getCombinations();
        });

      };
      worker.postMessage(phoneNumber);
    }
  }

  public getCombinations() {
    this.combinationsService.getCombinations().subscribe(data => {
      this.combinations = [];
      // @ts-ignore
      this.combinations = data;
    });
  }
}


