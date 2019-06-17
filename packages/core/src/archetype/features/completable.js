const _completeField = (label) => ({
  name: '_complete',
  label,
  type: 'boolean'
})

export default function completable(
  fields,
  {
    fieldLabel = 'Completed',
    completeLabel = 'Complete',
    incompleteLabel = 'Incomplete'
  }
) {
  return {
    options: { completeLabel, incompleteLabel },
    fields: [_completeField(fieldLabel), ...fields]
  }
}
