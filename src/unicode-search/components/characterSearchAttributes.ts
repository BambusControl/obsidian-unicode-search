/**
 * Attributes which are used for searching characters
 */
export type CharacterSearchAttributes<T> = {

    /**
     * Literal value identifying the codepoint
     *
     * @see Codepoint
     */
    codepoint: T,


    /**
     * The main name representing the character
     *
     * @see CodepointAttribute.name
     */
    name: T,
}
