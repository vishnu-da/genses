interface ImageGalleryProps {
  image: string;
  productName: string;
}

export function ImageGallery({ image, productName }: ImageGalleryProps) {
  return (
    <div className="relative">
      {/* Single Image Display */}
      <div className="aspect-[3/4] lg:aspect-auto lg:h-[calc(100vh-64px)] bg-secondary flex items-center justify-center">
        <img
          src={image}
          alt={productName}
          className="w-full h-full object-cover lg:object-contain"
        />
      </div>
    </div>
  );
}
