export interface ChildComponent {

    /**
     * Nombre del componente que se va a renderizar.
     * Utilice la enumeración `TypeComponent` para hacer uso de los nombres predeterminados.
     * Todos los nombres que comiencen con APP son reutilizables y asignables a este tipo.
     * @example
     * // Uso del componente DANE
     * TypeComponent.APP_SELECT_DANE
     */
    nameComponent: string;

    /**
     * Especifica el nombre del control reactivo que será usado por el componente hijo.
     * Se utiliza sólo un control es necesario para el componente instanciado.
     * El valor por defecto es nulo.
     */
    nameControl?: string;

    /**
     * Especifica el nombre del label. Esta propiedad se ejecuta cuando el `nameControl` contiene
     * un valor, si no es así, su valor seguirá siendo nulo.
     */
    labelName?: string;

    /** Tipo de componente. La asignación de esta propiedad es dinámica */
    type?: string;
}
