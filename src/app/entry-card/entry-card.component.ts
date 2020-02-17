import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { DiaryEntry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html',
  styleUrls: ['./entry-card.component.scss']
})
export class EntryCardComponent implements OnInit {

  diaryEntry: DiaryEntry;

  constructor(
      private route: ActivatedRoute,
      private entryService: EntryService) { }

  ngOnInit(): void {
    this.route.paramMap
        .pipe(switchMap((params: ParamMap) => {
          return this.entryService.getEntry(params.get('entryId') as string);
        }))
        .subscribe((diaryEntry: DiaryEntry) => {
          this.diaryEntry = diaryEntry;
        });
  }

}
