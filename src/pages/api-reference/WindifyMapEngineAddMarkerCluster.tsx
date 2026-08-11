import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";
import type { MarkerOptions } from "@vn-gis/windify-gis/core";

const usageCode = `import { useEffect } from "react";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";
import type { ClusterOptions, MarkerOptions } from "@vn-gis/windify-gis/core";

const MarkerClusterDemo = () => {
  const { engine, isReady } = useWindifyMap();

  useEffect(() => {
    if (!isReady || !engine) return;

    // 1. Chuẩn bị danh sách hàng trăm/ngàn markers
    const markers: MarkerOptions[] = Array.from({ length: 500 }).map((_, i) => ({
      position: [
        106.660172 + (Math.random() - 0.5) * 0.1, 
        10.762622 + (Math.random() - 0.5) * 0.1
      ],
      title: \`Điểm ngẫu nhiên \${i + 1}\`
    }));

    // 2. Cấu hình cụm (Cluster)
    const clusterOptions: ClusterOptions = {
      id: "demo-cluster",
      markers: markers,
      // Tùy chỉnh icon của cái cụm tổng (Tùy chọn)
      customClusterIcon: (count) => {
        return \`
          <div style="
            background-color: #3b82f6; 
            color: white; 
            border-radius: 50%; 
            width: 40px; 
            height: 40px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-weight: bold; 
            border: 3px solid rgba(255,255,255,0.5);">
            \${count}
          </div>
        \`;
      }
    };

    // 3. Thêm vào bản đồ (Trả về Promise)
    engine.addMarkerCluster(clusterOptions).then(() => {
      console.log("Đã render xong 500 điểm thành cụm!");
    });

    return () => {
      // 4. Khi component unmount, nhớ gọi clearMarkers (Hàm này sẽ dọn dẹp cả marker lẻ lẫn cluster)
      engine.clearMarkers();
    };
  }, [engine, isReady]);

  return null;
};

export default function App() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={11}>
        <MarkerClusterDemo />
      </WindifyMap>
    </div>
  );
}`;

function MarkerClusterLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [status, setStatus] = useState<string>("Đang khởi tạo...");
    const clusterId = "live-demo-cluster";

    useEffect(() => {
        if (!isReady || !engine) return;

        setStatus("Đang sinh 1000 điểm ngẫu nhiên...");

        // Sinh 1000 điểm ngẫu nhiên quanh trung tâm TP.HCM
        const centerLng = 106.660172;
        const centerLat = 10.762622;
        const generatedMarkers: MarkerOptions[] = [];

        for (let i = 0; i < 1000; i++) {
            generatedMarkers.push({
                position: [
                    centerLng + (Math.random() - 0.5) * 0.15,
                    centerLat + (Math.random() - 0.5) * 0.15
                ],
                // Dùng icon nhỏ để phân biệt điểm lẻ
                element: `<div class="w-2 h-2 bg-rose-500 rounded-full border border-white"></div>`,
                title: `Điểm dữ liệu ${i}`
            });
        }

        setStatus("Đang gom cụm và vẽ lên bản đồ...");

        // Gọi hàm gom cụm
        engine.addMarkerCluster({
            id: clusterId,
            markers: generatedMarkers,
            customClusterIcon: (count) => {
                // Đổi màu tùy theo số lượng phần tử trong cụm
                let bgClass = "bg-primary";
                let sizeClass = "w-8 h-8 text-xs";
                if (count > 100) {
                    bgClass = "bg-destructive";
                    sizeClass = "w-12 h-12 text-base";
                } else if (count > 50) {
                    bgClass = "bg-amber-500";
                    sizeClass = "w-10 h-10 text-sm";
                }

                return `
                    <div class="flex items-center justify-center rounded-full text-primary-foreground font-bold shadow-lg border-2 border-white/80 ${bgClass} ${sizeClass} animate-in zoom-in">
                        ${count}
                    </div>
                `;
            }
        }).then(() => {
            setStatus("Hoàn tất hiển thị 1000 điểm!");
        });

        return () => {
            engine.clearMarkers();
        };
    }, [engine, isReady]);

    const handleClear = () => {
        if (!engine) return;
        engine.clearMarkers();
        setStatus("Đã xóa toàn bộ (clearMarkers).");
    };

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-3 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[260px] pointer-events-auto">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Hiệu suất khổng lồ</h4>
                <p className="text-xs text-muted-foreground mt-1">addMarkerCluster()</p>
            </div>

            <div className="bg-muted p-2 rounded text-xs font-medium text-foreground flex items-center gap-2 border">
                <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="truncate">{status}</span>
            </div>

            <div className="text-[11px] text-muted-foreground italic leading-tight space-y-1">
                <p>👉 Dữ liệu mẫu chứa <strong>1.000</strong> điểm.</p>
                <p>👉 Thử <strong>Zoom IN</strong> để xem các cụm bị phá vỡ thành điểm nhỏ.</p>
                <p>👉 Thử <strong>Zoom OUT</strong> để xem các điểm gộp lại thành cụm to.</p>
            </div>

            <button
                onClick={handleClear}
                className="mt-2 w-full py-1.5 bg-destructive/10 text-destructive hover:bg-destructive hover:text-primary-foreground text-xs font-semibold rounded transition-colors"
            >
                Dọn dẹp Map (clearMarkers)
            </button>
        </div>
    );
}

