import { FC } from "react";
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
export declare const Pagination: FC<PaginationProps>;
export default Pagination;
