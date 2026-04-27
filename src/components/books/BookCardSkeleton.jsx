function BookCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-line title fs-5 mb-3" />
      <div className="skeleton-line author mb-3" />
      <div className="skeleton-line price" />
      <div className="skeleton-line buy mb-3" />
    </div>
  );
}

export default BookCardSkeleton;