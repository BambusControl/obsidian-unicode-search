/**
 * Attributes which are used for searching characters
 */
export type CharacterSearchAttributes<T> = {

    /**
     * Literal value identifying the codePoint
     *
     * @see CodePoint
     */
    codePoint: T,


    /**
     * The main name representing the character
     *
     * @see CodePointAttribute.name
     */
    name: T,
}
