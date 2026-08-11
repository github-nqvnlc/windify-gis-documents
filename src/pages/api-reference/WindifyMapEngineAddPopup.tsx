import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const usageCode = `import { useEffect } from "react";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const PopupDemo = () => {
  const { engine, isReady } = useWindifyMap();

  useEffect(() => {
    if (!isReady || !engine) return;

    // 1. Mở một Popup độc lập (Standalone) tại một tọa độ cụ thể
    const standalonePopupId = engine.addPopup({
      position: [106.66, 10.76],
      content: "<h3>Chào mừng đến với TP.HCM!</h3><p>Đây là Popup độc lập.</p>",
      onClose: () => {
        console.log("Popup độc lập đã bị đóng");
      }
    });

    // 2. Gắn Popup vào một Marker có sẵn
    const markerId = engine.addMarker({
      position: [106.67, 10.77],
      title: "Click tôi đi!"
    });

    const attachedPopupId = engine.addPopup({
      markerId: markerId, // Gắn vào Marker này
      content: "<div style='color:red'>Tôi được gắn liền với Marker!</div>",
      offset: [0, -10] // Dịch popup lên trên một chút để không che mất Marker
    });

    return () => {
      // 3. Dọn dẹp
      engine.removePopup(standalonePopupId);
      engine.removePopup(attachedPopupId);
      engine.removeMarker(markerId);
    };
  }, [engine, isReady]);

  return null;
};

export default function App() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <WindifyMap center={[106.66, 10.76]} zoom={13}>
        <PopupDemo />
      </WindifyMap>
    </div>
  );
}`;

function AddPopupLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [lastPopupAction, setLastPopupAction] = useState<string>("Chưa có thao tác nào");

    useEffect(() => {
        if (!isReady || !engine) return;

        // Lưu trữ ID để dọn dẹp
        const createdPopups: string[] = [];
        const createdMarkers: string[] = [];

        // 1. Tạo một Marker cố định ở Q3 để test tính năng "Gắn Popup vào Marker"
        const q3MarkerId = engine.addMarker({
            position: [106.680, 10.775],
            element: `<div class="bg-primary text-primary-foreground w-fit px-2 py-1 rounded shadow text-xs font-bold whitespace-nowrap animate-bounce">Hover/Click Tui!</div>`
        });
        createdMarkers.push(q3MarkerId);

        // Gắn popup luôn vào cái Marker này
        const q3PopupId = engine.addPopup({
            markerId: q3MarkerId,
            content: `
                <div class="p-2 text-center">
                    <h3 class="font-bold text-primary mb-1">Chốt Quận 3</h3>
                    <p class="text-xs text-muted-foreground">Popup này dính liền với Marker.</p>
                </div>
            `,
            offset: [0, -10],
            onClose: () => setLastPopupAction("Đã đóng Popup Quận 3")
        });
        createdPopups.push(q3PopupId);

        // 2. Click vào bản đồ để mở Popup độc lập
        const handleMapClick = (e: any) => {
            const newPopupId = engine.addPopup({
                position: e.lngLat,
                content: `
                    <div class="p-2 min-w-[120px]">
                        <h4 class="font-semibold text-sm border-b pb-1 mb-1">Tọa độ đã chọn</h4>
                        <div class="text-xs font-mono text-muted-foreground flex flex-col gap-1">
                            <span>Lng: ${e.lngLat[0].toFixed(4)}</span>
                            <span>Lat: ${e.lngLat[1].toFixed(4)}</span>
                        </div>
                        <button onclick="alert('Action from popup!')" class="mt-2 w-full bg-secondary text-secondary-foreground text-[10px] py-1 rounded">Action</button>
                    </div>
                `,
                onClose: () => {
                    setLastPopupAction(`Đã đóng Popup tại Lng: ${e.lngLat[0].toFixed(2)}`);
                }
            });

            createdPopups.push(newPopupId);
            setLastPopupAction("Đã mở 1 Popup độc lập");
        };

        engine.on("click", handleMapClick);

        return () => {
            engine.off("click", handleMapClick);
            // Dọn dẹp tất cả
            createdPopups.forEach(id => engine.removePopup(id));
            createdMarkers.forEach(id => engine.removeMarker(id));
        };
    }, [engine, isReady]);

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-2 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[200px] pointer-events-auto">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Interactive Popups</h4>
                <p className="text-xs text-muted-foreground mt-1">addPopup() & removePopup()</p>
            </div>

            <div className="bg-muted p-2 rounded text-xs text-muted-foreground mt-2 border">
                Trạng thái: <strong className="text-foreground">{lastPopupAction}</strong>
            </div>

            <div className="text-[11px] text-muted-foreground italic leading-tight space-y-1 mt-1">
                <p>👉 <strong>Click lên Bản đồ</strong>: Mở Standalone Popup.</p>
                <p>👉 <strong>Click vào Marker</strong>: Xem Attached Popup.</p>
            </div>
        </div>
    );
}

export default function WindifyMapEngineAddPopupDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary break-all">addPopup()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded text-base">addPopup(options: PopupOptions): string</code> dùng để hiển thị các bóng thoại (Tooltip / InfoWindow) cung cấp thông tin chi tiết trên bản đồ. Nó hỗ trợ nội dung bằng chuỗi HTML hoặc HTMLElement tùy chỉnh.
                </p>
            </div>

            {/* Cấu trúc Options */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả PopupOptions</h2>
                <div className="mt-2 m-0 [&_pre]:my-0">
                    <CodeBlock language="typescript" code={`interface PopupOptions {
  id?: string;                    // (Tùy chọn) ID tự đặt. Nếu bỏ trống, trả về UUID ngẫu nhiên.
  position?: [number, number];    // Dùng khi tạo Popup độc lập (Standalone Popup).
  markerId?: string;              // Dùng khi muốn gắn Popup này dính chặt vào một Marker có sẵn.
  content: string | HTMLElement;  // Nội dung của Popup. Có thể là chuỗi HTML mạnh mẽ.
  className?: string;             // (Tùy chọn) Truyền CSS class (vd: Tailwind) để tùy biến giao diện khung native của Popup.
  closeButton?: boolean;          // (Tùy chọn) Bật/tắt nút đóng [X] mặc định của nền tảng (Leaflet/Mapbox).
  offset?: [number, number];      // (Tùy chọn) [x, y] Dịch chuyển Popup đi vài pixel để không che khuất đối tượng bên dưới.
  onClose?: () => void;           // (Tùy chọn) Hàm callback tự động chạy khi người dùng đóng popup.
}`} />
                </div>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Tính năng nổi bật</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">2 Cơ chế hoạt động linh hoạt:</strong>
                            Bạn có thể tạo một <strong>Standalone Popup</strong> bằng cách cung cấp <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">position</code> (thường dùng khi người dùng click vào một điểm bất kỳ trên bản đồ). Hoặc tạo <strong>Attached Popup</strong> bằng cách cung cấp <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">markerId</code>, lúc này Popup sẽ tự động "dính" lấy cái Marker đó, dù Marker có bị kéo thả đi đâu thì Popup cũng chạy theo.
                        </li>
                        <li>
                            <strong className="text-foreground">Hàm hủy removePopup(id):</strong>
                            Tương tự như Marker, <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">addPopup</code> sẽ trả về một chuỗi <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">ID</code>. Nếu bạn muốn đóng Popup bằng code thay vì chờ người dùng ấn dấu X, hãy gọi <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">engine.removePopup(id)</code>. Luôn nhớ gọi hàm hủy trong cleanup của useEffect.
                        </li>
                        <li>
                            <strong className="text-foreground">Tùy biến Content HTML:</strong>
                            Tham số <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">content</code> nhận thẳng chuỗi HTML, nghĩa là bạn có thể chèn hình ảnh <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">&lt;img&gt;</code>, chèn nút bấm <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">&lt;button&gt;</code> hay vẽ biểu đồ mini ngay trong Popup cực kỳ dễ dàng.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: Interactive Popups</h2>
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
                    Bản demo dưới đây minh hoạ cả 2 cơ chế của Popup. Có sẵn một Marker "Chốt Quận 3" đang nhún nhảy, khi bạn click vào nó, một Attached Popup sẽ mở ra. Đồng thời, nếu bạn click vào bất kỳ đâu trên bản đồ trống, một Standalone Popup sẽ hiện lên báo cáo tọa độ.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
                                <AddPopupLiveDemoControls />
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
