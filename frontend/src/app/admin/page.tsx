"use client";

import { useState, useEffect } from "react";
import { 
  Building2, Users, MessageSquare, Plus, Edit2, Trash2, LogOut, Lock, 
  MapPin, Check, X, ShieldAlert, Heart, Calendar, Search, ArrowRight, Bed, Bath, Maximize
} from "lucide-react";
import SafeLink from "@/components/ui/safe-link";
import SiteShell from "@/components/real-estate/site-shell";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"properties" | "agents" | "inquiries">("properties");

  // Live Database States
  const [properties, setProperties] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal / Form States
  const [propModalOpen, setPropModalOpen] = useState(false);
  const [editingProp, setEditingProp] = useState<any | null>(null);
  const [propForm, setPropForm] = useState({
    title: "", location: "", areaName: "", price: "", priceValue: "",
    pricePerSqft: "", type: "Sale", category: "Villa", beds: "5", baths: "5",
    area: "1 Kanal", image: "", gallery: "", tag: "", featured: false,
    coordinatesX: "28", coordinatesY: "42", description: "", features: "",
    agentId: "", yearBuilt: "2022", parking: "3"
  });

  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<any | null>(null);
  const [agentForm, setAgentForm] = useState({
    name: "", role: "", bio: "", experience: "5+ Years", deals: "10",
    sales: "PKR 50 Crore sold", specialties: "DHA, Bahria Town", image: "/images/agent_1.png",
    phone: "", email: ""
  });

  // Fetch Database
  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, aRes, iRes] = await Promise.all([
        fetch("http://localhost:5000/api/properties"),
        fetch("http://localhost:5000/api/agents"),
        fetch("http://localhost:5000/api/inquiries")
      ]);

      const [pData, aData, iData] = await Promise.all([
        pRes.json(),
        aRes.json(),
        iRes.json()
      ]);

      if (pData.success) setProperties(pData.properties);
      if (aData.success) setAgents(aData.agents);
      if (iData.success) setInquiries(iData.inquiries);
    } catch (err) {
      console.error("Fetch admin data error:", err);
      toast.error("Failed to sync database. Is the Express server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check local storage session
    const session = localStorage.getItem("adminSession");
    if (session === "active") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("adminSession", "active");
      toast.success("Successfully logged into Administrator Dashboard");
    } else {
      toast.error("Incorrect administrator security key. Access denied.");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminSession");
    toast.success("Successfully logged out");
  };

  // Delete handlers
  const deleteProperty = async (id: number) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/properties/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Listing deleted successfully");
        fetchData();
      } else {
        toast.error(data.error || "Failed to delete listing");
      }
    } catch {
      toast.error("Network error. Could not delete.");
    }
  };

  const deleteAgent = async (id: number) => {
    if (!confirm("Are you sure you want to delete this Advisor?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/agents/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Advisor deleted successfully");
        fetchData();
      } else {
        toast.error(data.error || "Failed to delete Advisor");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm("Delete this inquiry from records?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Inquiry removed");
        fetchData();
      }
    } catch {
      toast.error("Network error.");
    }
  };

  // Property Form Submit
  const handlePropSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set default agent if none selected
    const finalAgentId = propForm.agentId || (agents[0]?.id || "1");

    const payload = {
      ...propForm,
      agentId: finalAgentId,
      gallery: propForm.gallery ? propForm.gallery.split(",").map(s => s.trim()) : [],
      features: propForm.features ? propForm.features.split(",").map(s => s.trim()) : []
    };

    const url = editingProp 
      ? `http://localhost:5000/api/properties/${editingProp.id}`
      : "http://localhost:5000/api/properties";
    
    const method = editingProp ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editingProp ? "Property updated successfully" : "Property added successfully");
        setPropModalOpen(false);
        setEditingProp(null);
        fetchData();
      } else {
        toast.error(data.error || "Failed to save property");
      }
    } catch {
      toast.error("Connection failed.");
    }
  };

  // Agent Form Submit
  const handleAgentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...agentForm,
      specialties: agentForm.specialties.split(",").map(s => s.trim())
    };

    const url = editingAgent
      ? `http://localhost:5000/api/agents/${editingAgent.id}`
      : "http://localhost:5000/api/agents";

    const method = editingAgent ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editingAgent ? "Advisor updated successfully" : "Advisor added successfully");
        setAgentModalOpen(false);
        setEditingAgent(null);
        fetchData();
      } else {
        toast.error(data.error || "Failed to save Advisor");
      }
    } catch {
      toast.error("Connection failed.");
    }
  };

  // Pre-fill edits
  const startEditProp = (prop: any) => {
    setEditingProp(prop);
    setPropForm({
      title: prop.title,
      location: prop.location,
      areaName: prop.areaName,
      price: prop.price,
      priceValue: String(prop.priceValue),
      pricePerSqft: prop.pricePerSqft || "",
      type: prop.type,
      category: prop.category,
      beds: String(prop.beds),
      baths: String(prop.baths),
      area: prop.area,
      image: prop.image,
      gallery: Array.isArray(prop.gallery) ? prop.gallery.join(", ") : "",
      tag: prop.tag || "",
      featured: prop.featured || false,
      coordinatesX: String(prop.coordinates?.x || prop.coordinatesX || 28),
      coordinatesY: String(prop.coordinates?.y || prop.coordinatesY || 42),
      description: prop.description,
      features: Array.isArray(prop.features) ? prop.features.join(", ") : "",
      agentId: String(prop.agentId),
      yearBuilt: String(prop.yearBuilt),
      parking: String(prop.parking || "")
    });
    setPropModalOpen(true);
  };

  const startEditAgent = (agent: any) => {
    setEditingAgent(agent);
    setAgentForm({
      name: agent.name,
      role: agent.role,
      bio: agent.bio,
      experience: agent.experience,
      deals: String(agent.deals),
      sales: agent.sales,
      specialties: Array.isArray(agent.specialties) ? agent.specialties.join(", ") : "",
      image: agent.image,
      phone: agent.phone,
      email: agent.email
    });
    setAgentModalOpen(true);
  };

  if (!isLoggedIn) {
    return (
      <SiteShell>
        <div className="min-h-[85vh] bg-luxe-soft flex items-center justify-center px-6">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-luxe p-8 text-center border border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--royal)] to-[var(--gold)]" />
            <div className="h-16 w-16 rounded-2xl bg-[var(--royal)]/8 text-[var(--royal)] flex items-center justify-center mx-auto mb-6">
              <Lock className="h-7 w-7" />
            </div>
            <h1 className="font-display text-2xl font-bold text-[var(--ink)]">Administrator Control</h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-2 mb-6">Imperial Estates backend database gatekeeper. Please enter your administrator key.</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                required
                placeholder="Enter Access Key (default: admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm text-center focus:outline-none focus:border-[var(--royal)] focus:bg-white transition-colors"
              />
              <button type="submit" className="w-full btn-gold py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                Unlock Dashboard <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="bg-luxe-soft min-h-screen py-10">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold-deep)]">Portal Active</span>
              <h1 className="font-display text-3xl font-bold text-[var(--ink)] mt-1">Admin Database Dashboard</h1>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-border text-[var(--ink)] hover:text-red-500 font-semibold text-sm shadow-sm transition-all shrink-0">
              <LogOut className="h-4 w-4" /> Log Out
            </button>
          </div>

          {/* Stats Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="rounded-2xl bg-white shadow-luxe p-6 flex items-center gap-5 border border-border/50">
              <div className="h-12 w-12 rounded-xl bg-[var(--royal)]/8 text-[var(--royal)] flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--ink)]">{properties.length}</div>
                <div className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider font-semibold">Total Properties</div>
              </div>
            </div>
            <div className="rounded-2xl bg-white shadow-luxe p-6 flex items-center gap-5 border border-border/50">
              <div className="h-12 w-12 rounded-xl bg-[var(--gold)]/8 text-[var(--gold-deep)] flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--ink)]">{agents.length}</div>
                <div className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider font-semibold">Active Advisors</div>
              </div>
            </div>
            <div className="rounded-2xl bg-white shadow-luxe p-6 flex items-center gap-5 border border-border/50">
              <div className="h-12 w-12 rounded-xl bg-[var(--emerald-brand)]/8 text-[var(--emerald-brand)] flex items-center justify-center">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--ink)]">{inquiries.length}</div>
                <div className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider font-semibold">User Leads / Inquiries</div>
              </div>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex border-b border-border mb-8">
            {[
              { id: "properties", label: "Properties", count: properties.length },
              { id: "agents", label: "Advisors", count: agents.length },
              { id: "inquiries", label: "Inquiries/Leads", count: inquiries.length }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={cn(
                  "px-6 py-4 text-sm font-semibold border-b-2 transition-all flex items-center gap-2",
                  activeTab === t.id 
                    ? "border-[var(--royal)] text-[var(--royal)]" 
                    : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--ink)]"
                )}
              >
                {t.label} <span className="bg-luxe-soft text-[10px] text-[var(--ink)]/70 px-2 py-0.5 rounded-full">{t.count}</span>
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          {loading ? (
            <div className="flex items-center justify-center py-20 bg-white rounded-3xl shadow-luxe">
              <div className="h-10 w-10 rounded-full border-4 border-[var(--royal)]/20 border-t-[var(--royal)] animate-spin" />
            </div>
          ) : (
            <div>
              {/* Properties Panel */}
              {activeTab === "properties" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-display text-xl font-bold text-[var(--ink)]">Manage Property Listings</h2>
                    <button onClick={() => { setEditingProp(null); setPropModalOpen(true); }} className="btn-gold rounded-xl px-4 py-2.5 text-xs font-semibold flex items-center gap-2">
                      <Plus className="h-4 w-4" /> Add Property
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((p) => (
                      <div key={p.id} className="bg-white rounded-[1.75rem] border border-border overflow-hidden relative shadow-sm group">
                        <img src={p.image} alt={p.title} className="h-48 w-full object-cover" />
                        <div className="absolute top-3 left-3 bg-[var(--royal)] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                          For {p.type}
                        </div>
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button onClick={() => startEditProp(p)} className="h-8 w-8 rounded-full bg-white text-[var(--royal)] hover:bg-[var(--royal)] hover:text-white flex items-center justify-center shadow transition-colors">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => deleteProperty(p.id)} className="h-8 w-8 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center shadow transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="p-5">
                          <h3 className="font-display font-bold text-lg text-[var(--ink)] truncate">{p.title}</h3>
                          <div className="text-xs text-[var(--muted-foreground)] flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {p.location}</div>
                          <div className="flex gap-4 mt-3 py-3 border-y border-border text-xs text-[var(--ink)]/70">
                            <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5 text-[var(--royal)]" /> {p.beds} Beds</span>
                            <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5 text-[var(--royal)]" /> {p.baths} Baths</span>
                            <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5 text-[var(--royal)]" /> {p.area}</span>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="font-bold text-[var(--royal)]">{p.price}</div>
                            <div className="text-[10px] uppercase font-semibold text-[var(--muted-foreground)] bg-luxe-soft px-2.5 py-1 rounded-md">{p.category}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advisors Panel */}
              {activeTab === "agents" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="font-display text-xl font-bold text-[var(--ink)]">Manage Elite Advisors</h2>
                    <button onClick={() => { setEditingAgent(null); setAgentModalOpen(true); }} className="btn-gold rounded-xl px-4 py-2.5 text-xs font-semibold flex items-center gap-2">
                      <Plus className="h-4 w-4" /> Add Advisor
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((a) => (
                      <div key={a.id} className="bg-white rounded-3xl border border-border p-5 relative shadow-sm flex gap-4 items-center">
                        <img src={a.image} alt={a.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-gold-light" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-bold text-base text-[var(--ink)] truncate">{a.name}</h3>
                          <div className="text-xs text-[var(--royal)] font-semibold">{a.role}</div>
                          <div className="text-[11px] text-[var(--muted-foreground)] mt-1">{a.deals} deals · {a.experience}</div>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                          <button onClick={() => startEditAgent(a)} className="h-8 w-8 rounded-lg bg-luxe-soft text-[var(--royal)] hover:bg-[var(--royal)] hover:text-white flex items-center justify-center transition-colors">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => deleteAgent(a.id)} className="h-8 w-8 rounded-lg bg-luxe-soft text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inquiries Panel */}
              {activeTab === "inquiries" && (
                <div className="space-y-6">
                  <h2 className="font-display text-xl font-bold text-[var(--ink)]">Client Lead Submissions</h2>
                  <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="bg-luxe-soft border-b border-border text-[var(--ink)]/80 font-semibold uppercase text-xs">
                            <th className="p-4">Client Detail</th>
                            <th className="p-4">Contact Info</th>
                            <th className="p-4">Topic / Interest</th>
                            <th className="p-4">Message</th>
                            <th className="p-4">Date Recieved</th>
                            <th className="p-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inquiries.map((i) => (
                            <tr key={i.id} className="border-b border-border hover:bg-luxe-soft/40 transition-colors">
                              <td className="p-4 font-bold text-[var(--ink)]">{i.name}</td>
                              <td className="p-4 space-y-0.5">
                                <div className="text-xs text-[var(--ink)]/80">{i.email}</div>
                                <div className="text-xs text-[var(--muted-foreground)]">{i.phone}</div>
                              </td>
                              <td className="p-4">
                                <span className="px-2.5 py-1 text-[11px] font-semibold bg-[var(--royal)]/8 text-[var(--royal)] rounded-full">
                                  {i.interest}
                                </span>
                              </td>
                              <td className="p-4 max-w-xs truncate text-[var(--ink)]/70">{i.message}</td>
                              <td className="p-4 text-xs text-[var(--muted-foreground)]">
                                {new Date(i.createdAt).toLocaleString()}
                              </td>
                              <td className="p-4 text-center">
                                <button onClick={() => deleteInquiry(i.id)} className="text-red-500 hover:text-red-700 p-1">
                                  <Trash2 className="h-4 w-4 mx-auto" />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {inquiries.length === 0 && (
                            <tr>
                              <td colSpan={6} className="p-8 text-center text-[var(--muted-foreground)]">
                                No contact inquiry leads saved in the database yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Property Create/Edit Modal */}
      {propModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h3 className="font-display text-xl font-bold text-[var(--ink)]">
                {editingProp ? `Edit Property Listing: ${editingProp.title}` : "Add New Property Listing"}
              </h3>
              <button onClick={() => setPropModalOpen(false)} className="h-9 w-9 rounded-lg bg-luxe-soft flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handlePropSubmit} className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Property Title</label>
                  <input type="text" required value={propForm.title} onChange={(e) => setPropForm({ ...propForm, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Full Location Address</label>
                  <input type="text" required value={propForm.location} onChange={(e) => setPropForm({ ...propForm, location: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Area Name (e.g. DHA Phase 6)</label>
                  <input type="text" required value={propForm.areaName} onChange={(e) => setPropForm({ ...propForm, areaName: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Formatted Price (e.g. PKR 8.5 Cr)</label>
                  <input type="text" required value={propForm.price} onChange={(e) => setPropForm({ ...propForm, price: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Numeric Price Value (for sorting)</label>
                  <input type="number" required value={propForm.priceValue} onChange={(e) => setPropForm({ ...propForm, priceValue: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
              </div>

              <div className="grid sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Listing Type</label>
                  <select value={propForm.type} onChange={(e) => setPropForm({ ...propForm, type: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)]">
                    <option value="Sale">For Sale</option>
                    <option value="Rent">For Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Category</label>
                  <select value={propForm.category} onChange={(e) => setPropForm({ ...propForm, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)]">
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Farmhouse">Farmhouse</option>
                    <option value="Plot">Plot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Total Area (e.g. 2 Kanal)</label>
                  <input type="text" required value={propForm.area} onChange={(e) => setPropForm({ ...propForm, area: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Price per Sqft (Optional)</label>
                  <input type="text" value={propForm.pricePerSqft} onChange={(e) => setPropForm({ ...propForm, pricePerSqft: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
              </div>

              <div className="grid sm:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Beds</label>
                  <input type="number" required value={propForm.beds} onChange={(e) => setPropForm({ ...propForm, beds: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Baths</label>
                  <input type="number" required value={propForm.baths} onChange={(e) => setPropForm({ ...propForm, baths: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Parking</label>
                  <input type="number" value={propForm.parking} onChange={(e) => setPropForm({ ...propForm, parking: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Year Built</label>
                  <input type="number" required value={propForm.yearBuilt} onChange={(e) => setPropForm({ ...propForm, yearBuilt: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Listing Tag</label>
                  <select value={propForm.tag} onChange={(e) => setPropForm({ ...propForm, tag: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)]">
                    <option value="">None</option>
                    <option value="Signature">Signature</option>
                    <option value="New">New</option>
                    <option value="Hot Deal">Hot Deal</option>
                    <option value="Exclusive">Exclusive</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Main Cover Image URL</label>
                  <input type="text" required value={propForm.image} onChange={(e) => setPropForm({ ...propForm, image: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Assign Listing Agent</label>
                  <select required value={propForm.agentId} onChange={(e) => setPropForm({ ...propForm, agentId: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)]">
                    <option value="">-- Choose Agent --</option>
                    {agents.map((a) => <option key={a.id} value={a.id}>{a.name} ({a.role})</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Gallery Images (Comma separated URLs)</label>
                <input type="text" placeholder="/images/interior_kitchen.png, /images/interior_bedroom.png" value={propForm.gallery} onChange={(e) => setPropForm({ ...propForm, gallery: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Features / Amenities (Comma separated)</label>
                <input type="text" placeholder="Swimming Pool, Smart Automation, Backup Generator" value={propForm.features} onChange={(e) => setPropForm({ ...propForm, features: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Description</label>
                <textarea rows={4} required value={propForm.description} onChange={(e) => setPropForm({ ...propForm, description: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white resize-none" />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="featured" checked={propForm.featured} onChange={(e) => setPropForm({ ...propForm, featured: e.target.checked })} className="h-4 w-4 accent-[var(--royal)]" />
                <label htmlFor="featured" className="text-sm font-semibold text-[var(--ink)]">Feature this property on the homepage Collection</label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-border">
                <button type="button" onClick={() => setPropModalOpen(false)} className="px-5 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-luxe-soft transition-colors">Cancel</button>
                <button type="submit" className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold">Save Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Agent Create/Edit Modal */}
      {agentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-border flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h3 className="font-display text-xl font-bold text-[var(--ink)]">
                {editingAgent ? `Edit Advisor Profile: ${editingAgent.name}` : "Add New Advisor"}
              </h3>
              <button onClick={() => setAgentModalOpen(false)} className="h-9 w-9 rounded-lg bg-luxe-soft flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAgentSubmit} className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Full Name</label>
                  <input type="text" required value={agentForm.name} onChange={(e) => setAgentForm({ ...agentForm, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Role Title (e.g. Senior Advisor)</label>
                  <input type="text" required value={agentForm.role} onChange={(e) => setAgentForm({ ...agentForm, role: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Experience</label>
                  <input type="text" required value={agentForm.experience} onChange={(e) => setAgentForm({ ...agentForm, experience: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Deals Closed</label>
                  <input type="number" required value={agentForm.deals} onChange={(e) => setAgentForm({ ...agentForm, deals: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Sales Volume</label>
                  <input type="text" required value={agentForm.sales} onChange={(e) => setAgentForm({ ...agentForm, sales: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Phone Number</label>
                  <input type="text" required value={agentForm.phone} onChange={(e) => setAgentForm({ ...agentForm, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Email Address</label>
                  <input type="email" required value={agentForm.email} onChange={(e) => setAgentForm({ ...agentForm, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Profile Photo URL</label>
                <input type="text" required value={agentForm.image} onChange={(e) => setAgentForm({ ...agentForm, image: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Advisor Specialties (Comma separated)</label>
                <input type="text" value={agentForm.specialties} onChange={(e) => setAgentForm({ ...agentForm, specialties: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-1">Advisor Bio</label>
                <textarea rows={3} required value={agentForm.bio} onChange={(e) => setAgentForm({ ...agentForm, bio: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-luxe-soft text-sm focus:outline-none focus:border-[var(--royal)] focus:bg-white resize-none" />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-border">
                <button type="button" onClick={() => setAgentModalOpen(false)} className="px-5 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-luxe-soft transition-colors">Cancel</button>
                <button type="submit" className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold">Save Advisor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SiteShell>
  );
}
