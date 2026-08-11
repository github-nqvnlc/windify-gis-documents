import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const usageCode = `import { useState, useEffect } from "react";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const ZoomLevelDisplay = () => {
  const { engine, isReady } = useWindifyMap();
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    if (!isReady || !engine) return;

    // Lấy mức zoom ban đầu
    setZoom(engine.getZoom());

    // Đăng ký sự kiện lắng nghe khi người dùng cuộn chuột / zoom
    const handleZoomEnd = () => {
      setZoom(engine.getZoom());
    };

    // Engine hỗ trợ event 'zoomend' chuẩn hoá
    engine.on("zoomend", handleZoomEnd);

    // Dọn dẹp sự kiện
    return () => {
      engine.off("zoomend", handleZoomEnd);
    };
  }, [engine, isReady]);

  if (zoom === null) return null;

  return (
    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 999, background: "white", padding: "8px 12px", borderRadius: "8px", fontWeight: "bold" }}>
      Mức Zoom: {zoom.toFixed(1)}
    </div>
  );
};

export default function GetZoomDemo() {
  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={12}>
        <ZoomLevelDisplay />
      </WindifyMap>
    </div>
  );
}`;

function GetZoomLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [currentZoom, setCurrentZoom] = useState<number | null>(null);

    useEffect(() => {
        if (!isReady || !engine) return;

        // Cập nhật giá trị khởi tạo
        setCurrentZoom(engine.getZoom());

        // Lắng nghe sự thay đổi
        const updateZoom = () => {
            setCurrentZoom(engine.getZoom());
        };

        engine.on("zoomend", updateZoom);

        return () => {
            engine.off("zoomend", updateZoom);
        };
    }, [engine, isReady]);

    // Tạo thanh biểu đồ tượng trưng cho level zoom (từ 1 đến 20)
    const maxZoom = 20;
    const progress = currentZoom ? (currentZoom / maxZoom) * 100 : 0;

    return (
        <div className="absolute top-4 left-4 z-[999] flex flex-col gap-3 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[220px]">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Trạng thái Zoom</h4>
                <p className="text-xs text-muted-foreground mt-1">Dữ liệu từ engine.getZoom()</p>
            </div>

            <div className="flex items-end gap-2 mt-2">
                <span className="text-4xl font-extrabold text-primary tabular-nums tracking-tighter leading-none">
                    {currentZoom !== null ? currentZoom.toFixed(0) : "-"}
                </span>
                <span className="text-sm text-muted-foreground font-medium mb-1">/ {maxZoom}</span>
            </div>

            <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden mt-1">
                <div
                    className="bg-primary h-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="mt-2 text-[11px] text-muted-foreground italic text-center border-t pt-2">
                Hãy lăn chuột để zoom in/out và quan sát giá trị
            </div>
        </div>
    );
}

export default function WindifyMapEngineGetZoomDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary">getZoom()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded">getZoom(): number</code> được dùng để truy xuất mức độ thu phóng (zoom level) hiện tại của khung nhìn bản đồ.
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả API</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Dữ liệu trả về (Return Type):</strong> Trả về một giá trị <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">number</code>. Tuỳ thuộc vào map core (như Leaflet) có hỗ trợ <em>fractional zoom</em> (zoom lẻ) hay không, giá trị này có thể là số nguyên (ví dụ: <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">12</code>) hoặc số thập phân (ví dụ: <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">12.5</code>).
                        </li>
                        <li>
                            <strong className="text-foreground">Tính thời gian thực:</strong> Giống hệt như <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">getCenter()</code>, nếu bạn muốn UI của mình tự động cập nhật mỗi khi zoom thay đổi, bạn phải gắn listener cho sự kiện <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">zoomend</code> thông qua hàm <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">engine.on('zoomend', ...)</code>.
                        </li>
                        <li>
                            <strong className="text-foreground">Ứng dụng thực tế:</strong> Rất hữu dụng khi bạn cần xử lý logic ẩn/hiện các layer dữ liệu dựa trên mức độ chi tiết (ví dụ: chỉ hiện tên đường khi mức zoom lớn hơn 15), hoặc xây dựng thanh tỉ lệ (scale bar) tự chế.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: Live Zoom Indicator</h2>
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
                    Dưới đây là một ví dụ về một bảng điều khiển nhỏ theo dõi mức zoom theo thời gian thực và hiển thị bằng cả con số lẫn thanh tiến trình (progress bar).
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={12}>
                                <GetZoomLiveDemoControls />
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
