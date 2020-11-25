export interface TextComponent {

    /** Longitud máxima de caracteres permitida para el elemento */
    maxLengthValidator: number;

    /**
     * Mensaje de validación que aparece cuando el control obtiene errores de tipo `maxLength`.
     * Esta propiedad sólo tiene efecto cuando `maxLengthValidator` contiene un valor.
     */
    messageMaxLength?: string;

    /** Tipo de componente. La asignación de esta propiedad es dinámica */
    type?: string;

    /**
     * Expresión regular utilizada para filtrar los valores ingresados por el usuario.
     * Si no se especifica ningún valor, el elemento permitirá ingresar cualquier caracter.
     */
    regExp?: string;
}
