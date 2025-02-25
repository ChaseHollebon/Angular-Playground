import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReportService} from "../../services/report.service";
import {debounceTime, Observable, startWith, switchMap} from "rxjs";
import {AutoCompleteMatchTeamDTO} from "../../models/auto-complete-match-team-dto";

@Component({
  selector: 'app-chips-with-auto-complete-page',
  templateUrl: './chips-with-auto-complete-page.component.html',
  styleUrls: ['./chips-with-auto-complete-page.component.scss']
})
export class ChipsWithAutoCompletePageComponent implements OnInit {

  public myForm: FormGroup;
  public obsSearchMatchesToShow: Observable<AutoCompleteMatchTeamDTO[]>
  public selectedTeams: AutoCompleteMatchTeamDTO[] = [];

  public constructor(private formBuilder: FormBuilder,
                     private reportService: ReportService) {
  }

  public ngOnInit() {
    this.myForm = this.formBuilder.group({
      startDate: [null, null],
      endDate:   [null, null],
      teams:     [null, null],
    });
    this.obsSearchMatchesToShow = this.myForm.controls.teams.valueChanges
      .pipe(
        startWith(''),
        debounceTime(50),
        switchMap((aRawQuery: string) => {
          return this.reportService.runTeamSearch(aRawQuery, 5);
        })
      );

  }

  public resetClicked(): void {
    this.selectedTeams = [];
    this.myForm.reset();
  }

  public userSelectedTeam(aSelectedTeam: AutoCompleteMatchTeamDTO) {
    if (! this.isTeamIdAlreadyInArray(aSelectedTeam.teamId)) {
      this.selectedTeams.push(aSelectedTeam);
    }

    // Clear the text box so that the user doesn't see the UGGGGLY object message
    this.myForm.controls.teams.setValue('');
  }

  public removeTeam(aArrayIndexToRemove: number): void {
    if (aArrayIndexToRemove < 0) {
      return;
    }
    this.selectedTeams.splice(aArrayIndexToRemove, 1);
  }

  private isTeamIdAlreadyInArray(aTeamId: number): boolean {
    let team: AutoCompleteMatchTeamDTO;

    for (team of this.selectedTeams) {
      if (aTeamId == team.teamId) {
        return true;
      }
    }

    return false;
  }

}
