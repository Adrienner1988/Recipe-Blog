const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-30 border-t-primary" />
        </div>
    );
};

export default LoadingSpinner;
// This component can be used as a fallback in Suspense or anywhere you need to show a loading state.   