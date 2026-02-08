'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { schemalogin } from '@/schema/loginscheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as zod from "zod";

export default function login() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callback-url')

  const [isLoading, setIsLoading] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)
  const [resetCode, setResetCode] = useState('')
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [openResetModal, setOpenResetModal] = useState(false)
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [resetLoading, setResetLoading] = useState(false)

  const form = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(schemalogin),
    mode: 'onBlur'
  })

  async function submitForm(values: zod.infer<typeof schemalogin>) {
    setIsLoading(true)
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl:'/'
    })

    if (response?.ok) {
      window.location.href = response.url || '/'
      toast.success('Login successful')
    } else {
      toast.error('Invalid Email or Password')
    }
    setIsLoading(false)
  }

  async function handleForgotPassword(email: string) {
    if (!email) {
      toast.error('Enter your email first')
      return
    }

    setForgotLoading(true)
    try {
      const res = await fetch(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      )
      const data = await res.json()
      res.ok ? toast.success('Check your email') : toast.error(data.message)
    } catch {
      toast.error('Network error')
    } finally {
      setForgotLoading(false)
    }
  }

  async function handleVerifyResetCode() {
    if (!resetCode) return toast.error('Enter reset code')

    setVerifyLoading(true)
    try {
      const res = await fetch(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resetCode }),
        }
      )
      res.ok ? setIsCodeVerified(true) : toast.error('Invalid code')
    } catch {
      toast.error('Network error')
    } finally {
      setVerifyLoading(false)
    }
  }

  async function handleResetPassword() {
    const email = form.getValues("email")
    if (!email) return toast.error("Enter your email first")
    if (newPassword !== confirmNewPassword) return toast.error("Passwords do not match")

    setResetLoading(true)
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      )
      res.ok ? toast.success("Password changed") : toast.error("Error")
      setOpenResetModal(false)
    } catch {
      toast.error("Network error")
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#5a0f1b]">
          Welcome Back
        </h2>

        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="space-y-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input {...field} placeholder="Enter your email" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input type="password" {...field} placeholder="Enter password" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>

          <Button disabled={isLoading} className="w-full mt-6">
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>

        <Button
          variant="link"
          className="w-full mt-3 text-sm"
          disabled={forgotLoading}
          onClick={async () => {
            await handleForgotPassword(form.getValues("email"))
            setOpenResetModal(true)
          }}
        >
          Forgot password?
        </Button>
      </div>

      {/* Reset Modal */}
      {openResetModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-xl">
            {!isCodeVerified ? (
              <>
                <h3 className="text-lg font-bold mb-4">Enter Reset Code</h3>
                <Input value={resetCode} onChange={(e) => setResetCode(e.target.value)} />
                <Button className="w-full mt-4" onClick={handleVerifyResetCode}>
                  Verify
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold mb-4">New Password</h3>
                <Input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <Input type="password" className="mt-3" placeholder="Confirm password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                <Button className="w-full mt-4" onClick={handleResetPassword}>
                  Reset Password
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
