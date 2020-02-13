import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { DiaryEntry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.scss']
})
export class EntryDetailComponent implements OnInit {

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
