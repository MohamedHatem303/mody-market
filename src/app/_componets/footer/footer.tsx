import Link from "next/link";

export default function footer() {
  return (
    <footer className="border-t bg-background mt-16">
      <div className="container-padding max-w-7xl mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-primary">Mody Mart</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Premium e-commerce experience with high quality products, trusted
            brands, and fast delivery.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Shop</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/products" className="hover:text-primary transition">
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:text-primary transition"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-primary transition">
                Brands
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Account</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/profile" className="hover:text-primary transition">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-primary transition">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-primary transition">
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/allorders" className="hover:text-primary transition">
                Allorders
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container-padding max-w-7xl mx-auto py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Mody Mart. All rights reserved.
          </span>
          <span className="text-xs">Designed and developed by Eng Mohamed Hatem</span>
        </div>
      </div>
    </footer>
  );
}
