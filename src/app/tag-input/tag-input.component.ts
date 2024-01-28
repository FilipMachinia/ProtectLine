import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent
} from "@angular/material/autocomplete";
import {AsyncPipe, JsonPipe, NgClass, NgIf, UpperCasePipe} from "@angular/common";
import {Fruit} from "../models/Fruit";
import {Person} from "../models/Person";
import {TicketType, TType} from "../models/TicketType";
import {MatButton} from "@angular/material/button";
import {AllTagTypes} from "../models/AllTagTypes";

@Component({
  selector: 'app-tag-input',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe, NgClass, NgIf, UpperCasePipe, JsonPipe, MatButton,],
  templateUrl: './tag-input.component.html',
  styleUrl: './tag-input.component.css'
})
export class TagInputComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tagCtrl = new FormControl('');
  filteredTags: Observable<any[]>;

  // tags selected by user
  selectedTags: any[] = [];
  // all tags available to pick up
  allTags: any[] = [];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined;

  constructor() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: any | null) => (tag ? this.filterTags(tag) : this.allTags.slice())),
    );
  }

  ngOnInit(): void {
    this.populateTagsArray();
  }

  clearInput(event: MatChipInputEvent): void {
    event.chipInput!.clear();
  }

  remove(tag: AllTagTypes): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  edit(tag: AllTagTypes, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove tag if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing tag
    const index: number = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags[index].name = value;
    }
  }

  selectDropdownItem(event: MatAutocompleteSelectedEvent): void {
    const tagName: string = event.option.viewValue.split(" (")[0];
    const found: boolean = this.selectedTags.some(el => el.name === tagName);
    let tagToBeAdded = this.allTags.find(o => o.name === tagName);
    if (!found) this.selectedTags.push(tagToBeAdded);

    this.tagInput!.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private filterTags(value: any): string[] {
    if (typeof value === 'string' || value instanceof String) {
      const filterValue: string = value.toLowerCase();
      return this.allTags.filter(tag => tag.name.toLowerCase().includes(filterValue));
    } else {
      return [''];
    }
  }

  populateTagsArray() {
    const lemon: Fruit = {name: 'Lemon', icon: 'fa-regular fa-lemon'};
    const lime: Fruit = {name: 'Lime', icon: 'fa-regular fa-lemon'};
    const apple: Fruit = {name: 'Apple', icon: 'fa-regular fa-apple'};
    const john: Person = {name: 'John', role: 'admin'};
    const mark: Person = {name: 'Mark', role: 'user'};
    const criticalBug: TicketType = {name: TType.CriticalBug, severity: 1};
    const bug: TicketType = {name: TType.Bug, severity: 2};
    const feature: TicketType = {name: TType.Feature, severity: 3};

    this.allTags.push(...[lemon, lime, apple]);
    this.allTags.push(...[john, mark]);
    this.allTags.push(...[criticalBug, bug, feature]);
    // this.allTags.flat()
    console.log(this.allTags)
  }

  //TODO: FINISH THIS
  updateTagData($event: any) {
    console.log($event.target.value)
    this.allTags = $event.target.value;
  }
}
