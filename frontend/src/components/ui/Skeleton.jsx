const Shimmer = () => (
  <div className="absolute inset-0 -translate-x-full animate-shimmer">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
  </div>
);

export const ImageBlock = ({ className }) => (
  <div className={`relative overflow-hidden bg-gradient-to-br from-[#d9e8f5] via-[#e2ebf4] to-[#f4f7fa] ${className}`}>
    <Shimmer />
  </div>
);

export const TextLine = ({ className }) => (
  <div className={`relative h-3 rounded-full bg-gray-200/70 overflow-hidden ${className}`}>
    <Shimmer />
  </div>
);

const ColorDot = () => (
  <div className="w-3 h-3 rounded-full bg-gray-200/70" />
);

export const ProductCardSkeleton = () => (
  <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden flex flex-col">
    <ImageBlock className="aspect-square" />
    <div className="p-4 flex flex-col gap-2 flex-1">
      <TextLine className="w-1/4 h-2.5" />
      <TextLine className="w-3/4 h-4" />
      <TextLine className="w-full h-3 mt-0.5" />
      <div className="flex items-center justify-between mt-auto pt-3">
        <TextLine className="w-1/3 h-5" />
        <div className="flex gap-1">
          <ColorDot /><ColorDot /><ColorDot />
        </div>
      </div>
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#d9e8f5] via-[#e2ebf4] to-[#f4f7fa] pt-20 pb-12">
    <div className="max-w-[1500px] mx-auto px-6 py-4 mb-2">
      <TextLine className="w-24 h-4" />
    </div>
    <div className="max-w-[1500px] mx-auto px-6 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-14">
      <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col items-center">
        <ImageBlock className="w-full aspect-square lg:h-[600px] rounded-[3rem]" />
      </div>
      <div className="order-2 lg:order-1 lg:col-span-3 flex flex-col justify-start lg:pt-4 mt-8 lg:mt-0">
        <TextLine className="w-16 h-3 mb-1" />
        <TextLine className="w-3/4 h-10 mb-2" />
        <TextLine className="w-24 h-4 mb-8" />
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 w-full max-w-sm">
          <TextLine className="w-1/2 h-5 mb-6" />
          <div className="space-y-3 mb-6">
            <div className="flex justify-between"><TextLine className="w-1/3 h-4" /><TextLine className="w-1/4 h-4" /></div>
            <div className="flex justify-between"><TextLine className="w-1/3 h-4" /><TextLine className="w-1/4 h-4" /></div>
          </div>
          <TextLine className="w-full h-12 rounded-full" />
        </div>
      </div>
      <div className="order-3 lg:col-span-3 flex flex-col space-y-4 lg:pt-10">
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-5 rounded-[2rem]">
          <TextLine className="w-1/3 h-3 mb-4" />
          <div className="flex gap-2">
            <TextLine className="flex-1 h-9 rounded-full" />
            <TextLine className="flex-1 h-9 rounded-full" />
            <TextLine className="flex-1 h-9 rounded-full" />
          </div>
        </div>
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-5 rounded-[2rem]">
          <TextLine className="w-1/3 h-3 mb-4" />
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200/70" />
            <div className="w-12 h-12 rounded-full bg-gray-200/70" />
            <div className="w-12 h-12 rounded-full bg-gray-200/70" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const PageSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#d9e8f5] via-[#e2ebf4] to-[#f4f7fa] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-[3px] border-gray-300 border-t-gray-700 animate-spin" />
      <div className="flex flex-col items-center gap-2">
        <TextLine className="w-32 h-4" />
        <TextLine className="w-24 h-3" />
      </div>
    </div>
  </div>
);

export const CategoryGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
    {Array.from({ length: count }, (_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);
