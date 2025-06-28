import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { RegionButtonsListComponent } from './region-buttons-list/region-buttons-list.component';
import { Region } from '../../interfaces/region.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent, RegionButtonsListComponent],
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent {
  region = signal<Region | null>(null);
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({
      region: this.region()
    }),
    stream: ({ params }) => {
      if (!params.region) return of([]);

      return this.countryService.searchByRegion(params.region);
    }
  });
}
