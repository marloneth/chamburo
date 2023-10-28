'use client'

import React, { useState } from 'react'

interface Props {
  size: 'md' | 'xl'
  value?: string
}

export default function SearchBar({ size, value }: Props) {
  const [inputValue, setInputValue] = useState(value)
  const sizeClasses = {
    md: { input: 'text-md', button: 'text-xl' },
    xl: { input: 'text-md md:text-xl', button: 'text-xl md:text-3xl' },
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value)
  }

  return (
    <form
      className="flex border-2 rounded-xl p-2 w-full"
      method="get"
      action="/jobs"
    >
      <input
        type="text"
        name="search"
        className={`outline-0 w-full ${sizeClasses[size].input}`}
        placeholder="What are you looking for?"
        value={inputValue}
        onInput={handleInput}
      />
      <button type="submit" className={sizeClasses[size].button}>
        🔎
      </button>
    </form>
  )
}
