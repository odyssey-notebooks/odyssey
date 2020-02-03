const BOLD_ITALIC_PATTERN = /([^\*_]+)[\*_]{3}([^\*_]+)[\*_]{3}([^\*_]+)/g
const BOLD_PATTERN = /([^\*_]+)[\*_]{2}([^\*_]+)[\*_]{2}([^\*_]+)/g
const ITALIC_PATTERN = /([^\*_]+)[\*_]{1}([^\*_]+)[\*_]{1}([^\*_]+)/g

const replacements = [
  [BOLD_ITALIC_PATTERN, '$1<b><i>$2</i></b>$3'],
  [BOLD_PATTERN, '$1<b>$2</b>$3'],
  [ITALIC_PATTERN, '$1<i>$2</i>$3']
]

export default function(text) {
  return replacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), text) 
}