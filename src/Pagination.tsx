"use client";

import { FC, useState, useRef, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  MoreHorizontal,
  ChevronDown
} from "lucide-react";

import "./globals.css";

export type PaginationProps = {
  totalCount: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  setLimit: (val: number) => void;
  onPageChange: (page: number) => void;
  className?: string;
};

export const Pagination: FC<PaginationProps> = ({
  totalCount,
  limit,
  currentPage,
  totalPages,
  setLimit,
  onPageChange,
  className,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      if (totalPages > 1) pages.push(totalPages);
    }
    
    return Array.from(new Set(pages));
  };

  const handleLimitChange = (val: number) => {
    setLimit(val);
    onPageChange(1);
    setIsDropdownOpen(false);
  };

  const startEntry = totalCount === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endEntry = Math.min(currentPage * limit, totalCount);

  return (
    <div className={`pagination-container ${className || ""}`}>
      <div className="pagination-buttons">
        <button
          className={`pagination-button`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          aria-label="First page"
        >
          <ChevronsLeft size={18} />
        </button>

        <button
          className={`pagination-button`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
              <MoreHorizontal size={16} />
            </span>
          ) : (
            <button
              key={`page-${page}`}
              className={`pagination-button ${
                page === currentPage ? "active" : ""
              }`}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </button>
          )
        )}

        <button
          className={`pagination-button`}
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>

        <button
          className={`pagination-button `}
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(totalPages)}
          aria-label="Last page"
        >
          <ChevronsRight size={18} />
        </button>
      </div>

      <div className="pagination-summary">
        <div className="pagination-select-wrapper" ref={dropdownRef}>
          <button 
            className={`pagination-dropdown-trigger ${isDropdownOpen ? 'open' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{limit} per page</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

        
            {isDropdownOpen && (
              <div 
                className="pagination-dropdown-menu"
              
              >
                {[10, 20, 30, 50, 100].map((val) => (
                  <div 
                    key={val} 
                    className={`pagination-dropdown-item ${val === limit ? 'active' : ''}`}
                    onClick={() => handleLimitChange(val)}
                  >
                    {val} per page
                  </div>
                ))}
              </div>
            )}
        
        </div>
        <span className="font-medium text-slate-600">
          Showing <span className="text-indigo-600">{startEntry}</span> to <span className="text-indigo-600">{endEntry}</span> of <span className="text-indigo-600">{totalCount}</span> results
        </span>
      </div>
    </div>
  );
};

export default Pagination;
