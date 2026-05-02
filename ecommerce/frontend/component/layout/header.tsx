'use client';

import React from "react";
import Link from "next/link";
import Login from "@/app/login/page";

export default function Header() {
  return (
    <header style={styles.header}>
      
      {/* Logo */}
      <div style={styles.logo}>
        ShopEase
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        style={styles.search}
      />

      {/* Navigation */}
      <nav style={styles.nav}>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/categories">Categories</a>
      </nav>

      {/* Right Side */}
      <div style={styles.actions}>
        <button style={styles.button}><Link href="/login">Login</Link></button>
        <button style={styles.cart}>🛒</button>
      </div>

    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 30px",
    backgroundColor: "#0f172a",
    color: "white",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  search: {
    padding: "8px",
    width: "250px",
    borderRadius: "5px",
    border: "none",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "6px 12px",
    cursor: "pointer",
  },
  cart: {
    padding: "6px 10px",
    cursor: "pointer",
  },
};