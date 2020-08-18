import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGroupArrayComponent } from './components/form-group-anidados/form-group-array/form-group-array.component';
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

const routes: Routes = [
  // Controles Basicos
  { path: 'control', component: ControlComponent},
  { path: 'controlOne', component: ControlOneComponent},
  // Form Group
  { path: 'formBasic', component: FormBasicComponent},
  { path: 'formBasicOne', component: FormBasicOneComponent},
  { path: 'formBasicTwo', component: FormBasicTwoComponent},
  { path: 'formGroupRadioCheck', component: FormControlesCheckRadioSelectComponent},
  { path: 'formBasicThree', component: FormBasicThreeComponent},
  // From Group anidados
  { path: 'formGroupAnidado', component: FormGroupAnidadosUnoComponent},
  { path: 'validationFormArray', component: ValidationFormArrayComponent},
  // Form Builder
  { path: 'formGroupArray', component: FormGroupArrayComponent },
  { path: 'formBuilderBasico', component: FormBasicoBuilderComponent },
  { path: 'formBuilderGroup', component: FormBasicoBuilderGroupComponent },
  { path: 'groupArray', component: GroupArrayComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
