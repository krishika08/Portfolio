import Image, { ImageProps } from "next/image";

interface MediaProps extends Omit<ImageProps, "alt"> {
  alt: string; // Enforce alt text
  aspectRatio?: "video" | "square" | "auto" | "portrait";
  className?: string;
}

export function Media({ alt, aspectRatio = "auto", className = "", ...props }: MediaProps) {
  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    auto: "aspect-auto",
  };

  return (
    <div className={`relative overflow-hidden rounded-md bg-surface-secondary ${aspectClasses[aspectRatio]} ${className}`}>
      <Image
        alt={alt}
        className="object-cover"
        {...props}
      />
    </div>
  );
}
