import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html'
})
export class CountrySearchInputComponent {
  placeholder = input.required<string>();
  debounceTime = input<number>(500);
  initialValue = input<string>('');

  value = output<string>();

  inputValue = linkedSignal<string>(() => this.initialValue());

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
