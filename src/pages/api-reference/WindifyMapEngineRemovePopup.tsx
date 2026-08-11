import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const usageCode = `import { useState, useEffect } from "react";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const RemovePopupDemo = () => {
  const { engine, isReady } = useWindifyMap();
  const [popupId, setPopupId] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady || !engine) return;

    // 1. Mở một Popup và lưu lại ID
    const myPopupId = "welcome-popup";
    
    engine.addPopup({
      id: myPopupId,
      position: [106.660172, 10.762622],
      content: "<h3 style='padding:10px;'>Thông báo quan trọng!</h3>",
      onClose: () => {
        // Cập nhật state nếu người dùng tự bấm dấu X đóng
        setPopupId(null);
      }
    });

    setPopupId(myPopupId);

    return () => {
      // Dọn dẹp
      engine.removePopup(myPopupId);
    };
  }, [engine, isReady]);

  const handleForceClose = () => {
    if (isReady && engine && popupId) {
      // 2. Dùng code để đóng Popup theo ID
      engine.removePopup(popupId);
      setPopupId(null);
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 999, background: "white", padding: 10 }}>
      {popupId ? (
        <button onClick={handleForceClose}>Đóng Popup bằng Code</button>
      ) : (
        <span>Popup đã bị đóng!</span>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={14}>
        <RemovePopupDemo />
      </WindifyMap>
    </div>
  );
}`;

function RemovePopupLiveDemoControls() {
    const { engine } = useWindifyMap();
    const [activePopups, setActivePopups] = useState<{ id: string, title: string }[]>([]);

    // Hàm tạo 1 popup ngẫu nhiên
    const spawnRandomPopup = () => {
        if (!engine) return;

        const randomId = `popup-${Date.now()}`;
        const randomTitle = `Báo cáo #${Math.floor(Math.random() * 1000)}`;

        engine.addPopup({
            id: randomId,
            position: [
                106.660172 + (Math.random() - 0.5) * 0.05,
                10.762622 + (Math.random() - 0.5) * 0.05
            ],
            content: `<div class="p-2 font-semibold text-primary">${randomTitle}</div>`,
            onClose: () => {
                // Xóa khỏi danh sách UI nếu bị đóng (do bấm X hoặc do click ra ngoài)
                setActivePopups(prev => prev.filter(p => p.id !== randomId));
            }
        });

        setActivePopups(prev => [...prev, { id: randomId, title: randomTitle }]);
    };

    const handleRemovePopup = (idToRemove: string) => {
        if (!engine) return;

        // Gọi API xóa Popup
        engine.removePopup(idToRemove);

        // State `activePopups` sẽ được tự động cập nhật thông qua hàm onClose 
        // Nhưng nếu muốn phản hồi UI tức thì, ta có thể setState ngay tại đây:
        setActivePopups(prev => prev.filter(p => p.id !== idToRemove));
    };

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-3 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[260px] pointer-events-auto">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Gỡ bỏ Popup</h4>
                <p className="text-xs text-muted-foreground mt-1">Sử dụng engine.removePopup(id)</p>
            </div>

            <button
                onClick={spawnRandomPopup}
                className="w-full py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-md hover:bg-primary/90 transition-colors"
            >
                + Bắn 1 Popup ngẫu nhiên
            </button>

            <div className="flex flex-col gap-2 mt-2">
                {activePopups.length === 0 ? (
                    <div className="text-xs text-muted-foreground text-center py-4 bg-muted/50 rounded border border-dashed">
                        Không có Popup nào đang mở.
                    </div>
                ) : (
                    activePopups.map(p => (
                        <div key={p.id} className="flex items-center justify-between bg-muted p-2 rounded-md">
                            <span className="text-sm font-medium">{p.title}</span>
                            <button
                                onClick={() => handleRemovePopup(p.id)}
                                className="px-3 py-1 bg-destructive/10 text-destructive hover:bg-destructive hover:text-primary-foreground rounded text-xs transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default function WindifyMapEngineRemovePopupDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary break-all">removePopup()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded text-base">removePopup(id: string): void</code> được sử dụng để chủ động đóng và tiêu hủy một Popup bằng mã nguồn (code) thông qua định danh của nó.
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả API</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Giải phóng tài nguyên Native:</strong>
                            Khi bạn gọi <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">removePopup(id)</code>, Windify không chỉ làm ẩn cái bong bóng đi, mà nó còn tìm thẳng vào lõi (Leaflet/Mapbox) để giải phóng mọi liên kết (unbind), xóa bỏ thẻ div chứa nội dung HTML khỏi DOM và gỡ toàn bộ sự kiện liên quan.
                        </li>
                        <li>
                            <strong className="text-foreground">Kích hoạt luồng sự kiện onClose:</strong>
                            Dù Popup bị tắt do người dùng nhấn nút [X], hay do bạn gọi hàm <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">removePopup</code> bằng code, thì hàm callback <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">onClose</code> (mà bạn truyền vào lúc <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">addPopup</code>) đều sẽ được kích hoạt. Điều này đảm bảo trạng thái ứng dụng React của bạn luôn đồng bộ hoàn hảo với bản đồ.
                        </li>
                        <li>
                            <strong className="text-foreground">An toàn khi gọi trùng (Idempotent):</strong>
                            Tương tự như <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">removeMarker</code>, việc bạn truyền vào một ID không tồn tại hoặc gọi xóa 2 lần trên cùng 1 ID sẽ không gây ra lỗi Crash (Silent fail).
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: Đóng Popup từ xa</h2>
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
                    Bạn hãy dùng nút <strong>Bắn 1 Popup ngẫu nhiên</strong> để tạo ra các bóng thoại mới trên bản đồ. Các bong bóng này sẽ được lưu danh sách vào bảng điều khiển. Bấm nút <strong>Đóng</strong> ở bảng điều khiển sẽ dùng hàm <code className="bg-muted px-1.5 py-0.5 rounded text-sm">removePopup</code> tiêu diệt chính xác bong bóng đó.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
                                <RemovePopupLiveDemoControls />
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
