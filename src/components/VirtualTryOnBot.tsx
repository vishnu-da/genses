import { useState, useEffect, useRef } from "react";

interface VirtualTryOnBotProps {
  productId?: string;
}

export function VirtualTryOnBot({ productId }: VirtualTryOnBotProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://pidy-tryon.lovable.app') return;
      
      if (e.data.type === 'tryon-expand') {
        setIsExpanded(true);
      } else if (e.data.type === 'tryon-collapse') {
        setIsExpanded(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!productId) return null;

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
