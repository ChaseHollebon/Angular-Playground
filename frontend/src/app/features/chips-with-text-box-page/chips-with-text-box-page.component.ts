import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInput, MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-chips-with-text-box-page',
  templateUrl: './chips-with-text-box-page.component.html',
  styleUrls: ['./chips-with-text-box-page.component.scss']
})
export class ChipsWithTextBoxPageComponent {
  public myForm: FormGroup;
  public aliases: string[] = [];
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public constructor(private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      threeCharCode: [null, Validators.required],
      countryName:   [null, Validators.required],
      aliases:       [null, Validators.required],
      isCosc:        [null, Validators.required],
    });
  }

  public addAliases(event: MatChipInputEvent): void {
    const input: MatChipInput = event.chipInput;
    const value: string = event.value.trim();

    if (value) {
      this.aliases.push(value);

      this.myForm.controls.aliases.setValue(this.aliases);
    }

    if (input) {
      input.inputElement.value = '';
    }

    this.myForm.controls.aliases.markAsDirty();
  }

  public removeAliases(aRemoveAliases: number): void {
    if (aRemoveAliases < 0) {
      return;
    }
    this.aliases.splice(aRemoveAliases, 1);

    this.myForm.controls.aliases.setValue(this.aliases);
  }

  public resetClicked(): void {
    this.aliases = [];
    this.myForm.reset();
  }

  public submitClicked(): void {
    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) {
      return;
    }
  }
}
