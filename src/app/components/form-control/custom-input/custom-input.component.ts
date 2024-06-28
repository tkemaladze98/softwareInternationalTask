import { Component, Input, OnChanges, OnInit, SimpleChanges, forwardRef } from '@angular/core';
import { AbstractControl, AsyncValidator, ControlValueAccessor, Form, FormControl, FormGroup, NG_ASYNC_VALIDATORS, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  templateUrl: './custom-input.component.html',
  imports: [MatInputModule, MatFormField, ReactiveFormsModule, NgIf],
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor, OnInit {
  @Input() parentGroup!: FormGroup;
  @Input() controlName: string = '';
  @Input() label: string = '';
  public formControl: FormControl = new FormControl('')
  public value: string = '';
  public onChange: (value: any) => void = () => { };
  public onTouched: () => void = () => { };

  constructor() { }

  ngOnInit(): void {
    this.formControl = this.parentGroup.get(this.controlName) as FormControl
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onUpdate(event: Event) {
    this.onChange((<HTMLInputElement>event.target).value)
    this.onTouched()
  }

  onTouch() {
    this.onTouched()
  }
}
