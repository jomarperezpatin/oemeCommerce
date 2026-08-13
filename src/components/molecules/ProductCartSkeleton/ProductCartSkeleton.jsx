import './ProductCartSkeleton.css';

function ProductCartSkeleton() {
    return (
        <div className="skeleton-card">
            <div className="skeleton-link">
                <div className="skeleton-image shimmer"/>
                <div className="skeleton-name shimmer"/>
            </div>
            <div className="skeleton-body">
                <div className="skeleton-description shimmer"/>
                <div className="skeleton-price shimmer"/>
                <div className="skeleton-badge shimmer"/>
                <div className="skeleton-button shimmer"/>
            </div>
        </div>
    );
}

export default ProductCartSkeleton;