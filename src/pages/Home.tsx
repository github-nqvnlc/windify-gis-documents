export default function Home() {
  return (
    <div className="mx-auto space-y-10 py-6">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          Giới thiệu Windify GIS
        </h1>
        <p className="text-xl text-muted-foreground leading-8">
          <strong>Windify GIS</strong> là một package bản đồ GIS hiệu năng cao, cung cấp API tương tác trực tiếp với lõi <strong>Leaflet</strong>. Package này đi kèm với một React wrapper hiện đại, tuân thủ kiến trúc Declarative, giúp việc phát triển các ứng dụng bản đồ trở nên nhanh chóng, dễ bảo trì và thân thiện với Developer.
        </p>
      </div>

      {/* Features Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
          🌟 Tính năng nổi bật
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div className="p-5 rounded-xl bg-muted/50 border border-muted hover:border-primary/50 transition-colors">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              ⚡ Tải động (Dynamic Loading)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Engine bản đồ được tải bất đồng bộ theo nhu cầu (lazy-load), giúp tối ưu hóa kích thước bundle và hỗ trợ tree-shaking triệt để cho ứng dụng của bạn.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-muted/50 border border-muted hover:border-primary/50 transition-colors">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              🎯 Chuẩn hóa Sự kiện
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cung cấp API sự kiện đồng nhất (<code className="bg-background px-1 rounded">on</code>, <code className="bg-background px-1 rounded">off</code>, <code className="bg-background px-1 rounded">once</code>) với tọa độ trả về luôn tuân theo chuẩn EPSG:4326 <code className="bg-background px-1 rounded">[longitude, latitude]</code> thay vì bị ngược như bản gốc.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-muted/50 border border-muted hover:border-primary/50 transition-colors">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              🗺 Quản lý GeoJSON & Layer
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hỗ trợ nạp, xóa, ẩn, hiện các lớp GeoJSON từ inline object hoặc remote URL dễ dàng. Đặc biệt mạnh mẽ với Data-Driven Styling thông qua callbacks.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-muted/50 border border-muted hover:border-primary/50 transition-colors">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              📍 Marker & Gom Cụm Điểm
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cho phép render Marker tùy chỉnh bằng HTML/SVG dễ dàng. Tích hợp sẵn cơ chế Gom cụm điểm (Clustering) tự động, hiệu năng cao cho tập dữ liệu lớn.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-muted/50 border border-muted hover:border-primary/50 transition-colors">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              ⚛️ React Components Thống Nhất
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cung cấp các thẻ <code className="bg-background px-1 rounded">&lt;WindifyMap /&gt;</code>, <code className="bg-background px-1 rounded">&lt;WindifyMarker /&gt;</code>, <code className="bg-background px-1 rounded">&lt;WindifyGeoJSON /&gt;</code> và <code className="bg-background px-1 rounded">&lt;WindifyPopup /&gt;</code> để xây dựng bản đồ chuẩn Declarative JSX.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-muted/50 border border-muted hover:border-primary/50 transition-colors">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              🛡 TypeScript First
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mọi Interface, Props và Events đều được định kiểu (typed) cực kỳ khắt khe, mang lại sự an toàn tuyệt đối và trải nghiệm code tuyệt vời trên IDE.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
