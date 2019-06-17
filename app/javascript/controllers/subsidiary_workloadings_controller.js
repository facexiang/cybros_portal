import { Controller } from "stimulus"

let subsidiaryWorkloadingsChart1
let subsidiaryWorkloadingsChart2
let subsidiaryWorkloadingsChart3

export default class extends Controller {
  connect() {
    subsidiaryWorkloadingsChart1 = echarts.init(document.getElementById('subsidiary-workloadings-chart1'));
    subsidiaryWorkloadingsChart2 = echarts.init(document.getElementById('subsidiary-workloadings-chart2'));
    subsidiaryWorkloadingsChart3 = echarts.init(document.getElementById('subsidiary-workloadings-chart3'));

var xAxisData = JSON.parse(this.data.get("x_axis"));
var dayRateData = JSON.parse(this.data.get("day_rate"));
var dayRateDataRef = this.data.get("day_rate_ref");
var planningDayRateData = JSON.parse(this.data.get("planning_day_rate"));
var planningDayRateDataRef = this.data.get("planning_day_rate_ref");
var buildingDayRateData = JSON.parse(this.data.get("building_day_rate"));
var buildingDayRateDataRef = this.data.get("building_day_rate_ref");

var option1 = {
    title: {
      text: '工作填报率'
    },
    grid: {
      left: 50,
      right: 110,
      top: 60,
      bottom: 60
    },
    toolbox: {
      feature: {
        dataView: {},
        saveAsImage: {
            pixelRatio: 2
        }
      }
    },
    tooltip: {},
    xAxis: {
      data: xAxisData,
      silent: true,
      axisLabel: {
        interval: 0,
        rotate: -40
      },
      splitLine: {
          show: false
      }
    },
    yAxis: {
      min: 0,
      max: 100,
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value} %'
      }
    },
    series: [{
      name: '工作填报率',
      type: 'line',
      symbol: 'triangle',
      symbolSize: 10,
      data: dayRateData,
      itemStyle: {
        color: '#C23631'
      },
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: '{c}%'
        }
      },
      markLine: {
        label: {
          formatter: '{c}% 填报率及格线'
        },
        lineStyle: {
          type: 'solid',
          width: 2
        },
        data: [
          {
            yAxis: dayRateDataRef
          }
        ]
      }
    }]
};

var option2 = {
    title: {
      text: '方案饱和度'
    },
    grid: {
      left: 50,
      right: 110,
      top: 60,
      bottom: 125
    },
    toolbox: {
      feature: {
        dataView: {},
        saveAsImage: {
            pixelRatio: 2
        }
      }
    },
    tooltip: {},
    xAxis: {
      data: xAxisData,
      silent: true,
      axisLabel: {
        interval: 0,
        rotate: -40
      },
      splitLine: {
          show: false
      }
    },
    yAxis: {
      min: 0,
      max: 100,
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value} %'
      }
    },
    series: [{
      name: '方案饱和度',
      type: 'line',
      symbol: 'square',
      symbolSize: 10,
      data: planningDayRateData,
      itemStyle: {
        color: '#334B5C'
      },
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: '{c}%'
        }
      },
      markLine: {
        label: {
          formatter: '{c}% 饱和度线'
        },
        lineStyle: {
          type: 'solid',
          width: 2
        },
        data: [
          {
            yAxis: planningDayRateDataRef
          }
        ]
      }
    }]
};

var option3 = {
    title: {
      text: '施工图饱和度'
    },
    grid: {
      left: 50,
      right: 110,
      top: 60,
      bottom: 125
    },
    toolbox: {
      feature: {
        dataView: {},
        saveAsImage: {
            pixelRatio: 2
        }
      }
    },
    tooltip: {},
    xAxis: {
      data: xAxisData,
      silent: true,
      axisLabel: {
        interval: 0,
        rotate: -40
      },
      splitLine: {
          show: false
      }
    },
    yAxis: {
      min: 0,
      max: 100,
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value} %'
      }
    },
    series: [{
      name: '施工图饱和度',
      type: 'line',
      symbol: 'square',
      symbolSize: 10,
      data: buildingDayRateData,
      itemStyle: {
        color: '#6AB0B8'
      },
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: '{c}%'
        }
      },
      markLine: {
        label: {
          formatter: '{c}% 饱和度线'
        },
        lineStyle: {
          type: 'solid',
          width: 2
        },
        data: [
          {
            yAxis: buildingDayRateDataRef
          }
        ]
      }
    }]
};

    function drill_down_model_show(params) {
      if (params.componentType === 'series') {
        if (params.seriesType === 'bar') {
          const company_name = xAxisData[params.dataIndex];
          const begin_month_name = $('#begin_month_name').val();
          const end_month_name = $('#end_month_name').val();
          const sent_data = {
            company_name: company_name,
            begin_month_name: begin_month_name,
            end_month_name: end_month_name };
          let drill_down_url
          switch (params.seriesName) {
            case '工作填报率':
              drill_down_url = '/report/subsidiary_workloading/day_rate_drill_down';
              break;
            case '方案饱和度':
              drill_down_url = '/report/subsidiary_workloading/planning_day_rate_drill_down';
              break;
            case '施工图饱和度':
              drill_down_url = '/report/subsidiary_workloading/building_day_rate_drill_down';
              break;
          }
          $.ajax(drill_down_url, {
            data: sent_data,
            dataType: 'script'
          });
        }
      }
    }

    subsidiaryWorkloadingsChart1.setOption(option1, false);
    subsidiaryWorkloadingsChart1.on('click', drill_down_model_show);
    subsidiaryWorkloadingsChart2.setOption(option2, false);
    subsidiaryWorkloadingsChart2.on('click', drill_down_model_show);
    subsidiaryWorkloadingsChart3.setOption(option3, false);
    subsidiaryWorkloadingsChart3.on('click', drill_down_model_show);
    setTimeout(() => {
      subsidiaryWorkloadingsChart1.resize();
      subsidiaryWorkloadingsChart2.resize();
      subsidiaryWorkloadingsChart3.resize();
    }, 200);
  }

  layout() {
    subsidiaryWorkloadingsChart1.resize();
    subsidiaryWorkloadingsChart2.resize();
    subsidiaryWorkloadingsChart3.resize();
  }

  disconnect() {
    subsidiaryWorkloadingsChart1.dispose();
    subsidiaryWorkloadingsChart2.dispose();
    subsidiaryWorkloadingsChart3.dispose();
  }
}
