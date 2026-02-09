"use client";

import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

type Product = {
  _id: string;
  title: string;
  imageCover?: string;
};

type CartItem = {
  _id: string;
  count: number;
  price: number;
  product: Product;
};

type ShippingAddress = {
  name?: string;
  details: string;
  phone: string;
  city: string;
};

type Order = {
  _id: string;
  shippingAddress: ShippingAddress;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  cartItems: CartItem[];
  user: { name: string; email: string; phone?: string };
};

type Props = {
  ordersProp: Order[];
  token: string;
};

export default function ProfilePage({ ordersProp, token }: Props) {
  const orders = ordersProp ?? [];

  const initialUser = orders?.[0]?.user ?? { name: "", email: "", phone: "" };

  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);

  const [showChangePass, setShowChangePass] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [address, setAddress] = useState<ShippingAddress>({
    name: "",
    details: "",
    phone: "",
    city: "",
  });

  const [addressId, setAddressId] = useState<string | null>(null);
  const [openOrder, setOpenOrder] = useState<Order | null>(null);

  const [saving, setSaving] = useState(false);
  const [addressSaving, setAddressSaving] = useState(false);

  async function saveProfile() {
    try {
      setSaving(true);
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify(user),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message);
      toast.success("Profile updated");
      setEditing(false);
    } catch (e: any) {
      toast(e.message);
    } finally {
      setSaving(false);
    }
  }

  const loadAddresses = useCallback(async () => {
    if (!token) return;
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        headers: { token },
      },
    );
    const body = await res.json();
    if (body?.data?.length) {
      const a = body.data[0];
      setAddress(a);
      setAddressId(a._id);
    } else {
      setAddress({ name: "", details: "", phone: "", city: "" });
      setAddressId(null);
    }
  }, [token]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  async function saveAddress() {
    if (!address.details || !address.phone || !address.city) {
      toast("Fill all address fields");
      return;
    }

    try {
      setAddressSaving(true);

      const url = addressId
        ? `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`
        : `https://ecommerce.routemisr.com/api/v1/addresses`;

      const method = addressId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(address),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message);

      toast("Address saved ");
      setShowAddressForm(false);
      loadAddresses();
    } catch (e: any) {
      toast(e.message);
    } finally {
      setAddressSaving(false);
    }
  }

  async function removeAddress() {
    if (!addressId) return;
    if (!confirm("Remove address?")) return;

    await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
      {
        method: "DELETE",
        headers: { token },
      },
    );

    setAddress({ name: "", details: "", phone: "", city: "" });
    setAddressId(null);
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleString();
  }

  const lastThreeOrders = orders.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <h1 className="text-3xl font-semibold">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="rounded-xl border bg-card p-5 space-y-4">
          <h2 className="font-semibold text-lg">Personal Information</h2>

          {!editing ? (
            <>
              <p>
                <b>Name:</b> {user.name || "-"}
              </p>
              <p>
                <b>Email:</b> {user.email || "-"}
              </p>
              <p>
                <b>Phone:</b> {user.phone || "-"}
              </p>

              <button onClick={() => setEditing(true)} className="btn-primary">
                Edit
              </button>
            </>
          ) : (
            <div className="space-y-3">
              {["name", "email", "phone"].map((f) => (
                <input
                  key={f}
                  value={(user as any)[f]}
                  onChange={(e) => setUser({ ...user, [f]: e.target.value })}
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder={f}
                />
              ))}

              <div className="flex gap-2">
                <button onClick={saveProfile} className="btn-primary">
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="rounded-lg border px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-xl border bg-card p-5 space-y-4">
          <h2 className="font-semibold text-lg">Security</h2>

          {!showChangePass ? (
            <button
              onClick={() => setShowChangePass(true)}
              className="btn-primary"
            >
              Change Password
            </button>
          ) : (
            <ChangePassword
              token={token}
              onClose={() => setShowChangePass(false)}
            />
          )}
        </section>

        <section className="rounded-xl border bg-card p-5 space-y-4">
          <h2 className="font-semibold text-lg">Address</h2>

          <div className="text-sm space-y-1 text-muted-foreground">
            <p>
              <b>Name:</b> {address.name || "-"}
            </p>
            <p>
              <b>City:</b> {address.city || "-"}
            </p>
            <p>
              <b>Details:</b> {address.details || "-"}
            </p>
            <p>
              <b>Phone:</b> {address.phone || "-"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowAddressForm(true)}
              className="btn-primary"
            >
              Add / Edit Address
            </button>

            {addressId && (
              <button
                onClick={removeAddress}
                className="rounded-lg px-4 py-2 border border-destructive text-destructive"
              >
                Remove
              </button>
            )}
          </div>

          {showAddressForm && (
            <div className="space-y-3 pt-4 border-t">
              {["name", "city", "details", "phone"].map((f) => (
                <input
                  key={f}
                  value={(address as any)[f]}
                  onChange={(e) =>
                    setAddress({ ...address, [f]: e.target.value })
                  }
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder={f}
                />
              ))}

              <div className="flex gap-2">
                <button onClick={saveAddress} className="btn-primary">
                  {addressSaving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => {
                    setShowAddressForm(false);
                    loadAddresses();
                  }}
                  className="rounded-lg border px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold text-lg mb-4">Orders</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Order</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Paid</th>
                <th className="px-4 py-3 text-left">Delivered</th>
                <th className="px-4 py-3 text-right"></th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 text-center text-muted-foreground"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                lastThreeOrders.map((o) => (
                  <tr
                    key={o._id}
                    className="border-b hover:bg-muted/50 transition"
                  >
                    <td className="px-4 py-3 font-medium">
                      #{o._id.slice(-6)}
                    </td>
                    <td className="px-4 py-3">{formatDate(o.createdAt)}</td>
                    <td className="px-4 py-3">{o.totalOrderPrice} EGP</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          o.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {o.isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          o.isDelivered
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {o.isDelivered ? "Delivered" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setOpenOrder(o)}
                        className="text-primary underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {orders.length > 3 && (
            <div className="mt-4 text-center">
              <a
                href="/allorders"
                className="inline-block rounded-lg border px-6 py-2 text-primary hover:bg-muted transition"
              >
                View All Orders
              </a>
            </div>
          )}
        </div>
      </section>

      {openOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Order #{openOrder._id.slice(-6)}
              </h3>
              <button onClick={() => setOpenOrder(null)}>✕</button>
            </div>

            <div className="space-y-4">
              {openOrder.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {item.product.imageCover ? (
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.count}
                    </p>
                  </div>

                  <div className="text-sm font-semibold">{item.price} EGP</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChangePassword({
  token,
  onClose,
}: {
  token: string;
  onClose: () => void;
}) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (newPass !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", token },
          body: JSON.stringify({
            currentPassword: oldPass,
            password: newPass,
            rePassword: confirmPass,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Something went wrong");

      toast.success("Password changed successfully ");
      onClose();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }

    setSaving(false);
    onClose();
  }

  return (
    <div className="space-y-2">
      {[oldPass, newPass, confirmPass].map((_, i) => (
        <input
          key={i}
          type="password"
          className="w-full border rounded-lg px-3 py-2"
          placeholder={["Old password", "New password", "Confirm password"][i]}
          value={[oldPass, newPass, confirmPass][i]}
          onChange={(e) =>
            [setOldPass, setNewPass, setConfirmPass][i](e.target.value)
          }
        />
      ))}

      <div className="flex gap-2">
        <button onClick={handleSave} className="btn-primary">
          {saving ? "Saving..." : "Save"}
        </button>
        <button onClick={onClose} className="rounded-lg border px-4 py-2">
          Cancel
        </button>
      </div>
    </div>
  );
}
