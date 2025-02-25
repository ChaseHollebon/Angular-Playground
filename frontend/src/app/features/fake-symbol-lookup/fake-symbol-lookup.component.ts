import { Component } from '@angular/core';
import {SymbolService} from "../../services/symbol.service";
import {debounceTime, Observable, startWith, switchMap} from "rxjs";
import {AutoCompleteMatchDTO} from "../../models/auto-complete-match-dto";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-fake-symbol-lookup',
  templateUrl: './fake-symbol-lookup.component.html',
  styleUrls: ['./fake-symbol-lookup.component.scss']
})
export class FakeSymbolLookupComponent {

  constructor(private symbolService: SymbolService,
              private formBuilder: FormBuilder) {
  }

  public obsSearchMatchesToShow: Observable<AutoCompleteMatchDTO[]>
  public myForm: FormGroup;

  public ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      symbol: [null, null]
    });

    // Listen for changes on the symbol text box
    this.obsSearchMatchesToShow = this.myForm.controls.symbol.valueChanges
      .pipe(
        startWith(''),
        debounceTime(250),                   // Wait 250 msecs to give the user some time to type
        switchMap((aRawQuery: string) => {    // Use switchMap for its canceling effect:  On each observable, the previous observable is canceled
          // Return an observable to the search (but only return up to 5 results)
          // The <mat-options> tag has an async pipe that will invoke this Observable
          return this.symbolService.runSymbolSearch(aRawQuery, 5);
        })
      );
  }

}
