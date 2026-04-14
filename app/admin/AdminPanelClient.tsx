"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

type Product = {
  _id: string;
  displayId: string;
  name: string;
  slug: string;
  inspiredBy?: string;
  category?: "him" | "her" | "unisex";
  productType?: "perfume" | "accessory";
  perfumeCategories?: string[];
  accessoryCategory?: string;
  sku?: string;
  stock?: number;
  image: string;
  sizeImages?: { ml10?: string; ml50?: string; ml100?: string };
  gallery?: string[];
  description: string;
  tags: string[];
  variants: { sizeMl: number; price: number; mrp: number }[];
  isBestSeller: boolean;
  isNewArrival: boolean;
};

type EditableProduct = {
  id?: string;
  name: string;
  slug: string;
  inspiredBy: string;
  category: "him" | "her" | "unisex";
  productType: "perfume" | "accessory";
  perfumeCategoriesCsv: string;
  accessoryCategory: string;
  sku: string;
  stock: number;
  image: string;
  images80: string[];
  images50: string[];
  images100: string[];
  description: string;
  tagsCsv: string;
  price80: number;
  mrp80: number;
  price50: number;
  mrp50: number;
  price100: number;
  mrp100: number;
  isBestSeller: boolean;
  isNewArrival: boolean;
};

const emptyForm: EditableProduct = {
  name: "",
  slug: "",
  inspiredBy: "",
  category: "unisex",
  productType: "perfume",
  perfumeCategoriesCsv: "",
  accessoryCategory: "",
  sku: "",
  stock: 0,
  image: "",
  images80: [],
  images50: [],
  images100: [],
  description: "",
  tagsCsv: "",
  price80: 1249,
  mrp80: 2500,
  price50: 849,
  mrp50: 1700,
  price100: 1499,
  mrp100: 3000,
  isBestSeller: false,
  isNewArrival: true,
};

async function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function toForm(product: Product): EditableProduct {
  const getVariant = (size: number, fallbackPrice: number, fallbackMrp: number) => {
    const found = product.variants?.find((item) => Number(item.sizeMl) === size);
    return {
      price: found?.price ?? fallbackPrice,
      mrp: found?.mrp ?? fallbackMrp,
    };
  };

  const v80 = getVariant(80, 1249, 2500);
  const v10 = getVariant(10, 1249, 2500); // legacy fallback
  const v50 = getVariant(50, 849, 1700);
  const v100 = getVariant(100, 1499, 3000);

  return {
    id: product._id,
    name: product.name || "",
    slug: product.slug || "",
    inspiredBy: product.inspiredBy || "",
    category: product.category || "unisex",
    productType: product.productType || "perfume",
    perfumeCategoriesCsv: (product.perfumeCategories || []).join(", "),
    accessoryCategory: product.accessoryCategory || "",
    sku: product.sku || "",
    stock: Number(product.stock || 0),
    image: product.image || "",
    images80: Array.isArray(product.sizeImages?.ml10) ? product.sizeImages.ml10 : (product.sizeImages?.ml10 ? [product.sizeImages.ml10] : []),
    images50: Array.isArray(product.sizeImages?.ml50) ? product.sizeImages.ml50 : (product.sizeImages?.ml50 ? [product.sizeImages.ml50] : []),
    images100: Array.isArray(product.sizeImages?.ml100) ? product.sizeImages.ml100 : (product.sizeImages?.ml100 ? [product.sizeImages.ml100] : []),
    description: product.description || "",
    tagsCsv: (product.tags || []).join(", "),
    price80: v80.price !== 1249 ? v80.price : (v10.price !== 1249 ? v10.price : 1249),
    mrp80: v80.mrp !== 2500 ? v80.mrp : (v10.mrp !== 2500 ? v10.mrp : 2500),
    price50: v50.price,
    mrp50: v50.mrp,
    price100: v100.price,
    mrp100: v100.mrp,
    isBestSeller: Boolean(product.isBestSeller),
    isNewArrival: Boolean(product.isNewArrival),
  };
}

