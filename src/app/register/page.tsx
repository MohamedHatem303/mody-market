'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { schemaregister } from '@/schema/registerScheme'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as zod from "zod"
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type RegisterFormData = zod.infer<typeof schemaregister>

export default function Register() {

  const router = useRouter()

  const form = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    resolver: zodResolver(schemaregister),
    mode: 'onBlur'
  })

  async function submitForm(values: RegisterFormData) {
    try {

      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      )

      toast.success("Account created successfully ✅")

      // safer than window.location
      router.push('/login')

    } catch (error: any) {
      console.log("Error:", error.response?.data)
      toast.error(error.response?.data?.message || "Something went wrong ❌")
    }
  }

  return (
    <>
      <div className="w-1/2 mx-auto p-10 mt-10 rounded-2xl shadow-2xl">

        <h2 className="text-gray-800 font-bold text-2xl">
          Register Now
        </h2>

        <form onSubmit={form.handleSubmit(submitForm)}>

          {/* NAME */}
          <div className="mt-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Name :</FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* EMAIL */}
          <div className="mt-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email :</FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* PASSWORD */}
          <div className="mt-4">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password :</FieldLabel>
                  <Input
                    type="password"
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* RE-PASSWORD */}
          <div className="mt-4">
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Re-Password :</FieldLabel>
                  <Input
                    type="password"
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm your password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* PHONE */}
          <div className="mt-4">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Phone :</FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your phone"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* SUBMIT */}
          <Button type="submit" className="my-5 w-full">
            Register
          </Button>

        </form>
      </div>
    </>
  )
}
