
import React, { useState, useEffect, useRef } from 'react';
import { User, Report, ReportStatus } from '../../types';
import { dbService } from '../../services/dbService';
import { generateReportDescription } from '../../services/geminiService';
import { Plus, Camera, MapPin, Loader2, Sparkles, CheckCircle, Clock, XCircle, PlayCircle, Upload, X } from 'lucide-react';

interface CitizenDashboardProps {
  user: User;
}

const CitizenDashboard: React.FC<CitizenDashboardProps> = ({ user }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [showNewReport, setShowNewReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    setReports(dbService.getReportsByCitizen(user.id).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size too large. Please upload an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // AI Enrichment
    const enrichedDesc = await generateReportDescription(formData.shortDesc, user.ward || 'General');

    const newReport: Report = {
      id: crypto.randomUUID(),
      title: formData.title,
      description: enrichedDesc,
      ward: user.ward || 'General',
      citizenId: user.id,
      citizenName: user.fullName,
      status: ReportStatus.PENDING,
      createdAt: new Date().toISOString(),
      location: {
        lat: 12.9716, // Mock Bengaluru center
        lng: 77.5946,
        address: `${user.ward}, Bengaluru, Karnataka`
      },
      imageUrl: selectedImage || `https://picsum.photos/seed/${Math.random()}/600/400`
    };

    dbService.addReport(newReport);
    setLoading(false);
    setShowNewReport(false);
    setFormData({ title: '', shortDesc: '' });
    setSelectedImage(null);
    loadReports();
  };

  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.PENDING: return <Clock className="w-4 h-4 text-orange-500" />;
      case ReportStatus.STARTED: return <PlayCircle className="w-4 h-4 text-blue-500" />;
      case ReportStatus.COMPLETED: return <CheckCircle className="w-4 h-4 text-green-500" />;
      case ReportStatus.REJECTED: return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.PENDING: return 'bg-orange-50 text-orange-700 border-orange-100';
      case ReportStatus.STARTED: return 'bg-blue-50 text-blue-700 border-blue-100';
      case ReportStatus.COMPLETED: return 'bg-green-50 text-green-700 border-green-100';
      case ReportStatus.REJECTED: return 'bg-red-50 text-red-700 border-red-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Your Ward Reports</h1>
          <p className="text-slate-500">Managing issues in <span className="font-semibold text-indigo-600">{user.ward}</span></p>
        </div>
        <button
          onClick={() => setShowNewReport(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
        >
          <Plus className="w-5 h-5" />
          Report New Issue
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {reports.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No reports found</h3>
              <p className="text-slate-500 max-w-xs mx-auto mt-2">Start by reporting a problem you noticed in your neighborhood.</p>
            </div>
          ) : (
            reports.map(report => (
              <div key={report.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img src={report.imageUrl} className="h-48 md:h-full w-full object-cover" alt="Issue" />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getStatusColor(report.status)}`}>
                        {getStatusIcon(report.status)}
                        {report.status}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">{report.title}</h2>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4">{report.description}</p>
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                      {report.location.address}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-900 rounded-2xl p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">AI Status Checker</h3>
              <p className="text-indigo-200 text-sm mb-4">Our Gemini AI helps verify and structure your reports for faster councillor action.</p>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 w-fit">
                <Sparkles className="w-4 h-4 text-indigo-300" />
                <span className="text-xs font-medium">Auto-Formatting Active</span>
              </div>
            </div>
            <Sparkles className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Ward Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Active Reports</span>
                <span className="font-bold text-indigo-600">{reports.filter(r => r.status === ReportStatus.PENDING).length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Works in Progress</span>
                <span className="font-bold text-blue-600">{reports.filter(r => r.status === ReportStatus.STARTED).length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Resolved Today</span>
                <span className="font-bold text-green-600">{reports.filter(r => r.status === ReportStatus.COMPLETED).length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNewReport && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-8">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">Report Ward Issue</h2>
              <button onClick={() => { setShowNewReport(false); setSelectedImage(null); }} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <XCircle className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleReportSubmit} className="p-6 space-y-6">
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Camera className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-indigo-900">Visual Evidence</h4>
                  <p className="text-xs text-indigo-700/80">Gemini AI works best when you provide both a photo and a description.</p>
                </div>
              </div>

              {/* Photo Upload Area */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Photo of Issue</label>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                />
                
                {selectedImage ? (
                  <div className="relative rounded-xl overflow-hidden aspect-video border-2 border-indigo-100 shadow-inner group">
                    <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full text-red-600 hover:bg-white transition-all shadow-md"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                       <button 
                         type="button" 
                         onClick={() => fileInputRef.current?.click()}
                         className="px-4 py-2 bg-white text-indigo-600 font-bold rounded-lg text-sm flex items-center gap-2"
                       >
                         <Upload className="w-4 h-4" /> Change Photo
                       </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-slate-500 group"
                  >
                    <div className="p-3 bg-slate-50 rounded-full group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium">Click to upload or take a photo</span>
                    <span className="text-[10px] text-slate-400">Max size 5MB • JPG, PNG, HEIC</span>
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Issue Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Broken streetlight near park"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description / Quick Note</label>
                <textarea
                  required
                  placeholder="Describe what's wrong. Mention exact street or landmarks..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none h-32 resize-none"
                  value={formData.shortDesc}
                  onChange={e => setFormData({...formData, shortDesc: e.target.value})}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => { setShowNewReport(false); setSelectedImage(null); }}
                  className="flex-1 py-3.5 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      AI Formatting...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Submit Report
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitizenDashboard;
