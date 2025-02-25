import {AfterViewInit, Component, OnDestroy} from '@angular/core';
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
HC_drillDown(Highcharts);

@Component({
  selector: 'app-pie-chart-small',
  templateUrl: './pie-chart-small.component.html',
  styleUrls: ['./pie-chart-small.component.scss']
})
export class PieChartSmallComponent implements AfterViewInit, OnDestroy{

  constructor(private chartService: ChartService) {
  }

  private useDarkMode: boolean = false;

  private useSunsetMode: boolean = false;

  private chartOptions: any =  {
    chart: {
      type: "pie",
    },
    title: {
      text: "Egg Yolk Composition",
    },
    tooltip: {
      valueSuffix: "%",
    },
    subtitle: {
      text: 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>',
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
            'viewData',
            'separator',
            {
              text: 'Toggle Chart Theme',
              onclick: () => {
                this.toggleChartTheme()
              }
            }
          ]
        }
      }
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            accessibility: {
              enabled: false
            },
            enabled: true,
            distance: -40,
            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
          },
        ],
      },
    },
    series: [
      {
        name: "Percentage",
        colorByPoint: true,
        data: [],
      },
    ],
  };

private reloadData() {
  // Update chart 1 with hard-coded data
  this.chartOptions.series[0].data = [
    {
      name: "Water",
      y: 55.02,
    },
    {
      name: "Fat",
      sliced: true,
      selected: true,
      y: 26.71,
    },
    {
      name: "Carbohydrates",
      y: 1.09,
    },
    {
      name: "Protein",
      y: 15.5,
    },
    {
      name: "Ash",
      y: 1.68,
    },
  ];
  Highcharts.chart('pie-chart1', this.chartOptions);
  Highcharts.charts.forEach(function (chart: Chart | undefined) {
    chart?.reflow();
  });

  if (this.useDarkMode) {
    // Render the charts in dark dark unica theme
    Highcharts.chart('pie-chart1',  Highcharts.merge(this.chartOptions, this.chartService.sunsetTheme));
  }
  else {
    // Render the charts in light mode
    Highcharts.chart('pie-chart1', this.chartOptions);
  }
}

  ngAfterViewInit(): void {
    setTimeout(()=> {
      this.reloadData();
    })
  }

  public ngOnDestroy(): void {

    // Destroy all charts on this page
    Highcharts.charts.forEach( (chart: Chart | undefined) => {
      if (chart) {
        chart.destroy();
      }
    });

  }


  private toggleChartTheme(): void {
  this.useDarkMode = !this.useDarkMode;
  this.reloadData();
  }

}
