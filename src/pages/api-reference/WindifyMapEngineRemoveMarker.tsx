import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const usageCode = `import { useState, useEffect } from "react";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const RemoveMarkerDemo = () => {
  const { engine, isReady } = useWindifyMap();
  const [markerId, setMarkerId] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady || !engine) return;

    // 1. Thêm một Marker và chủ động lưu lại ID
    const myMarkerId = "target-marker-id";
    
    engine.addMarker({
      id: myMarkerId, // Đặt ID tĩnh để dễ bề gọi xóa
      position: [106.660172, 10.762622],
      title: "Mục tiêu cần xóa"
    });

    setMarkerId(myMarkerId);

    return () => {
      // Đảm bảo dọn dẹp khi component biến mất
      engine.removeMarker(myMarkerId);
    };
  }, [engine, isReady]);

  const handleDeleteMarker = () => {
    if (isReady && engine && markerId) {
      // 2. Xóa Marker bằng ID
      engine.removeMarker(markerId);
      
      // Xóa khỏi State để UI biết là đã mất
      setMarkerId(null);
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 999, background: "white", padding: 10 }}>
      {markerId ? (
        <button onClick={handleDeleteMarker}>Xóa Marker Mục Tiêu</button>
      ) : (
        <span>Marker đã bị xóa!</span>
      )}
    </div>
  );
};

export default function RemoveMarkerApp() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={14}>
        <RemoveMarkerDemo />
      </WindifyMap>
    </div>
  );
}`;

function RemoveMarkerLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [markers, setMarkers] = useState<{ id: string, name: string }[]>([]);

    useEffect(() => {
        if (!isReady || !engine) return;

        // Khởi tạo trước 3 Marker
        const initialMarkers = [
            { id: "m-chot-1", name: "1", position: [106.660, 10.762] },
            { id: "m-chot-2", name: "2", position: [106.680, 10.772] },
            { id: "m-chot-3", name: "3", position: [106.700, 10.782] }
        ];

        initialMarkers.forEach(m => {
            engine.addMarker({
                id: m.id,
                position: m.position as [number, number],
                element: `<div class="bg-destructive w-5 h-5 rounded-xl flex items-center justify-center text-primary-foreground p-1 rounded-md text-xs font-bold border border-white shadow-md animate-bounce">${m.name}</div>`
            });
        });

        setMarkers(initialMarkers.map(m => ({ id: m.id, name: m.name })));

        return () => {
            // Cleanup
            initialMarkers.forEach(m => engine.removeMarker(m.id));
        };
    }, [engine, isReady]);

    const handleRemove = (idToRemove: string) => {
        if (!engine) return;

        // Gọi API xóa marker
        engine.removeMarker(idToRemove);

        // Cập nhật lại UI danh sách
        setMarkers(prev => prev.filter(m => m.id !== idToRemove));
    };

    const handleClearAll = () => {
        if (!engine) return;

        // Quét mảng gọi removeMarker từng phần tử (nếu dùng clearMarkers thì bay hết)
        markers.forEach(m => engine.removeMarker(m.id));
        setMarkers([]);
    };

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-3 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[260px] pointer-events-auto">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Xóa Marker theo ID</h4>
                <p className="text-xs text-muted-foreground mt-1">Sử dụng engine.removeMarker(id)</p>
            </div>

            <div className="flex flex-col gap-2 mt-2">
                {markers.length === 0 ? (
                    <div className="text-xs text-muted-foreground text-center py-4 bg-muted/50 rounded border border-dashed">
                        Tất cả Marker đã bị xóa sạch!
                    </div>
                ) : (
                    markers.map(m => (
                        <div key={m.id} className="flex items-center justify-between bg-muted p-2 rounded-md">
                            <span className="text-sm font-medium">{m.name}</span>
                            <button
                                onClick={() => handleRemove(m.id)}
                                className="px-3 py-1 bg-destructive/10 text-destructive hover:bg-destructive hover:text-primary-foreground rounded text-xs transition-colors"
                            >
                                Xóa
                            </button>
                        </div>
                    ))
                )}
            </div>

            {markers.length > 0 && (
                <button
                    onClick={handleClearAll}
                    className="mt-2 w-full py-2 border border-destructive/30 text-destructive text-xs font-semibold rounded-md hover:bg-destructive/10 transition-colors"
                >
                    Xóa tất cả (Vòng lặp removeMarker)
                </button>
            )}
        </div>
    );
}

export default function WindifyMapEngineRemoveMarkerDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary break-all">removeMarker()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded text-base">removeMarker(id: string): void</code> là công cụ chuyên dụng để định vị và gỡ bỏ một Marker cụ thể ra khỏi bản đồ thông qua ID duy nhất của nó.
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả API</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Tham số đầu vào:</strong>
                            Nhận vào một chuỗi (string) <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">id</code>. Đây chính là giá trị ID bạn đã truyền vào <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">MarkerOptions</code> khi tạo Marker, hoặc là chuỗi UUID được hàm <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">addMarker()</code> trả về.
                        </li>
                        <li>
                            <strong className="text-foreground">Lý do cần xóa Marker theo ID:</strong>
                            Trong các hệ thống Tracking (giám sát xe cộ) hoặc Delivery (giao hàng), các Marker liên tục được sinh ra và mất đi. Bạn không thể dùng lệnh xóa toàn bộ (clearAll) vì nó sẽ làm mất các Marker khác đang hoạt động. Bạn buộc phải nhắm mục tiêu xóa chính xác chiếc xe đã hoàn thành chuyến đi thông qua cái ID của nó.
                        </li>
                        <li>
                            <strong className="text-foreground">Xử lý ngầm (Silent fail):</strong>
                            Nếu bạn truyền vào một ID không tồn tại hoặc đã bị xóa trước đó, hàm sẽ lặng lẽ bỏ qua mà không ném ra bất kỳ lỗi Crash ứng dụng nào (Silent fail). Điều này giúp code của bạn an toàn hơn.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: Bảng điều khiển Xóa Marker</h2>
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
                    Live demo dưới đây tạo sẵn 3 Marker có ID cố định. Bên cạnh có một Bảng điều khiển lưu trữ danh sách các Marker này. Bạn hãy bấm vào nút "Xóa" tương ứng để xem cách <code className="bg-muted px-1.5 py-0.5 rounded text-sm">removeMarker</code> bốc đúng mục tiêu ra khỏi bản đồ.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
                                <RemoveMarkerLiveDemoControls />
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
