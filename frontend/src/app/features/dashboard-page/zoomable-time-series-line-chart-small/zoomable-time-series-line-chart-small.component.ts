import {AfterViewInit, Component} from '@angular/core';
import * as Highcharts from "highcharts";
window.Highcharts = Highcharts;

// Turn on the high-chart context menu view/print/download options
import HC_exporting from "highcharts/modules/exporting";
HC_exporting(Highcharts);

// Turn on the high-chart context menu *export* options
// NOTE:  This provides these menu options: Download CSV, Download XLS, View Data Table
import HC_exportData from "highcharts/modules/export-data";
HC_exportData(Highcharts);

// Do client-side exporting (so that the exporting does *NOT* go to https://export.highcharts.com/
// NOTE:  This does not work on all web browsers
import HC_offlineExport from "highcharts/modules/offline-exporting";
HC_offlineExport(Highcharts);

// Turn on the drill-down capabilities
import {Chart} from "highcharts";
import HC_drillDown from "highcharts/modules/drilldown";
import {ChartService} from "../../../services/chart.service";
import {Router} from "@angular/router";
import {Constants} from "../../../utilities/constants";
HC_drillDown(Highcharts);

@Component({
  selector: 'app-zoomable-time-series-line-chart-small',
  templateUrl: './zoomable-time-series-line-chart-small.component.html',
  styleUrls: ['./zoomable-time-series-line-chart-small.component.scss']
})
export class ZoomableTimeSeriesLineChartSmallComponent implements AfterViewInit {

  constructor(private chartService: ChartService,
              private router: Router) {

  }

  private chartOptions: any = {
    tooltip: {
      formatter: function(): any {

        // Convert the milliseconds since epoch into a Date object
        // @ts-ignore
        let date = new Date(this.x);

        // Build the formatted date as mm/dd/yyyy
        // NOTE:  We must add 1 to the date.getMonth() as January has value of zero
        let formattedDate: string = String(date.getMonth() + 1).padStart(2, "0") + '/' +
          String(date.getDate()).padStart(2, "0") + '/' +
          date.getFullYear();

        // Return the string that holds the HTML to display for the tool tip
        // @ts-ignore
        return '<span style="color:{this.color}">' + this.series.name + '</span>: <b>' + this.y + '</b> on ' + formattedDate + '<br/>';
      }
    },
    chart: {
      zooming: {
        type: 'x'
      }
    },
    title: {
      text: 'USD to EUR exchange rate over time'
    },
    subtitle: {
      text: document.ontouchstart === undefined ?
        'Click and drag in the plot area to zoom in' :
        'Pinch the chart to zoom in'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Exchange rate'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        trackByArea: true,
        events: {
          click: (event: any) => {
            this.logPointInfo(event)
          }
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        color: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, 'rgb(199, 113, 243)'],
            [0.7, 'rgb(76, 175, 254)']
          ]
        },
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },

    accessibility: {
      enabled: false
    },

    exporting: {
      buttons: {
        contextButton: {
          menuItems:  [
            'viewFullscreen',
            'printChart',
            'separator',
            'downloadPNG',
            'downloadJPEG',
            'downloadPDF',
            'downloadSVG',
            'separator',
            'downloadCSV',
            'downloadXLS',
            {
              text: 'Return to Dashboard Page',
              onclick: (()=> {
                this.goToDashboardPage()
              })
            },
          ]
        }
      }
    },

    series: [{
      name: "Browsers",
      colorByPoint: true,
      data: [],

      point: {
        events:{
          click: (event: any) => {
            this.logPointInfo(event)
          }
        }
      }
    }]

  };

  private reloadData() {
    this.chartService.getDataForZoomableChart().subscribe((aData)=> {
      this.chartOptions.series[0].data = aData;

      Highcharts.chart('chart4', this.chartOptions);
      Highcharts.charts.forEach(function (chart: Chart | undefined) {
        chart?.reflow();
      });

    })
    // This renders the chart
    // NOTE:  You cannot render a chart from ngOnInit().  You can from ngAfterViewInit().
    // Redraw all of the charts on this page (so they fit perfectly within the mat-card tags
  }

  public ngAfterViewInit(): void {
    // NOTE:  This call must be in ngAfterViewInit() and not in ngOnInit()
    setTimeout( () => {
      // Reload the data in a setTimeout block so Angular has time to build the page
      this.reloadData();
    });
  }

  private goToDashboardPage(): void {
    this.router.navigate([Constants.DASHBOARD_PAGE])
  }

  private logPointInfo(event: any): void {
    console.log('event.point.x=', event.point.x, '   event.point.y=', event.point.y, '   event=', event);
  }


}
