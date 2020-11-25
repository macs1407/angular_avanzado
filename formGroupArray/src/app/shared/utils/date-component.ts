export interface DateComponent {

    /**
     * Muestra un ícono de calendario en el elemento input.
     * Si no se define asigna el valor de `true`. Para deshabilitar esta
     * funcionalidad asigne el valor de `false`.
     */
    icon?: boolean;

    /**
     * Formato de fecha que retorna el calendario.
     * Por defecto toma el valor de `dd/mm/yy`
     */
    dateFormat?: string;

    /**
     * Muestra una lista con todos los meses para ir de forma más rápida.
     * Su valor por defecto es `false`
     */
    monthNavigator?: boolean;

    /**
     * Muestra una lista con los años disponibles para la navegación.
     * Si el valor se establece en `true`, la propiedad `yearRange` tendrá el
     * rango del año anterior más cinco años hacia adelante a partir del año actual.
     * Es decir, si el año actual es `2020` el rango será del `2019` hasta `2025`.
     */
    yearNavigator?: boolean;

    /**
     * Especifica el rango de años que se mostraran en la lista de `yearNavigator`.
     * La asignación sólo tendrá efecto si `yearNavigator` está en `true`.
     * Para especificar un rango se debe hacer con el formato {año inicial}:{año final}.
     * Si se requiere hacerlo dinámico reemplace el año final por la palabra `today`
     * @example
     * 2019:2025 o 2019:today
     */
    yearRange?: string;

    /**
     * Muestra los botones de limpieza y de asignar el día actual.
     * Su valor por defecto es `false`.
     */
    showButtonBar?: boolean;

    /**
     * Muestra la hora actual.
     * Su valor por defecto es `false`.
     */
    showTime?: boolean;

    /** Tipo de componente. La asignación de esta propiedad es dinámica */
    type?: string;

    /** Fecha mínima del calendario */
    minDate?: Date;

    /** Fecha máxima del calendario */
    maxDate?: Date;
}
