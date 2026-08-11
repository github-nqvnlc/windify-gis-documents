import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const usageCode = `import { useState, useEffect } from "react";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const CenterDisplay = () => {
  const { engine, isReady } = useWindifyMap();
  const [center, setCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!isReady || !engine) return;

    // Lấy toạ độ ban đầu
    setCenter(engine.getCenter());

    // Cập nhật toạ độ mỗi khi người dùng kéo thả bản đồ xong
    const handleDragEnd = () => {
      setCenter(engine.getCenter());
    };

    engine.on("dragend", handleDragEnd);
    engine.on("zoomend", handleDragEnd);

    return () => {
      engine.off("dragend", handleDragEnd);
      engine.off("zoomend", handleDragEnd);
    };
  }, [engine, isReady]);

  if (!center) return null;

  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 999, background: "white", padding: "10px", borderRadius: "8px" }}>
      <strong>Tâm hiện tại:</strong><br />
      Kinh độ (Lng): {center[0].toFixed(5)}<br />
      Vĩ độ (Lat): {center[1].toFixed(5)}
    </div>
  );
};

export default function GetCenterDemo() {
  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={12}>
        <CenterDisplay />
      </WindifyMap>
    </div>
  );
}`;

function GetCenterLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [currentCenter, setCurrentCenter] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (!isReady || !engine) return;

        // Cập nhật giá trị khởi tạo
        setCurrentCenter(engine.getCenter());

        // Hàm xử lý khi bản đồ thay đổi vị trí/zoom
        const updateCenter = () => {
            setCurrentCenter(engine.getCenter());
        };

        // Lắng nghe các event từ engine (WindifyEngine hỗ trợ dragend, zoomend,...)
        engine.on("dragend", updateCenter);
        engine.on("zoomend", updateCenter);

        return () => {
            engine.off("dragend", updateCenter);
            engine.off("zoomend", updateCenter);
        };
    }, [engine, isReady]);

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-3 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[220px]">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Trạng thái Tọa độ</h4>
                <p className="text-xs text-muted-foreground mt-1">Dữ liệu từ engine.getCenter()</p>
            </div>
            
            <div className="flex flex-col gap-2 mt-1">
                <div className="flex justify-between items-center text-sm border-b pb-2">
                    <span className="text-muted-foreground font-medium">Kinh độ (Lng):</span>
                    <span className="font-mono text-primary font-semibold">
                        {currentCenter ? currentCenter[0].toFixed(5) : "---"}
                    </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">Vĩ độ (Lat):</span>
                    <span className="font-mono text-primary font-semibold">
                        {currentCenter ? currentCenter[1].toFixed(5) : "---"}
                    </span>
                </div>
            </div>
            
            <div className="mt-2 text-[11px] text-muted-foreground italic text-center">
                Hãy thử kéo thả (drag) hoặc zoom bản đồ để thấy giá trị cập nhật
            </div>
        </div>
    );
}

export default function WindifyMapEngineGetCenterDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary">getCenter()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded">getCenter(): [number, number]</code> dùng để truy xuất tọa độ trung tâm (center point) hiện tại của khung nhìn bản đồ, được trả về dưới định dạng <code className="bg-muted px-1.5 py-0.5 rounded text-sm">[longitude, latitude]</code> (Kinh độ, Vĩ độ).
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả API</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Dữ liệu trả về (Return Type):</strong> Một mảng Tuple gồm 2 số thực <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">[number, number]</code> tuân theo chuẩn toạ độ EPSG:4326.
                        </li>
                        <li>
                            <strong className="text-foreground">Đồng bộ chuẩn GeoJSON:</strong> Nếu bạn đã quen với API của Leaflet (thường trả về object chứa <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">lat, lng</code> hoặc mảng <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">[lat, lng]</code>), xin lưu ý Windify Engine tự động parse ngược lại thành <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">[lng, lat]</code> để thống nhất toàn bộ cấu trúc dữ liệu với GeoJSON và Turf.js.
                        </li>
                        <li>
                            <strong className="text-foreground">Tính thời gian thực:</strong> Hàm này trả về giá trị tức thời. Nếu bạn muốn theo dõi toạ độ trung tâm thay đổi khi người dùng kéo bản đồ, bạn cần kết hợp <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">getCenter()</code> với các event listener như <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">dragend</code> hoặc <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">zoomend</code>.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: HUD Tọa độ</h2>
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
                    Màn hình hiển thị tọa độ HUD (Heads-Up Display) là ứng dụng phổ biến nhất của hàm này. Trong ví dụ bên dưới, chúng ta đăng ký lắng nghe sự kiện <code className="bg-muted px-1.5 py-0.5 rounded text-sm">dragend</code> (kéo thả xong) và cập nhật UI.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={12}>
                                <GetCenterLiveDemoControls />
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
