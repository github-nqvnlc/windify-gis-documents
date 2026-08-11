import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";
import type { WindifyMapEvent } from "@vn-gis/windify-gis/core";

const usageCode = `import { useEffect, useState } from "react";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";
import type { WindifyMapEvent } from "@vn-gis/windify-gis/core";

const EventLogger = () => {
  const { engine, isReady } = useWindifyMap();
  const [lastClick, setLastClick] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!isReady || !engine) return;

    // Định nghĩa hàm lắng nghe sự kiện
    const handleMapClick = (event: WindifyMapEvent) => {
      // event.lngLat luôn trả về [Kinh độ, Vĩ độ]
      setLastClick(event.lngLat);
    };

    // Đăng ký sự kiện
    engine.on("click", handleMapClick);

    return () => {
      // Hủy sự kiện khi component unmount
      engine.off("click", handleMapClick);
    };
  }, [engine, isReady]);

  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 999, background: "white", padding: 10 }}>
      {lastClick 
        ? \`Click gần nhất: Lng \${ lastClick[0].toFixed(4)}, Lat \${ lastClick[1].toFixed(4) }\`
        : "Hãy click vào bản đồ"}
    </div>
  );
};

export default function EngineEventsDemo() {
  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={12}>
        <EventLogger />
      </WindifyMap>
    </div>
  );
}`;

function EventsLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [mousePos, setMousePos] = useState<[number, number] | null>(null);
    const [eventLog, setEventLog] = useState<{ id: number; type: string; info: string }[]>([]);

    useEffect(() => {
        if (!isReady || !engine) return;

        let logId = 0;
        const addLog = (type: string, info: string) => {
            setEventLog(prev => {
                const newLog = [{ id: logId++, type, info }, ...prev].slice(0, 5); // Giữ 5 log mới nhất
                return newLog;
            });
        };

        const handleMouseMove = (e: WindifyMapEvent) => {
            setMousePos(e.lngLat);
        };

        const handleMouseLeave = () => {
            setMousePos(null);
        };

        const handleClick = (e: WindifyMapEvent) => {
            addLog("click", `[${e.lngLat[0].toFixed(4)}, ${e.lngLat[1].toFixed(4)}]`);
        };

        const handleDblClick = (e: WindifyMapEvent) => {
            addLog("dblclick", `[${e.lngLat[0].toFixed(4)}, ${e.lngLat[1].toFixed(4)}]`);
        };

        const handleDragEnd = () => {
            addLog("dragend", "Bản đồ đã được di chuyển");
        };

        const handleZoomEnd = () => {
            addLog("zoomend", `Mức zoom mới: ${engine.getZoom().toFixed(1)}`);
        };

        // Đăng ký tất cả các sự kiện
        engine.on("mousemove", handleMouseMove);
        engine.on("mouseleave", handleMouseLeave);
        engine.on("click", handleClick);
        engine.on("dblclick", handleDblClick);
        engine.on("dragend", handleDragEnd);
        engine.on("zoomend", handleZoomEnd);

        return () => {
            engine.off("mousemove", handleMouseMove);
            engine.off("mouseleave", handleMouseLeave);
            engine.off("click", handleClick);
            engine.off("dblclick", handleDblClick);
            engine.off("dragend", handleDragEnd);
            engine.off("zoomend", handleZoomEnd);
        };
    }, [engine, isReady]);

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-3 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[280px]">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Giám sát Sự kiện (Event Monitor)</h4>
                <p className="text-xs text-muted-foreground mt-1">Lắng nghe qua engine.on()</p>
            </div>

            <div className="bg-muted p-2 rounded-md text-xs font-mono flex items-center justify-between border">
                <span className="text-muted-foreground">Tọa độ chuột:</span>
                <span className="text-primary font-semibold">
                    {mousePos ? `${mousePos[0].toFixed(4)}, ${mousePos[1].toFixed(4)}` : "Ngoài bản đồ"}
                </span>
            </div>

            <div className="flex flex-col gap-1 mt-2">
                <div className="text-xs font-semibold mb-1 uppercase tracking-wider text-muted-foreground">Nhật ký sự kiện (Log)</div>
                {eventLog.length === 0 ? (
                    <div className="text-xs text-muted-foreground italic py-2 text-center">Chưa có sự kiện nào được kích hoạt</div>
                ) : (
                    eventLog.map(log => (
                        <div key={log.id} className="text-xs p-1.5 border-b border-muted last:border-0 flex gap-2 items-start">
                            <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono font-bold uppercase text-[10px] w-[60px] text-center shrink-0">
                                {log.type}
                            </span>
                            <span className="truncate" title={log.info}>{log.info}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default function WindifyMapEngineOnDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary">on() / off() / once()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Bộ ba phương thức <code className="bg-muted px-1.5 py-0.5 rounded">on</code>, <code className="bg-muted px-1.5 py-0.5 rounded">off</code>, <code className="bg-muted px-1.5 py-0.5 rounded">once</code> là trái tim của hệ thống tương tác, giúp bạn bắt các sự kiện (events) xảy ra trên bản đồ và xử lý chúng một cách thống nhất.
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả API</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Sự kiện hỗ trợ (WindifyEventType):</strong>
                            Hệ thống cung cấp một danh sách hữu hạn các sự kiện đã được chuẩn hóa để đảm bảo chạy mượt trên cả Leaflet lẫn MapLibre. Bao gồm:
                            <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground ml-1">click</code>,
                            <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground ml-1">dblclick</code>,
                            <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground ml-1">mousemove</code>,
                            <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground ml-1">mouseleave</code>,
                            <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground ml-1">dragend</code>,
                            <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground ml-1">zoomend</code>.
                        </li>
                        <li>
                            <strong className="text-foreground">Đối tượng sự kiện (WindifyMapEvent):</strong>
                            Mỗi khi một sự kiện xảy ra, callback của bạn sẽ nhận được một đối tượng <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">WindifyMapEvent</code>. Điểm sáng giá nhất của đối tượng này là thuộc tính <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">lngLat</code> luôn trả về toạ độ điểm xảy ra sự kiện theo chuẩn <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">[Kinh độ, Vĩ độ]</code> EPSG:4326. Bạn không cần phải nhớ Leaflet trả về <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">e.latlng</code> hay Mapbox trả về <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">e.lngLat</code> nữa.
                        </li>
                        <li>
                            <strong className="text-foreground">Quản lý vòng đời (Lifecycle):</strong>
                            Trong React, nếu bạn đăng ký sự kiện bằng <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">engine.on(...)</code> trong <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">useEffect</code>, hãy <strong>luôn luôn</strong> nhớ gọi <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">engine.off(...)</code> trong hàm cleanup (return function) để tránh tình trạng memory leak và sự kiện bị kích hoạt nhiều lần (duplicate listeners).
                        </li>
                        <li>
                            <strong className="text-foreground">Sự kiện 1 lần (once):</strong>
                            Nếu bạn chỉ muốn bắt sự kiện duy nhất một lần (ví dụ: click lần đầu tiên để xác nhận vị trí lấy mẫu), hãy dùng <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">engine.once(...)</code>. Hệ thống sẽ tự động gỡ bỏ listener sau khi nó được kích hoạt lần đầu.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Cấu trúc Event */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Cấu trúc WindifyMapEvent</h2>
                <div className="mt-2 m-0 [&_pre]:my-0">
                    <CodeBlock language="typescript" code={`interface WindifyMapEvent {
  type: WindifyEventType;           // Loại sự kiện (click, dragend,...)
  lngLat: [number, number];         // [Kinh độ, Vĩ độ] nơi xảy ra sự kiện
  point?: { x: number; y: number }; // (Tuỳ chọn) Toạ độ Pixel X,Y trên màn hình
  originalEvent?: unknown;          // Sự kiện gốc của DOM (MouseEvent, TouchEvent)
  target?: unknown;                 // Đối tượng sinh ra sự kiện bên trong Map Core
}`} />
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: Giám sát sự kiện</h2>
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
                    Bảng điều khiển dưới đây đăng ký lắng nghe <strong>toàn bộ</strong> các sự kiện mà Windify hỗ trợ. Hãy thử rê chuột (mousemove), click chuột (click, dblclick), hoặc cuộn chuột (zoomend) để xem sự kiện được bắt và chuẩn hoá như thế nào nhé.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
                                <EventsLiveDemoControls />
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
