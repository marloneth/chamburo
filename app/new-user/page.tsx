'use client'

import React, { useState } from 'react'
import { createNewUser } from '@/utils/serverActions'

export default function NewUser() {
  const [workerType, setWorkerType] = useState(false)
  const labels = {
    user: 'I need help of an expert',
    worker: 'I want to offer my services',
  }

  function handleCheckBoxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked
    setWorkerType(isChecked)
  }

  return (
    <form action={createNewUser}>
      <p>Let us know what do you want to do in Chamburo</p>
      <input
        type="checkbox"
        name="isWorkerType"
        checked={workerType}
        onChange={handleCheckBoxChange}
      />
      <label htmlFor="isWorkerType">
        {workerType ? labels.worker : labels.user}
      </label>
      {workerType && (
        <>
          <label htmlFor="occupation">What is your occupation</label>
          <input type="text" name="occupation" />
        </>
      )}
      <button type="submit">Continue</button>
    </form>
  )
}
