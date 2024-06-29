import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn,ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Observable, delay, of } from 'rxjs';
import { CustomInputComponent } from '../form-control/custom-input/custom-input.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    CustomInputComponent,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    NgFor
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [provideNativeDateAdapter()]
})
export class FormComponent {
  public jobForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      jobs: this.fb.array([])
    });
    this.addJob();
  }

  public createJob(): FormGroup {
    return this.fb.group({
      name: ['', [this.maxLengthValidator(100)], [this.requiredAsyncValidator()]],
      webPage: ['', [], [this.requiredAsyncValidator(), this.checkPatternAsyncValidator('/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/', 'Invalid URL format')]],
      description: ['', [this.maxLengthValidator(500)], [this.requiredAsyncValidator()]],
      positions: this.fb.array([])
    });
  }

  public addJob(): void {
    const jobs = this.jobForm.get('jobs') as FormArray;
    const newJob = this.createJob();
    (newJob.get('positions') as FormArray)?.push(this.createPosition());
    jobs.push(newJob);
  }

  public removeJob(index: number): void {
    const jobs = this.jobForm.get('jobs') as FormArray;
    jobs.removeAt(index);
  }

  public createPosition(): FormGroup {
    return this.fb.group({
      positionName: ['', [this.maxLengthValidator(100)], [this.requiredAsyncValidator()]],
      positionLevel: ['', [this.maxLengthValidator(50)], [this.requiredAsyncValidator()]],
      positionDescription: ['', [this.maxLengthValidator(500)], [this.requiredAsyncValidator()]],
      positionDateFrom: [null, [], [this.requiredAsyncValidator()]],
      positionDateTo: [null, [], [this.requiredAsyncValidator()]]
    });
  }

  public addPosition(job: FormGroup): void {
    const positions = job.get('positions') as FormArray;
    positions.push(this.createPosition());
  }

  public removePosition(job: FormGroup, index: number): void {
    const positions = job.get('positions') as FormArray;
    positions.removeAt(index);
  }

  get jobs(): FormArray<FormGroup> {
    return this.jobForm.controls["jobs"] as FormArray<FormGroup>;
  }

  getPositions(job: FormGroup): FormArray<FormGroup> {
    return job.controls['positions'] as FormArray<FormGroup>;
  }


  public onSubmit(): void {
    console.log(this.jobForm)
    if (this.jobForm.valid) {
      alert('ფორმა წარმატებით გაიგზავნა');
    } else {
      this.markAllAsTouched(this.jobForm);
      alert('ფორმა არასწორადაა შევსებული')
    }
  }

  public maxLengthValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): CustomValidatorErrors | null => {
      if (control?.value && control?.value.length > maxLength) {
        return {
          maxLength: {
            requiredLength: maxLength,
            currentLength: control?.value.length
          }
        }
      } else {
        return null
      }
    }
  }

  public requiredAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<CustomValidatorErrors | null> => {
      if (!control?.value?.toString()?.trim()) {
        return of({
          required: true
        }).pipe(delay(500));
      } else {
        return of(null).pipe(delay(500));
      }
    }
  }
  public checkPatternAsyncValidator(pattern: string, errorText?: string): AsyncValidatorFn {
    const regExp = new RegExp(pattern);
    return (control: AbstractControl): Observable<CustomValidatorErrors | null> => {
      if (control.value === '' && !control.value.trim()) {
        return of(null).pipe(delay(500));
      } else if (!regExp.test(control?.value?.toString())) {
        return of(
          {
            invalidPattern: {
              invalid: true,
              errorText: errorText ?? ''
            }
          }
        ).pipe(delay(500))
      } else {
        return of(null).pipe(delay(500));
      }
    }
  }

  private markAllAsTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);
      if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(item => this.markAllAsTouched(item as FormGroup))
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
}


interface CustomValidatorErrors extends ValidationErrors {
  invalidPattern?: {
    invalid: boolean,
    errorText: string
  };
}
