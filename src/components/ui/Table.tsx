import { ReactNode } from 'react'

interface TableProps {
  columns: string[]
  children: ReactNode
}

export function Table({ columns, children }: TableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-panel">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-dim">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
