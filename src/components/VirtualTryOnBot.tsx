import { useEffect } from "react";

interface VirtualTryOnBotProps {
  productId?: string;
  size?: string;
}

export function VirtualTryOnBot({ productId, size }: VirtualTryOnBotProps) {
  // Products that support try-on (original 5 + 6 women's products)
  const tryOnEnabledProducts = [
    'OVO-STAN-VRS-2025-001',
    'KITH-LAX-PKT-2025-002',
    'KNIT-POLO-JNY-2025-003',
    'W-LEG-DENIM-2025-004',
    'BTN-DWN-BRW-2025-005',
    'JCREW-STRIPE-DRS-2026-006',
    'AEO-LACE-CUL-2026-007',
    'NEXT-CP-BTN-2026-008',
    'NEXT-CRM-SHRT-2026-009',
    'SHEIN-RIB-TNK-2026-010',
    'SWIM-FLOR-BKN-2026-011',
  ];

  // Trigger SDK scan when component mounts or props change
  useEffect(() => {
    if (!productId || !tryOnEnabledProducts.includes(productId)) return;
    
    // Give the DOM a moment to render, then trigger scan
    const timer = setTimeout(() => {
      // Try manual scan if available
      if (typeof (window as any).PidyTryOn?.scan === 'function') {
        (window as any).PidyTryOn.scan();
      } else {
        // Fallback to custom event
        window.dispatchEvent(new Event('pidy-tryon-scan'));
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [productId, size]);

  if (!productId || !tryOnEnabledProducts.includes(productId)) return null;

  return (
    <div className="w-full">
      <div
        id="pidy-tryon"
        data-product-id={productId}
        data-size={size || "M"}
        data-pidy-auto
      />
    </div>
  );
}
