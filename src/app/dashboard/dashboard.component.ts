import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormControl, FormGroup } from '@angular/forms';
import * as echarts from 'echarts';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewChecked {
  @ViewChild('openModal') openModal!:ElementRef<any>;


  house = faHouse;
  chartOptions:any;
  mergeOptions = {};
  position:any;
  data = [0,200, 300]
  mychart: any;
  myForm!: FormGroup;
  down = "path://M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z";

  path = [this.down]

  constructor() {
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl('Thur'),


      amount: new FormControl(this.amount),
    });

    setTimeout(() => {
      this.mychart.setOption({
        graphic: echarts.util.map(this.data,  (item, dataIndex:any) => {
            return {
                type: 'circle',
                position: this.mychart.convertToPixel('grid', [dataIndex,item]),
                shape: {
                    cx: 0,
                    cy: 0,
                    r: 20 / 2
                },
                invisible: true,
                draggable: true,
                ondrag: echarts.util.curry(this.onPointDragging, dataIndex,this.mychart,this.data),
                z: 100
            };
        })
    });
    }, 100)

  }
  ngAfterViewChecked(): void {

    setTimeout(() => {
      this.mychart.setOption({
        graphic: echarts.util.map(this.data,  (item, dataIndex:any) => {
            return {
                type: 'circle',
                position: this.mychart.convertToPixel('grid', [dataIndex,item]),
                shape: {
                    cx: 0,
                    cy: 0,
                    r: 20 / 2
                },
                invisible: true,
                draggable: true,
                ondrag: echarts.util.curry(this.onPointDragging, dataIndex,this.mychart,this.data),
                // onmousemove: echarts.util.curry(this.showTooltip, dataIndex, this.mychart),
                // onmouseout: echarts.util.curry(this.hideTooltip, dataIndex, this.mychart),
                z: 100
            };
        })
    });
    }, 100)

  }

  onSubmit(form: FormGroup) {
    this.add( this.amount , form.value.name);
  }
  todo: any = [];

  done = [];
  done2 = [];
  done3 = [];
  value = 0;
  amount=100;

  handleMinus() {
    this.amount--;
  }
  handlePlus() {
    this.amount++;
  }

  chartOption:any = {
    xAxis: {
      axisLabel: {
        formatter: '{value}',
        align: 'center'
      },
      type: 'category',
      data: ['Mon', 'Tue', 'Wed']
    },
    yAxis: {
      type: 'value'
    },
    notMerge : false,
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function (params:any) {
        return `<b>${params['name']}</b> : $ ${params['value']}`;
      }
    },
    series: [
      {
        data: this.data,
        id:'a',
        type: 'line',
        smooth: true,
        symbol: () => {
          return this.path[0]
        },
        symbolSize: [20, 30],
        symbolOffset: [0, 0],
        // color: 'orange',
        symbolPosition: 'start',
        fontSize: 300,
        fontWeight: 'bold',
        color: '#34DCFF'
      }
    ]
  };

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if(event.previousContainer !== event.container){
      this.openModal.nativeElement.click();
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onChartInit(ec: any) {
    this.mychart = ec;
  }

  resizeChart() {
    if (this.mychart) {
      this.mychart.resize();
    }
  }

  add(amount:number, name:string){

    if(this.chartOption.series[0].type === 'line'){
      this.chartOption.xAxis.data.push(name);
      this.data.push(amount);

    }
    this.mychart.setOption(this.chartOption, true, true);

      // Add shadow circles (which is not visible) to enable drag.
      setTimeout(() => {
        this.mychart.setOption({
          graphic: echarts.util.map(this.data,  (item, dataIndex:any) => {
            // console.log(this.mychart.convertToPixel({seriesIndex:0}, [0,200]));
              return {
                  type: 'circle',
                  position: this.mychart.convertToPixel('grid', [dataIndex,item]),
                  shape: {
                      cx: 0,
                      cy: 0,
                      r: 20 / 2
                  },
                  invisible: true,
                  draggable: true,
                  ondrag: echarts.util.curry(this.onPointDragging, dataIndex,this.mychart,this.data),
                  // onmousemove: echarts.util.curry(this.showTooltip, dataIndex, this.mychart),
                  // onmouseout: echarts.util.curry(this.hideTooltip, dataIndex, this.mychart),
                  z: 100
              };
          })
      });
      }, 100)



  }
  onPointDragging(dataIndex:any, mychart:any, data:any, position:any):any {
      const pointInPixel= [position.event.layerX, position.event.layerY];

          data[dataIndex] =   pointInPixel[1] ? pointInPixel[1] : 0;

          // Update data
          mychart.setOption({
              series: [{
                  id: 'a',
                  data: data
              }]
          });
      mychart.resize()
  }

  showTooltip(dataIndex:any, mychart:any) {
    mychart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: dataIndex
    });
  }
  hideTooltip(dataIndex:any, mychart:any) {
    mychart.dispatchAction({ type: 'hideTip' });
  }


}
