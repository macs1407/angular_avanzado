import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './/app-routing.module';
import { FormGroupArrayComponent } from './components/form-group-anidados/form-group-array/form-group-array.component';
import { HeadersComponent } from './components/headers/headers.component';
import { FormBasicComponent } from './components/formGroup/form-basic/form-basic.component';
import { FormBasicTwoComponent } from './components/formGroup/form-basic-two/form-basic-two.component';
import { FormBasicThreeComponent } from './components/form-group-anidados/form-basic-three/form-basic-three.component';
import { ControlComponent } from './components/controlBasico/control/control.component';
import { ValidationFormArrayComponent } from './components/formBuilder/validation-form-array/validation-form-array.component';
import { ControlOneComponent } from './components/controlBasico/control-one/control-one.component';
import { FormBasicOneComponent } from './components/formGroup/form-basic-one/form-basic-one.component';
import { FormControlesCheckRadioSelectComponent } from './components/formGroup/form-controles-check-radio-select/form-controles-check-radio-select.component';
import { FormGroupAnidadosUnoComponent } from './components/form-group-anidados/form-group-anidados-uno/form-group-anidados-uno.component';
import { FormBasicoBuilderComponent } from './components/formBuilder/form-basico-builder/form-basico-builder.component';
import { FormBasicoBuilderGroupComponent } from './components/formBuilder/form-basico-builder-group/form-basico-builder-group.component';
import { GroupArrayComponent } from './components/formBuilder/group-array/group-array.component';


@NgModule({
  declarations: [
    AppComponent,
    FormGroupArrayComponent,
    HeadersComponent,
    FormBasicComponent,
    FormBasicTwoComponent,
    FormBasicThreeComponent,
    ControlComponent,
    ValidationFormArrayComponent,
    ControlOneComponent,
    FormBasicOneComponent,
    FormControlesCheckRadioSelectComponent,
    FormGroupAnidadosUnoComponent,
    FormBasicoBuilderComponent,
    FormBasicoBuilderGroupComponent,
    GroupArrayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
