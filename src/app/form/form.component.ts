import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

interface FormType {
  type: 'text' | 'checkbox' | 'radio' | 'select';
  label: string;
  options?: string[]; // for select or radio options
  rule: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  dynamicForm = inject(FormBuilder).nonNullable.group({});
  data: FormType[] = [];

  constructor() {}

  
  get sampleData() {
    const data: FormType[] = [
      { label: 'Name', type: 'text', rule: 'required' },
      { label: 'Accept Terms', type: 'checkbox', rule: 'required' },
      { label: 'Gender', type: 'radio', options: ['Male', 'Female'], rule: 'required' },
      { label: 'Country', type: 'select', options: ['USA', 'Canada', 'Mexico'], rule: 'required' },
    ];
    return data;
  }

  ngOnInit() {
    this.sampleData.forEach((data) => {
      
      this.dynamicForm.addControl(data.label, new FormControl(''));

      if (data.rule === 'required') {
        this.dynamicForm.get(data.label)?.setValidators([Validators.required]);
      }
    });

    
    this.data = this.sampleData;
  }

  submit() {
    if (this.dynamicForm.valid) {
      console.log('Form Submitted:', this.dynamicForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
