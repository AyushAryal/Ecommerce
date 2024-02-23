import React from "react";

function SkeletonLoader({ type }) {
    return (
        <div className={`skeleton-wrap skeleton-wrap--${type}`}>
            <div className="shimmer-container">
                <div className="shimmer"></div>
            </div>
        </div>
    );
}

export default SkeletonLoader;
