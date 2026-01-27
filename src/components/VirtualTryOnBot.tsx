import { useEffect, useRef } from "react";

interface VirtualTryOnBotProps {
  productId?: string;
  size?: string;
}

export function VirtualTryOnBot({ productId, size }: VirtualTryOnBotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Load the SDK script once
  useEffect(() => {
    const scriptId = "pidy-tryon-sdk";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://pidy-tryon.lovable.app/sdk.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Don't remove script on unmount to avoid reloading
    };
  }, []);

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

  if (!productId || !tryOnEnabledProducts.includes(productId)) return null;

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        id="pidy-tryon"
        data-product-id={productId}
        data-size={size || "M"}
        data-pidy-auto
      />
    </div>
  );
}
