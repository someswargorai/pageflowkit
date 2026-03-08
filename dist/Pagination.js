"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, ChevronDown } from "lucide-react";
import "./globals.css";
export const Pagination = ({ totalCount, limit, currentPage, totalPages, setLimit, onPageChange, className, }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++)
                pages.push(i);
        }
        else {
            pages.push(1);
            if (currentPage > 3)
                pages.push("...");
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);
            for (let i = startPage; i <= endPage; i++)
                pages.push(i);
            if (currentPage < totalPages - 2)
                pages.push("...");
            if (totalPages > 1)
                pages.push(totalPages);
        }
        return Array.from(new Set(pages));
    };
    const handleLimitChange = (val) => {
        setLimit(val);
        onPageChange(1);
        setIsDropdownOpen(false);
    };
    const startEntry = totalCount === 0 ? 0 : (currentPage - 1) * limit + 1;
    const endEntry = Math.min(currentPage * limit, totalCount);
    return (_jsxs("div", { className: `pagination-container ${className || ""}`, children: [_jsxs("div", { className: "pagination-buttons", children: [_jsx("button", { className: `pagination-button`, disabled: currentPage === 1, onClick: () => onPageChange(1), "aria-label": "First page", children: _jsx(ChevronsLeft, { size: 18 }) }), _jsx("button", { className: `pagination-button`, disabled: currentPage === 1, onClick: () => onPageChange(currentPage - 1), "aria-label": "Previous page", children: _jsx(ChevronLeft, { size: 18 }) }), getPageNumbers().map((page, idx) => page === "..." ? (_jsx("span", { className: "pagination-ellipsis", children: _jsx(MoreHorizontal, { size: 16 }) }, `ellipsis-${idx}`)) : (_jsx("button", { className: `pagination-button ${page === currentPage ? "active" : ""}`, onClick: () => onPageChange(page), children: page }, `page-${page}`))), _jsx("button", { className: `pagination-button`, disabled: currentPage === totalPages || totalPages === 0, onClick: () => onPageChange(currentPage + 1), "aria-label": "Next page", children: _jsx(ChevronRight, { size: 18 }) }), _jsx("button", { className: `pagination-button `, disabled: currentPage === totalPages || totalPages === 0, onClick: () => onPageChange(totalPages), "aria-label": "Last page", children: _jsx(ChevronsRight, { size: 18 }) })] }), _jsxs("div", { className: "pagination-summary", children: [_jsxs("div", { className: "pagination-select-wrapper", ref: dropdownRef, children: [_jsxs("button", { className: `pagination-dropdown-trigger ${isDropdownOpen ? 'open' : ''}`, onClick: () => setIsDropdownOpen(!isDropdownOpen), children: [_jsxs("span", { children: [limit, " per page"] }), _jsx(ChevronDown, { size: 16, className: `transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}` })] }), isDropdownOpen && (_jsx("div", { className: "pagination-dropdown-menu", children: [10, 20, 30, 50, 100].map((val) => (_jsxs("div", { className: `pagination-dropdown-item ${val === limit ? 'active' : ''}`, onClick: () => handleLimitChange(val), children: [val, " per page"] }, val))) }))] }), _jsxs("span", { className: "font-medium text-slate-600", children: ["Showing ", _jsx("span", { className: "text-indigo-600", children: startEntry }), " to ", _jsx("span", { className: "text-indigo-600", children: endEntry }), " of ", _jsx("span", { className: "text-indigo-600", children: totalCount }), " results"] })] })] }));
};
export default Pagination;
