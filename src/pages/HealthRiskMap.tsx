import React, { useState, useMemo } from "react";
import { InteractiveMap } from "../components/InteractiveMap";
import { CityVillageExplorerModal } from "../components/CityVillageExplorerModal";
import { useApp } from "../context/AppContext";
import { Community } from "../types";
import {
  MapPin,
  Thermometer,
  CloudRain,
  ShieldAlert,
  Search,
  Filter,
  Eye,
  Activity,
  Droplets,
  Building2,
  ChevronRight,
  TrendingUp,
  TrendingDown
} from "lucide-react";

export const HealthRiskMap: React.FC = () => {
  const { communities, setSelectedCommunityId, setPage, t } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("ALL");
  const [selectedRisk, setSelectedRisk] = useState("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState("ALL");
  const [modalCommunity, setModalCommunity] = useState<Community | null>(null);

  // Extract all distinct districts & zones
  const districts = useMemo(() => {
    const set = new Set<string>();
    communities.forEach((c) => set.add(c.district));
    return Array.from(set).sort();
  }, [communities]);

  const zones = useMemo(() => {
    const set = new Set<string>();
    communities.forEach((c) => set.add(c.zone));
    return Array.from(set).sort();
  }, [communities]);

  // Filter communities
  const filteredCommunities = useMemo(() => {
    return communities.filter((c) => {
      const matchSearch =
        searchQuery.trim() === "" ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.subDivision.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.majorRiverBasin && c.majorRiverBasin.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchZone = selectedZone === "ALL" || c.zone === selectedZone;
      const matchRisk = selectedRisk === "ALL" || c.riskLevel === selectedRisk;
      const matchDistrict = selectedDistrict === "ALL" || c.district === selectedDistrict;

      return matchSearch && matchZone && matchRisk && matchDistrict;
    });
  }, [communities, searchQuery, selectedZone, selectedRisk, selectedDistrict]);

  // Risk Counts
  const counts = useMemo(() => {
    const c = { total: communities.length, critical: 0, high: 0, moderate: 0, low: 0 };
    communities.forEach((item) => {
      if (item.riskLevel === "CRITICAL") c.critical++;
      else if (item.riskLevel === "HIGH") c.high++;
      else if (item.riskLevel === "MODERATE") c.moderate++;
      else if (item.riskLevel === "LOW") c.low++;
    });
    return c;
  }, [communities]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-700">
              Tamil Nadu State Sentinel Surveillance Grid
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-extrabold border border-teal-200">
              1-Hour Basis Live Telemetry (IST)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] mt-1">
            {t.mapTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Geospatial surveillance across all 38 districts, major river basins, coastal deltas, and rural panchayat nodes
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setPage("early-warning")}
            className="px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 font-extrabold text-xs border border-teal-200 transition cursor-pointer"
          >
            AI Early Warning
          </button>
          <button
            onClick={() => setPage("simulator")}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition cursor-pointer shadow-xs"
          >
            {t.navSimulator}
          </button>
        </div>
      </div>

      {/* Summary Risk Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => {
            setSelectedRisk("ALL");
            setSelectedDistrict("ALL");
            setSelectedZone("ALL");
          }}
          className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
            selectedRisk === "ALL" && selectedDistrict === "ALL" && selectedZone === "ALL"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <div className="text-[10px] font-bold uppercase opacity-80">All 38 Districts</div>
          <div className="text-xl font-black font-['Outfit',sans-serif] mt-0.5">{counts.total} Nodes</div>
          <div className="text-[10px] opacity-75">Cities & Villages</div>
        </button>

        <button
          onClick={() => setSelectedRisk(selectedRisk === "CRITICAL" ? "ALL" : "CRITICAL")}
          className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
            selectedRisk === "CRITICAL"
              ? "bg-red-600 text-white border-red-600 shadow-md"
              : "bg-red-50 text-red-900 border-red-200 hover:bg-red-100/80"
          }`}
        >
          <div className="text-[10px] font-bold uppercase opacity-80">Critical Risk</div>
          <div className="text-xl font-black font-['Outfit',sans-serif] mt-0.5">{counts.critical}</div>
          <div className="text-[10px] opacity-75">Immediate Outbreak Action</div>
        </button>

        <button
          onClick={() => setSelectedRisk(selectedRisk === "HIGH" ? "ALL" : "HIGH")}
          className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
            selectedRisk === "HIGH"
              ? "bg-orange-500 text-white border-orange-500 shadow-md"
              : "bg-orange-50 text-orange-900 border-orange-200 hover:bg-orange-100/80"
          }`}
        >
          <div className="text-[10px] font-bold uppercase opacity-80">High Risk</div>
          <div className="text-xl font-black font-['Outfit',sans-serif] mt-0.5">{counts.high}</div>
          <div className="text-[10px] opacity-75">Elevated Turbidity/Symptoms</div>
        </button>

        <button
          onClick={() => setSelectedRisk(selectedRisk === "MODERATE" ? "ALL" : "MODERATE")}
          className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
            selectedRisk === "MODERATE"
              ? "bg-amber-500 text-white border-amber-500 shadow-md"
              : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100/80"
          }`}
        >
          <div className="text-[10px] font-bold uppercase opacity-80">Moderate</div>
          <div className="text-xl font-black font-['Outfit',sans-serif] mt-0.5">{counts.moderate}</div>
          <div className="text-[10px] opacity-75">Sentinel Active Watch</div>
        </button>

        <button
          onClick={() => setSelectedRisk(selectedRisk === "LOW" ? "ALL" : "LOW")}
          className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
            selectedRisk === "LOW"
              ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
              : "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100/80"
          }`}
        >
          <div className="text-[10px] font-bold uppercase opacity-80">Low Risk</div>
          <div className="text-xl font-black font-['Outfit',sans-serif] mt-0.5">{counts.low}</div>
          <div className="text-[10px] opacity-75">Potable Standard Assured</div>
        </button>
      </div>

      {/* Interactive Map Component */}
      <InteractiveMap />

      {/* Comprehensive Tamil Nadu Cities & Villages Telemetry Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-extrabold text-teal-700 uppercase tracking-wider">
                Full 38-District Registry
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-extrabold">
                {filteredCommunities.length} Displayed
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit',sans-serif] mt-0.5">
              Tamil Nadu Cities & Villages Surveillance Index
            </h2>
            <p className="text-xs text-slate-500">
              Click any city or village to open the full hydrological, PHC, climate, and water sensor dossier
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, village, river basin..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            >
              <option value="ALL">All 38 Districts</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d} District
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            >
              <option value="ALL">All Agro-Ecological Zones</option>
              {zones.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">Critical Risk (70%+)</option>
              <option value="HIGH">High Risk (60-69%)</option>
              <option value="MODERATE">Moderate Risk (40-59%)</option>
              <option value="LOW">Low Risk (&lt;40%)</option>
            </select>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3.5">City / Village & Administrative Unit</th>
                <th className="py-3 px-3">Zone & District</th>
                <th className="py-3 px-3">Temp & Climate (IST)</th>
                <th className="py-3 px-3">1h Rain / 24h</th>
                <th className="py-3 px-3">Water Turbidity</th>
                <th className="py-3 px-3">PHC & Primary Source</th>
                <th className="py-3 px-3">Risk Level</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCommunities.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setModalCommunity(c)}
                  className="hover:bg-teal-50/40 transition cursor-pointer group"
                >
                  <td className="py-3.5 px-3.5 font-bold text-slate-900">
                    <div className="flex items-start space-x-2.5">
                      <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-black text-slate-900 group-hover:text-teal-700 transition">
                          {c.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                          {c.subDivision}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {c.zone}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-semibold">
                      {c.district} Dist.
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center space-x-1 font-extrabold text-slate-900">
                      <Thermometer className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{c.weather.temperature}°C</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium truncate max-w-[130px]">
                      {c.weather.condition}
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center space-x-1 text-teal-700 font-extrabold">
                      <CloudRain className="w-3.5 h-3.5 shrink-0" />
                      <span>{c.weather.rainfallMm1h} mm/h</span>
                    </div>
                    <div className="text-[10px] text-slate-400">24h: {c.weather.rainfallMm24h} mm</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`font-black ${c.waterIndicators.turbidity > 5 ? "text-red-600" : "text-emerald-700"}`}>
                      {c.waterIndicators.turbidity} NTU
                    </span>
                    <div className="text-[10px] text-slate-400 font-medium">
                      {c.waterIndicators.coliformCount > 0 ? "🚨 Coliform +" : "✅ Coliform 0"}
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-800 truncate max-w-[140px]" title={c.primaryPHC}>
                      {c.primaryPHC || "Rural PHC"}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[140px]" title={c.waterSourceType}>
                      {c.waterSourceType}
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      c.riskLevel === "CRITICAL"
                        ? "bg-red-100 text-red-800 border border-red-200 animate-pulse"
                        : c.riskLevel === "HIGH"
                        ? "bg-orange-100 text-orange-800 border border-orange-200"
                        : c.riskLevel === "MODERATE"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    }`}>
                      {c.riskLevel} ({c.riskScore}%)
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => setModalCommunity(c)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 font-bold transition cursor-pointer"
                        title="View Full Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCommunityId(c.id);
                          setPage("dashboard");
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-teal-600 text-white font-extrabold text-[10px] transition cursor-pointer"
                      >
                        Live
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* City & Village Explorer Modal */}
      {modalCommunity && (
        <CityVillageExplorerModal
          community={modalCommunity}
          onClose={() => setModalCommunity(null)}
        />
      )}
    </div>
  );
};
