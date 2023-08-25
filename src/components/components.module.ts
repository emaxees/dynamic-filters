import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFiltersComponent } from './dynamic-filters/dynamic-filters.component';

@NgModule({
  declarations: [DynamicFiltersComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [DynamicFiltersComponent],
})
export class ComponentsModule {}
