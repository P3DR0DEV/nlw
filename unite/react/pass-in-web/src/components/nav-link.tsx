import React from 'react'

type NavLinkProps = React.ComponentProps<'a'>

export function NavLink(props: NavLinkProps) {
  return (
    <a {...props} className="font-medium text-sm text-zinc-300">
      {props.children}
    </a>
  )
}
