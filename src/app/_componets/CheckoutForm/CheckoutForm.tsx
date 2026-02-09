'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { payCashOrder } from '@/server/orders/pay-cash'
import { payOnlineOrder } from '@/server/orders/pay-online'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { shippingAddress } from '@/types/cart-response'

export default function CheckoutForm({ cartId }: { cartId: string }) {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash')
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<shippingAddress>({
    defaultValues: {
      details: '',
      phone: '',
      city: '',
    },
  })

  // ✅ SUBMIT الوحيد – مفيش تعريف جوه تعريف
  async function submitForm(values: shippingAddress) {
    try {
      setIsLoading(true)

      if (paymentMethod === 'online') {
        const res = await payOnlineOrder(cartId, values)

        if (res.status === 'success') {
          window.location.href = res.session.url
        } else {
          throw new Error(res.message || 'Online payment failed')
        }
      } else {
        const res = await payCashOrder(cartId, values)

        if (res.status === 'success') {
          toast.success('Order placed successfully')
          window.location.href = '/'
        } else {
          throw new Error(res.message || 'Cash order failed')
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
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
                <FieldLabel>Address details</FieldLabel>
                <Input {...field} placeholder="Street, building, floor..." />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* CITY */}
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>City</FieldLabel>
                <Input {...field} placeholder="Your city" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* PHONE */}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Phone</FieldLabel>
                <Input {...field} placeholder="Your phone number" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* ACTIONS */}
          <div className="pt-4 space-y-3">
            <Button
              type="button"
              variant={paymentMethod === 'cash' ? 'default' : 'outline'}
              onClick={() => setPaymentMethod('cash')}
              className="w-full"
            >
              Pay Cash
            </Button>

            <Button
              type="button"
              variant={paymentMethod === 'online' ? 'default' : 'outline'}
              onClick={() => setPaymentMethod('online')}
              className="w-full"
            >
              Pay Online
            </Button>

            {/* ✅ ده اللي كان مكسور */}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Processing...' : 'Confirm Order'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
