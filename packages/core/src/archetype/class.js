const _required = (argument) => {
  if (!argument) throw new Error('Archetype could not be initialized; a name is required.')
  return argument
}

class Archetype {
  constructor({
    name,
    features = {},
    fields = [],
    reprs = {
      string: {}
    }
  }) {
    this.name = _required(name)
    this.features = features
    this.fields = fields
    this.reprs = reprs
  }

  toJson() {
    return this
  }
}

export default Archetype
