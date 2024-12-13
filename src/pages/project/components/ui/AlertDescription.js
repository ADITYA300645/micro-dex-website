const AlertDescription = ({ children, className, ...props }) => {
    return (
        <p className={`text-sm ${className}`} {...props}>
            {children}
        </p>
    );
};

export default AlertDescription;
