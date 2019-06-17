const _titleField = (label, defaultValue) => ({
  name: '_title',
  label,
  type: 'text',
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
