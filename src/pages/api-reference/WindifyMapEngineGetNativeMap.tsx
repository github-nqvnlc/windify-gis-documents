import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";
import L from "leaflet"; // Chèn import leaflet để demo getNativeMap

const usageCode = `import { useEffect } from "react";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";
import L from "leaflet";

const NativeLeafletCircle = () => {
  const { engine, isReady } = useWindifyMap();

  useEffect(() => {
    if (!isReady || !engine) return;

    // Lấy đối tượng map gốc (Leaflet Map)
    // Phải ép kiểu (Type Assertion) vì Windify trả về unknown để tương thích nhiều core
    const leafletMap = engine.getNativeMap() as L.Map;

    // Lúc này bạn có thể toàn quyền sử dụng API nguyên bản của Leaflet!
    // Ví dụ: Vẽ một vòng tròn (Windify chưa hỗ trợ trực tiếp)
    const circle = L.circle([10.762622, 106.660172], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 1000 // Bán kính 1000m
    }).addTo(leafletMap);

    return () => {
      // Dọn dẹp
      circle.remove();
    };
  }, [engine, isReady]);

  return null;
};

export default function GetNativeMapDemo() {
  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={12}>
        <NativeLeafletCircle />
      </WindifyMap>
    </div>
  );
}`;

function NativeLeafletFeatureDemo() {
    const { engine, isReady } = useWindifyMap();
    const [status, setStatus] = useState<"Chưa vẽ" | "Đã vẽ bằng Leaflet thuần">("Chưa vẽ");

    useEffect(() => {
        if (!isReady || !engine) return;

        // Dùng setTimeout xíu để đảm bảo map đã render xong tile layer
        const timer = setTimeout(() => {
            const leafletMap = engine.getNativeMap() as L.Map;

            // 1. Dùng L.circle (Tính năng Windify chưa wrap)
            // Chú ý: Leaflet dùng [lat, lng]
            const circle = L.circle([10.762622, 106.660172], {
                color: "red",
                fillColor: "#f03",
                fillOpacity: 0.3,
                radius: 1500, // 1.5km
                weight: 2,
                dashArray: "5, 10"
            }).addTo(leafletMap);

            // 2. Dùng L.rectangle
            const bounds: L.LatLngBoundsLiteral = [[10.74, 106.68], [10.72, 106.70]];
            const rect = L.rectangle(bounds, {
                color: "red", fillColor: "#f03",
                fillOpacity: 0.3, weight: 2
            }).addTo(leafletMap);

            setStatus("Đã vẽ bằng Leaflet thuần");

            return () => {
                circle.remove();
                rect.remove();
            };
        }, 500);

        return () => clearTimeout(timer);
    }, [engine, isReady]);

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-3 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[220px]">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Hack trực tiếp vào Core</h4>
                <p className="text-xs text-muted-foreground mt-1">Sử dụng engine.getNativeMap()</p>
            </div>

            <div className="p-2 border rounded bg-muted/50 text-xs font-mono break-words">
                const map = engine.getNativeMap() as L.Map;
            </div>

            <div className="text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {status}
            </div>
            <div className="text-[11px] text-muted-foreground italic leading-tight">
                Vòng tròn đứt nét và Hình chữ nhật màu đỏ ở góc dưới bên phải là do <code className="px-1 py-0.5 rounded bg-muted">L.circle</code> và <code className="px-1 py-0.5 rounded bg-muted">L.rectangle</code> trực tiếp vẽ.
            </div>
        </div>
    );
}

export default function WindifyMapEngineGetNativeMapDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary">getNativeMap()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded">getNativeMap(): unknown</code> là "chiếc chìa khóa vạn năng" cho phép bạn thoát ra khỏi giới hạn của thư viện Windify để can thiệp trực tiếp vào thư viện lõi bên dưới (Leaflet hoặc MapLibre).
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả API</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Kiểu trả về (unknown):</strong>
                            Windify Engine được thiết kế theo kiến trúc Adapter Pattern, nghĩa là nó hỗ trợ nhiều map core khác nhau. Do đó, phương thức này trả về kiểu <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">unknown</code>. Bạn phải tự ép kiểu (Type Assertion) tương ứng với core đang chạy. Ví dụ: <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">as L.Map</code> nếu dùng Leaflet.
                        </li>
                        <li>
                            <strong className="text-foreground">Sức mạnh tối thượng:</strong>
                            Mặc dù Windify đã bọc (wrap) sẵn các tính năng GIS thông dụng nhất, nhưng thế giới GIS quá rộng lớn (vẽ đa giác tự do, custom tooltip, thêm video overlay, mini-map,...). Khi gặp một tính năng mà Windify chưa cung cấp API, bạn gọi hàm này ra và xài y như thể bạn đang code thuần bằng thư viện bản đồ gốc.
                        </li>
                        <li>
                            <strong className="text-foreground">Cảnh báo đồng bộ:</strong>
                            Bất kỳ thay đổi nào bạn thực hiện thông qua <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">getNativeMap()</code> sẽ <strong>KHÔNG</strong> được quản lý bởi Windify hay React. Ví dụ, nếu bạn dùng <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">L.marker().addTo(map)</code>, khi component bị unmount, marker đó sẽ biến thành rác bộ nhớ (Memory Leak) trừ khi bạn tự viết logic <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">remove()</code> nó.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: Dùng API Leaflet thuần</h2>
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
                    Tính năng vẽ hình tròn (<code className="bg-muted px-1.5 py-0.5 rounded text-sm">L.circle</code>) và hình chữ nhật (<code className="bg-muted px-1.5 py-0.5 rounded text-sm">L.rectangle</code>) chưa có sẵn trong IWindifyMapEngine. Dưới đây là cách chúng ta "lách luật" để sử dụng chúng trực tiếp từ lõi Leaflet.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
                                <NativeLeafletFeatureDemo />
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
