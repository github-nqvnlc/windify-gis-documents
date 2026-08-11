import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Installation from "./pages/getting-started/Installation"

import Home from "./pages/Home"
import QuickStart from "./pages/getting-started/QuickStart"
import WindifyMapDoc from "./pages/vn-gis-windify-gis-react/WindifyMap"
import WindifyMarkerDoc from "./pages/vn-gis-windify-gis-react/WindifyMarker"
import WindifyPopupDoc from "./pages/vn-gis-windify-gis-react/WindifyPopup"
import WindifyGeoJSONDoc from "./pages/vn-gis-windify-gis-react/WindifyGeoJSON"
import WindifyMapEngineDoc from "./pages/api-reference/WindifyMapEngine"
import WindifyMapEngineMountDoc from "./pages/api-reference/WindifyMapEngineMount"
import WindifyMapEngineDestroyDoc from "./pages/api-reference/WindifyMapEngineDestroy"
import WindifyMapEngineSetCenterDoc from "./pages/api-reference/WindifyMapEngineSetCenter"
import WindifyMapEngineGetCenterDoc from "./pages/api-reference/WindifyMapEngineGetCenter"
import WindifyMapEngineSetZoomDoc from "./pages/api-reference/WindifyMapEngineSetZoom"
import WindifyMapEngineGetZoomDoc from "./pages/api-reference/WindifyMapEngineGetZoom"
import WindifyMapEngineSetBaseMapDoc from "./pages/api-reference/WindifyMapEngineSetBaseMap"
import WindifyMapEngineGetNativeMapDoc from "./pages/api-reference/WindifyMapEngineGetNativeMap"
import WindifyMapEngineOnDoc from "./pages/api-reference/WindifyMapEngineOn"
import WindifyMapEngineAddGeoJSONDoc from "./pages/api-reference/WindifyMapEngineAddGeoJSONLayer"
import WindifyMapEngineLayerManagementDoc from "./pages/api-reference/WindifyMapEngineLayerManagement"
import WindifyMapEngineAddMarkerDoc from "./pages/api-reference/WindifyMapEngineAddMarker"
import WindifyMapEngineRemoveMarkerDoc from "./pages/api-reference/WindifyMapEngineRemoveMarker"
import WindifyMapEngineAddMarkerClusterDoc from "./pages/api-reference/WindifyMapEngineAddMarkerCluster"
import WindifyMapEngineClearMarkersDoc from "./pages/api-reference/WindifyMapEngineClearMarkers"
import WindifyMapEngineAddPopupDoc from "./pages/api-reference/WindifyMapEngineAddPopup"
import WindifyMapEngineRemovePopupDoc from "./pages/api-reference/WindifyMapEngineRemovePopup"
import SpatialUtilsGetGeoJSONBoundsDoc from "./pages/spatial-utilities/GetGeoJSONBounds"
import SpatialUtilsGetGeoJSONExtremesDoc from "./pages/spatial-utilities/GetGeoJSONExtremes"
import SpatialUtilsGetGeoJSONCenterDoc from "./pages/spatial-utilities/GetGeoJSONCenter"
import SpatialUtilsExtractCoordinatesDoc from "./pages/spatial-utilities/ExtractCoordinates"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/quick-start" element={<QuickStart />} />
          <Route path="/windify-map-components" element={<WindifyMapDoc />} />
          <Route path="/windify-marker-components" element={<WindifyMarkerDoc />} />
          <Route path="/windify-popup-components" element={<WindifyPopupDoc />} />
          <Route path="/windify-geojson-components" element={<WindifyGeoJSONDoc />} />
          <Route path="/api-reference/windify-map-engine" element={<WindifyMapEngineDoc />} />
          <Route path="/api-reference/windify-map-engine-mount" element={<WindifyMapEngineMountDoc />} />
          <Route path="/api-reference/windify-map-engine-destroy" element={<WindifyMapEngineDestroyDoc />} />
          <Route path="/api-reference/windify-map-engine-set-center" element={<WindifyMapEngineSetCenterDoc />} />
          <Route path="/api-reference/windify-map-engine-get-center" element={<WindifyMapEngineGetCenterDoc />} />
          <Route path="/api-reference/windify-map-engine-set-zoom" element={<WindifyMapEngineSetZoomDoc />} />
          <Route path="/api-reference/windify-map-engine-get-zoom" element={<WindifyMapEngineGetZoomDoc />} />
          <Route path="/api-reference/windify-map-engine-set-base-map" element={<WindifyMapEngineSetBaseMapDoc />} />
          <Route path="/api-reference/windify-map-engine-get-native-map" element={<WindifyMapEngineGetNativeMapDoc />} />
          <Route path="/api-reference/windify-map-engine-on" element={<WindifyMapEngineOnDoc />} />
          <Route path="/api-reference/windify-map-engine-add-geojson-layer" element={<WindifyMapEngineAddGeoJSONDoc />} />
          <Route path="/api-reference/windify-map-engine-layer-management" element={<WindifyMapEngineLayerManagementDoc />} />
          <Route path="/api-reference/windify-map-engine-add-marker" element={<WindifyMapEngineAddMarkerDoc />} />
          <Route path="/api-reference/windify-map-engine-remove-marker" element={<WindifyMapEngineRemoveMarkerDoc />} />
          <Route path="/api-reference/windify-map-engine-add-marker-cluster" element={<WindifyMapEngineAddMarkerClusterDoc />} />
          <Route path="/api-reference/windify-map-engine-clear-markers" element={<WindifyMapEngineClearMarkersDoc />} />
          <Route path="/api-reference/windify-map-engine-add-popup" element={<WindifyMapEngineAddPopupDoc />} />
          <Route path="/api-reference/windify-map-engine-remove-popup" element={<WindifyMapEngineRemovePopupDoc />} />
          <Route path="/spatial-utilities/get-geojson-bounds" element={<SpatialUtilsGetGeoJSONBoundsDoc />} />
          <Route path="/spatial-utilities/get-geojson-extremes" element={<SpatialUtilsGetGeoJSONExtremesDoc />} />
          <Route path="/spatial-utilities/get-geojson-center" element={<SpatialUtilsGetGeoJSONCenterDoc />} />
          <Route path="/spatial-utilities/extract-coordinates" element={<SpatialUtilsExtractCoordinatesDoc />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
