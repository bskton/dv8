import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class MaterialModule {}