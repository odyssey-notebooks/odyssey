export default function generateMeta(archetype) {
  const created = (new Date).toISOString()
  const __meta__ = {
    created,
    updated: created
  }
  if (archetype) {
    __meta__.archetype = archetype._id
  }
  return __meta__
}