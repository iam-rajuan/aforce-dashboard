import { useEffect, useRef } from 'react'
import { Bold, Heading1, Heading2, Italic, List, ListOrdered, Pilcrow, Quote, Redo2, Type, Underline, Undo2 } from 'lucide-react'
import { Button } from './Button'
import { cn } from '../../utils/cn'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

interface ToolbarAction {
  label: string
  icon: typeof Bold
  command: string
  value?: string
}

const toolbarActions: ToolbarAction[] = [
  { label: 'Bold', icon: Bold, command: 'bold' },
  { label: 'Italic', icon: Italic, command: 'italic' },
  { label: 'Underline', icon: Underline, command: 'underline' },
  { label: 'H1', icon: Heading1, command: 'formatBlock', value: 'h1' },
  { label: 'H2', icon: Heading2, command: 'formatBlock', value: 'h2' },
  { label: 'Paragraph', icon: Pilcrow, command: 'formatBlock', value: 'p' },
  { label: 'Quote', icon: Quote, command: 'formatBlock', value: 'blockquote' },
  { label: 'Bullets', icon: List, command: 'insertUnorderedList' },
  { label: 'Numbers', icon: ListOrdered, command: 'insertOrderedList' },
]

const textSizeActions: ToolbarAction[] = [
  { label: 'Small', icon: Type, command: 'fontSize', value: '3' },
  { label: 'Large', icon: Type, command: 'fontSize', value: '5' },
]

export function RichTextEditor({ value, onChange, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const runCommand = (command: string, commandValue?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, commandValue)
    onChange(editorRef.current?.innerHTML ?? '')
  }

  return (
    <div className={cn('rounded-2xl border border-border bg-card', className)}>
      <div className="flex flex-wrap gap-2 border-b border-border px-4 py-4">
        {toolbarActions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.label}
              type="button"
              variant="ghost"
              className="h-9 px-3 text-xs"
              onClick={() => runCommand(action.command, action.value)}
            >
              <Icon className="mr-2 h-3.5 w-3.5" />
              {action.label}
            </Button>
          )
        })}
        {textSizeActions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.label}
              type="button"
              variant="ghost"
              className="h-9 px-3 text-xs"
              onClick={() => runCommand(action.command, action.value)}
            >
              <Icon className="mr-2 h-3.5 w-3.5" />
              {action.label}
            </Button>
          )
        })}
        <Button type="button" variant="ghost" className="h-9 px-3 text-xs" onClick={() => runCommand('undo')}>
          <Undo2 className="mr-2 h-3.5 w-3.5" />
          Undo
        </Button>
        <Button type="button" variant="ghost" className="h-9 px-3 text-xs" onClick={() => runCommand('redo')}>
          <Redo2 className="mr-2 h-3.5 w-3.5" />
          Redo
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Write or format your CMS content here..."
        className="cms-editor cms-content min-h-[320px] rounded-b-2xl bg-[#0d131b] px-5 py-4 outline-none"
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
      />
    </div>
  )
}
