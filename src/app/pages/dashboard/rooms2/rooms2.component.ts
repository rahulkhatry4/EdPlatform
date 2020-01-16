import { Component, HostBinding, OnDestroy } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { map } from 'rxjs/operators';
import {NgxBlocklyConfig } from 'ngx-blockly';

@Component({
  selector: 'ngx-rooms2',
  styleUrls: ['./rooms2.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.sm ? 'giant' : ''">
      <ngx-blockly [config]="config"></ngx-blockly>
    </nb-card>
    
  `,
})
export class Rooms2Component implements OnDestroy {

  @HostBinding('class.expanded')
  private expanded: boolean;
  private selected: number;

  isDarkTheme: boolean;

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  themeChangeSubscription: any;

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([, newValue]) => {
        this.breakpoint = newValue;
      });

    this.themeChangeSubscription = this.themeService.onThemeChange()
      .pipe(map(({ name }) => name === 'cosmic' || name === 'dark'))
      .subscribe((isDark: boolean) => this.isDarkTheme = isDark);
  }

  select(roomNumber) {
    if (this.isSelected(roomNumber)) {
      this.expand();
    } else {
      this.collapse();
    }

    this.selected = roomNumber;
  }

  expand() {
    this.expanded = true;
  }

  collapse() {
    this.expanded = false;
  }

  isCollapsed() {
    return !this.expanded;
  }

  private isSelected(roomNumber): boolean {
    return this.selected === roomNumber;
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
    this.themeSubscription.unsubscribe();
    this.themeChangeSubscription.unsubscribe();
  }
}
