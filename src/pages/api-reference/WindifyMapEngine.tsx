import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

function EngineDemoControls() {
    const { engine, isReady } = useWindifyMap();
    
    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-2 bg-background/90 p-3 rounded-lg shadow-md border backdrop-blur-sm">
            <h4 className="text-sm font-semibold mb-1">Engine Controls</h4>
            <button 
                className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-sm transition-colors"
                onClick={() => {
                    if (isReady && engine) {
                        engine.setCenter([106.660172, 10.762622]); // TP.HCM
                        engine.setZoom(13);
                    }
                }}
            >
                Bay đến TP.HCM
            </button>
            <button 
                className="px-3 py-1.5 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-md text-sm transition-colors"
                onClick={() => {
                    if (isReady && engine) {
                        engine.setCenter([108.2022, 16.0544]); // Đà Nẵng
                        engine.setZoom(12);
                    }
                }}
            >
                Bay đến Đà Nẵng
            </button>
            <button 
                className="px-3 py-1.5 bg-accent hover:bg-accent/90 text-accent-foreground rounded-md text-sm transition-colors"
                onClick={() => {
                    if (isReady && engine) {
                        engine.addMarker({
                            id: 'test-marker-' + Date.now(),
                            position: engine.getCenter(),
                            title: 'Marker được tạo bằng API'
                        });
                    }
                }}
            >
                Thêm Marker ở tâm
            </button>
            <button 
                className="px-3 py-1.5 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md text-sm transition-colors"
                onClick={() => {
                    if (isReady && engine) {
                        engine.clearMarkers();
                    }
                }}
            >
                Xóa tất cả Marker
            </button>
        </div>
    );
}

const usageCode = `import { WindifyMap, useWindifyMap } from '@vn-gis/windify-gis/react';

// Tạo một component con nằm trong WindifyMap
const MapController = () => {
  // Lấy engine ra thông qua Hook
  const { engine, isReady } = useWindifyMap();

  return (
    <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 999, background: 'white', padding: 10 }}>
      <button onClick={() => engine?.setCenter([106.660172, 10.762622])}>
        Đến TP.HCM
      </button>
      <button onClick={() => engine?.addMarker({ id: 'm1', position: engine.getCenter() })}>
        Thêm Marker
      </button>
    </div>
  );
};

export default function EngineDemo() {
  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      <WindifyMap center={[105.8342, 21.0278]} zoom={10}>
         <MapController />
      </WindifyMap>
    </div>
  );
}`;

