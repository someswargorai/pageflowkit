# 📦 PageFlowKit

A lightweight, fully customizable **React pagination component** with support for page limits, active page styling, responsive layout, and dropdown for per-page selection. Built with **native CSS** (no Tailwind or external UI libraries required). Perfect for SaaS dashboards and apps.  

---

## ⚡ Features

- Fully **React functional component** (`FC`) with TypeScript support.  
- Supports **total pages**, **current page**, and **page limit**.  
- Built-in **dropdown to change items per page**.  
- **Active page highlighting** with gradient + shadow.  
- Fully **responsive layout** for small and large screens.  
- Can accept **custom class names** for full styling flexibility.  

---

## 📦 Installation

```bash
npm i pageflowkit -f


"use client";

import React, { useState } from "react";
import { Pagination } from "pageflowkit";
import "my-pagination/dist/globals.css";

const App = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 150,
    totalPages: 15
  });

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  return (
    <Pagination
      totalCount={pagination.total}
      currentPage={pagination.page}
      totalPages={pagination.totalPages}
      limit={pagination.limit}
      setLimit={handleLimitChange}
      onPageChange={handlePageChange}
      className="custom-pagination-wrapper"
    />
  );
};

export default App;