import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CombinationsService} from "./service/combinations.service";
import {inject} from "@angular/core/testing";
import {of} from "rxjs";

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockCombinationsService = {
    getCombinations: jasmine.createSpy('getCombinations').and.returnValue(of(["9999999999"])),
    updateCombinations: jasmine.createSpy('updateCombinations').and.returnValue(of(["9999999999"]))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{provide: CombinationsService, useValue: mockCombinationsService}]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should validate phone number success', () => {
    const phoneNumber = '(678) 602-9303';
    component.invalidPhoneNumber = true;
    component.validatePhoneNumber(phoneNumber);
    expect(component.invalidPhoneNumber).toBeFalse();
  });

  it('should validate phone number failure', () => {
    const phoneNumber = '(678 602-9303';
    component.invalidPhoneNumber = true;
    component.validatePhoneNumber(phoneNumber);
    expect(component.invalidPhoneNumber).toBeTrue();
  });

  it('should return correct number of combinations', () => {
    const phoneNumber = '999.999.9999';
    component.invalidPhoneNumber = true;
    component.validatePhoneNumber(phoneNumber);
    expect(component.combinations.length).not.toBeNull();
  });

  it('should get combinations', inject([CombinationsService], (combinationService: CombinationsService) => {
    const combinations = ["999999999"];
    combinationService.updateCombinations(combinations);
    component.getCombinations();
    expect(component.combinations).not.toBeNull();
  }));

  it('should get combinations', () => {
    const combinations = ["999999999"];
    mockCombinationsService.updateCombinations(combinations);
    mockCombinationsService.getCombinations().subscribe(data => {
      expect(data).not.toBeNull();
    });
  });

  it('should update combinations', () => {
    component.calculateCombinations('9999999999');
    const combinations = ["999999999"];
    mockCombinationsService.updateCombinations(combinations).subscribe(data => {
      expect(data).not.toBeNull();
      expect(component.getCombinations).toHaveBeenCalled();
    });
  });

});
