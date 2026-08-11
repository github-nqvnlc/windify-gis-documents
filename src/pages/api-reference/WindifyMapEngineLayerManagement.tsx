import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const usageCode = `import { useState, useEffect } from "react";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const LayerManagementControls = () => {
  const { engine, isReady } = useWindifyMap();
  const layerId = "my-special-layer";
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isReady || !engine) return;

    // Khởi tạo layer ban đầu
    engine.addGeoJSONLayer({
      id: layerId,
      data: {
        type: "Feature",
        geometry: { type: "Point", coordinates: [106.660172, 10.762622] },
        properties: {}
      }
    });

    return () => {
      // Dọn dẹp layer khi component bị hủy
      engine.removeLayer(layerId);
    };
  }, [engine, isReady]);

  const handleToggleVisibility = () => {
    if (isReady && engine && engine.hasLayer(layerId)) {
      const newVisibility = !isVisible;
      engine.setLayerVisibility(layerId, newVisibility);
      setIsVisible(newVisibility);
    }
  };

  const handleRemoveLayer = () => {
    if (isReady && engine && engine.hasLayer(layerId)) {
      engine.removeLayer(layerId);
      // Sau khi xóa, hasLayer(layerId) sẽ trả về false
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 999, background: "white", padding: 10 }}>
      <button onClick={handleToggleVisibility}>
        {isVisible ? "Ẩn Layer" : "Hiện Layer"}
      </button>
      <button onClick={handleRemoveLayer}>Xóa hẳn Layer</button>
    </div>
  );
};

export default function LayerManagementDemo() {
  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
        <LayerManagementControls />
      </WindifyMap>
    </div>
  );
}`;

function LayerManagementLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const layerId = "demo-management-layer";

    // State để track UI
    const [layerExists, setLayerExists] = useState(false);
    const [layerVisible, setLayerVisible] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // Khởi tạo Layer lần đầu
    useEffect(() => {
        if (!isReady || !engine) return;
        handleAddLayer();
        return () => {
            if (engine.hasLayer(layerId)) {
                engine.removeLayer(layerId);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [engine, isReady]);

    const handleAddLayer = () => {
        if (!engine || isProcessing) return;
        setIsProcessing(true);

        const sampleData: any = {
            type: "Feature",
            properties: { name: "Quận 10, TP.HCM" },
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [106.65, 10.77],
                        [106.68, 10.77],
                        [106.68, 10.75],
                        [106.65, 10.75],
                        [106.65, 10.77]
                    ]
                ]
            }
        };

        engine.addGeoJSONLayer({
            id: layerId,
            data: sampleData,
            style: {
                fillColor: "hsl(var(--primary))",
                color: "hsl(var(--primary))",
                fillOpacity: 0.3,
                weight: 3,
                dashArray: "10, 10"
            }
        }).then(() => {
            setLayerExists(true);
            setLayerVisible(true);
            setIsProcessing(false);
        });
    };

    const handleToggleVisibility = () => {
        if (!engine || !engine.hasLayer(layerId)) return;
        const newState = !layerVisible;
        engine.setLayerVisibility(layerId, newState);
        setLayerVisible(newState);
    };

    const handleRemoveLayer = () => {
        if (!engine) return;
        engine.removeLayer(layerId);

        // Kiểm tra lại bằng hasLayer để chắc chắn
        setLayerExists(engine.hasLayer(layerId));
        setLayerVisible(false);
    };

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-3 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[260px]">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Quản lý Layer</h4>
                <p className="text-xs text-muted-foreground mt-1">removeLayer / setLayerVisibility / hasLayer</p>
            </div>

            <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between items-center bg-muted p-2 rounded text-sm">
                    <span className="text-muted-foreground">Tồn tại (hasLayer):</span>
                    <span className={`font-bold ${layerExists ? "text-emerald-500" : "text-destructive"}`}>
                        {layerExists ? "TRUE" : "FALSE"}
                    </span>
                </div>

                <div className="flex justify-between items-center bg-muted p-2 rounded text-sm">
                    <span className="text-muted-foreground">Trạng thái:</span>
                    <span className={`font-bold ${!layerExists ? "text-muted-foreground" : layerVisible ? "text-primary" : "text-amber-500"}`}>
                        {!layerExists ? "Đã Xóa" : layerVisible ? "Đang Hiện" : "Đang Ẩn"}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-2 pt-3 border-t">
                <button
                    onClick={handleToggleVisibility}
                    disabled={!layerExists}
                    className="w-full py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {layerVisible ? "Ẩn Layer (setLayerVisibility)" : "Hiện Layer (setLayerVisibility)"}
                </button>

                {layerExists ? (
                    <button
                        onClick={handleRemoveLayer}
                        className="w-full py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm font-medium rounded-md transition-colors"
                    >
                        Xóa Layer (removeLayer)
                    </button>
                ) : (
                    <button
                        onClick={handleAddLayer}
                        disabled={isProcessing}
                        className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-md transition-colors disabled:opacity-50"
                    >
                        {isProcessing ? "Đang thêm..." : "Thêm lại Layer (addGeoJSONLayer)"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default function WindifyMapEngineLayerManagementDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary break-all">Quản lý Layer</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Khám phá bộ ba phương thức thao tác trực tiếp với Layer: <code className="bg-muted px-1.5 py-0.5 rounded text-base">removeLayer</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-base">setLayerVisibility</code>, và <code className="bg-muted px-1.5 py-0.5 rounded text-base">hasLayer</code>.
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả API</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground text-base">removeLayer(id: string): void</strong>
                            <p className="mt-1 mb-2">Hủy hoàn toàn layer có định danh <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">id</code> khỏi bộ nhớ của Map Engine. Sau khi xóa, mọi tài nguyên liên quan tới layer này (DOM nodes, sự kiện) sẽ được giải phóng. Bạn luôn nên gọi hàm này trong cleanup function của <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">useEffect</code>.</p>
                        </li>
                        <li>
                            <strong className="text-foreground text-base">setLayerVisibility(id: string, visible: boolean): void</strong>
                            <p className="mt-1 mb-2">Tạm thời ẩn (false) hoặc hiển thị lại (true) layer mà không cần phải xóa đi tải lại. Hàm này cực kỳ hữu ích khi bạn làm tính năng "Bộ lọc hiển thị bản đồ" (Map Filter/Toggles). Việc ẩn/hiện diễn ra ngay lập tức vì dữ liệu vẫn còn nằm trong bộ nhớ.</p>
                        </li>
                        <li>
                            <strong className="text-foreground text-base">hasLayer(id: string): boolean</strong>
                            <p className="mt-1 mb-2">Kiểm tra xem layer có ID tương ứng đã tồn tại trong Engine hay chưa. Hàm này rất quan trọng để chặn các lỗi thao tác nhầm trên một layer chưa được add hoặc đã bị remove.</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: Control Panel</h2>
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
                    Live demo bên dưới mô phỏng một quy trình chuẩn: Kiểm tra xem Layer đã có chưa (<code className="bg-muted px-1.5 py-0.5 rounded text-sm">hasLayer</code>), cho phép người dùng bật/tắt tạm thời (<code className="bg-muted px-1.5 py-0.5 rounded text-sm">setLayerVisibility</code>), hoặc xóa hẳn khỏi bản đồ (<code className="bg-muted px-1.5 py-0.5 rounded text-sm">removeLayer</code>).
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={12}>
                                <LayerManagementLiveDemoControls />
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
