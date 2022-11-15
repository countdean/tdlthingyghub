import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TaskElement {
    id: number;
    creator: string;
    title: string;
    assignee: string;
    status: string;
    labelbg: string;
    product: string;
    date: string;
}

const task: TaskElement[] = [
  {
      id: 77,
      creator: 'Eric Pratt',
      title: 'Elegant Theme Side Menu show OnClick',
      assignee: 'Alice Bohr',
      status: 'In Progress',
      labelbg: 'warning',
      product: 'Elegant Admin',
      date: '2018-05-01'
  },
  {
      id: 78,
      creator: 'Steve',
      title: 'Xtreme theme dropdown issue',
      assignee: 'Jonathan',
      status: 'Open',
      labelbg: 'success',
      product: 'Xtreme Admin',
      date: '2018-05-03'
  },
  {
      id: 79,
      creator: 'Mark',
      title: 'Header issue in material admin',
      assignee: 'Smith J',
      status: 'Closed',
      labelbg: 'danger',
      product: 'Material Admin',
      date: '2018-05-02'
  },
  {
      id: 80,
      creator: 'John Doe',
      title: 'Sidebar issue in Nice admin',
      assignee: 'Vincent',
      status: 'In Progress',
      labelbg: 'warning',
      product: 'Nice Admin',
      date: '2018-05-06'
  }
];

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
    searchText: any;
    totalCount = -1;
    Closed = -1;
    Inprogress = -1;
    Open = -1;

    displayedColumns: string[] = ['creator', 'title', 'assignee', 'status', 'product', 'date', 'action'];
    dataSource = new MatTableDataSource(task);

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.totalCount = this.dataSource.data.length;

        this.Open = this.btnCategoryClick('Open');
        this.Closed = this.btnCategoryClick('Closed');
        this.Inprogress = this.btnCategoryClick('In Progress');
        this.dataSource = new MatTableDataSource(task);
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

btnCategoryClick(val: string) {
    this.dataSource.filter = val.trim().toLowerCase();
    return this.dataSource.filteredData.length;

}

openDialog(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(TaskDialogContent, {
        data: obj
    });

    // dialogRef.afterClosed().subscribe(result => {
    //     if (result.event === 'Add') {
    //         this.addRowData(result.data);
    //     } else if (result.event === 'Update') {
    //         this.updateRowData(result.data);
    //     } else if (result.event === 'Delete') {
    //         this.deleteRowData(result.data);
    //     }
    // });
}

addRowData(row_obj: TaskElement) {
    const d = new Date();
    this.dataSource.data.push({
        id: d.getTime(),
        creator: row_obj.creator,
        title: row_obj.title,
        assignee: row_obj.assignee,
        status: row_obj.status,
        labelbg: row_obj.labelbg,
        product: row_obj.product,
        date: row_obj.date,
    });
    this.table.renderRows();

}

updateRowData(row_obj: TaskElement) {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
        if (value.id === row_obj.id) {
            value.creator = row_obj.creator;
            value.title = row_obj.title;
            value.assignee = row_obj.assignee;
            value.status = row_obj.status;
            value.labelbg = row_obj.labelbg;
            value.product = row_obj.product;
            value.date = row_obj.date;
        }
        return true;
    });
}

deleteRowData(row_obj: TaskElement) {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
        return value.id !== row_obj.id;
    });
}

}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class TaskDialogContent {
  action: string;
  local_data: any;

  constructor(
      public dialogRef: MatDialogRef<TaskDialogContent>,
      // @Optional() is used to prevent error if no data is passed
      @Optional() @Inject(MAT_DIALOG_DATA) public data: TaskElement) {
       //console.log(data);
      this.local_data = { ...data };
      this.action = this.local_data.action;
  }

  doAction() {
      this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
      this.dialogRef.close({ event: 'Cancel' });
  }

}


