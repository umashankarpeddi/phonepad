import {inject, TestBed} from '@angular/core/testing';

import { CombinationsService } from './combinations.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "../app.component";
import {of} from "rxjs";

describe('CombinationsService', () => {
  let service: CombinationsService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [
      ],
      providers: [CombinationsService]
    });
    service = TestBed.inject(CombinationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getCombinations', inject([CombinationsService], (combinationService: CombinationsService) => {
    combinationService.getCombinations().subscribe(data => {
      expect(data).not.toBeNull();
    });
  }));

  it('should updateCombinations', inject([CombinationsService], (combinationService: CombinationsService) => {
    const combination = ["9999999999"];
    combinationService.updateCombinations(combination).subscribe(data => {
      expect(data).not.toBeNull();
    });
  }));


});
