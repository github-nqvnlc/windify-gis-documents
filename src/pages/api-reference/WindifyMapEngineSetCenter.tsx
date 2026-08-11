import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const usageCode = `import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const MapControls = () => {
  const { engine, isReady } = useWindifyMap();

  const handleFlyToDaNang = () => {
    if (isReady && engine) {
      // Gọi setCenter để chuyển tâm bản đồ tới Đà Nẵng
      // Định dạng toạ độ: [kinh độ, vĩ độ]
      engine.setCenter([108.2022, 16.0544]);
      engine.setZoom(12);
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 999 }}>
      <button onClick={handleFlyToDaNang} style={{ padding: "8px 16px" }}>
        Bay đến Đà Nẵng
      </button>
    </div>
  );
};

export default function SetCenterDemo() {
  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      {/* Tâm bản đồ ban đầu (TP.HCM) */}
      <WindifyMap center={[106.660172, 10.762622]} zoom={12}>
        <MapControls />
      </WindifyMap>
    </div>
  );
}`;

function SetCenterLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [currentCenter, setCurrentCenter] = useState<string>("106.660172, 10.762622");

    // Lắng nghe sự kiện để cập nhật UI khi người dùng tự kéo thả bản đồ
    // (Trong thực tế bạn có thể dùng engine.on('dragend', ...))
    
    const flyTo = (lng: number, lat: number, name: string) => {
        if (!isReady || !engine) return;
        
        // Cập nhật tâm bản đồ
        engine.setCenter([lng, lat]);
        // Tùy chọn: Set lại mức zoom cho phù hợp với chế độ xem thành phố
        engine.setZoom(13);
        
        setCurrentCenter(`${lng}, ${lat} (${name})`);
    };

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-3 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[250px]">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Điều hướng bản đồ</h4>
                <p className="text-xs text-muted-foreground mt-1">Sử dụng engine.setCenter()</p>
            </div>
            
            <div className="flex flex-col gap-2">
                <button 
                    onClick={() => flyTo(105.8342, 21.0278, "Hà Nội")}
                    className="px-3 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium rounded-md transition-colors text-left flex items-center justify-between"
                >
                    Thủ đô Hà Nội
                    <span className="text-xs opacity-60">21.0°N</span>
                </button>
                <button 
                    onClick={() => flyTo(108.2022, 16.0544, "Đà Nẵng")}
                    className="px-3 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium rounded-md transition-colors text-left flex items-center justify-between"
                >
                    TP. Đà Nẵng
                    <span className="text-xs opacity-60">16.0°N</span>
                </button>
                <button 
                    onClick={() => flyTo(106.660172, 10.762622, "Hồ Chí Minh")}
                    className="px-3 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium rounded-md transition-colors text-left flex items-center justify-between"
                >
                    TP. Hồ Chí Minh
                    <span className="text-xs opacity-60">10.7°N</span>
                </button>
            </div>

            <div className="pt-3 border-t mt-1">
                <div className="text-[11px] uppercase font-semibold text-muted-foreground mb-1">Tâm hiện tại (State):</div>
                <div className="text-xs font-mono bg-muted p-1.5 rounded">{currentCenter}</div>
            </div>
        </div>
    );
}

export default function WindifyMapEngineSetCenterDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary">setCenter()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded">setCenter(center: [number, number]): void</code> dùng để di chuyển màn hình bản đồ đến một tọa độ địa lý mới một cách lập trình (programmatically).
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả API</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Định dạng tọa độ:</strong> Tọa độ đầu vào luôn tuân theo chuẩn EPSG:4326 của GeoJSON, nghĩa là một mảng gồm 2 phần tử <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">[Kinh độ (Longitude), Vĩ độ (Latitude)]</code>. 
                            <br/><em className="text-sm">Lưu ý: Leaflet mặc định dùng [Vĩ độ, Kinh độ], nhưng Windify Engine đã chuẩn hoá ngược lại thành [Kinh độ, Vĩ độ] để đồng nhất với GeoJSON và MapLibre.</em>
                        </li>
                        <li>
                            <strong className="text-foreground">Hiệu ứng chuyển cảnh (Animation):</strong> Việc thực thi method này có thể kích hoạt hiệu ứng "bay" (flyTo) mượt mà đến vị trí mới nếu khoảng cách không quá xa (tuỳ thuộc vào thiết lập của underlying core là Leaflet hay MapLibre).
                        </li>
                        <li>
                            <strong className="text-foreground">Sử dụng trong React:</strong> Thường được gọi thông qua sự kiện thao tác của người dùng (như click vào danh sách cửa hàng bên ngoài bản đồ) bằng cách lấy instance từ hook <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">useWindifyMap()</code>.
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
                
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            {/* Khởi tạo bản đồ ở TP.HCM */}
                            <WindifyMap center={[106.660172, 10.762622]} zoom={12}>
                                <SetCenterLiveDemoControls />
                            </WindifyMap>
                        </div>
                    ) : (
                        <div className="rounded-xl border shadow-sm overflow-hidden m-0">
                            <CodeBlock language="tsx" code={usageCode} />
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 p-4 rounded-lg border-l-4 border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-200">
                <h3 className="font-semibold flex items-center gap-2 mb-2">💡 Khác biệt giữa <code className="bg-black/10 dark:bg-white/20 px-1 py-0.5 rounded text-sm">engine.setCenter()</code> và truyền prop <code className="bg-black/10 dark:bg-white/20 px-1 py-0.5 rounded text-sm">center</code></h3>
                <p className="text-sm leading-6">
                    Trong ứng dụng React, nếu bạn thay đổi giá trị của prop <code className="bg-black/10 dark:bg-white/20 px-1 py-0.5 rounded text-sm">center</code> trên component <code className="bg-black/10 dark:bg-white/20 px-1 py-0.5 rounded text-sm">&lt;WindifyMap&gt;</code>, component này sẽ tự động gọi <code className="bg-black/10 dark:bg-white/20 px-1 py-0.5 rounded text-sm">engine.setCenter()</code> ngầm bên dưới cho bạn. <br/>
                    Tuy nhiên, nếu bạn muốn điều khiển bản đồ từ một component con (Child Component) mà không muốn truyền state ngược lên (lifting state up) gây render lại toàn bộ trang, việc xài hook <code className="bg-black/10 dark:bg-white/20 px-1 py-0.5 rounded text-sm">useWindifyMap()</code> và gọi trực tiếp <code className="bg-black/10 dark:bg-white/20 px-1 py-0.5 rounded text-sm">engine.setCenter()</code> sẽ cho hiệu năng tối ưu nhất.
                </p>
            </div>

        </div>
    );
}
