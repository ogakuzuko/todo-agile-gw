import type { FC } from 'react'

export const Header: FC = () => {
  return (
    <header className="flex justify-between items-center px-4 h-10 bg-slate-300">
      <h1>Logo</h1>
      <p>Menu</p>
    </header>
  )
}
