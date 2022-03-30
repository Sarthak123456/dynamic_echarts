import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  @ViewChild('openModal') openModal!:ElementRef<any>;

  house = faHouse;
  chartOptions:any;
  mergeOptions = {};
  count = 1000;
  str='sd'
  data = [0,820, 932]
  echartsInstance: any;
  myForm!: FormGroup;



  constructor(private cd:ChangeDetectorRef) {
    // setInterval(() => {
    //   console.log('updated');
    //   this.add();
    //   console.log(this.chartOption.series[0].data);
    //   console.log(this.chartOption.xAxis.data);

    //   // let newData = this.chartOption.series[0].data;

    //   // newData.push('sads');

    //   this.mergeOptions = this.chartOption;
    //   this.cd.detectChanges();

    // },5000);

  }

  ngOnInit(): void {
    // this.add();
    this.myForm = new FormGroup({
      name: new FormControl('Sammy'),
      email: new FormControl(''),
      amount: new FormControl(1000),
      message: new FormControl('')
    });
  }
  onSubmit(form: FormGroup) {
    this.add( this.amount , form.value.name);
  }
  todo: any = [];

  done = [];
  done2 = [];
  done3 = [];
  value = 0;
  amount=1000;

  handleMinus() {
    this.amount--;
  }
  handlePlus() {
    this.amount++;
  }

  chartOption:any = {
    xAxis: {
      axisLabel: {
        formatter: '{value} kg',
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
        type: 'line',
        smooth: true
      }
    ]
  };

  drop(event: CdkDragDrop<any>) {
    console.log('event = '  , event );
    console.log('event = '  , event.container.data, event.previousIndex, event.currentIndex );
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
    this.echartsInstance = ec;
  }

  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }

  add(amount:number, name:string){

    // this.chartOption = this.chartOption;
    if(this.chartOption.series[0].type === 'line'){
      // this.str = 'k'+ this.str;
      this.chartOption.xAxis.data.push(name);
      this.data.push(amount);

    }
    this.mergeOptions = {};
    this.mergeOptions = this.chartOption;
    this.echartsInstance.setOption(this.chartOption, true, true);
    this.resizeChart()

    // console.log(this.chartOption);
    console.log(this.mergeOptions);
    // this.cd.detectChanges();
  }


}
