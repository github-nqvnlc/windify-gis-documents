import packageJson from "../../package.json"

export const routeConfig = {
  versions: [packageJson.dependencies?.["@vn-gis/windify-gis"]?.replace(/[\^~]/g, '') || "1.0.0"],
  navMain: [
    {
      title: "Bắt đầu",
      url: "#",
      items: [
        {
          title: "Cài đặt",
          url: "/installation",
        },
        {
          title: "Bắt đầu nhanh",
          url: "/quick-start",
        },
      ],
    },
    {
      title: "@vn-gis/windify-gis/react",
      url: "#",
      items: [
        {
          title: "<WindifyMap /> Components",
          url: "/windify-map-components",
        },
        {
          title: "<WindifyMarker /> Components",
          url: "/windify-marker-components",
        },
        {
          title: "<WindifyPopup /> Components",
          url: "/windify-popup-components",
        },
        {
          title: "<WindifyGeoJSON /> Components",
          url: "/windify-geojson-components",
        }
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "IWindifyMapEngine",
          url: "/api-reference/windify-map-engine",
        },
        {
          title: "↳ mount()",
          url: "/api-reference/windify-map-engine-mount",
        },
        {
          title: "↳ destroy()",
          url: "/api-reference/windify-map-engine-destroy",
        },
        {
          title: "↳ setCenter()",
          url: "/api-reference/windify-map-engine-set-center",
        },
        {
          title: "↳ getCenter()",
          url: "/api-reference/windify-map-engine-get-center",
        },
        {
          title: "↳ setZoom()",
          url: "/api-reference/windify-map-engine-set-zoom",
        },
        {
          title: "↳ getZoom()",
          url: "/api-reference/windify-map-engine-get-zoom",
        },
        {
          title: "↳ setBaseMap()",
          url: "/api-reference/windify-map-engine-set-base-map",
        },
        {
          title: "↳ getNativeMap()",
          url: "/api-reference/windify-map-engine-get-native-map",
        },
        {
          title: "↳ on() / off() / once()",
          url: "/api-reference/windify-map-engine-on",
        },
        {
          title: "↳ addGeoJSONLayer()",
          url: "/api-reference/windify-map-engine-add-geojson-layer",
        },
        {
          title: "↳ Quản lý Layer()",
          url: "/api-reference/windify-map-engine-layer-management",
        },
        {
          title: "↳ addMarker()",
          url: "/api-reference/windify-map-engine-add-marker",
        },
        {
          title: "↳ removeMarker()",
          url: "/api-reference/windify-map-engine-remove-marker",
        },
        {
          title: "↳ addMarkerCluster()",
          url: "/api-reference/windify-map-engine-add-marker-cluster",
        },
        {
          title: "↳ clearMarkers()",
          url: "/api-reference/windify-map-engine-clear-markers",
        },
        {
          title: "↳ addPopup()",
          url: "/api-reference/windify-map-engine-add-popup",
        },
        {
          title: "↳ removePopup()",
          url: "/api-reference/windify-map-engine-remove-popup",
        }
      ],
    },
    {
      title: "Tiện ích Không gian",
      url: "#",
      items: [
        {
          title: "↳ getGeoJSONBounds()",
          url: "/spatial-utilities/get-geojson-bounds",
        },
        {
          title: "↳ getGeoJSONExtremes()",
          url: "/spatial-utilities/get-geojson-extremes",
        },
        {
          title: "↳ getGeoJSONCenter()",
          url: "/spatial-utilities/get-geojson-center",
        },
        {
          title: "↳ extractCoordinates()",
          url: "/spatial-utilities/extract-coordinates",
        },
      ],
    }
  ],
}
