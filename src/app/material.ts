import {MatButtonModule, MatCheckboxModule, MatInputModule, MatExpansionModule, MatCardModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatAutocompleteModule, MatExpansionModule, MatCardModule ],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatAutocompleteModule, MatExpansionModule, MatCardModule]
})
export class MaterialModule {
}
