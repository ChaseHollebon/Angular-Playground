import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Constants} from "../../utilities/constants";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {

  constructor (private router: Router) {

  }

  public navigateToPieChartPage(): void {
    this.router.navigate([Constants.PIE_CHART_LARGE]).then()
  }

  public navigateToColumnChartPage(): void {
    this.router.navigate([Constants.COLUMN_CHART_LARGE]).then()
  }

  public navigateToZoomableChartPage(): void {
    this.router.navigate([Constants.ZOOMABLE_CHART_LARGE]).then()
  }

  public navigateToUsaStatesChartPage(): void {
    this.router.navigate([Constants.USA_STATE_CHART_LARGE]).then()
  }

  public navigateToGaugeChartPage(): void {
    this.router.navigate([Constants.GAUGE_LARGE]).then()
  }
}
