import { Component, Input, OnInit, WritableSignal, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

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
  public formControl: WritableSignal<FormControl> = signal(new FormControl(''))
  public value: WritableSignal<string> = signal('');
  public onChange: (value: any) => void = () => { };
  public onTouched: () => void = () => { };

  constructor() { }

  ngOnInit(): void {
    this.formControl.set(this.parentGroup.get(this.controlName) as FormControl)
  }

  writeValue(value: any): void {
    this.value.set(value)
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
