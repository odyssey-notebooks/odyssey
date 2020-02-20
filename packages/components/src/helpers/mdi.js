import * as mdi from '@mdi/js'

const iconNames = Object.keys(mdi)
  .map(key => key
    .replace(/^mdi([A-Z])/, (_mdi, firstLetter) => {
      return firstLetter.toLowerCase()
    })
    .replace(/[A-Z]/g, match => "-" + match.toLowerCase())
  )

export default iconNames