'use client'

import { createNewUser } from '@/utils/serverActions'
import { Role } from '@prisma/client'
import { useState } from 'react'

export default function NewUserForm() {
  const [userRole, setUserRole] = useState<Role>(Role.CLIENT)
  const labels = {
    client: "I need an expert's help (Client)",
    worker: "I'm offering my services (Worker)",
  }

  const rolesData = Object.values(Role).map((role) => {
    const lowerRole = getLowerRole(role)
    return {
      role,
      label: labels[lowerRole],
    }
  })

  function getLowerRole(role: Role) {
    return role.toLowerCase() as keyof typeof labels
  }

  function handleRadioSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as Role
    setUserRole(value)
  }

  return (
    <form action={createNewUser} className="p-5 h-full flex flex-col">
      <legend className="text-2xl mb-8 text-center">
        Let us know what do you want to do in Chamburo
      </legend>
      <div className="mb-8">
        {rolesData.map(({ role, label }) => {
          const lowerRole = getLowerRole(role)

          return (
            <div className="mb-2" key={role}>
              <input
                required
                type="radio"
                id={lowerRole}
                name="role"
                value={role}
                className="mr-2"
                onChange={handleRadioSelection}
              />
              <label htmlFor={lowerRole} className="text-md">
                {label}
              </label>
            </div>
          )
        })}
      </div>

      {userRole === Role.WORKER && (
        <div className="">
          <label htmlFor="occupation">What is your occupation?</label>
          <input
            type="text"
            name="occupation"
            required
            className="border-2 rounded-md mt-2 p-2 border-accent-teal w-full"
          />
        </div>
      )}
      <button
        type="submit"
        className="bg-vibrant-blue p-2 w-full rounded-md text-off-white mt-auto"
      >
        Continue
      </button>
    </form>
  )
}
