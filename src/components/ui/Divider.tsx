export function Divider({ className = "" }: { className?: string }) {
  return (
    <hr 
      className={`border-t border-border my-8 w-full ${className}`} 
      aria-hidden="true" 
    />
  );
}
