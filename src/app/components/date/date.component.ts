import { Component, WritableSignal, signal } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DateTransformPipe } from "../../pipe/date-transform.pipe";

@Component({
    selector: 'app-date',
    standalone: true,
    templateUrl: './date.component.html',
    styleUrl: './date.component.scss',
    imports: [MatButtonModule, MatInputModule, MatFormField, DateTransformPipe],
    providers:[]
})
export class DateComponent {
  public inputValue: WritableSignal<string> = signal('2023-08-10T09:42:34.0734574Z')


  public setValue(event: Event) {
    this.inputValue.set((<HTMLInputElement>event.target).value)
  }
}
