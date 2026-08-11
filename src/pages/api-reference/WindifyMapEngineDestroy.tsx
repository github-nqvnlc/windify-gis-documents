import { useEffect, useRef, useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyLeaflet } from "@vn-gis/windify-gis/core/leaflet";
import "leaflet/dist/leaflet.css";

const usageCode = `import { useRef, useEffect } from "react";
import { WindifyLeaflet } from "@vn-gis/windify-gis/core/leaflet";
import "leaflet/dist/leaflet.css";

export default function VanillaDestroyDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // 1. Khởi tạo và gắn map vào DOM
    const mapEngine = new WindifyLeaflet({
      center: [108.2022, 16.0544],
      zoom: 12,
    });
    mapEngine.mount(containerRef.current);
    
    // 2. Rất quan trọng: Gọi destroy() khi component unmount
    return () => {
      // Hàm destroy() sẽ:
      // - Gỡ bỏ toàn bộ sự kiện DOM liên quan đến map
      // - Xóa các node HTML do Leaflet sinh ra khỏi containerRef
      // - Xóa các reference nội bộ để Garbage Collector thu hồi bộ nhớ
      mapEngine.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "400px" }} />;
}`;

function DestroyLiveDemo() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [engine, setEngine] = useState<WindifyLeaflet | null>(null);
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState<"Bản đồ chưa được tạo" | "Đang hiển thị bản đồ" | "Đã bị destroy và giải phóng">("Bản đồ chưa được tạo");

    const handleMount = () => {
        if (!mapRef.current || mounted) return;
        
        const newEngine = new WindifyLeaflet({
            center: [108.2022, 16.0544], // Đà Nẵng
            zoom: 12
        });
        
        newEngine.mount(mapRef.current);
        setEngine(newEngine);
        setMounted(true);
        setStatus("Đang hiển thị bản đồ");
    };

    const handleDestroy = () => {
        if (engine) {
            engine.destroy();
            setEngine(null);
            setMounted(false);
            setStatus("Đã bị destroy và giải phóng");
        }
    };

    useEffect(() => {
        return () => {
            if (engine) engine.destroy();
        };
    }, [engine]);

    return (
        <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-2">
                    <button 
                        onClick={handleMount}
                        disabled={mounted}
                        className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-md disabled:opacity-50 transition-colors"
                    >
                        Tạo & Mount
                    </button>
                    <button 
                        onClick={handleDestroy}
                        disabled={!mounted}
                        className="px-4 py-2 bg-destructive text-primary-foreground hover:bg-destructive/90 font-medium rounded-md disabled:opacity-50 transition-colors"
                    >
                        Thực thi destroy()
                    </button>
                </div>
                <div className="text-sm font-medium px-3 py-1.5 bg-muted rounded-md border">
                    Trạng thái: <span className={mounted ? "text-emerald-500" : "text-destructive"}>{status}</span>
                </div>
            </div>
            
            <div 
                ref={mapRef} 
                className="w-full h-[400px] border-2 border-dashed border-muted-foreground/30 rounded-xl flex items-center justify-center overflow-hidden bg-muted/10 relative z-0"
            >
                {!mounted && <span className="text-muted-foreground text-sm font-medium">DOM Element đang trống</span>}
            </div>
        </div>
    );
}

export default function WindifyMapEngineDestroyDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary">destroy()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded">destroy(): void</code> được dùng để hủy bỏ một instance của bản đồ đang hoạt động, tháo gỡ hoàn toàn các DOM event listener và dọn dẹp các tài nguyên đã chiếm dụng trong bộ nhớ.
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Tại sao phải gọi destroy?</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Ngăn chặn rò rỉ bộ nhớ (Memory Leak):</strong> Các thư viện bản đồ (như Leaflet) gắn rất nhiều sự kiện toàn cục vào đối tượng <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">window</code> hoặc <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">document</code> (chẳng hạn như kéo thả, cuộn chuột, zoom). Nếu không gọi <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">destroy()</code> khi component bị huỷ, các sự kiện này vẫn tiếp tục chạy ngầm.
                        </li>
                        <li>
                            <strong className="text-foreground">Dọn dẹp DOM:</strong> Hàm này sẽ tháo gỡ toàn bộ các thẻ HTML (<code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">&lt;div&gt;</code>, <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">&lt;img&gt;</code>,...) được engine thêm vào bên trong <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">container</code>, trả lại một container sạch sẽ.
                        </li>
                        <li>
                            <strong className="text-foreground">Tự động hóa với React:</strong> Nếu bạn đang dùng component <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">&lt;WindifyMap /&gt;</code>, hàm <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">destroy()</code> đã được gọi tự động trong bước cleanup của <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">useEffect</code> khi component bị unmount khỏi cây React. Bạn chỉ cần tự gọi nó khi thao tác với đối tượng engine thuần bằng Vanilla JS.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Cài đặt Cleanup (Vanilla / Ref)</h2>
                    <div className="flex bg-muted p-1 rounded-lg ml-auto">
                        <button
                            onClick={() => setShowDemo(false)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${!showDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Code
                        </button>
                        <button
                            onClick={() => setShowDemo(true)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${showDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Live Demo
                        </button>
                    </div>
                </div>
                <p className="text-muted-foreground leading-7">
                    Khi khởi tạo engine theo cách thủ công (qua từ khoá <code className="bg-muted px-1.5 py-0.5 rounded text-sm">new</code>), bạn bắt buộc phải gọi <code className="bg-muted px-1.5 py-0.5 rounded text-sm">destroy()</code> để giải phóng bộ nhớ. Trong React, việc này thường được đặt vào hàm return (cleanup function) của <code className="bg-muted px-1.5 py-0.5 rounded text-sm">useEffect</code>.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <DestroyLiveDemo />
                    ) : (
                        <div className="rounded-xl border shadow-sm overflow-hidden m-0">
                            <CodeBlock language="tsx" code={usageCode} />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
