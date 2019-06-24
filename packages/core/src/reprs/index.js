// Object representations are the ways an object can be displayed
export const objectReprs = [
  'string',
  'menuItem',
  'form',
  'table',
  'card',
  'page'
]

/**
 * Different object reprs have different field reprs within them.
 *    string - static repr of main field only
 *    menuItem - static repr of main field; static repr of Archetype.icon
 *    form - input reprs of all fields
 *    table - cell reprs of all fields
 *    card - standard reprs of all fields
 *    page - standard reprs of all fields
 * */

// Field representations are the ways a field can be displayed.
//  Static - block, readonly
//  Cell - inline, editable
//  Input - block, edit-only
//  Standard - block, editable
export const fieldReprs = [
  'inline', // used for cells or compact views
  'block' // used everywhere else
]

/**
  * Implications of the above
  * - Not all fields can be the main field
  * - All mainable fields must have string reprs
  *   - These can be the editable widget with edit=false
  * - All fields should have input, cell, and editable reprs
  *   - Input reprs can/should be editable widgets with prop edit=true
  *   - The editable widget should suffice for most cell reprs
  * */
