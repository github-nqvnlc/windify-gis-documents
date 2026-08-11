import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const usageCode = `import { useEffect } from "react";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const ClearAllMarkersDemo = () => {
  const { engine, isReady } = useWindifyMap();

  useEffect(() => {
    if (!isReady || !engine) return;

    // 1. Cắm vài điểm lẻ tẻ
    engine.addMarker({ position: [106.66, 10.76] });
    engine.addMarker({ position: [106.67, 10.77] });

    // 2. Thêm một cụm (cluster) chứa 100 điểm
    engine.addMarkerCluster({
      id: "my-cluster",
      markers: Array.from({ length: 100 }).map(() => ({
        position: [106.66 + Math.random()*0.1, 10.76 + Math.random()*0.1]
      }))
    });

    return () => {
      // 3. Dọn dẹp tất cả chỉ với 1 dòng lệnh siêu tốc
      engine.clearMarkers();
    };
  }, [engine, isReady]);

  return (
    <button 
      style={{ position: "absolute", top: 10, right: 10, zIndex: 999 }}
      onClick={() => engine?.clearMarkers()}
    >
      Hủy Diệt Toàn Bộ Điểm
    </button>
  );
};

export default function App() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <WindifyMap center={[106.66, 10.76]} zoom={12}>
        <ClearAllMarkersDemo />
      </WindifyMap>
    </div>
  );
}`;

function ClearMarkersLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [stats, setStats] = useState({ single: 0, clustered: 0 });
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!isReady || !engine) return;

        // Render thử ban đầu
        handleSpawnEntities();

        return () => {
            engine.clearMarkers();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [engine, isReady]);

    const handleSpawnEntities = () => {
        if (!engine || isProcessing) return;
        setIsProcessing(true);

        // Sinh 5 điểm lẻ
        for (let i = 0; i < 5; i++) {
            engine.addMarker({
                position: [106.63 + Math.random() * 0.08, 10.74 + Math.random() * 0.08],
                element: `<div class="w-6 h-6 bg-blue-500 rounded-md border-2 border-white shadow-md animate-bounce"></div>`
            });
        }

        // Sinh 1 cluster 50 điểm
        engine.addMarkerCluster({
            id: `cluster-${Date.now()}`,
            markers: Array.from({ length: 50 }).map(() => ({
                position: [106.65 + Math.random() * 0.04, 10.75 + Math.random() * 0.04],
                element: `<div class="w-2 h-2 bg-rose-500 rounded-full border border-white"></div>`
            }))
        }).then(() => {
            setStats(prev => ({
                single: prev.single + 5,
                clustered: prev.clustered + 50
            }));
            setIsProcessing(false);
        });
    };

    const handleClearAll = () => {
        if (!engine) return;
        engine.clearMarkers(); // Đóng vai chính
        setStats({ single: 0, clustered: 0 });
    };

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-3 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[260px] pointer-events-auto">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Dọn dẹp Bản đồ</h4>
                <p className="text-xs text-muted-foreground mt-1">Sử dụng clearMarkers()</p>
            </div>

            <div className="flex flex-col gap-2 mt-1 border border-border/50 rounded p-2 bg-muted/30">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Điểm đơn lẻ:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{stats.single}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Điểm trong Cluster:</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">{stats.clustered}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t mt-1">
                    <span className="text-foreground font-medium">Tổng cộng:</span>
                    <span className="font-bold text-foreground text-lg">{stats.single + stats.clustered}</span>
                </div>
            </div>

            <div className="flex gap-2 mt-2">
                <button
                    onClick={handleSpawnEntities}
                    disabled={isProcessing}
                    className="flex-1 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs font-semibold rounded-md transition-colors disabled:opacity-50"
                >
                    {isProcessing ? "Đang vẽ..." : "+ Sinh thêm"}
                </button>
                <button
                    onClick={handleClearAll}
                    disabled={stats.single === 0 && stats.clustered === 0}
                    className="flex-1 py-2 bg-destructive text-primary-foreground hover:bg-destructive/90 text-xs font-semibold rounded-md transition-colors disabled:opacity-50"
                >
                    Clear All
                </button>
            </div>
        </div>
    );
}

export default function WindifyMapEngineClearMarkersDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary break-all">clearMarkers()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded text-base">clearMarkers(): void</code> là một "vũ khí hạng nặng" giúp quét sạch toàn bộ các Marker đơn lẻ và các Cụm Marker (Clusters) đang hiện diện trên bản đồ chỉ bằng một lệnh gọi duy nhất.
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả API</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Hiệu suất cực cao:</strong>
                            Thay vì phải lưu trữ hàng ngàn ID của Marker rồi chạy vòng lặp <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">removeMarker(id)</code> (cách này sẽ rất chậm và có thể giật lag UI), <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">clearMarkers()</code> giao tiếp thẳng với Engine bên dưới (Leaflet/Mapbox) để dọn dẹp các Layer Group liên quan trong chớp mắt.
                        </li>
                        <li>
                            <strong className="text-foreground">Dọn dẹp toàn diện:</strong>
                            Hàm này không phân biệt Marker được tạo bằng <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">addMarker</code> hay <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">addMarkerCluster</code>. Cứ là Marker, nó sẽ bay màu. Điều này cực kỳ tiện lợi khi bạn cần Reset bản đồ (chuyển trang, lọc lại dữ liệu từ đầu).
                        </li>
                        <li>
                            <strong className="text-foreground">Lưu ý khi dùng trong React:</strong>
                            Bạn nên luôn luôn gọi hàm này trong <strong>Cleanup function</strong> của <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">useEffect</code> chứa logic load dữ liệu, để đảm bảo khi Component bị hủy, bộ nhớ của trình duyệt sẽ được giải phóng hoàn toàn, tránh thất thoát RAM (Memory leak).
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: Reset Bản Đồ</h2>
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
                    Live demo dưới đây cho phép bạn chủ động sinh thêm dữ liệu (bao gồm cả Marker đơn và Cụm Cluster). Khi bản đồ đã ngập tràn các điểm, hãy bấm nút <strong>"Clear All"</strong> để chứng kiến sức mạnh dọn dẹp tức thì của <code className="bg-muted px-1.5 py-0.5 rounded text-sm">clearMarkers()</code>.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
                                <ClearMarkersLiveDemoControls />
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
