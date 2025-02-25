import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {GetChart2DataDto} from "../models/get-chart-2-data-dto";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {GaugeDataDto} from "../models/gauge-data-dto";


@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private httpClient: HttpClient) { }

  public darkUnicaTheme: any = {
    colors: [
      '#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
    ],
    chart: {
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
          [0, '#2a2a2b'],
          [1, '#3e3e40']
        ]
      },
      style: {
        fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
    },
    title: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase',
        fontSize: '20px'
      }
    },
    subtitle: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase'
      }
    },
    xAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
        style: {
          color: '#A0A0A3'
        }
      }
    },
    yAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
        style: {
          color: '#A0A0A3'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
        color: '#F0F0F0'
      }
    },
    plotOptions: {
      series: {
        dataLabels: {
          color: '#F0F0F3',
          style: {
            fontSize: '13px'
          }
        },
        marker: {
          lineColor: '#333'
        }
      },
      boxplot: {
        fillColor: '#505053'
      },
      candlestick: {
        lineColor: 'white'
      },
      errorbar: {
        color: 'white'
      }
    },
    legend: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      itemStyle: {
        color: '#E0E0E3'
      },
      itemHoverStyle: {
        color: '#FFF'
      },
      itemHiddenStyle: {
        color: '#606063'
      },
      title: {
        style: {
          color: '#C0C0C0'
        }
      }
    },
    credits: {
      style: {
        color: '#666'
      }
    },
    drilldown: {
      activeAxisLabelStyle: {
        color: '#F0F0F3'
      },
      activeDataLabelStyle: {
        color: '#F0F0F3'
      }
    },
    navigation: {
      buttonOptions: {
        symbolStroke: '#DDDDDD',
        theme: {
          fill: '#505053'
        }
      }
    },
    // scroll charts
    rangeSelector: {
      buttonTheme: {
        fill: '#505053',
        stroke: '#000000',
        style: {
          color: '#CCC'
        },
        states: {
          hover: {
            fill: '#707073',
            stroke: '#000000',
            style: {
              color: 'white'
            }
          },
          select: {
            fill: '#000003',
            stroke: '#000000',
            style: {
              color: 'white'
            }
          }
        }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
        backgroundColor: '#333',
        color: 'silver'
      },
      labelStyle: {
        color: 'silver'
      }
    },
    navigator: {
      handles: {
        backgroundColor: '#666',
        borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
        color: '#7798BF',
        lineColor: '#A6C7ED'
      },
      xAxis: {
        gridLineColor: '#505053'
      }
    },
    scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
    }
  };

  public sunsetTheme: any = {
      colors: ['#FDD089', '#FF7F79', '#A0446E', '#251535'],
      colorAxis: {
        maxColor: '#60042E',
        minColor: '#FDD089'
      },
      plotOptions: {
        map: {
          nullColor: '#fefefc'
        }
      },
      navigator: {
        series: {
          color: '#FF7F79',
          lineColor: '#A0446E'
        }
      }
  };


  public getAllDataForChart2(): Observable<GetChart2DataDto[]> {
    // Construct the URL of the REST Call
    const restUrl: string = environment.baseUrl + '/api/charts/get-charts-data';

    // Return an observable hooked up to this getChart2DataDTOS REST Call
    return this.httpClient.get <GetChart2DataDto[]> (restUrl);
  }

  public getDataForZoomableChart(): Observable<any> {
    const restUrl: string = 'https://www.highcharts.com/samples/data/usdeur.json';

    return this.httpClient.get <any> (restUrl);
  }

  public getUsaMapData(): Observable<any> {
    const restUrl: string = 'https://www.highcharts.com/samples/data/us-population-density.json';

    return this.httpClient.get(restUrl);
  }

  public getGaugeData(): Observable<GaugeDataDto> {
    let data: GaugeDataDto = new GaugeDataDto();
    data.total_pending_reports = 25;
    data.total_wip_reports = 15;
    data.total_completed_reports = 150;
    data.total_reports = 190;

    return of(data);
  }
}
