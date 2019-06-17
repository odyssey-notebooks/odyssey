const _titleField = (label, defaultValue) => ({
  name: '_title',
  label,
  type: 'text',
  repr: 'plaintext',
  newlines: false,
  defaultValue
})

export default function titled(
  fields,
  {
    fieldLabel = 'Title',
    fieldDefault = 'Untitled'
  }
) {
  return {
    options: { fieldLabel },
    fields: [_titleField(fieldLabel, fieldDefault), ...fields]
  }
}
