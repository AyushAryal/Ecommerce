import React from "react";
import SkeletonLoader from "./SkeletonLoader";

function SkeletonParagraph({ type }) {
    return (
        <>
            {type === "sm" ? (
                <div>
                    <SkeletonLoader type="text" />
                    <SkeletonLoader type="text" />
                    <SkeletonLoader type="text" />
                    <SkeletonLoader type="text" />
                    <SkeletonLoader type="partial-text" />
                </div>
            ) : (
                <div>
                    <SkeletonLoader type="text" />
                    <SkeletonLoader type="text" />
                    <SkeletonLoader type="text" />
                    <SkeletonLoader type="text" />
                    <SkeletonLoader type="text" />
                    <SkeletonLoader type="text" />
                    <SkeletonLoader type="text" />
                    <SkeletonLoader type="partial-text" />
                </div>
            )}
        </>
    );
}

export default SkeletonParagraph;
