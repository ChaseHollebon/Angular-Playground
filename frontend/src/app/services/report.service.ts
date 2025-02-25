import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {AutoCompleteMatchTeamDTO} from "../models/auto-complete-match-team-dto";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  public runTeamSearch(aRawQuery: string, aTotalMatchesToReturn: number): Observable<AutoCompleteMatchTeamDTO[]> {
    if (!aRawQuery) {
      return of( [] );
    }

    const trimmedQueryLowerCase: string = aRawQuery.trim().toLowerCase();

    if (trimmedQueryLowerCase == ''){
      return of ( [] );
    }

    if (trimmedQueryLowerCase.startsWith('c')) {
      let data: AutoCompleteMatchTeamDTO[]= [
        {
          teamName: 'Core Team',
          teamPersonCount: 8,
          teamId: 1,
        },
        {
          teamName: 'Core Admin Team',
          teamPersonCount: 3,
          teamId: 2,
        },
        {
          teamName: 'FOCI Team',
          teamPersonCount: 5,
          teamId: 3,
        },
        {
          teamName: 'NCCS Team',
          teamPersonCount: 14,
          teamId: 4
        },
        {
          teamName: 'Project Mgmt Team',
          teamPersonCount: 12,
          teamId: 6,
        }
      ];
      return of(data);
    }

    if (trimmedQueryLowerCase.startsWith('p')) {
      let data: AutoCompleteMatchTeamDTO[]= [
        {
          teamName: 'PMO Team',
          teamPersonCount: 8,
          teamId: 5,
        },
        {
          teamName: 'Core Admin Team',
          teamPersonCount: 3,
          teamId: 2,
        },
        {
          teamName: 'Project Mgmt Team',
          teamPersonCount: 12,
          teamId: 6,
        },
        {
          teamName: 'FOCI Team',
          teamPersonCount: 5,
          teamId: 7,
        },
      ];
      return of(data);
    }

    if (trimmedQueryLowerCase.startsWith('te')) {
      let data: AutoCompleteMatchTeamDTO[]= [
        {
          teamName: 'Internal Test Team',
          teamPersonCount: 2,
          teamId: 8,
        },
        {
          teamName: 'External Test Team',
          teamPersonCount: 5,
          teamId: 9,
        },
      ];
      return of(data);
    }
    return of( [] );
  }
}
