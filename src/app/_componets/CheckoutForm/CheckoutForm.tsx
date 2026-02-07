'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { payCashOrder } from '@/server/orders/pay-cash'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { shippingAddress } from "@/types/cart-response";
import { payOnlineOrder } from '@/server/orders/pay-online'

export default function CheckoutForm({ cartId }: { cartId: string }) {
  const [isOnline, setisOnline] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  async function payCash(cartId: string, shippingAddress: shippingAddress) {
    const response = await payCashOrder(cartId, shippingAddress)
    if (response.status == 'success') {
      toast.success('Order will be delivered soon...')
      window.location.href = '/'
    } else {
      toast.error('error')
    }
  }

  async function payOnline(cartId: string, shippingAddress: shippingAddress) {
    const response = await payOnlineOrder(cartId, shippingAddress)
    if (response.status == 'success') {
      window.location.href = response.session.url
    } else {
      toast.error('error')
    }
  }

  const form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: ""
    },
  })

  async function submitForm(values: shippingAddress) {
    setIsLoading(true)
    const shippingAddress = { ...values }

    if (isOnline) {
      await payOnline(cartId, shippingAddress)
    } else {
      await payCash(cartId, shippingAddress)
    }

    setIsLoading(false)
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <div className="rounded-2xl border bg-card p-6 space-y-6">

        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold">Checkout</h2>
          <p className="text-sm text-muted-foreground">
            Enter your shipping details to complete your order
          </p>
        </div>

        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">

          {/* DETAILS */}
          <Controller
            name="details"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Address details</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Street, building, floor..."
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* CITY */}
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>City</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Your city"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* PHONE */}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Your phone number"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* ACTIONS */}
          <div className="pt-4 space-y-3">
            <Button
              type="submit"
              disabled={isLoading}
              onClick={() => setisOnline(false)}
              className="w-full"
            >
              {isLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 animate-spin"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7"
                  />
                </svg>
              ) : (
                'Pay Cash'
              )}
            </Button>

            <Button
              type="submit"
              variant="outline"
              disabled={isLoading}
              onClick={() => setisOnline(true)}
              className="w-full"
            >
              {isLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 animate-spin"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7"
                  />
                </svg>
              ) : (
                'Pay Online'
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}
