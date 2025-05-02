import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncingChartsComponent } from './syncing-charts/syncing-charts.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { StackedColumnsComponent } from './stacked-columns/stacked-columns.component';
import { PolarAreaBasicComponent } from './polar-area-basic/polar-area-basic.component';
import { RadarMultipleSeriesComponent } from './radar-multiple-series/radar-multiple-series.component';
import { TreemapDistributedComponent } from './treemap-distributed/treemap-distributed.component';

@NgModule({
  declarations: [
    SyncingChartsComponent,
    StackedColumnsComponent,
    PolarAreaBasicComponent,
    RadarMultipleSeriesComponent,
    TreemapDistributedComponent,
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
  ],
  exports:[
    SyncingChartsComponent,
    StackedColumnsComponent,
    PolarAreaBasicComponent,
    RadarMultipleSeriesComponent,
    TreemapDistributedComponent,
  ]
})
export class ApexchartsModule { }
