import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/employeeDirectory.css";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  totalPages: totalPagesFromParent,
  onPageChange,
}) => {
  const total = Number(totalItems) || 0;
  const perPage = Number(itemsPerPage) || 10;

  const computedTotalPages = Math.max(1, Math.ceil(total / perPage));
  const totalPages = Number.isFinite(totalPagesFromParent)
    ? Math.max(1, totalPagesFromParent)
    : computedTotalPages;

  useEffect(() => {
    if (currentPage > totalPages) {
      if (currentPage !== totalPages) onPageChange(totalPages);
    } else if (currentPage < 1) {
      if (currentPage !== 1) onPageChange(1);
    }

  }, [currentPage, totalPages, onPageChange]);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Calculate visible range for display
  const start = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, total);

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages || total <= perPage;

  return (
    <div className="pagination">
      <button
        onClick={handlePrevious}
        disabled={prevDisabled}
        className={`page-btn ${prevDisabled ? "disabled-btn" : ""}`}
      >
        Previous
      </button>

      <span className="page-info">
        Page {currentPage} of {totalPages} — Showing {start}–{end} of {total} entries
      </span>

      <button
        onClick={handleNext}
        disabled={nextDisabled}
        className={`page-btn ${nextDisabled ? "disabled-btn" : ""}`}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
