import {MatButtonModule, MatCheckboxModule,MatInputModule,MatExpansionModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import { NgModule } from '@angular/core';

@NgModule({
  
  imports: [MatButtonModule, MatCheckboxModule,MatInputModule,MatAutocompleteModule,MatExpansionModule],
  exports:[MatButtonModule, MatCheckboxModule,MatInputModule,MatAutocompleteModule,MatExpansionModule]
})
export class MaterialModule { 

}