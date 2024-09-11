import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnDestroy,AfterViewInit{
  mobileQuery: MediaQueryList;
  @ViewChild('snav') sidenav!: MatSidenav;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router:Router,
    private dialog:MatDialog
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    
    
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() { }

  //Handle router events to close the sidebar on link click in mobile view
  closeSidebar() {
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

  logout() {

    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      message:'Logout',
      confirmation:true
    }
    dialogConfig.disableClose = true;
  
    const dialogRef=this.dialog.open(ConfirmationDialogComponent,dialogConfig);
    const sub=dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      dialogRef.close();
      localStorage.clear();
    this.router.navigate(['/']);
    })
    
  }
}
