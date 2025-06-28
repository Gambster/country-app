import { Component, computed, effect, output, signal } from '@angular/core';
import { Region, RegionColor } from '../../../interfaces/region.interface';
import { REGION_COLOR } from '../../../constants/regions-colors.constants';
import { NgClass } from '@angular/common';

@Component({
  selector: 'country-region-buttons-list',
  imports: [NgClass],
  templateUrl: './region-buttons-list.component.html'
})
export class RegionButtonsListComponent {
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
  public regionsColors = computed<RegionColor>(() => REGION_COLOR);
  public selectedRegion = signal<Region | null>(null);
  public region = output<Region>();

  changeEffect = effect(() => {
    const region = this.selectedRegion();
    if (!region) return;
    this.region.emit(region);
  });

  setSelectedRegion = (regionValue: Region) => {
    this.selectedRegion.set(regionValue);
  };
}
