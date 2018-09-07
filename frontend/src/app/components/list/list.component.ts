import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';

import { Entry } from '../../models/entry.model';
import { EntryService } from '../../services/entry.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns = ['date', 'activity', 'mood', 'remark', 'actions'];
  dataSource: MatTableDataSource<Entry>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private entryService: EntryService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchEntries();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  fetchEntries() {
    this.entryService
      .getEntries()
      .subscribe((data: Entry[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  editEntry(id) {
    this.router.navigate([`edit/${id}`]);
  }

  removeEntry(id) {
    let ref;
    this.entryService.getEntryById(id).subscribe((data: Entry) => {
      ref  = this.snackBar.open('Entry deleted', 'Restore', { duration: 5000 });
      ref.onAction().subscribe(() => {
        this.entryService.addRecoveredEntry(data).subscribe(() => this.fetchEntries());
      });
      this.entryService.removeEntry(id).subscribe(() => this.fetchEntries());
    });
  }
}
