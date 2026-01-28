import { useEffect, useState } from "react";
import { X } from "lucide-react";
import pidyLogo from "@/assets/pidy-logo.png";

interface VirtualTryOnBotProps {
  productId?: string;
  size?: string;
}

export function VirtualTryOnBot({ productId, size }: VirtualTryOnBotProps) {
  const [isOpen, setIsOpen] = useState(false);

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

  // Trigger SDK scan when widget opens
  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setTimeout(() => {
      if (typeof (window as any).PidyTryOn?.scan === 'function') {
        (window as any).PidyTryOn.scan();
      } else {
        window.dispatchEvent(new Event('pidy-tryon-scan'));
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isOpen, productId, size]);

  if (!productId || !tryOnEnabledProducts.includes(productId)) return null;

  return (
    <div className="w-full">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg transition hover:bg-primary/90"
        >
          <img src={pidyLogo} alt="Pidy" className="h-4 w-4" />
          Virtual Try-On
        </button>
      ) : (
        <div
          className="relative overflow-hidden rounded-md border border-border"
          style={{
            width: "400px",
            height: "620px",
            background: "#0d0d0d",
          }}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close virtual try-on"
            className="absolute right-2 top-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-md bg-background/70 text-foreground shadow-sm backdrop-blur transition hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>

          <style>
            {`
              #pidy-tryon iframe {
                background: #0d0d0d !important;
                opacity: 1 !important;
                visibility: visible !important;
              }
            `}
          </style>
          <div
            id="pidy-tryon"
            data-product-id={productId}
            data-size={size || "M"}
            data-debug="true"
            data-pidy-auto
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
}
