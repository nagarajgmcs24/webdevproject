import React, { useState, useEffect } from 'react';
import { User, Report, ReportStatus } from '../../types';
import { dbService } from '../../services/dbService';
import { BENGALURU_WARDS } from '../../constants';
// Added Clock to the imports from lucide-react
import { Search, Filter, AlertTriangle, CheckCircle2, Play, Ban, MapPin, Users, Activity, Clock } from 'lucide-react';

interface CouncillorDashboardProps {
  user: User;
}

const CouncillorDashboard: React.FC<CouncillorDashboardProps> = ({ user }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportStatus | 'ALL'>('ALL');
  const wardInfo = BENGALURU_WARDS.find(w => w.name === user.ward);

  useEffect(() => {
    loadReports();
  }, [user.ward]);

  const loadReports = () => {
    const wardReports = dbService.getReportsByWard(user.ward || '');
    setReports(wardReports.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };

  const handleStatusChange = (id: string, status: ReportStatus) => {
    dbService.updateReportStatus(id, status);
    loadReports();
  };

  const filteredReports = filter === 'ALL' ? reports : reports.filter(r => r.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-slate-900">{reports.filter(r => r.status === ReportStatus.PENDING).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Play className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Ongoing</p>
              <p className="text-2xl font-bold text-slate-900">{reports.filter(r => r.status === ReportStatus.STARTED).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">Resolved</p>
              <p className="text-2xl font-bold text-slate-900">{reports.filter(r => r.status === ReportStatus.COMPLETED).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg shadow-indigo-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <p className="text-indigo-100 text-sm font-medium">Active Citizens</p>
              <p className="text-2xl font-bold">{[...new Set(reports.map(r => r.citizenId))].length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Councillor Workspace</h1>
          <p className="text-slate-500">
            Official dashboard for <span className="font-semibold text-indigo-600">{user.ward}</span> ({wardInfo?.area})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold outline-none focus:ring-4 focus:ring-indigo-500/10 min-w-[160px]"
              value={filter}
              onChange={e => setFilter(e.target.value as any)}
            >
              <option value="ALL">All Reports</option>
              <option value={ReportStatus.PENDING}>Pending Only</option>
              <option value={ReportStatus.STARTED}>In Progress</option>
              <option value={ReportStatus.COMPLETED}>Completed</option>
              <option value={ReportStatus.REJECTED}>Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center">
            <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800">Clear Workspace</h3>
            <p className="text-slate-500 mt-1">No reports matching the current filter.</p>
          </div>
        ) : (
          filteredReports.map(report => (
            <div key={report.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row animate-in slide-in-from-bottom-2 duration-300">
              <div className="md:w-64 flex-shrink-0 relative group">
                <img src={report.imageUrl} className="h-48 md:h-full w-full object-cover" alt="Issue" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="flex items-center gap-2 text-white text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    {report.ward}
                  </div>
                </div>
              </div>
              
              <div className="flex-grow p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-slate-900">{report.title}</h2>
                    <span className="text-xs font-medium text-slate-400">
                      Reported by {report.citizenName} • {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-3xl">
                    {report.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-50">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Update Status:</span>
                  
                  {report.status !== ReportStatus.PENDING && (
                    <button
                      onClick={() => handleStatusChange(report.id, ReportStatus.PENDING)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
                    >
                      <Clock className="w-4 h-4" />
                      Pending
                    </button>
                  )}

                  {report.status !== ReportStatus.STARTED && (
                    <button
                      onClick={() => handleStatusChange(report.id, ReportStatus.STARTED)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      Start Work
                    </button>
                  )}

                  {report.status !== ReportStatus.COMPLETED && (
                    <button
                      onClick={() => handleStatusChange(report.id, ReportStatus.COMPLETED)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark Completed
                    </button>
                  )}

                  {report.status !== ReportStatus.REJECTED && (
                    <button
                      onClick={() => handleStatusChange(report.id, ReportStatus.REJECTED)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <Ban className="w-4 h-4" />
                      Reject
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CouncillorDashboard;