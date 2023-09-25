"use client";
import Image from "next/image";
import Link from "next/link";
import { ProductList } from "../components/product-list";
import { AnimatePresence } from "framer-motion";

export default function Page(): JSX.Element {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center md:justify-between py-2 md:py-8">
        <div className="flex items-center gap-1">
          <Image
            alt="Raccoon Illustration"
            className="max-w-[60px]"
            height={896}
            src="https://res.cloudinary.com/dvfpvjwre/image/upload/v1695666926/pngtree-raccoon-wearing-hatvector-or-color-illustration-vector-ears-illustration-vector-png-image_28307970_ibvuqo.png"
            width={920}
          />
          <h4 className="leading-snug tracking-tighter max-w-xl text-text text-lg">
            Raccoon <span className="text-primary">Hats</span>
          </h4>
        </div>
        <Link
          className="bg-primary px-6 py-3 text-white/90 font-bold rounded-xl shadow-md tracking-wide hidden"
          href="/admin"
        >
          Wanna Edit?
        </Link>
      </div>
      <main className="container mx-auto px-4">
        <section className="py-4">
          <h5 className="text-text/50 text-base">All Products</h5>
          <div className="py-4">
            <AnimatePresence mode="wait" initial={false}>
              <ProductList />
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}
