export interface NumericComponent {

    /** Número mínimo permitido para el elemento */
    minValueValidator: number;

    /**
     * Mensaje de validación que aparece cuando el control obtiene errores de tipo `min`.
     * Esta propiedad sólo tiene efecto cuando `minValueValidator` contiene un valor.
     */
    messageMinValue?: string;

    /** Número máximo permitido para el elemento */
    maxValueValidator: number;

    /**
     * Mensaje de validación que aparece cuando el control obtiene errores de tipo `max`.
     * Esta propiedad sólo tiene efecto cuando `maxValueValidator` contiene un valor.
     */
    messageMaxValue?: string;

    /** Cantidad máxima de caracteres permitidos para el control reactivo */
    maxLength?: number;

    /** Tipo de componente. La asignación de esta propiedad es dinámica */
    type?: string;
}
