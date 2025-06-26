import { Component, input, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html'
})
export class CountrySearchInputComponent {
  value = output<string>();
  placeholder = input.required<string>();
}
