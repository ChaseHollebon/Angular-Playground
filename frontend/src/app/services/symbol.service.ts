import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {AutoCompleteMatchDTO} from "../models/auto-complete-match-dto";

@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  constructor() { }

  public runSymbolSearch(aRawQuery: string, aTotalMatchesToReturn: number): Observable<AutoCompleteMatchDTO[]> {
    if (!aRawQuery) {
      return of( [] );
    }

    const trimmedQueryToLowerCase: string = aRawQuery.trim().toLowerCase();

    if(trimmedQueryToLowerCase == '') {
      return of( [] );
    }

    if(trimmedQueryToLowerCase.startsWith('v')) {
      let data: AutoCompleteMatchDTO[] = [
        {
          symbol: 'V',
          businessName: 'Visa Inc.'
        },
        {
          symbol: 'VOO',
          businessName: 'Vanguard S&P 500 ETF'
        },
        {
          symbol: 'VTI',
          businessName: 'Vanguard Total Stock Market ETF'
        },
        {
          symbol: 'VZ',
          businessName: 'Vicinity Motor Corp.'
        },
      ];

      return of(data);
    }

    if (trimmedQueryToLowerCase.startsWith('b')) {
      let data: AutoCompleteMatchDTO[] = [
        {
          symbol: 'B',
          businessName: 'Barnes Group, Inc.'
        },
        {
          symbol: 'BA',
          businessName: 'Being Company'
        },
        {
          symbol: 'BYND',
          businessName: 'Beyond Meat, Inc.'
        },
        {
          symbol: 'BRKA',
          businessName: 'Berkshire Hathaway A Stock'
        },
        {
          symbol: 'BRKB',
          businessName: 'Berkshire Hathaway B Stock'
        },
      ];

      return of(data);
    }

    return of( [] );

  }

}
