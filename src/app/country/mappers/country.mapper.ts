import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital?.join(',') || 'No tiene capital',
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations?.['spa']?.common || restCountry.name.common,
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion
    };
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }
}

export default CountryMapper;
