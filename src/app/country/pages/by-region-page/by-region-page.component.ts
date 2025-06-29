import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { RegionButtonsListComponent } from './region-buttons-list/region-buttons-list.component';
import { Region } from '../../interfaces/region.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();
  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic'
  };

  return validRegions[queryParam] || 'Africa';
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent, RegionButtonsListComponent],
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') || '';

  region = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    params: () => ({
      region: this.region()
    }),
    stream: ({ params }) => {
      if (!params.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: params.region
        }
      });

      return this.countryService.searchByRegion(params.region);
    }
  });
}
