import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

interface VirtualTryOnBotProps {
  productId?: string;
}

export function VirtualTryOnBot({ productId }: VirtualTryOnBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://pidy-tryon.lovable.app') return;
      
      if (e.data.type === 'tryon-expand') {
        setIsExpanded(true);
      } else if (e.data.type === 'tryon-collapse') {
        setIsExpanded(false);
        setIsOpen(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!productId) return null;

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setIsExpanded(true);
        }}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg transition hover:bg-primary/90"
      >
        <Sparkles className="h-4 w-4" />
        Virtual Try-On
      </button>
    );
  }

  return (
    <div className="w-full">
      <iframe
        ref={iframeRef}
        src={`https://pidy-tryon.lovable.app/?productId=${productId}`}
        allow="popups"
        style={{
          border: 'none',
          width: isExpanded ? '400px' : '150px',
          height: isExpanded ? '620px' : '45px',
          background: 'transparent',
          transition: 'width 0.3s ease, height 0.3s ease',
        }}
        title="Virtual Try-On"
      />
    </div>
  );
}
