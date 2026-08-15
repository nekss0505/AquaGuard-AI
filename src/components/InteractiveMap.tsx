import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { Community } from "../types";
import {
  Search,
  ArrowRight,
  Droplets,
  CloudRain,
  Sun,
  CloudLightning,
  Wind,
  Thermometer,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Compass,
  Sparkles,
  Info,
  CheckCircle2,
  Volume2,
  Layers,
  MapPin,
  Navigation,
  Bookmark,
  Share2,
  AlertTriangle,
  Flame,
  Maximize2,
  Minimize2,
  Crosshair,
  SlidersHorizontal,
  ChevronRight,
  Activity,
  ShieldCheck,
  Eye,
  X,
} from "lucide-react";
import L from "leaflet";
import {
  formatISTDateTime,
  formatISTTime24,
  getCurrentISTClock,
} from "../utils/timeUtils";

type MapLayerType = "roadmap" | "satellite" | "terrain";

export const InteractiveMap: React.FC = () => {
  const {
    communities,
    selectedCommunity,
    setSelectedCommunityId,
    setPage,
    runEarlyWarningAnalysis,
    speakText,
    showToast,
    t,
  } = useApp();

  // Google Maps Layer & View states
  const [mapLayer, setMapLayer] = useState<MapLayerType>("roadmap");
  const [showLayerMenu, setShowLayerMenu] = useState<boolean>(false);
  const [showTrafficOverlay, setShowTrafficOverlay] = useState<boolean>(true);
  const [showRiverBasins, setShowRiverBasins] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterLevel, setFilterLevel] = useState<string>("ALL");
  const [filterZone, setFilterZone] = useState<string>("ALL");
  const [activeCommunity, setActiveCommunity] = useState<Community>(selectedCommunity);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);

  // 1-Hour Telemetry Time Scrubber (23 = 22:00 IST current hour)
  const [selectedHourIndex, setSelectedHourIndex] = useState<number>(23);
  const [isPlayingTimelapse, setIsPlayingTimelapse] = useState<boolean>(false);

  // Street view simulation modal
  const [showStreetView, setShowStreetView] = useState<boolean>(false);

  // Saved nodes list
  const [savedNodeIds, setSavedNodeIds] = useState<string[]>([]);

  // Leaflet map refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const labelsLayerRef = useRef<L.TileLayer | null>(null);
  const overlayLayersRef = useRef<L.LayerGroup | null>(null);

  // Update active community when global selectedCommunity changes
  useEffect(() => {
    setActiveCommunity(selectedCommunity);
  }, [selectedCommunity]);

  // Hourly Timelapse timer
  useEffect(() => {
    let interval: any;
    if (isPlayingTimelapse) {
      interval = setInterval(() => {
        setSelectedHourIndex((prev) => (prev >= 23 ? 0 : prev + 1));
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isPlayingTimelapse]);

  const filteredCommunities = communities.filter((c) => {
    const matchesFilter = filterLevel === "ALL" || c.riskLevel === filterLevel;
    const matchesZone = filterZone === "ALL" || c.zone === filterZone;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subDivision.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesZone && matchesSearch;
  });

  // Active hourly point for the selected node
  const activeHourlyPoint = activeCommunity.hourlyHistory?.[selectedHourIndex] || {
    hour: "22:00 IST",
    timestamp: "2026-08-14T22:00:00+05:30",
    temperature: activeCommunity.weather?.temperature || 30,
    rainfallMm: activeCommunity.weather?.rainfallMm1h || 0,
    humidity: activeCommunity.weather?.humidity || 75,
    turbidity: activeCommunity.waterIndicators?.turbidity || 2.5,
    ph: activeCommunity.waterIndicators?.ph || 7.2,
    tds: activeCommunity.waterIndicators?.tds || 300,
    coliformCount: activeCommunity.waterIndicators?.coliformCount || 0,
    riskScore: activeCommunity.riskScore || 30,
  };

  // Weather Icon helper
  const renderWeatherIcon = (iconName: string, className: string = "w-4 h-4") => {
    switch (iconName) {
      case "rain":
        return <CloudRain className={className} />;
      case "storm":
        return <CloudLightning className={className} />;
      case "sun":
        return <Sun className={className} />;
      case "wind":
        return <Wind className={className} />;
      default:
        return <CloudRain className={className} />;
    }
  };

  // Switch Tile Layer helper
  const updateMapTiles = (layerType: MapLayerType) => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }
    if (labelsLayerRef.current) {
      map.removeLayer(labelsLayerRef.current);
      labelsLayerRef.current = null;
    }

    if (layerType === "roadmap") {
      // Google-like clean vector styled road tiles
      tileLayerRef.current = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);
    } else if (layerType === "satellite") {
      // High-res Esri Satellite Imagery
      tileLayerRef.current = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          maxZoom: 19,
        }
      ).addTo(map);

      // Add clean road & boundary labels overlay
      labelsLayerRef.current = L.tileLayer(
        "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 19 }
      ).addTo(map);
    } else if (layerType === "terrain") {
      // Topographical relief terrain
      tileLayerRef.current = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
          maxZoom: 19,
        }
      ).addTo(map);
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [11.1271, 78.6569], // Tamil Nadu center
        zoom: 7,
        minZoom: 6,
        maxZoom: 15,
        zoomControl: false,
      });

      // Default Roadmap Layer
      tileLayerRef.current = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      markersGroupRef.current = L.layerGroup().addTo(map);
      overlayLayersRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    updateMapTiles(mapLayer);
  }, []);

  // Update Tile when mapLayer state changes
  useEffect(() => {
    updateMapTiles(mapLayer);
  }, [mapLayer]);

  // Render Google-styled Markers and Overlays
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    const overlaysGroup = overlayLayersRef.current;

    if (!map || !markersGroup) return;

    markersGroup.clearLayers();
    if (overlaysGroup) overlaysGroup.clearLayers();

    // Render River Basins lines if enabled
    if (showRiverBasins && overlaysGroup) {
      // Cauvery Basin Polyline
      const cauveryPath: [number, number][] = [
        [11.95, 77.75], // Mettur / Erode
        [11.35, 77.9],
        [11.0, 78.65], // Trichy
        [10.8, 79.15], // Thanjavur
        [10.95, 79.85], // Poompuhar / Bay of Bengal
      ];
      L.polyline(cauveryPath, {
        color: "#0284c7",
        weight: 4,
        opacity: 0.6,
        dashArray: "6, 6",
      }).addTo(overlaysGroup);

      // Vaigai Basin Polyline
      const vaigaiPath: [number, number][] = [
        [10.05, 77.5], // Theni
        [9.92, 78.12], // Madurai
        [9.36, 78.83], // Ramanathapuram
      ];
      L.polyline(vaigaiPath, {
        color: "#0284c7",
        weight: 3,
        opacity: 0.5,
        dashArray: "4, 4",
      }).addTo(overlaysGroup);
    }

    // Google Maps Teardrop Pins for all locations
    filteredCommunities.forEach((comm) => {
      const isSelected = activeCommunity.id === comm.id;
      const commHour = comm.hourlyHistory?.[selectedHourIndex] || {
        temperature: comm.weather?.temperature || 30,
        riskScore: comm.riskScore,
      };

      // Google Maps Pin Colors
      const pinColor =
        comm.riskLevel === "CRITICAL"
          ? "#ea4335" // Google Red
          : comm.riskLevel === "HIGH"
          ? "#fa7b17" // Google Orange
          : comm.riskLevel === "MODERATE"
          ? "#fbbc04" // Google Yellow
          : "#34a853"; // Google Green

      const iconSymbol =
        comm.riskLevel === "CRITICAL"
          ? "⚠️"
          : comm.riskLevel === "HIGH"
          ? "💧"
          : comm.riskLevel === "MODERATE"
          ? "⚡"
          : "✓";

      // Google Maps Iconic Teardrop Pin Marker HTML
      const markerHtml = `
        <div class="google-pin-container cursor-pointer transition-transform duration-200 ${
          isSelected ? "scale-125 z-50" : "hover:scale-110"
        }" style="position: relative; display: flex; flex-direction: column; align-items: center;">
          ${
            showTrafficOverlay && comm.riskLevel === "CRITICAL"
              ? `<div style="position: absolute; width: 44px; height: 44px; top: -6px; border-radius: 50%; background: ${pinColor}; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>`
              : ""
          }
          
          <!-- Temperature & Name Chip (Google Maps style label) -->
          <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(4px); color: #1e293b; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 800; font-family: 'Outfit', sans-serif; box-shadow: 0 2px 6px rgba(0,0,0,0.25); border: 1px solid rgba(0,0,0,0.08); white-space: nowrap; margin-bottom: 2px; display: flex; items-center; gap: 3px;">
            <span style="color: ${pinColor}; font-weight: 900;">${commHour.temperature}°C</span>
            <span style="color: #64748b; font-size: 9px;">• ${comm.name.split(" ")[0]}</span>
          </div>

          <!-- Google Maps Teardrop Pin Body -->
          <div style="position: relative; width: 28px; height: 36px;">
            <svg viewBox="0 0 24 34" width="28" height="36" style="filter: drop-shadow(0 3px 4px rgba(0,0,0,0.35));">
              <!-- Pin Shape -->
              <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 22 12 22s12-13 12-22c0-6.627-5.373-12-12-12z" fill="${pinColor}" stroke="#ffffff" stroke-width="1.2"/>
              <!-- White Inner Circle -->
              <circle cx="12" cy="11" r="5.5" fill="#ffffff"/>
            </svg>
            <div style="position: absolute; top: 4px; left: 0; width: 28px; text-align: center; font-size: 8px; font-weight: 900; color: #0f172a;">
              ${iconSymbol}
            </div>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: "google-maps-custom-marker",
        iconSize: [80, 56],
        iconAnchor: [40, 52],
      });

      const marker = L.marker([comm.lat, comm.lng], { icon: customIcon });

      marker.on("click", () => {
        setActiveCommunity(comm);
        setSelectedCommunityId(comm.id);
        setIsDrawerOpen(true);
      });

      markersGroup.addLayer(marker);
    });
  }, [
    filteredCommunities,
    activeCommunity.id,
    selectedHourIndex,
    showTrafficOverlay,
    showRiverBasins,
  ]);

  // Center map on active community
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([11.1271, 78.6569], 7, { duration: 0.8 });
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleFlyToActive = () => {
    if (mapInstanceRef.current && activeCommunity) {
      mapInstanceRef.current.flyTo([activeCommunity.lat, activeCommunity.lng], 10, {
        duration: 0.8,
      });
    }
  };

  // Toggle Save Node
  const handleToggleSaveNode = (id: string) => {
    setSavedNodeIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(`Removed from saved locations`, "info");
        return prev.filter((item) => item !== id);
      } else {
        showToast(`Saved ${activeCommunity.name} to monitored watchlist`, "success");
        return [...prev, id];
      }
    });
  };

  const isNodeSaved = savedNodeIds.includes(activeCommunity.id);

  return (
    <div
      className={`bg-slate-100 rounded-3xl border border-slate-300/80 shadow-lg overflow-hidden relative font-['Outfit',sans-serif] ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen w-screen" : "min-h-[720px]"
      }`}
    >
      {/* ---------------------------------------------------- */}
      {/* 1. GOOGLE MAPS FLOATING SEARCH BAR & QUICK CHIPS     */}
      {/* ---------------------------------------------------- */}
      <div className="absolute top-3 left-3 z-30 flex flex-col space-y-2 max-w-sm sm:max-w-md w-[calc(100%-24px)] pointer-events-auto">
        {/* Main Google-Style Search Input Box */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200/90 p-2 flex items-center space-x-2 text-slate-800 backdrop-blur-md bg-white/95">
          <div className="p-2 text-teal-600">
            <Search className="w-4 h-4 text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search Tamil Nadu city, village, or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Quick Drawer Toggle */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={`p-2 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${
              isDrawerOpen
                ? "bg-slate-900 text-white"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
            title="Toggle Place Info Card"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Place Info</span>
          </button>
        </div>

        {/* Quick Filter Chips (Google Maps Style) */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilterLevel("ALL")}
            className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold shadow-sm whitespace-nowrap transition cursor-pointer border ${
              filterLevel === "ALL"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white/95 text-slate-700 hover:bg-white border-slate-200"
            }`}
          >
            All 38 Nodes
          </button>

          <button
            onClick={() => setFilterLevel("CRITICAL")}
            className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold shadow-sm whitespace-nowrap transition cursor-pointer border flex items-center space-x-1 ${
              filterLevel === "CRITICAL"
                ? "bg-red-600 text-white border-red-700"
                : "bg-white/95 text-red-700 hover:bg-red-50 border-red-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>Critical Outbreak</span>
          </button>

          <button
            onClick={() => setFilterZone("Coastal Delta")}
            className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold shadow-sm whitespace-nowrap transition cursor-pointer border ${
              filterZone === "Coastal Delta"
                ? "bg-teal-700 text-white border-teal-800"
                : "bg-white/95 text-teal-800 hover:bg-teal-50 border-teal-200"
            }`}
          >
            🌊 Coastal Delta
          </button>

          <button
            onClick={() => setFilterZone("Kongu Nadu")}
            className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold shadow-sm whitespace-nowrap transition cursor-pointer border ${
              filterZone === "Kongu Nadu"
                ? "bg-indigo-700 text-white border-indigo-800"
                : "bg-white/95 text-indigo-800 hover:bg-indigo-50 border-indigo-200"
            }`}
          >
            🏭 Kongu Belt
          </button>

          <button
            onClick={() => {
              setFilterLevel("LOW");
              setFilterZone("ALL");
            }}
            className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold shadow-sm whitespace-nowrap transition cursor-pointer border ${
              filterLevel === "LOW"
                ? "bg-emerald-700 text-white border-emerald-800"
                : "bg-white/95 text-emerald-800 hover:bg-emerald-50 border-emerald-200"
            }`}
          >
            ✓ Safe Potable
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. GOOGLE MAPS MAP TYPE / LAYERS SWITCHER (BOTTOM-LEFT) */}
      {/* ---------------------------------------------------- */}
      <div className="absolute bottom-6 left-3 z-30 pointer-events-auto">
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="flex items-center space-x-2 bg-white/95 hover:bg-white text-slate-800 p-2 rounded-2xl shadow-md border border-slate-200/90 font-extrabold text-xs transition cursor-pointer backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-slate-800">
              {mapLayer === "roadmap" ? (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs">🗺️</div>
              ) : mapLayer === "satellite" ? (
                <div className="w-full h-full bg-emerald-950 flex items-center justify-center text-xs">🛰️</div>
              ) : (
                <div className="w-full h-full bg-amber-900 flex items-center justify-center text-xs">⛰️</div>
              )}
            </div>
            <div className="text-left pr-1">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Layers</div>
              <div className="text-xs font-black capitalize text-slate-900">{mapLayer}</div>
            </div>
          </button>

          {/* Layer Popover Menu */}
          {showLayerMenu && (
            <div className="absolute bottom-full left-0 mb-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 space-y-3 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                Map Types
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* Default Roadmap */}
                <button
                  onClick={() => {
                    setMapLayer("roadmap");
                    setShowLayerMenu(false);
                  }}
                  className={`flex flex-col items-center p-2 rounded-xl border text-center transition cursor-pointer ${
                    mapLayer === "roadmap"
                      ? "border-teal-600 bg-teal-50 text-teal-900 font-extrabold ring-2 ring-teal-500/20"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold"
                  }`}
                >
                  <span className="text-lg">🗺️</span>
                  <span className="text-[10px] mt-1">Default</span>
                </button>

                {/* Satellite Imagery */}
                <button
                  onClick={() => {
                    setMapLayer("satellite");
                    setShowLayerMenu(false);
                  }}
                  className={`flex flex-col items-center p-2 rounded-xl border text-center transition cursor-pointer ${
                    mapLayer === "satellite"
                      ? "border-teal-600 bg-teal-50 text-teal-900 font-extrabold ring-2 ring-teal-500/20"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold"
                  }`}
                >
                  <span className="text-lg">🛰️</span>
                  <span className="text-[10px] mt-1">Satellite</span>
                </button>

                {/* Terrain */}
                <button
                  onClick={() => {
                    setMapLayer("terrain");
                    setShowLayerMenu(false);
                  }}
                  className={`flex flex-col items-center p-2 rounded-xl border text-center transition cursor-pointer ${
                    mapLayer === "terrain"
                      ? "border-teal-600 bg-teal-50 text-teal-900 font-extrabold ring-2 ring-teal-500/20"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold"
                  }`}
                >
                  <span className="text-lg">⛰️</span>
                  <span className="text-[10px] mt-1">Terrain</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  Map Overlays
                </div>

                <label className="flex items-center justify-between text-xs text-slate-700 font-semibold cursor-pointer">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Risk Contamination Pulse</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={showTrafficOverlay}
                    onChange={(e) => setShowTrafficOverlay(e.target.checked)}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                </label>

                <label className="flex items-center justify-between text-xs text-slate-700 font-semibold cursor-pointer">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    <span>River Basins (Cauvery/Vaigai)</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={showRiverBasins}
                    onChange={(e) => setShowRiverBasins(e.target.checked)}
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. GOOGLE MAPS CONTROLS TOOLBAR (RIGHT SIDE)         */}
      {/* ---------------------------------------------------- */}
      <div className="absolute bottom-6 right-3 z-30 flex flex-col items-center space-y-2 pointer-events-auto">
        {/* Street View / Pegman Button in Google Yellow */}
        <button
          onClick={() => setShowStreetView(true)}
          className="w-10 h-10 rounded-full bg-white hover:bg-amber-50 shadow-md border border-slate-200 flex items-center justify-center text-amber-500 transition cursor-pointer group"
          title="Street View & Field Ground Observer"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">🚶</span>
        </button>

        {/* GPS / Center Location Button */}
        <button
          onClick={handleRecenter}
          className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 shadow-md border border-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
          title="Center on Tamil Nadu"
        >
          <Crosshair className="w-4 h-4 text-slate-600" />
        </button>

        {/* Zoom Controls Pill (Google Maps style stacked + and -) */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col items-center">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-black text-lg transition border-b border-slate-100 cursor-pointer"
            title="Zoom in"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-50 font-black text-lg transition cursor-pointer"
            title="Zoom out"
          >
            −
          </button>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 shadow-md border border-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 4. GOOGLE MAPS BOTTOM TIMELINE SCRUBBER (1-HOUR IST) */}
      {/* ---------------------------------------------------- */}
      <div className="absolute top-3 right-3 z-30 hidden md:flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-md border border-slate-200 pointer-events-auto">
        <Clock className="w-3.5 h-3.5 text-teal-600" />
        <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
          Live IST:
        </span>
        <span className="text-xs font-black text-teal-700 px-2 py-0.5 rounded-md bg-teal-50 border border-teal-200">
          {activeHourlyPoint.hour}
        </span>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        <button
          onClick={() => setIsPlayingTimelapse(!isPlayingTimelapse)}
          className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold flex items-center space-x-1 transition cursor-pointer ${
            isPlayingTimelapse
              ? "bg-amber-500 text-slate-950 shadow-xs"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          {isPlayingTimelapse ? (
            <>
              <Pause className="w-3 h-3 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>24h Timelapse</span>
            </>
          )}
        </button>

        <input
          type="range"
          min={0}
          max={23}
          value={selectedHourIndex}
          onChange={(e) => setSelectedHourIndex(Number(e.target.value))}
          className="w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
        />

        <button
          onClick={() => setSelectedHourIndex(23)}
          title="Reset to current hour (22:00 IST)"
          className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 5. MAIN MAP CANVAS (LEAFLET)                         */}
      {/* ---------------------------------------------------- */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[640px] z-10" />

      {/* ---------------------------------------------------- */}
      {/* 6. GOOGLE MAPS PLACE OVERVIEW CARD (SIDE DRAWER)     */}
      {/* ---------------------------------------------------- */}
      {isDrawerOpen && activeCommunity && (
        <div className="absolute top-16 left-3 z-40 w-[calc(100%-24px)] sm:w-96 max-h-[calc(100%-80px)] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-left-4 pointer-events-auto">
          {/* Top Banner / Image Header with Close Button */}
          <div className="relative h-28 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-800 text-white p-4 flex flex-col justify-between overflow-hidden shrink-0">
            {/* Background Pattern / Satellite feel */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/30">
                {activeCommunity.zone} • Sentinel Node
              </span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition cursor-pointer"
                title="Close Info Card"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative z-10">
              <h3 className="text-lg font-black tracking-tight text-white line-clamp-1">
                {activeCommunity.name}
              </h3>
              <p className="text-xs text-slate-300 font-medium line-clamp-1">
                {activeCommunity.subDivision}, {activeCommunity.district} District
              </p>
            </div>
          </div>

          {/* Place Details Body */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
            {/* Google Rating / Risk Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="text-amber-500 font-extrabold text-xs">★</span>
                <span className="text-xs font-black text-slate-900">
                  {activeCommunity.riskLevel === "CRITICAL"
                    ? "1.2 / 5.0 (Critical Risk)"
                    : activeCommunity.riskLevel === "HIGH"
                    ? "2.4 / 5.0 (High Hazard)"
                    : activeCommunity.riskLevel === "MODERATE"
                    ? "3.8 / 5.0 (Caution)"
                    : "4.9 / 5.0 (Potable Safe)"}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  ({activeCommunity.population.toLocaleString()} pop)
                </span>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  activeCommunity.riskLevel === "CRITICAL"
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : activeCommunity.riskLevel === "HIGH"
                    ? "bg-orange-100 text-orange-800 border border-orange-200"
                    : activeCommunity.riskLevel === "MODERATE"
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                }`}
              >
                {activeCommunity.riskLevel} ({activeHourlyPoint.riskScore}%)
              </span>
            </div>

            {/* Google Maps Iconic Action Buttons Row */}
            <div className="grid grid-cols-4 gap-2 pt-1 border-t border-b border-slate-100 py-3">
              {/* Navigate / Fly */}
              <button
                onClick={handleFlyToActive}
                className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-slate-100 transition cursor-pointer text-teal-700"
              >
                <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center mb-1 shadow-2xs">
                  <Navigation className="w-4 h-4 text-teal-600" />
                </div>
                <span className="text-[10px] font-black">Directions</span>
              </button>

              {/* Save Node */}
              <button
                onClick={() => handleToggleSaveNode(activeCommunity.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl transition cursor-pointer ${
                  isNodeSaved
                    ? "text-amber-600 bg-amber-50"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center mb-1 shadow-2xs">
                  <Bookmark className={`w-4 h-4 ${isNodeSaved ? "fill-amber-500 text-amber-500" : ""}`} />
                </div>
                <span className="text-[10px] font-black">{isNodeSaved ? "Saved" : "Save"}</span>
              </button>

              {/* Report Concern */}
              <button
                onClick={() => {
                  setSelectedCommunityId(activeCommunity.id);
                  setPage("report");
                }}
                className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-rose-50 transition cursor-pointer text-rose-700"
              >
                <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center mb-1 shadow-2xs">
                  <Flame className="w-4 h-4 text-rose-600" />
                </div>
                <span className="text-[10px] font-black">Report</span>
              </button>

              {/* Voice Speech (Tamil/English IST) */}
              <button
                onClick={() =>
                  speakText(
                    `Sentinel location: ${activeCommunity.name}. Temperature is ${activeHourlyPoint.temperature} degrees Celsius with ${activeCommunity.weather.condition}. Turbidity is ${activeHourlyPoint.turbidity} NTU. Epidemiological risk status is ${activeCommunity.riskLevel}. Telemetry recorded at ${activeHourlyPoint.hour}.`
                  )
                }
                className="flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-cyan-50 transition cursor-pointer text-cyan-700"
              >
                <div className="w-9 h-9 rounded-full bg-cyan-50 flex items-center justify-center mb-1 shadow-2xs">
                  <Volume2 className="w-4 h-4 text-cyan-600" />
                </div>
                <span className="text-[10px] font-black">Listen IST</span>
              </button>
            </div>

            {/* Operating Hours / Telemetry Status (Google Maps style) */}
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-emerald-700">Open 24 Hours</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-medium">IoT Stream Active ({activeHourlyPoint.hour})</span>
              </div>

              <div className="flex items-center space-x-2 text-slate-500 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Coordinates: {activeCommunity.lat.toFixed(4)}° N, {activeCommunity.lng.toFixed(4)}° E</span>
              </div>
            </div>

            {/* Google-Style Weather & Climate Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-teal-400">
                    {renderWeatherIcon(activeCommunity.weather.icon, "w-6 h-6")}
                  </span>
                  <div>
                    <div className="text-xl font-black">{activeHourlyPoint.temperature}°C</div>
                    <div className="text-[10px] text-slate-300">
                      Feels like {activeCommunity.weather.feelsLike}°C
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-teal-300">{activeHourlyPoint.hour}</div>
                  <div className="text-[9px] text-slate-400">{activeCommunity.weather.condition}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px] text-center border-t border-slate-700">
                <div className="p-1.5 rounded-lg bg-white/5">
                  <div className="text-slate-400">1h Rain</div>
                  <div className="font-extrabold text-white">{activeHourlyPoint.rainfallMm} mm</div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/5">
                  <div className="text-slate-400">Humidity</div>
                  <div className="font-extrabold text-white">{activeHourlyPoint.humidity}%</div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/5">
                  <div className="text-slate-400">24h Rain</div>
                  <div className="font-extrabold text-white">{activeCommunity.weather.rainfallMm24h} mm</div>
                </div>
              </div>
            </div>

            {/* Google Maps Style "Popular Times / Live IoT Telemetry" Histogram */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-800">
                <div className="flex items-center space-x-1.5">
                  <Activity className="w-3.5 h-3.5 text-teal-600" />
                  <span>24-Hour Telemetry (IST)</span>
                </div>
                <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                  Live at {activeHourlyPoint.hour}
                </span>
              </div>

              {/* Bar Chart Histogram */}
              <div className="flex items-end space-x-1 h-14 pt-2">
                {activeCommunity.hourlyHistory?.map((h, idx) => {
                  const isCur = idx === selectedHourIndex;
                  const barHeight = Math.max(15, (h.riskScore / 100) * 100);
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedHourIndex(idx)}
                      title={`${h.hour}: ${h.temperature}°C, ${h.turbidity} NTU, Risk ${h.riskScore}%`}
                      className={`flex-1 rounded-t cursor-pointer transition-all ${
                        isCur
                          ? "bg-teal-600 ring-2 ring-teal-400"
                          : h.riskScore >= 75
                          ? "bg-red-400 hover:bg-red-500"
                          : h.riskScore >= 50
                          ? "bg-amber-400 hover:bg-amber-500"
                          : "bg-emerald-400 hover:bg-emerald-500"
                      }`}
                      style={{ height: `${barHeight}%` }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                <span>00:00 IST</span>
                <span>12:00 IST</span>
                <span className="text-teal-700 font-black">22:00 IST (Now)</span>
              </div>
            </div>

            {/* IoT Water Quality Diagnostics Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200">
                <div className="text-[9px] font-black uppercase text-cyan-800">Turbidity</div>
                <div
                  className={`text-base font-black ${
                    activeHourlyPoint.turbidity > 5 ? "text-red-600" : "text-cyan-900"
                  }`}
                >
                  {activeHourlyPoint.turbidity} NTU
                </div>
                <div className="text-[9px] text-cyan-700">Limit: &le; 5.0</div>
              </div>

              <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200">
                <div className="text-[9px] font-black uppercase text-teal-800">pH & TDS</div>
                <div className="text-base font-black text-teal-900">{activeHourlyPoint.ph} pH</div>
                <div className="text-[9px] text-teal-700">{activeHourlyPoint.tds} ppm</div>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                <div className="text-[9px] font-black uppercase text-rose-800">Coliform CFU</div>
                <div
                  className={`text-base font-black ${
                    activeHourlyPoint.coliformCount > 0 ? "text-red-600" : "text-emerald-700"
                  }`}
                >
                  {activeHourlyPoint.coliformCount} CFU
                </div>
                <div className="text-[9px] text-rose-700">Std: 0 CFU/100ml</div>
              </div>

              <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200">
                <div className="text-[9px] font-black uppercase text-indigo-800">Syndromic</div>
                <div className="text-base font-black text-indigo-900">
                  {activeCommunity.currentWeeklyReports} cases
                </div>
                <div className="text-[9px] text-indigo-700">Base: {activeCommunity.baselineWeeklyReports}</div>
              </div>
            </div>

            {/* Bottom Actions CTA */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setSelectedCommunityId(activeCommunity.id);
                  setPage("dashboard");
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs transition cursor-pointer flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Full Sentinel Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => runEarlyWarningAnalysis(activeCommunity.id)}
                className="w-full py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition cursor-pointer flex items-center justify-center space-x-1.5 shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Run Gemini Early Warning AI</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 7. STREET VIEW & GROUND OBSERVATION MODAL            */}
      {/* ---------------------------------------------------- */}
      {showStreetView && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full text-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Eye className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-base font-black">
                    Ground-Level Sentinel Sensor View: {activeCommunity.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Live Street & River Basin Camera Telemetry • Recorded at {activeHourlyPoint.hour}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowStreetView(false)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Street-View Ground Canvas */}
            <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
              
              <div className="relative z-10 text-center p-6 space-y-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-black">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                  <span>Automated Optical Turbidity Sensor #TN-{activeCommunity.id.slice(-4)}</span>
                </div>
                <div className="text-3xl font-black font-['Outfit',sans-serif]">
                  {activeHourlyPoint.temperature}°C • {activeHourlyPoint.turbidity} NTU
                </div>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Sensors detecting river basin intake levels at {activeCommunity.subDivision}. 1h rainfall accumulation: {activeHourlyPoint.rainfallMm} mm/h.
                </p>
              </div>

              <div className="absolute bottom-3 left-3 text-[10px] font-bold text-slate-400 bg-black/60 px-2 py-1 rounded-md">
                GPS: {activeCommunity.lat.toFixed(4)}° N, {activeCommunity.lng.toFixed(4)}° E
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] font-bold text-teal-400 bg-black/60 px-2 py-1 rounded-md">
                Time: {activeHourlyPoint.hour}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowStreetView(false)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-black cursor-pointer"
              >
                Return to Google Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