export default function WindifyMapEngineDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary">IWindifyMapEngine</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Interface chuẩn hoá đại diện cho các phương thức điều khiển bản đồ ở cấp độ thấp (low-level). Thay vì tương tác trực tiếp với API của <code className="bg-muted px-1.5 py-0.5 rounded text-sm">Leaflet</code> hay <code className="bg-muted px-1.5 py-0.5 rounded text-sm">MapLibre</code>, bạn gọi qua các phương thức của engine này. Điều này giúp code của bạn hoạt động độc lập với core bản đồ bên dưới.
                </p>
            </div>

            {/* Methods Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Danh sách phương thức</h2>
                <div className="overflow-x-auto rounded-md border">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 border-b font-medium whitespace-nowrap">Method</th>
                                <th className="px-4 py-3 border-b font-medium">Mô tả</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">mount(container?: string | HTMLElement)</td>
                                <td className="px-4 py-3">Gắn bản đồ vào DOM. Thường được gọi nội bộ bởi core, ít khi gọi trực tiếp từ user land.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">destroy()</td>
                                <td className="px-4 py-3">Hủy instance bản đồ và giải phóng toàn bộ tài nguyên.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">setCenter(center: [number, number])</td>
                                <td className="px-4 py-3">Di chuyển bản đồ đến tọa độ mới EPSG:4326 theo chuẩn <code className="bg-muted px-1 py-0.5 rounded text-xs">[longitude, latitude]</code>.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">getCenter()</td>
                                <td className="px-4 py-3">Lấy tọa độ trung tâm hiện tại, trả về mảng <code className="bg-muted px-1 py-0.5 rounded text-xs">[lng, lat]</code>.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">setZoom(zoom: number)</td>
                                <td className="px-4 py-3">Đặt mức thu phóng (zoom) hiện hành.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">getZoom()</td>
                                <td className="px-4 py-3">Lấy mức thu phóng (zoom) hiện tại.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">setBaseMap(options)</td>
                                <td className="px-4 py-3">Thay đổi base map layer (chuyển đổi qua lại giữa các bản đồ nền).</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">getNativeMap()</td>
                                <td className="px-4 py-3">Lấy instance của map engine gốc (ví dụ: đối tượng <code className="bg-muted px-1 py-0.5 rounded text-xs">L.Map</code> hoặc <code className="bg-muted px-1 py-0.5 rounded text-xs">maplibregl.Map</code>). Cực kỳ hữu dụng khi bạn cần một tính năng native mà engine interface chưa cover.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">on / off / once</td>
                                <td className="px-4 py-3">Lắng nghe, hủy hoặc lắng nghe 1 lần sự kiện bản đồ. Hỗ trợ <code className="bg-muted px-1 py-0.5 rounded text-xs">click, dblclick, mousemove, mouseleave, dragend, zoomend</code>.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">addGeoJSONLayer(options) / removeLayer(id)</td>
                                <td className="px-4 py-3">Thêm mới hoặc xóa bỏ GeoJSON Layer dựa theo ID.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">addMarker(options) / removeMarker(id) / clearMarkers()</td>
                                <td className="px-4 py-3">Quản lý Marker thông qua API thay vì thông qua declarative component của React.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">addPopup(options) / removePopup(id)</td>
                                <td className="px-4 py-3">Thêm/Xoá Popup. Popup có thể ở độc lập trên bản đồ hoặc attach vào marker.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Sử dụng qua React Hook</h2>
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
                    Bạn có thể lấy đối tượng <code className="bg-muted px-1.5 py-0.5 rounded text-sm">engine</code> thông qua custom hook <code className="bg-muted px-1.5 py-0.5 rounded text-sm">useWindifyMap()</code> trong bất kỳ component con nào được đặt bên trong <code className="bg-muted px-1.5 py-0.5 rounded text-sm">&lt;WindifyMap&gt;</code>. Hãy lưu ý kiểm tra cờ <code className="bg-muted px-1.5 py-0.5 rounded text-sm">isReady</code> trước khi gọi API để đảm bảo bản đồ đã thực sự được nạp.
                </p>
                <div className="mt-4 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                    {showDemo ? (
                        <div className="w-full h-[500px] relative z-0">
                            <WindifyMap center={[105.8342, 21.0278]} zoom={10}>
                                <EngineDemoControls />
                            </WindifyMap>
                        </div>
                    ) : (
                        <div className="m-0 border-0 rounded-none shadow-none">
                            <CodeBlock language="tsx" code={usageCode} />
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 p-4 rounded-lg border-l-4 border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-200">
                <h3 className="font-semibold flex items-center gap-2 mb-2">⚠️ React Declarative vs API Imperative</h3>
                <p className="text-sm leading-6">
                    Trong ứng dụng React, bạn nên ưu tiên sử dụng các component như <code className="bg-black/10 dark:bg-white/20 px-1.5 py-0.5 rounded">&lt;WindifyMarker&gt;</code> để bản đồ tự động đồng bộ hoá trạng thái. Tránh trộn lẫn việc tạo marker bằng code thông qua Engine API với các marker bằng component trừ khi có những nhu cầu rất đặc thù (như xử lý logic hàng chục ngàn điểm để vượt giới hạn của Virtual DOM).
                </p>
            </div>

        </div>
    );
}
