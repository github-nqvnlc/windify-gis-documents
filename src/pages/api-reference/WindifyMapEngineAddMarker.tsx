import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const usageCode = `import { useEffect } from "react";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";
import type { MarkerOptions } from "@vn-gis/windify-gis/core";

const SimpleMarkerDemo = () => {
  const { engine, isReady } = useWindifyMap();

  useEffect(() => {
    if (!isReady || !engine) return;

    // 1. Thêm một Marker cơ bản
    const basicMarkerId = engine.addMarker({
      position: [106.660172, 10.762622], // [Lng, Lat]
      title: "Marker mặc định",
      onClick: () => {
        alert("Bạn vừa click vào Marker mặc định!");
      }
    });

    // 2. Thêm một Marker tùy chỉnh giao diện (Custom HTML)
    const customIconHtml = \`
    < div style = "background: red; color: white; padding: 5px; border-radius: 5px; font-weight: bold; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);" >
        📍 VIP
      </div >
    \`;

    const customMarkerId = engine.addMarker({
      position: [106.67, 10.77],
      element: customIconHtml, // Chèn thẳng chuỗi HTML
      draggable: true // Cho phép kéo thả
    });

    return () => {
      // Dọn dẹp marker khi unmount (Tránh memory leak)
      engine.removeMarker(basicMarkerId);
      engine.removeMarker(customMarkerId);
    };
  }, [engine, isReady]);

  return null;
};

export default function App() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
        <SimpleMarkerDemo />
      </WindifyMap>
    </div>
  );
}`;

function AddMarkerLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [markersCount, setMarkersCount] = useState(0);

    useEffect(() => {
        if (!isReady || !engine) return;

        // Lưu trữ danh sách marker ID để dọn dẹp
        const markerIds: string[] = [];

        // Lắng nghe click lên bản đồ để thêm marker
        const handleMapClick = (e: any) => {
            const newMarkerId = engine.addMarker({
                position: e.lngLat,
                element: `
                    <div class="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full border-2 border-background shadow-lg text-xs font-bold animate-in zoom-in duration-300">
                        ${markerIds.length + 1}
                    </div>
                `,
                draggable: true,
                onClick: () => {
                    // Khi click vào marker -> Xóa marker đó
                    engine.removeMarker(newMarkerId);

                    // Xóa ID khỏi mảng
                    const index = markerIds.indexOf(newMarkerId);
                    if (index > -1) {
                        markerIds.splice(index, 1);
                    }
                    setMarkersCount(markerIds.length);
                }
            });

            markerIds.push(newMarkerId);
            setMarkersCount(markerIds.length);
        };

        engine.on("click", handleMapClick);

        return () => {
            engine.off("click", handleMapClick);
            // Xóa tất cả marker đã tạo
            markerIds.forEach(id => engine.removeMarker(id));
        };
    }, [engine, isReady]);

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-2 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[200px] pointer-events-auto">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Interactive Markers</h4>
                <p className="text-xs text-muted-foreground mt-1">Dùng addMarker() và removeMarker()</p>
            </div>

            <div className="bg-muted p-2 rounded flex items-center justify-between text-sm mt-2 border">
                <span className="text-muted-foreground">Số lượng:</span>
                <span className="font-bold text-primary text-lg">{markersCount}</span>
            </div>

            <div className="text-[11px] text-muted-foreground italic leading-tight space-y-1 mt-1">
                <p>👉 Click lên <strong>Bản đồ</strong> để thêm Marker (Custom HTML).</p>
                <p>👉 Thử <strong>Kéo thả</strong> Marker sang vị trí mới.</p>
                <p>👉 Click lên <strong>Marker</strong> để xóa chính nó.</p>
            </div>
        </div>
    );
}

export default function WindifyMapEngineAddMarkerDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary break-all">addMarker()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded text-base">addMarker(options: MarkerOptions): string</code> dùng để cắm các điểm đánh dấu (Marker) lên bản đồ. Nó trả về một chuỗi <code className="bg-muted px-1.5 py-0.5 rounded text-base">id</code> định danh ngẫu nhiên (nếu bạn không tự cung cấp) để phục vụ cho việc xóa hoặc cập nhật sau này.
                </p>
            </div>

            {/* Cấu trúc Options */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả MarkerOptions</h2>
                <div className="mt-2 m-0 [&_pre]:my-0">
                    <CodeBlock language="typescript" code={`interface MarkerOptions {
  id?: string;                               // (Tùy chọn) ID tự đặt. Nếu bỏ trống, Engine sẽ tự sinh UUID.
  position: [number, number];                // [Kinh độ, Vĩ độ] - Vị trí cắm mốc
  element?: HTMLElement | string;            // (Tùy chọn) Rất mạnh mẽ! HTML Element hoặc chuỗi HTML Custom. 
                                             // Nếu bỏ trống sẽ dùng icon giọt nước mặc định.
  title?: string;                            // (Tùy chọn) Tooltip hiện ra khi hover chuột (Native title attribute).
  draggable?: boolean;                       // (Tùy chọn) Cho phép dùng chuột kéo thả Marker.
  onClick?: (event: WindifyMapEvent) => void;// (Tùy chọn) Sự kiện click riêng cho Marker này.
}`} />
                </div>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Tính năng nổi bật</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Custom HTML Marker cực kỳ linh hoạt:</strong>
                            Thay vì phải sử dụng các Icon ảnh PNG truyền thống, Windify cho phép bạn truyền trực tiếp một chuỗi HTML (như <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">{`<div class="bg-red-500...">📍</div>`}</code>) hoặc một <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">HTMLElement</code> được khởi tạo qua <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">document.createElement</code> vào thuộc tính <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">element</code>. Điều này giúp bạn dễ dàng kết hợp CSS, Tailwind để tạo ra các Marker có hiệu ứng nhấp nháy, thay đổi màu sắc cực đẹp.
                        </li>
                        <li>
                            <strong className="text-foreground">Trả về ID duy nhất:</strong>
                            Hàm chạy hoàn tất sẽ ngay lập tức trả về một chuỗi <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">string</code>. Bạn nên lưu trữ chuỗi này lại (trong state, ref hoặc array) để sau này gọi <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">engine.removeMarker(id)</code> khi cần xóa nó đi.
                        </li>
                        <li>
                            <strong className="text-foreground">Draggable (Kéo thả):</strong>
                            Chỉ cần gán <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">draggable: true</code>, marker sẽ trở nên tương tác được. Trong thực tế, bạn thường kết hợp tính năng này với <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">getNativeMap()</code> để lấy tọa độ mới sau khi người dùng thả chuột (vì Windify hiện tại chưa wrap sự kiện dragend của riêng marker).
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: Custom HTML Markers</h2>
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
                    Bản demo tương tác cao dưới đây hướng dẫn bạn cách vẽ ra các Custom Marker bằng chuỗi HTML kết hợp Tailwind classes. Hãy thử tự tay cắm vài Marker và di chuyển chúng nhé!
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={14}>
                                <AddMarkerLiveDemoControls />
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
