'use client';

import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      
      {/* Top Section */}
      <div style={styles.container}>
        
        {/* Brand */}
        <div style={styles.section}>
          <h2>ABCShop</h2>
          <p>Your trusted online store for everything.</p>
        </div>

        {/* Links */}
        <div style={styles.section}>
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/categories">Categories</a>
        </div>

        {/* Support */}
        <div style={styles.section}>
          <h3>Support</h3>
          <a href="#">Help Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

        {/* Contact */}
        <div style={styles.section}>
          <h3>Contact</h3>
          <p>Email: support@abcshop.com</p>
          <p>Phone: +880 1234-567890</p>
        </div>

      </div>

      {/* Bottom */}
      <div style={styles.bottom}>
        © 2026 ABCShop. All rights reserved.
      </div>

    </footer>
  );
}

const styles: any = {
  footer: {
    backgroundColor: "#0f172a",
    color: "white",
    padding: "30px 20px",
    marginTop: "40px",
  },

  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap", // ✅ responsive
    gap: "20px",
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: "150px",
  },

  bottom: {
    marginTop: "20px",
    textAlign: "center",
    borderTop: "1px solid #334155",
    paddingTop: "10px",
    fontSize: "14px",
  },
};