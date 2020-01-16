import { Component, OnDestroy } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { CountryOrderData } from '../../../@core/data/country-order';
import {NgxBlocklyConfig } from 'ngx-blockly';


@Component({
  selector: 'ngx-country-orders2',
  styleUrls: ['./country-orders2.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.md ? 'medium' : 'giant'">
      <ngx-blockly [config]="config"></ngx-blockly>
    </nb-card>
  `,
})
export class CountryOrders2Component implements OnDestroy {

  private alive = true;

  countryName = '';
  countryData: number[] = [];
  countriesCategories: string[];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private countryOrderService: CountryOrderData) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
    this.countryOrderService.getCountriesCategories()
      .pipe(takeWhile(() => this.alive))
      .subscribe((countriesCategories) => {
        this.countriesCategories = countriesCategories;
      });
  }

  selectCountryById(countryName: string) {
    this.countryName = countryName;

    this.countryOrderService.getCountriesCategoriesData(countryName)
      .pipe(takeWhile(() => this.alive))
      .subscribe((countryData) => {
        this.countryData = countryData;
      });
  }

  public config: NgxBlocklyConfig = {
        toolbox: '<xml id="toolbox" style="display: none">' +
                    '<block type="controls_if"></block>' +
                    '<block type="controls_repeat_ext"></block>' +
                    '<block type="logic_compare"></block>' +
                    '<block type="math_number"></block>' +
                    '<block type="math_arithmetic"></block>' +
                    '<block type="text"></block>' +
                    '<block type="text_print"></block>' +
                 '</xml>',
        scrollbars: true,
        trashcan: true
    };

  ngOnDestroy() {
    this.alive = false;
  }
}
