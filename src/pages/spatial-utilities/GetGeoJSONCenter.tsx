import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";
import { getGeoJSONCenter } from "@vn-gis/windify-gis/core";

const usageCode = `import { getGeoJSONCenter } from "@vn-gis/windify-gis/core";

const geojsonData = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [[[106.6, 10.7], [106.8, 10.7], [106.8, 10.9], [106.6, 10.9], [106.6, 10.7]]]
  }
};

// Tìm tâm của dữ liệu (dựa trên bounding box)
const center = getGeoJSONCenter(geojsonData);

if (center) {
  console.log("Tọa độ trung tâm:", center); // [106.7, 10.8]
}
`;

function CenterLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [centerResult, setCenterResult] = useState<string>("Đang tính toán...");

    useEffect(() => {
        if (!isReady || !engine) return;

        // Một đa giác
        const sampleGeoJSON: any = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [106.62, 10.72],
                        [106.70, 10.72],
                        [106.70, 10.78],
                        [106.62, 10.78],
                        [106.62, 10.72]
                    ]
                ]
            }
        };

        // 1. Vẽ đa giác
        engine.addGeoJSONLayer({
            id: "sample-polygon-center",
            data: sampleGeoJSON,
            style: {
                fillColor: "#f59e0b", // Amber
                fillOpacity: 0.3,
                color: "#d97706",
                weight: 2
            }
        });

        // 2. Tính toán tâm
        const center = getGeoJSONCenter(sampleGeoJSON);

        if (center) {
            setCenterResult(`[${center[0].toFixed(4)}, ${center[1].toFixed(4)}]`);

            // 3. Cắm cờ vào ngay tâm
            engine.addMarker({
                position: center as [number, number],
                element: `<div class="relative flex flex-col items-center">
                    <div class="bg-foreground text-background text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap -translate-y-full mb-1">Center</div>
                    <div class="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-md animate-pulse"></div>
                </div>`,
                title: "Tọa độ trung tâm"
            });

            // Focus camera
            engine.setCenter(center as [number, number]);
            engine.setZoom(12);
        }

        return () => {
            engine.removeLayer("sample-polygon-center");
            engine.clearMarkers();
        };
    }, [engine, isReady]);

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-2 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[220px] pointer-events-auto">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Center Calculator</h4>
                <p className="text-xs text-muted-foreground mt-1">Sử dụng getGeoJSONCenter()</p>
            </div>

            <div className="bg-muted p-2 rounded text-xs font-mono text-foreground border mt-2 break-all text-center">
                Tọa độ:<br />
                <span className="text-amber-500 font-bold text-sm">{centerResult}</span>
            </div>
        </div>
    );
}

export default function SpatialUtilsGetGeoJSONCenterDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary break-all">getGeoJSONCenter()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Hàm <code className="bg-muted px-1.5 py-0.5 rounded text-base">getGeoJSONCenter(data: GeoJSONDocument): [number, number] | null</code> dùng để lấy tọa độ trọng tâm (Center) của một đối tượng GeoJSON, đặc biệt hữu ích khi bạn muốn di chuyển Camera (Pan/FlyTo) đến giữa một khu vực.
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả Kỹ thuật</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Cơ chế hoạt động:</strong>
                            Hàm này hoạt động bằng cách gọi ngầm <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">getGeoJSONBounds()</code> để lấy hình chữ nhật bao quanh dữ liệu, sau đó tính điểm chính giữa (Trung điểm) của hình chữ nhật đó.
                        </li>
                        <li>
                            <strong className="text-foreground">Đầu ra:</strong>
                            Trả về mảng 2 phần tử <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">[Lng, Lat]</code>. Nếu dữ liệu đầu vào không hợp lệ hoặc rỗng, trả về <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">null</code>.
                        </li>
                        <li>
                            <strong className="text-foreground">Ứng dụng thực tế:</strong>
                            Dùng kết hợp với <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">engine.setCenter()</code> để tập trung sự chú ý của người dùng vào đúng khu vực vừa load trên bản đồ. Hoặc cắm một <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">Marker</code> / <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">Popup</code> đại diện chung cho toàn bộ một tỉnh/thành phố.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ</h2>
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
                    Demo bên dưới dựng một đa giác (polygon) và tự động tính toán ra tâm điểm (center). Một Marker có hiệu ứng nhấp nháy sẽ được cắm ngay tại tọa độ tâm đó.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.66, 10.75]} zoom={11}>
                                <CenterLiveDemoControls />
                            </WindifyMap>
                        </div>
                    ) : (
                        <div className="rounded-xl border shadow-sm overflow-hidden m-0">
                            <CodeBlock language="typescript" code={usageCode} />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
