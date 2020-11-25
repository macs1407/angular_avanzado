import { TypeComponent } from '../enum/type-component.enum';
import { CheckComponent } from './check-component';
import { ChildComponent } from './child-component';
import { DateComponent } from './date-component';
import { LabelComponent } from './label-component';
import { NumericComponent } from './numeric-component';
import { TextAreaComponent } from './text-area-component';
import { TextComponent } from './text-component';

/**
 * Interface para el manejo de componentes de formulario
 * @author Jorge Leiva
 * @since 2.1.0.
 */
export interface FormBuilderGeneric {

    /** Nombre del label que identifica al elemento */
    labelField: string;
    /** Nombre de la propiedad reactiva para el `FormGroup` */
    nameComponent: string;
    /**
     * Tipo de componente que va a ser creado.
     * Use el método de la clase asbtracta para definir el tipo de elemento que requiera
     * @example
     * // Para crear un elemento de tipo numérico defínalo así:
     * this.addNumericComponent({
     *     maxValueValidator: 10,
     *     minValueValidator: 1
     *  })
     */
    typeComponent: TextComponent | NumericComponent | DateComponent | CheckComponent |
                    TextAreaComponent | LabelComponent | ChildComponent;
    /**
     * Especifica si el componente de formulario es requerido. Si no se asigna un valor toma el valor de `true`.
     * Para deshabilitar esta validación asigne el valor de `false`.
     */
    requiredField?: boolean;
    /**
     * Especifica el mensaje de obligatoriedad para el componente de formulario.
     * Si no se asigna un valor a esta propiedad asume un valor por defecto.
     * Utlice el `[@]` para incluir el nombre del label dentro del mensaje.
     */
    messageRequired?: string;
    /**
     * Especifica el tipo de componente que se renderizará en el componente hijo.
     * A esta propiedad no es necesario asignarle un valor.
     */
    typeEnum?: TypeComponent;
    /**
     * Nombre de la clase de Boostrap para la grilla de distribución de elementos html.
     * Use la enumeración `ClassName` para definir la longitud del componente.
     * @example ClassName.COLUMN_LARGE_8
     */
    className?: string;
    /**
     * Nombre del placeholder para el componente.
     * Si no se asigna el valor toma por defecto la propiedad `labelField` definida
     */
    placeholder?: string;
    /**
     * Especifica el uso que tendrá el control dentro del componente reutilizable.
     * Declare los controles necesarios dependiendo de la estructura del componente hijo.
     * Si no se especifica toma el valor de `false`.
     */
    isChild?: boolean;
    /**
     * Centra el componente en el formulario.
     * Si no se especifica toma el valor de `false`.
     */
    centerComponent?: boolean;

    /**
     * Especifica la partición del componente.
     * Si no se especifica un valor asume el valor de 0.
     * Su uso es aplicado cuando se requiere crear formularios que cumplen con un diseño personalizado.
     * Este valor es un comparador con el valor `partition` pasado como atributo en el componete reactivo del HTML.
     * Cuando los valores `son iguales` el componente especificado es `renderizado`.
     */
    partition?: number;

}
