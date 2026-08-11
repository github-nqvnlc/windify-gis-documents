import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const usageCode = `import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const ZoomControls = () => {
  const { engine, isReady } = useWindifyMap();

  const handleZoomIn = () => {
    if (isReady && engine) {
      // Lấy mức zoom hiện tại và cộng thêm 1
      const currentZoom = engine.getZoom();
      engine.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (isReady && engine) {
      const currentZoom = engine.getZoom();
      engine.setZoom(currentZoom - 1);
    }
  };

  const handleSetExactZoom = (level: number) => {
    if (isReady && engine) {
      // Đặt thẳng mức zoom cụ thể
      engine.setZoom(level);
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 999, display: "flex", gap: "8px" }}>
      <button onClick={handleZoomIn}>+</button>
      <button onClick={handleZoomOut}>-</button>
      <button onClick={() => handleSetExactZoom(15)}>Zoom mức 15</button>
    </div>
  );
};

export default function SetZoomDemo() {
  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={10}>
        <ZoomControls />
      </WindifyMap>
    </div>
  );
}`;

function SetZoomLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [zoomInput, setZoomInput] = useState<string>("12");

    const zoomIn = () => {
        if (isReady && engine) {
            engine.setZoom(engine.getZoom() + 1);
        }
    };

    const zoomOut = () => {
        if (isReady && engine) {
            engine.setZoom(engine.getZoom() - 1);
        }
    };

    const applyExactZoom = () => {
        if (isReady && engine) {
            const z = parseInt(zoomInput, 10);
            if (!isNaN(z)) {
                engine.setZoom(z);
            }
        }
    };

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-3 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[200px]">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Điều khiển Zoom</h4>
                <p className="text-xs text-muted-foreground mt-1">Sử dụng engine.setZoom()</p>
            </div>
            
            <div className="flex gap-2">
                <button 
                    onClick={zoomOut}
                    className="flex-1 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-bold rounded-md transition-colors"
                    title="Zoom Out"
                >
                    -
                </button>
                <button 
                    onClick={zoomIn}
                    className="flex-1 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-bold rounded-md transition-colors"
                    title="Zoom In"
                >
                    +
                </button>
            </div>

            <div className="flex gap-2 mt-2">
                <input 
                    type="number" 
                    value={zoomInput}
                    onChange={(e) => setZoomInput(e.target.value)}
                    className="flex-1 w-full px-2 py-1.5 text-sm border rounded-md bg-background"
                    min="1"
                    max="20"
                />
                <button 
                    onClick={applyExactZoom}
                    className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-md transition-colors"
                >
                    Áp dụng
                </button>
            </div>
        </div>
    );
}

export default function WindifyMapEngineSetZoomDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary">setZoom()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded">setZoom(zoom: number): void</code> dùng để thay đổi mức độ thu phóng (zoom level) của bản đồ một cách lập trình (programmatically).
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả API</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Tham số đầu vào:</strong> Nhận vào một số nguyên <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">number</code> đại diện cho mức zoom. Thường dao động từ <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">1</code> (nhìn toàn cầu) đến <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">20+</code> (nhìn thấy từng mái nhà, tuỳ thuộc vào tile map provider).
                        </li>
                        <li>
                            <strong className="text-foreground">Hiệu ứng Animation:</strong> Giống như <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">setCenter</code>, việc đổi mức zoom thường đi kèm hiệu ứng hoạt ảnh zoom-in/zoom-out tuỳ thuộc vào core bên dưới.
                        </li>
                        <li>
                            <strong className="text-foreground">Sử dụng trong React:</strong> Khi kết hợp với <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">engine.getZoom()</code>, bạn có thể dễ dàng tự tạo ra các nút <strong>[+]</strong>, <strong>[-]</strong> custom tùy biến hoàn toàn bằng React thay cho bộ điều khiển mặc định của Leaflet.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: Custom Zoom Controls</h2>
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
                    Bằng cách dùng <code className="bg-muted px-1.5 py-0.5 rounded text-sm">engine.setZoom()</code>, bạn có thể tự thiết kế bảng điều khiển thu phóng bản đồ bên ngoài, nằm tách biệt khỏi logic của map engine.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={12}>
                                <SetZoomLiveDemoControls />
                            </WindifyMap>
                        </div>
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
