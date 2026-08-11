import { useEffect, useRef, useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyLeaflet } from "@vn-gis/windify-gis/core/leaflet";
import "leaflet/dist/leaflet.css";

const usageCode = `import { useRef, useEffect, useState } from "react";
import { WindifyLeaflet } from "@vn-gis/windify-gis/core/leaflet";
import "leaflet/dist/leaflet.css";

export default function VanillaMountDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [engine, setEngine] = useState<WindifyLeaflet | null>(null);

  const handleMountMap = () => {
    // 1. Kiểm tra DOM element đã sẵn sàng
    if (!containerRef.current || engine) return;
    
    // 2. Khởi tạo instance của Engine (chưa hiển thị lên màn hình)
    const mapEngine = new WindifyLeaflet({
      center: [108.2022, 16.0544],
      zoom: 12,
    });
    
    // 3. Gọi method mount() truyền vào DOM element
    mapEngine.mount(containerRef.current);
    
    setEngine(mapEngine);
  };

  const handleDestroyMap = () => {
    if (engine) {
      engine.destroy(); // Giải phóng bộ nhớ
      setEngine(null);
    }
  };

  // Nhớ dọn dẹp khi Component bị unmount
  useEffect(() => {
    return () => {
      if (engine) engine.destroy();
    };
  }, [engine]);

  return (
    <div>
      <button onClick={handleMountMap}>Mount Bản đồ</button>
      <button onClick={handleDestroyMap}>Destroy Bản đồ</button>
      
      {/* Container bắt buộc phải có chiều cao và rộng cụ thể */}
      <div 
        ref={containerRef} 
        style={{ width: "100%", height: "400px", border: "1px solid #ccc" }} 
      />
    </div>
  );
}`;

function MountLiveDemo() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [engine, setEngine] = useState<WindifyLeaflet | null>(null);
    const [mounted, setMounted] = useState(false);

    const handleMount = () => {
        if (!mapRef.current || mounted) return;

        // Khởi tạo engine
        const newEngine = new WindifyLeaflet({
            center: [108.2022, 16.0544], // Đà Nẵng
            zoom: 12
        });

        // Gắn vào DOM
        newEngine.mount(mapRef.current);
        setEngine(newEngine);
        setMounted(true);
    };

    const handleDestroy = () => {
        if (engine) {
            engine.destroy();
            setEngine(null);
            setMounted(false);
        }
    };

    useEffect(() => {
        return () => {
            if (engine) engine.destroy();
        };
    }, [engine]);

    return (
        <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card text-card-foreground shadow-sm">
            <div className="flex gap-2">
                <button
                    onClick={handleMount}
                    disabled={mounted}
                    className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-md disabled:opacity-50 transition-colors"
                >
                    Gọi mount()
                </button>
                <button
                    onClick={handleDestroy}
                    disabled={!mounted}
                    className="px-4 py-2 bg-destructive text-primary-foreground hover:bg-destructive/90 font-medium rounded-md disabled:opacity-50 transition-colors"
                >
                    Gọi destroy()
                </button>
            </div>

            <div
                ref={mapRef}
                className="w-full h-[400px] border-2 border-dashed border-muted-foreground/30 rounded-xl flex items-center justify-center overflow-hidden bg-muted/10 relative z-0"
            >
                {!mounted && <span className="text-muted-foreground text-sm font-medium">Bấm "Gọi mount()" để gắn bản đồ vào DOM này</span>}
            </div>
        </div>
    );
}

export default function WindifyMapEngineMountDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary">mount()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded">mount(container?: string | HTMLElement)</code> là cầu nối quan trọng nhất để khởi tạo và gắn một map engine (như Leaflet) vào trong giao diện web của bạn.
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Cách thức hoạt động</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Lazy Initialization:</strong> Khi bạn khởi tạo một class engine (ví dụ <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">new WindifyLeaflet(...)</code>), các cấu hình chỉ được lưu trong bộ nhớ. Bản đồ thực sự chưa được render ra HTML.
                        </li>
                        <li>
                            <strong className="text-foreground">Tham số container:</strong> Bạn phải truyền vào một DOM Element (như thẻ <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">&lt;div&gt;</code>) hoặc một chuỗi ID (ví dụ <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">'#my-map'</code>). Container này <strong>bắt buộc</strong> phải có CSS mô tả chiều cao và chiều rộng cụ thể (ví dụ <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">height: 400px</code>), nếu không bản đồ sẽ bị co cụm lại thành 0px.
                        </li>
                        <li>
                            <strong className="text-foreground">Tích hợp React:</strong> Trong nội bộ thư viện <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">@vn-gis/windify-gis/react</code>, component <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">&lt;WindifyMap /&gt;</code> đã đảm nhận tự động gọi hàm <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">mount()</code> này giúp bạn trong hook <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">useEffect</code> hoặc <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">useLayoutEffect</code>, do đó bạn không cần gọi thủ công nếu đang xài React Component.
                        </li>
                        <li>
                            <strong className="text-foreground">Tránh mount nhiều lần:</strong> Nếu container đã được mount bản đồ, gọi lại <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">mount()</code> thường sẽ bị engine core (Leaflet/MapLibre) văng lỗi <em>"Map container is already initialized"</em>. Hãy kiểm tra trạng thái trước khi gọi.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Cài đặt thực tế (Vanilla / Ref)</h2>
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
                    Dưới đây là một ví dụ cách khởi tạo <code className="bg-muted px-1.5 py-0.5 rounded text-sm">WindifyLeaflet</code> thủ công hoàn toàn mà không sử dụng declarative component của React. Cực kì hữu dụng khi bạn nhúng bản đồ vào các framework khác (như Vue, Angular) hoặc dùng JS thuần.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <MountLiveDemo />
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
