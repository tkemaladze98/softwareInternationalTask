import { Component, WritableSignal, signal } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormField, CommonModule, MatIconModule],
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss'
})
export class MatchComponent {
  public searchValue: string = ''
  public wordsArray: { value: string }[] = [{ value: '' }]
  public clonedWordsArray: ResultArray[] = []

  public setValue(event: Event, item?: { value: string } | null, isSearch: boolean = false,): void {
    if (isSearch) {
      this.searchValue = (<HTMLInputElement>event.target).value
    } else if (item) {
      item.value = (<HTMLInputElement>event.target).value
    }
  }

  public search(): void {
    this.clonedWordsArray = this.wordsArray.filter((wordItem: { value: string }) => wordItem.value).map((wordItem: { value: string }) => {
      return this.calculateMatch(this.searchValue, wordItem)
    })
    console.log(this.clonedWordsArray)
  }

  public add(index: number): void {
    this.wordsArray.splice(index + 1, 0, { value: '' })
  }
  public remove(index: number): void {
    this.wordsArray.splice(index, 1)
  }

  public calculateMatch(searchValue: string, item: { value: string }): ResultArray {
    const value: string = searchValue.toLowerCase();
    item.value = item.value.toLowerCase();
    let matchCount: number = 0;
    let returnObj: any = {}
    let foundOneCharacter: boolean = false
    for (let i = 0; i < value.length; i++) {
      const checkFromRight = this.checkIfIncludes(item.value, value.slice(0, value.length - i));
      if (checkFromRight.match && checkFromRight.mark && checkFromRight.mark?.length > matchCount) {
        matchCount = checkFromRight.mark?.length;
        returnObj = {
          value: item.value,
          beforeMatch: checkFromRight.beforeMatch,
          mark: checkFromRight.mark,
          afterMatch: checkFromRight.afterMatch,
          percent: (value.slice(i).length / value.length) * 100
        }
      }
      if (!matchCount) {
        const checkFromLeft = this.checkIfIncludes(item.value, value.slice(i));
        if (checkFromLeft.match && checkFromLeft.mark && checkFromLeft.mark?.length > matchCount) {
          matchCount = checkFromLeft.mark?.length;
          returnObj = {
            value: item.value,
            beforeMatch: checkFromLeft.beforeMatch,
            mark: checkFromLeft.mark,
            afterMatch: checkFromLeft.afterMatch,
            percent: (value.slice(i).length / value.length) * 100
          }
        }
      }
      if (matchCount) {
        break
      } else if (!foundOneCharacter) {
        const checkOneCharacter = this.checkIfIncludes(item.value, value.charAt(i));
        if (checkOneCharacter.match && checkOneCharacter) {
          foundOneCharacter = true
          returnObj = {
            value: item.value,
            beforeMatch: checkOneCharacter.beforeMatch,
            mark: checkOneCharacter.mark,
            afterMatch: checkOneCharacter.afterMatch,
            percent: (1 / value.length) * 100
          }
        }
      }
    }
    if (!Object.keys(returnObj).length) {
      returnObj = {
        value: item.value,
        percent: 0
      }
    }
    return returnObj
  }

  public checkIfIncludes(matchValue: string, searchValue: string): {
    match: boolean,
    beforeMatch?: string,
    mark?: string,
    afterMatch?: string
  } {
    if (matchValue.includes(searchValue)) {
      return {
        match: true,
        beforeMatch: matchValue.slice(0, matchValue.toLowerCase().indexOf(searchValue.toLowerCase())),
        mark: searchValue,
        afterMatch: matchValue.slice(matchValue.toLowerCase().indexOf(searchValue.toLowerCase()) + searchValue.length)
      }
    } else {
      return { match: false }
    }
  }

}
interface ResultArray {
  value: string,
  percent: number,
  beforeMatch?: string,
  mark?: string,
  afterMatch?: string
}
