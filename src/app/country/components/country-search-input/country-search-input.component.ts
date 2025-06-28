import { Component, effect, input, output, OutputEmitterRef, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html'
})
export class CountrySearchInputComponent {
  placeholder = input.required<string>();
  value = output<string>();
  debounceTime = input<number>(500);

  inputValue = signal<string>('');

  debounceEffect = effect(onCleanUp => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanUp(() => {
      clearTimeout(timeout);
    });
  });
}