export default function WindifyMapEngineAddMarkerClusterDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary break-all">addMarkerCluster()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded text-base">addMarkerCluster(options: ClusterOptions): Promise&lt;void&gt;</code> là vị cứu tinh cho hiệu năng khi bạn cần vẽ hàng ngàn, thậm chí hàng chục ngàn điểm lên bản đồ mà không làm trình duyệt bị treo.
                </p>
            </div>

            {/* Cấu trúc Options */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả ClusterOptions</h2>
                <div className="mt-2 m-0 [&_pre]:my-0">
                    <CodeBlock language="typescript" code={`interface ClusterOptions {
  id: string;                                          // Định danh của nhóm Cluster
  markers: MarkerOptions[];                            // Mảng chứa hàng ngàn Marker Options
  maxZoom?: number;                                    // (Tùy chọn) Mức zoom tối đa để dừng gom cụm
  radius?: number;                                     // (Tùy chọn) Bán kính quét điểm để gom (mặc định khoảng 80px)
  customClusterIcon?: (count: number) => HTMLElement | string; // (Tùy chọn) Render giao diện cục Cluster
}`} />
                </div>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Tính năng nổi bật</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Cơ chế Gom cụm tự động:</strong>
                            Thay vì gọi <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">addMarker()</code> 1000 lần khiến DOM sinh ra 1000 thẻ div làm trình duyệt giật lag, bạn chỉ cần đưa mảng 1000 tọa độ vào <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">addMarkerCluster()</code>. Engine sẽ tự tính toán để gộp những điểm đứng sát nhau thành 1 cụm duy nhất, ghi số lượng (VD: 50) lên trên.
                        </li>
                        <li>
                            <strong className="text-foreground">Tùy biến giao diện Icon siêu việt (customClusterIcon):</strong>
                            Thuộc tính này cho phép bạn viết một hàm nhận vào số lượng điểm đang bị gom (<code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">count</code>) và trả ra HTML. Nhờ đó, bạn có thể tạo luật: gom &lt; 50 điểm thì tô màu Vàng, &gt; 100 điểm thì tô màu Đỏ siêu to khổng lồ.
                        </li>
                        <li>
                            <strong className="text-foreground">Chạy Bất đồng bộ (Promise):</strong>
                            Việc tính toán toán học để gom cụm hàng ngàn điểm tốn chút thời gian CPU. Do đó hàm này trả về <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">Promise</code>. Bạn có thể dùng <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">.then()</code> để tắt loading spinner sau khi vẽ xong.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: Xử lý 1000 điểm dữ liệu</h2>
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
                    Live demo dưới đây tự động phát sinh ra 1.000 điểm tọa độ ngẫu nhiên rải rác xung quanh trung tâm TP.HCM. Hãy chú ý cách các điểm nhỏ xíu (màu hồng) tự động bị hút vào các quả cầu to (màu Đỏ/Vàng/Xanh) khi bạn thu nhỏ bản đồ (Zoom OUT) nhé.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={12}>
                                <MarkerClusterLiveDemoControls />
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
