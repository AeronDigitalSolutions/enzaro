"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";

type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  mrp: number;
  image: string;
  tags: string[];
  reviewScore: string;
  reviewCount: number;
  isNewArrival: boolean;
};

type Audience = "all" | "him" | "her";
const PAGE_SIZE = 9;

function inferAudience(product: Product): Exclude<Audience, "all"> {
  const joined = `${product.name} ${(product.tags || []).join(" ")}`.toLowerCase();
  if (
    joined.includes("her") ||
    joined.includes("women") ||
    joined.includes("woman") ||
    joined.includes("feminine") ||
    joined.includes("floral") ||
    joined.includes("sweet")
  ) {
    return "her";
  }
  return "him";
}

export default function ShopCatalog({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const categoryParam = (searchParams.get("category") || "all").toLowerCase();
  const activeFilter: Audience = categoryParam === "him" || categoryParam === "her" ? categoryParam : "all";
  const requestedPage = Number(searchParams.get("page") || "1");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return products;
    return products.filter((product) => inferAudience(product) === activeFilter);
  }, [products, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.max(1, Math.min(totalPages, Math.floor(requestedPage)))
    : 1;
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const visibleProducts = filteredProducts.slice(pageStart, pageStart + PAGE_SIZE);

  const setFilter = (next: Audience) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") {
      params.delete("category");
    } else {
      params.set("category", next);
    }
    params.set("page", "1");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <>
      <div className={`container ${styles.filterRow}`}>
        <button
          type="button"
          className={`${styles.filterBtn} ${activeFilter === "all" ? styles.filterBtnActive : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          type="button"
          className={`${styles.filterBtn} ${activeFilter === "him" ? styles.filterBtnActive : ""}`}
          onClick={() => setFilter("him")}
        >
          For Him
        </button>
        <button
          type="button"
          className={`${styles.filterBtn} ${activeFilter === "her" ? styles.filterBtnActive : ""}`}
          onClick={() => setFilter("her")}
        >
          For Her
        </button>
      </div>

      <div className={`container ${styles.productGrid}`}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {filteredProducts.length > PAGE_SIZE ? (
        <div className={`container ${styles.pagination}`}>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage <= 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Prev
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className={styles.pageBtn}
            disabled={currentPage >= totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      ) : null}

      {filteredProducts.length === 0 ? (
        <div className={`container ${styles.emptyState}`}>
          <p>No perfumes found for this selection.</p>
        </div>
      ) : null}
    </>
  );
}
