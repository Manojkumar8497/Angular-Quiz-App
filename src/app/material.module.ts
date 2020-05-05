import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatRadioModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatExpansionModule,
        MatChipsModule,
        MatSnackBarModule
    ],
    exports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatRadioModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatExpansionModule,
        MatChipsModule,
        MatSnackBarModule
    ]
})

export class MaterialModule {

}