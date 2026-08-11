import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";
import { getGeoJSONExtremes } from "@vn-gis/windify-gis/core";

const usageCode = `import { getGeoJSONExtremes } from "@vn-gis/windify-gis/core";

const geojsonData = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [[[106.6, 10.7], [106.7, 10.7], [106.65, 10.9], [106.6, 10.7]]]
  }
};

// Tìm 4 điểm cực của dữ liệu
const extremes = getGeoJSONExtremes(geojsonData);

if (extremes) {
  console.log("Cực Bắc (North):", extremes.north); // [106.65, 10.9]
  console.log("Cực Nam (South):", extremes.south); // [106.6, 10.7] (Hoặc điểm tương đương nằm dưới cùng)
  console.log("Cực Đông (East):", extremes.east);   // [106.7, 10.7]
  console.log("Cực Tây (West):", extremes.west);   // [106.6, 10.7]
}
`;

function ExtremesLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [resultMsg, setResultMsg] = useState<string>("Đang tính toán...");

    useEffect(() => {
        if (!isReady || !engine) return;

        // Một đa giác hình thoi không đều
        const sampleGeoJSON: any = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [106.65, 10.80], // Điểm nhô cao nhất (Bắc)
                        [106.70, 10.75], // Điểm vươn xa nhất (Đông)
                        [106.66, 10.70], // Điểm thấp nhất (Nam)
                        [106.60, 10.73], // Điểm thụt nhất (Tây)
                        [106.65, 10.80]
                    ]
                ]
            }
        };

        // 1. Vẽ đa giác
        engine.addGeoJSONLayer({
            id: "sample-polygon-extremes",
            data: sampleGeoJSON,
            style: {
                fillColor: "#10b981", // Emerald
                fillOpacity: 0.25,
                color: "#059669",
                weight: 2
            }
        });

        // 2. Tính toán 4 điểm cực
        const extremes = getGeoJSONExtremes(sampleGeoJSON);

        if (extremes) {
            setResultMsg("Đã tìm thấy 4 điểm cực đại");
            const createPointHtml = (label: string, colorClass: string) =>
                `<div class="relative flex flex-col items-center">
                    <div class="${colorClass} text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap -translate-y-full mb-1">${label}</div>
                    <div class="w-3 h-3 ${colorClass} rounded-full border border-white shadow-md"></div>
                </div>`;

            // 3. Đánh dấu 4 điểm này bằng Marker
            engine.addMarker({
                position: extremes.north as [number, number],
                element: createPointHtml("North (Bắc)", "bg-blue-500"),
                title: "Điểm Cực Bắc"
            });
            engine.addMarker({
                position: extremes.south as [number, number],
                element: createPointHtml("South (Nam)", "bg-rose-500"),
                title: "Điểm Cực Nam"
            });
            engine.addMarker({
                position: extremes.east as [number, number],
                element: createPointHtml("East (Đông)", "bg-amber-500"),
                title: "Điểm Cực Đông"
            });
            engine.addMarker({
                position: extremes.west as [number, number],
                element: createPointHtml("West (Tây)", "bg-purple-500"),
                title: "Điểm Cực Tây"
            });

            // Focus camera
            engine.setCenter([106.65, 10.75]);
            engine.setZoom(12);
        }

        return () => {
            engine.removeLayer("sample-polygon-extremes");
            engine.clearMarkers();
        };
    }, [engine, isReady]);

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-2 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[220px] pointer-events-auto">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Extremes Finder</h4>
                <p className="text-xs text-muted-foreground mt-1">Sử dụng getGeoJSONExtremes()</p>
            </div>

            <div className="bg-muted p-2 rounded text-xs font-mono text-foreground border mt-2 break-all">
                Trạng thái: <span className="font-bold">{resultMsg}</span>
            </div>

            <div className="text-[11px] text-muted-foreground mt-2 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Cực Bắc</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Cực Đông</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Cực Tây</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"></div> Cực Nam</div>
            </div>
        </div>
    );
}

export default function SpatialUtilsGetGeoJSONExtremesDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary break-all">getGeoJSONExtremes()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Hàm <code className="bg-muted px-1.5 py-0.5 rounded text-base">getGeoJSONExtremes(data: GeoJSONDocument): GeoJSONExtremes | null</code> dùng để trích xuất ra 4 tọa độ nằm ở vị trí rìa xa nhất (Bắc, Nam, Đông, Tây) của một tập hợp dữ liệu không gian.
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả Kỹ thuật</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Tham số đầu vào:</strong>
                            Nhận vào một đối tượng GeoJSON bất kỳ (chứa LineString, Polygon, MultiPolygon...).
                        </li>
                        <li>
                            <strong className="text-foreground">Đầu ra:</strong>
                            Trả về một Object chứa 4 điểm cực hoặc <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">null</code> nếu dữ liệu rỗng.
                            <br />
                            Cấu trúc trả về: <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">{`{ north: [lng, lat], south: [lng, lat], east: [lng, lat], west: [lng, lat] }`}</code>.
                        </li>
                        <li>
                            <strong className="text-foreground">Phân biệt với getGeoJSONBounds:</strong>
                            Trong khi <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">Bounds</code> trả về một "Khung chữ nhật" ảo có thể không chứa bất kỳ điểm dữ liệu thật nào ở các góc, thì <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">Extremes</code> luôn luôn trả về <strong>tọa độ chính xác</strong> của các đỉnh/nút thực tế nằm ở rìa ngoài cùng.
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
                    Demo bên dưới quét qua một đa giác không đều, tìm ra 4 đỉnh vươn xa nhất về 4 hướng địa lý và gắn các nhãn dán tương ứng lên đỉnh đó.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.65, 10.75]} zoom={11}>
                                <ExtremesLiveDemoControls />
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
