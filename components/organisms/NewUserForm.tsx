'use client'

import { useLangDictionary } from '@/hooks/i18n'
import { createMyUser } from '@/services/user'
import { Role } from '@prisma/client'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import Modal from '../molecules/Modal'
import createError from 'http-errors'

export default function NewUserForm() {
  const [userRole, setUserRole] = useState<Role>(Role.CLIENT)
  const [error, setError] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const { langDictionary, lang } = useLangDictionary()
  const langStrings = langDictionary?.component.newUserForm
  const labels = {
    client: langStrings?.clientOption,
    worker: langStrings?.workerOption,
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

  async function handleFormSubmission(event: React.FormEvent<HTMLFormElement>) {
    const form = event.target as HTMLFormElement

    try {
      event.preventDefault()
      const formData = new FormData(form)
      const role = formData.get('role') as Role
      const occupation = formData.get('occupation') as string

      await createMyUser({ role, occupation })

      if (role === 'CLIENT') redirect(`/${lang}/jobs`)
      redirect(`/${lang}/worker/dashboard`)
    } catch (error) {
      const typedError = error as createError.HttpError
      form.reset()
      setError(typedError.message)
      setOpenModal(true)
    }
  }

  return (
    <>
      <form
        onSubmit={handleFormSubmission}
        className="p-5 h-[90%] md:h-fit w-[90%] lg:max-w-2xl mt-[10%] mx-auto flex flex-col border border-dark-gray rounded-lg"
      >
        <legend className="text-2xl mb-8 text-center">
          {langStrings?.letUsKnow}
        </legend>
        <div className="flex flex-col md:flex-row">
          <div className="mb-8 md:w-1/2">
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
            <div className="w-full md:w-1/2">
              <label htmlFor="occupation">{langStrings?.occupationInput}</label>
              <input
                type="text"
                name="occupation"
                required
                className="border-2 rounded-md mt-2 p-2 border-accent-teal w-full"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-vibrant-blue p-2 w-full mx-auto rounded-md text-off-white mt-auto md:mt-4 md:w-1/3"
        >
          Continue
        </button>
      </form>
      <Modal
        title="Something went wrong"
        type="error"
        open={openModal}
        onClose={() => {
          setOpenModal(false)
        }}
      >
        <div className="my-2">
          <p className="text-lg">{error}</p>
        </div>
      </Modal>
    </>
  )
}
