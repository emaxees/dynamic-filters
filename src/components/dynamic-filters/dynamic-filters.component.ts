import {
  Component
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-filters',
  templateUrl: './dynamic-filters.component.html',
  styleUrls: ['./dynamic-filters.component.css'],
})
export class DynamicFiltersComponent {
  form: FormGroup;
  mockData: any[] = [];
  filteredData: any[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      rows: this.fb.array([]),
    });

    this.generateMockData(50);
    this.addRow();
  }

  generateMockData(count: number) {
    const subjects = ['Water', 'Soil', 'Atmosphere', 'Temperature', 'Forest'];
  
    for (let i = 1; i <= count; i++) {
      const randomSubjectIndex = Math.floor(Math.random() * subjects.length);
      this.mockData.push({
        id: i,
        title: `Book ${i}`,
        author: `Author ${String.fromCharCode(65 + (i % 26))}`,
        subject: subjects[randomSubjectIndex],
        dateIssued: `2022-01-${String(i).padStart(2, '0')}`,
      });
    }
    this.filteredData = this.mockData;
  }  

  addRow() {
    const newRow = this.fb.group({
      filtertype: ['title'],
      relationalOperator: ['contains'],
      filter: [''],
    });
    this.rows.push(newRow);
  }

  removeRow(index: number) {
    this.rows.removeAt(index);
  }

  get rows() {
    return this.form.get('rows') as FormArray;
  }
  
  filterData(filters: any[]): any[] {
    const operatorMappings: any = {
      contains: (value:string, filter:string) => value.includes(filter),
      equals: (value:string, filter:string) => value === filter,
      authority: (value:string, filter:string) => value === filter,
      notcontains: (value:string, filter:string) => !value.includes(filter),
      notequals: (value:string, filter:string) => value !== filter,
      notauthority: (value:string, filter:string) => value !== filter,
    };

    return this.mockData.filter(item => {
      return filters.every(filter => {
        const operatorFunction = operatorMappings[filter.relationalOperator];
        if (!operatorFunction) {
          return true;
        }
  
        const value = item[filter.filtertype];
        const result = operatorFunction(value, filter.filter);
        return result;
      });
    });
  }

  resetFilters() {
    this.form.reset();
    this.filteredData = this.mockData;
  }

  getFilterString(filters:any) {
    return filters.map((filter:any) => Object.keys(filter).map((key) => filter[key].toUpperCase()).join('_')).join('&');
  }

  showRemoveButton(i:number) {
    if (i > 0) return this.rows.controls.map(row => row.value).length > 1;
    return false;
  }

  printFormValues() {
    const filters = this.rows.controls.map(row => row.value);
    console.log(this.getFilterString(filters))
    this.filteredData = this.filterData(filters);
  }
}