export default function AdminPanelClient(_props: { adminCookieName: string; isSuperAdmin?: boolean }) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<EditableProduct>(emptyForm);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return products;
    return products.filter((item) =>
      [item.name, item.slug, item.sku, item.category, item.inspiredBy].join(" ").toLowerCase().includes(q)
    );
  }, [products, query]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/products", { cache: "no-store" });
      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const data = await response.json();
      setProducts(data.products || []);
      // clear selection when reloading
      setSelectedIds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const openNew = () => {
    setForm(emptyForm);
    setFormOpen(true);
    setMessage("");
  };

  const openEdit = (product: Product) => {
    setForm(toForm(product));
    setFormOpen(true);
    setMessage("");
  };

  const onSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    const payload = {
      name: form.name,
      slug: form.slug,
      inspiredBy: form.inspiredBy,
      category: form.category,
      productType: form.productType,
      perfumeCategories: form.perfumeCategoriesCsv.split(",").map((item) => item.trim()).filter(Boolean),
      accessoryCategory: form.accessoryCategory,
      sku: form.sku,
      stock: form.stock,
      image: form.image,
      sizeImages: {
        ml10: form.images80,
        ml50: form.images50,
        ml100: form.images100,
      },
      gallery: Array.from(new Set([...form.images80, ...form.images50, ...form.images100])).filter(Boolean),
      description: form.description,
      tags: form.tagsCsv.split(",").map((item) => item.trim()).filter(Boolean),
      variants: [
        { sizeMl: 80, price: Number(form.price80), mrp: Number(form.mrp80) },
        { sizeMl: 50, price: Number(form.price50), mrp: Number(form.mrp50) },
        { sizeMl: 100, price: Number(form.price100), mrp: Number(form.mrp100) },
      ],
      isBestSeller: form.isBestSeller,
      isNewArrival: form.isNewArrival,
    };

    try {
      const url = form.id ? `/api/admin/products/${form.id}` : "/api/admin/products";
      const method = form.id ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data?.error || "Failed to save product.");
        setBusy(false);
        return;
      }
      setMessage(form.id ? "Product updated." : "Product created.");
      setFormOpen(false);
      await loadProducts();
    } catch (_error) {
      setMessage("Unable to save right now.");
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (product: Product) => {
    const confirmed = window.confirm(`Delete ${product.name}?`);
    if (!confirmed) return;

    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/products/${product._id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json();
        setMessage(data?.error || "Failed to delete product.");
      } else {
        setMessage("Product removed.");
        await loadProducts();
      }
    } finally {
      setBusy(false);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filtered.map((p) => p._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const onBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    const confirmed = window.confirm(`Delete ${selectedIds.length} selected products?`);
    if (!confirmed) return;

    setBusy(true);
    setMessage("");
    try {
      let successCount = 0;
      let failCount = 0;
      for (const id of selectedIds) {
        const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
        if (response.ok) {
          successCount++;
        } else {
          failCount++;
        }
      }
      setMessage(`Deleted ${successCount} products.${failCount > 0 ? ` Failed to delete ${failCount}.` : ""}`);
      setSelectedIds([]);
      await loadProducts();
    } finally {
      setBusy(false);
    }
  };

  const onBulkUpload = async () => {
    if (!bulkFile) {
      setMessage("Please select a file first.");
      return;
    }

    setBusy(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("file", bulkFile);
      const response = await fetch("/api/admin/products/bulk", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data?.error || "Bulk upload failed.");
      } else {
        let msg = `Bulk upload completed. Created: ${data.created}, Updated: ${data.updated}.`;
        if (data.logs && data.logs.length > 0) {
          msg += `\n\nIssues found:\n${data.logs.join("\n")}`;
        }
        setMessage(msg);
        setBulkFile(null);
        await loadProducts();
      }
    } catch (_error) {
      setMessage("Bulk upload request failed. Please check database connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleVariantImageUpload = async (key: 'images80' | 'images50' | 'images100', files: FileList | null) => {
    if (!files || files.length === 0) return;
    const currentLength = form[key].length;
    const remaining = 5 - currentLength;
    if (remaining <= 0) {
      alert("Maximum 5 images allowed per variant.");
      return;
    }
    const toProcess = Array.from(files).slice(0, remaining);
    if (files.length > remaining) {
      alert(`Only selected the first ${remaining} images to reach the 5 image limit.`);
    }
    
    setBusy(true);
    try {
      const encoded = await Promise.all(toProcess.map(file => fileToBase64(file)));
      setForm(p => ({ ...p, [key]: [...p[key], ...encoded] }));
      setMessage(`${encoded.length} images uploaded.`);
    } catch (_error) {
      setMessage("Could not convert one or more images.");
    } finally {
      setBusy(false);
    }
  };

  const removeVariantImage = (key: 'images80' | 'images50' | 'images100', index: number) => {
    setForm(p => {
      const arr = [...p[key]];
      arr.splice(index, 1);
      return { ...p, [key]: arr };
    });
  };

  const setPrimaryImage = (base64Str: string) => {
    setForm(p => ({ ...p, image: base64Str }));
  };

  return (
    <section className={styles.page}>
      <div className={`container ${styles.shell}`}>
        <header className={styles.topBar}>
          <div>
            <p className={styles.kicker}>ENZARO Admin</p>
            <h1>Inventory Management</h1>
            <p className={styles.subText}>Shopify-style control panel for listing, editing, and bulk uploads.</p>
          </div>
          <div className={styles.topActions}>
            {_props.isSuperAdmin && (
              <Link href="/admin/users" className={styles.ghostBtn} style={{ textDecoration: 'none' }}>
                Manage Admins
              </Link>
            )}
            <button type="button" className={styles.ghostBtn} onClick={onLogout}>
              Logout
            </button>
            <button type="button" className="btn-primary" onClick={openNew}>
              Add Product
            </button>
          </div>
        </header>

        <section className={styles.toolsRow}>
          <div style={{ display: "flex", gap: "1rem", flex: 1, alignItems: "center" }}>
            <input
              className={styles.searchInput}
              placeholder="Search by name, slug, SKU, category"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
            {selectedIds.length > 0 && (
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={onBulkDelete}
                disabled={busy}
                style={{ padding: "0.5rem 1rem", border: "1px solid #ff4444", borderRadius: "4px" }}
              >
                Delete Selected ({selectedIds.length})
              </button>
            )}
          </div>
          <div className={styles.bulkBox}>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => setBulkFile(e.target.files?.[0] || null)}
            />
            <button type="button" className={styles.bulkBtn} onClick={onBulkUpload} disabled={busy}>
              Bulk Upload Sheet
            </button>
            <a href="/templates/inventory-template.csv" className={styles.templateLink}>
              Download Template
            </a>
          </div>
        </section>

        {message ? (
          <pre className={styles.message} style={{ whiteSpace: "pre-wrap", textAlign: "left", fontFamily: "inherit" }}>
            {message}
          </pre>
        ) : null}

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: "40px", textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && selectedIds.length === filtered.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Product</th>
                <th>Type</th>
                <th>Category</th>
                <th>Prices</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "2rem" }}>Loading products...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "2rem" }}>No products found.</td>
                </tr>
              ) : (
                filtered.map((product) => {
                  const v50 = product.variants?.find((item) => Number(item.sizeMl) === 50);
                  return (
                    <tr key={product._id} className={selectedIds.includes(product._id) ? styles.selectedRow : ""}>
                      <td style={{ textAlign: "center" }}>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(product._id)}
                          onChange={() => handleSelectRow(product._id)}
                        />
                      </td>
                      <td>
                        <div className={styles.prodCell}>
                          <img src={product.image} alt={product.name} />
                          <div>
                            <strong>{product.name}</strong>
                            <span>{product.slug}</span>
                            <span>SKU: {product.sku || "-"}</span>
                          </div>
                        </div>
                      </td>
                      <td>{product.productType || "perfume"}</td>
                      <td>{product.category || "unisex"}</td>
                      <td>
                        {product.variants && product.variants.length > 0
                          ? product.variants
                              .map((v) => `₹${new Intl.NumberFormat("en-IN").format(v.price)}`)
                              .join(", ")
                          : "₹0"}
                      </td>
                      <td>{Number(product.stock || 0)}</td>
                      <td>
                        <div className={styles.badgeRow}>
                          {product.isBestSeller ? <span className={styles.badge}>Best Seller</span> : null}
                          {product.isNewArrival ? <span className={styles.badge}>New</span> : null}
                        </div>
                      </td>
                      <td>
                        <div className={styles.actionRow}>
                          <button type="button" onClick={() => openEdit(product)}>
                            Edit
                          </button>
                          <button type="button" className={styles.deleteBtn} onClick={() => onDelete(product)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {formOpen ? (
          <div className={styles.drawerBackdrop} onClick={() => setFormOpen(false)}>
            <form className={styles.drawer} onClick={(e) => e.stopPropagation()} onSubmit={onSave}>
              <div className={styles.drawerHead}>
                <h2>{form.id ? "Edit Product" : "Add Product"}</h2>
                <button type="button" onClick={() => setFormOpen(false)}>
                  Close
                </button>
              </div>

              <div className={styles.formGrid}>
                <label>
                  Product Name
                  <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
                </label>
                <label>
                  Slug
                  <input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} required />
                </label>
                <label>
                  Inspired By
                  <input value={form.inspiredBy} onChange={(e) => setForm((p) => ({ ...p, inspiredBy: e.target.value }))} />
                </label>
                <label>
                  Product Type
                  <select
                    value={form.productType}
                    onChange={(e) => setForm((p) => ({ ...p, productType: e.target.value as "perfume" | "accessory" }))}
                  >
                    <option value="perfume">Perfume</option>
                    <option value="accessory">Accessory</option>
                  </select>
                </label>
                <label>
                  Category
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as "him" | "her" | "unisex" }))}
                  >
                    <option value="him">For Him</option>
                    <option value="her">For Her</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </label>
                {form.productType === 'perfume' && (
                  <label>
                    Perfume Categories (Hold Ctrl/Cmd for multiple)
                    <select
                      multiple
                      value={form.perfumeCategoriesCsv.split(',').map(s => s.trim()).filter(Boolean)}
                      onChange={(e) => {
                        const vals = Array.from(e.target.selectedOptions, option => option.value);
                        setForm(p => ({ ...p, perfumeCategoriesCsv: vals.join(', ') }));
                      }}
                      style={{ minHeight: '120px' }}
                    >
                      <option value="summer-perfumes">Summer Perfumes</option>
                      <option value="winter-perfumes">Winter Perfumes</option>
                      <option value="top-selling">Top Selling</option>
                      <option value="celebrity-perfumes">Celebrity Perfumes</option>
                      <option value="office-wear">Office Wear</option>
                      <option value="date-night">Date Night</option>
                    </select>
                  </label>
                )}
                {form.productType === 'accessory' && (
                  <label>
                    Accessory Category
                    <select
                      value={form.accessoryCategory}
                      onChange={(e) => setForm((p) => ({ ...p, accessoryCategory: e.target.value }))}
                    >
                      <option value="">Select Accessory Category...</option>
                      <option value="neck-tie">Neck Tie</option>
                      <option value="bow">Bow</option>
                      <option value="cufflinks">Cufflinks</option>
                      <option value="pocket-square">Pocket Square</option>
                      <option value="suspender">Suspender</option>
                    </select>
                  </label>
                )}
                <label>
                  SKU
                  <input value={form.sku} onChange={(e) => setForm((p) => ({ ...p, sku: e.target.value }))} />
                </label>
                <label>
                  Stock
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm((p) => ({ ...p, stock: Number(e.target.value) }))}
                  />
                </label>
                <input type="hidden" value={form.image} required />
                {(['images80', 'images50', 'images100'] as const).map((key) => {
                  const title = key === 'images80' ? '4x20ml' : key === 'images50' ? '50ml' : '100ml';
                  return (
                    <div key={key} className={styles.full}>
                      <label>
                        Upload {title} Images (Max 5)
                        <input 
                          type="file" 
                          accept="image/*" 
                          multiple 
                          onChange={(e) => void handleVariantImageUpload(key, e.target.files)} 
                          disabled={form[key].length >= 5} 
                        />
                      </label>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                        {form[key].map((imgStr, i) => (
                          <div key={i} style={{ border: form.image === imgStr ? '2px solid #c8b187' : '1px solid #333', padding: '6px', borderRadius: '6px', background: '#111' }}>
                            <img src={imgStr} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} alt="..." />
                            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "6px" }}>
                              <button 
                                type="button" 
                                onClick={() => setPrimaryImage(imgStr)} 
                                style={{ fontSize: '11px', padding: '4px', background: form.image === imgStr ? '#2a2a2a' : '#1a1a1a', border: '1px solid #333', color: form.image === imgStr ? '#c8b187' : '#ccc', borderRadius: '4px', cursor: 'pointer' }}
                              >
                                {form.image === imgStr ? 'Primary' : 'Set Primary'}
                              </button>
                              <button 
                                type="button" 
                                onClick={() => removeVariantImage(key, i)} 
                                style={{ fontSize: '11px', padding: '4px', background: '#251515', border: '1px solid #442222', color: '#ff6b6b', borderRadius: '4px', cursor: 'pointer' }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <label className={styles.full}>
                  Description
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    required
                  />
                </label>
                <label className={styles.full}>
                  Tags (comma-separated)
                  <input value={form.tagsCsv} onChange={(e) => setForm((p) => ({ ...p, tagsCsv: e.target.value }))} />
                </label>
              </div>

              <div className={styles.variantGrid}>
                <h3>Pricing by Variant</h3>
                <label>
                  4x20ML Price
                  <input
                    type="number"
                    value={form.price80}
                    onChange={(e) => setForm((p) => ({ ...p, price80: Number(e.target.value) }))}
                  />
                </label>
                <label>
                  4x20ML MRP
                  <input
                    type="number"
                    value={form.mrp80}
                    onChange={(e) => setForm((p) => ({ ...p, mrp80: Number(e.target.value) }))}
                  />
                </label>
                <label>
                  50ML Price
                  <input
                    type="number"
                    value={form.price50}
                    onChange={(e) => setForm((p) => ({ ...p, price50: Number(e.target.value) }))}
                  />
                </label>
                <label>
                  50ML MRP
                  <input
                    type="number"
                    value={form.mrp50}
                    onChange={(e) => setForm((p) => ({ ...p, mrp50: Number(e.target.value) }))}
                  />
                </label>
                <label>
                  100ML Price
                  <input
                    type="number"
                    value={form.price100}
                    onChange={(e) => setForm((p) => ({ ...p, price100: Number(e.target.value) }))}
                  />
                </label>
                <label>
                  100ML MRP
                  <input
                    type="number"
                    value={form.mrp100}
                    onChange={(e) => setForm((p) => ({ ...p, mrp100: Number(e.target.value) }))}
                  />
                </label>
              </div>

              <div className={styles.toggleRow}>
                <label>
                  <input
                    type="checkbox"
                    checked={form.isBestSeller}
                    onChange={(e) => setForm((p) => ({ ...p, isBestSeller: e.target.checked }))}
                  />
                  Mark as Best Seller
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={form.isNewArrival}
                    onChange={(e) => setForm((p) => ({ ...p, isNewArrival: e.target.checked }))}
                  />
                  Mark as New Arrival
                </label>
              </div>

              <div className={styles.drawerActions}>
                <button type="button" className={styles.ghostBtn} onClick={() => setFormOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={busy}>
                  {busy ? "Saving..." : form.id ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </section>
  );
}
