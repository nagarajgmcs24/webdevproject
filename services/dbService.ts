
import { User, Report, UserRole, ReportStatus } from '../types';

const USERS_KEY = 'fmw_users';
const REPORTS_KEY = 'fmw_reports';

export const dbService = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUser: (user: User) => {
    const users = dbService.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  findUserByUsername: (username: string): User | undefined => {
    return dbService.getUsers().find(u => u.username === username);
  },

  getReports: (): Report[] => {
    const data = localStorage.getItem(REPORTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  getReportsByWard: (ward: string): Report[] => {
    return dbService.getReports().filter(r => r.ward === ward);
  },

  getReportsByCitizen: (citizenId: string): Report[] => {
    return dbService.getReports().filter(r => r.citizenId === citizenId);
  },

  addReport: (report: Report) => {
    const reports = dbService.getReports();
    reports.push(report);
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  },

  updateReportStatus: (reportId: string, status: ReportStatus) => {
    const reports = dbService.getReports();
    const index = reports.findIndex(r => r.id === reportId);
    if (index !== -1) {
      reports[index].status = status;
      localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
    }
  }
};
