import {of} from 'rxjs';
import {HttpRequest, HttpResponse} from '@angular/common/http';
import * as data from './data/combinations.json';

let combinations: any[] = (data as any).default;

const getCombinations = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 200, body: combinations
  }));
};

const setCombinations = (request: HttpRequest<any>) => {
  const data = request.body as [];
  combinations = data;
  return of(new HttpResponse({
    status: 200, body: combinations
  }));
};

export const selectHandler = (request: HttpRequest<any>) => {
  const requestUrl = new URL(request.url);
  switch (request.method) {
    case 'GET':
      return getCombinations;
    case 'POST':
      return setCombinations;
    default:
      return null;
  }
};
