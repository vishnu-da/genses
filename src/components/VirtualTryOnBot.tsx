import { useEffect, useRef } from "react";

interface VirtualTryOnBotProps {
  productId?: string;
  size?: string;
}

declare global {
  interface Window {
    PidyTryOn?: {
      init: (container: HTMLElement) => void;
      destroy: (container: HTMLElement) => void;
    };
  }
}

export function VirtualTryOnBot({ productId, size }: VirtualTryOnBotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  // Load the SDK script once
  useEffect(() => {
    const scriptId = "pidy-tryon-sdk";
    if (document.getElementById(scriptId)) {
      scriptLoadedRef.current = true;
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://pidy-tryon.lovable.app/sdk.js";
    script.async = true;
    script.onload = () => {
      scriptLoadedRef.current = true;
      // Initialize if container exists
      if (containerRef.current && window.PidyTryOn) {
        window.PidyTryOn.init(containerRef.current);
      }
    };
    document.body.appendChild(script);
  }, []);

  // Re-initialize when productId or size changes
  useEffect(() => {
    if (containerRef.current && scriptLoadedRef.current && window.PidyTryOn) {
      window.PidyTryOn.init(containerRef.current);
    }
  }, [productId, size]);

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
