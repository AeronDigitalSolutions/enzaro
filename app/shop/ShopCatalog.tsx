"use client";

import { useMemo, useState, useRef, useEffect } from "react";
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
  category?: "him" | "her" | "unisex";
  productType?: "perfume" | "accessory";
  perfumeCategories?: string[];
};

type Audience = "all" | "him" | "her" | "summer-perfumes" | "top-selling" | "celebrity-perfumes";
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

const SORT_OPTIONS = [
  { value: "featured", label: "Sort by: Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ShopCatalog({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categoryParam = (searchParams.get("category") || "all").toLowerCase();
  const allowedFilters: Audience[] = [
    "all",
    "him",
    "her",
    "summer-perfumes",
    "top-selling",
    "celebrity-perfumes",
  ];
  const activeFilter: Audience = allowedFilters.includes(categoryParam as Audience)
    ? (categoryParam as Audience)
    : "all";
  const requestedPage = Number(searchParams.get("page") || "1");

  const searchQuery = (searchParams.get("q") || "").toLowerCase().trim();

  const filteredProducts = useMemo(() => {
    const perfumes = products.filter((product) => (product.productType || "perfume") === "perfume");
    let result = perfumes;

    if (activeFilter !== "all") {
      if (activeFilter === "him" || activeFilter === "her") {
        result = result.filter((product) => {
          if (product.category) return product.category === activeFilter;
          return inferAudience(product) === activeFilter;
        });
      } else if (activeFilter === "top-selling") {
        result = result.filter((p) => (p.perfumeCategories || []).includes("top-selling"));
      } else if (activeFilter === "summer-perfumes") {
        result = result.filter((p) => (p.perfumeCategories || []).includes("summer-perfumes"));
      } else if (activeFilter === "celebrity-perfumes") {
        result = result.filter((p) => (p.perfumeCategories || []).includes("celebrity-perfumes"));
      } else {
        result = result.filter((p) => (p.perfumeCategories || []).includes(activeFilter));
      }
    }

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(searchQuery))
      );
    }

    return result;
  }, [products, activeFilter, searchQuery]);

  const sortParam = searchParams.get("sort") || "featured";

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    if (sortParam === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortParam === "price-high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortParam === "rating") {
      sorted.sort((a, b) => Number(b.reviewScore || 0) - Number(a.reviewScore || 0));
    }
    return sorted;
  }, [filteredProducts, sortParam]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const currentPage = Number.isFinite(requestedPage)
    ? Math.max(1, Math.min(totalPages, Math.floor(requestedPage)))
    : 1;
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const visibleProducts = sortedProducts.slice(pageStart, pageStart + PAGE_SIZE);

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

  const setSort = (sortOption: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortOption === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", sortOption);
    }
    params.set("page", "1");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    setIsSortOpen(false);
  };

  const goToPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const currentSortLabel = SORT_OPTIONS.find(o => o.value === sortParam)?.label || "Sort by: Featured";

  return (
    <>
      <div className={`container ${styles.filterRow}`}>
        <div className={styles.filterBtnsGroup}>
          <button type="button" className={`${styles.filterBtn} ${activeFilter === "all" ? styles.filterBtnActive : ""}`} onClick={() => setFilter("all")}>All</button>
          <button type="button" className={`${styles.filterBtn} ${activeFilter === "him" ? styles.filterBtnActive : ""}`} onClick={() => setFilter("him")}>For Him</button>
          <button type="button" className={`${styles.filterBtn} ${activeFilter === "her" ? styles.filterBtnActive : ""}`} onClick={() => setFilter("her")}>For Her</button>
          <button type="button" className={`${styles.filterBtn} ${activeFilter === "summer-perfumes" ? styles.filterBtnActive : ""}`} onClick={() => setFilter("summer-perfumes")}>Summer Perfumes</button>
          <button type="button" className={`${styles.filterBtn} ${activeFilter === "top-selling" ? styles.filterBtnActive : ""}`} onClick={() => setFilter("top-selling")}>Top Selling</button>
          <button type="button" className={`${styles.filterBtn} ${activeFilter === "celebrity-perfumes" ? styles.filterBtnActive : ""}`} onClick={() => setFilter("celebrity-perfumes")}>Celebrity Perfumes</button>
        </div>
        
        <div className={styles.customSortContainer} ref={sortRef}>
          <button 
            type="button" 
            className={styles.customSortTrigger} 
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            {currentSortLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isSortOpen ? 'rotate(180deg)' : 'rotate(0)' }}><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          
          {isSortOpen && (
            <div className={styles.customSortDropdown}>
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={`${styles.customSortOption} ${sortParam === option.value ? styles.customSortActive : ""}`}
                  onClick={() => setSort(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`container ${styles.productGrid}`}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {filteredProducts.length > PAGE_SIZE ? (
        <div className={`container ${styles.pagination}`}>
          <button type="button" className={styles.pageBtn} disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}>Prev</button>
          <span className={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
          <button type="button" className={styles.pageBtn} disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}>Next</button>
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
