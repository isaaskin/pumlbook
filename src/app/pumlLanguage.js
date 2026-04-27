import { HighlightStyle, StreamLanguage, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

const pumlKeywords = [
  '@startuml', '@enduml', 'class', 'interface', 'enum', 'abstract', 'package',
  'namespace', 'node', 'database', 'actor', 'usecase', 'component', 'rectangle',
  'folder', 'frame', 'cloud', 'queue', 'stack', 'storage', 'agent', 'boundary',
  'control', 'entity', 'participant', 'collections', 'artifact', 'card', 'file',
  'label', 'person', 'as', 'skinparam', 'title', 'header', 'footer', 'legend',
  'note', 'left', 'right', 'up', 'down', 'top', 'bottom', 'of', 'on', 'link',
  'to', 'together', 'repeat', 'while', 'is', 'end', 'start', 'stop', 'fork',
  'merge', 'split', 'detach', 'if', 'then', 'else', 'elseif', 'endif', 'switch',
  'case', 'default', 'endswitch', 'break', 'static', 'extends', 'implements',
  'digraph', 'state', 'allow_mixing', 'caption', 'center'
]

export const pumlLanguage = StreamLanguage.define({
  name: 'puml',
  token (stream) {
    if (stream.eatSpace()) return null

    // Comments
    if (stream.match(/^'.*/)) return 'comment'
    if (stream.match(/^\/'[\s\S]*?'\//)) return 'comment'

    // Strings
    if (stream.match(/^".*?"/)) return 'string'

    // Start/End tags
    if (stream.match(/^(@startuml|@enduml)/i)) return 'meta'

    // Stereotypes
    if (stream.match(/^<<.*?>>/)) return 'typeName'

    // Keywords
    for (const kw of pumlKeywords) {
      if (stream.match(new RegExp(`^\\b${kw}\\b`, 'i'))) {
        return 'keyword'
      }
    }

    // Accessors
    if (stream.match(/^[#~+-]\s/)) return 'operator'

    // Arrows/Operators
    if (stream.match(/^([<|*o#x{+^()]|[()|])?([-.]|[.=])+([>|*o#x}+^()]|[()|])?/)) {
      return 'operator'
    }

    // Brackets/Symbols
    if (stream.match(/^[{}()[\]]/)) return 'punctuation'

    // Numbers
    if (stream.match(/^\d+/)) return 'number'

    // Identifiers
    if (stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)) return 'variableName'

    stream.next()
    return null
  }
})

export const pumlHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#ff79c6', fontWeight: 'bold' },
  { tag: t.meta, color: '#00f2ff', fontWeight: 'bold' },
  { tag: t.comment, color: '#6272a4', fontStyle: 'italic' },
  { tag: t.string, color: '#f1fa8c' },
  { tag: t.variableName, color: '#50fa7b' },
  { tag: t.typeName, color: '#bd93f9', fontStyle: 'italic' },
  { tag: t.operator, color: '#ffb86c' },
  { tag: t.punctuation, color: '#f8f8f2' },
  { tag: t.number, color: '#bd93f9' }
])

export const pumlHighlighting = syntaxHighlighting(pumlHighlightStyle)
