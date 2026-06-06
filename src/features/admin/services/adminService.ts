import { api } from '@/lib/api/client';
import type { VehicleAsset, BlogPost, PendingTx, ReservationLog, HistoricalEarnings, AdminUser } from '../types';


export const fetchAdminFleet = async (): Promise<VehicleAsset[]> => {
  try {
    const res = await api.get<{ vehicles: any[] }>('/vehicles?limit=50');
    return res.vehicles.map((v: any) => ({
      id: v._id,
      modelName: `${v.make} ${v.model}`,
      plateNumber: v.plateNumber || '—',
      status: v.isAvailable ? 'Available' : 'On Rental',
      batteryOrFuel: v.fuelType || '—', 
      currentLocation: v.location || '—',
      imageUrl: v.images?.[0]?.url,
    }));
  } catch (error) {
    console.error('Failed to fetch fleet:', error);
    throw error;
  }
};

export const fetchAllBookings = async (): Promise<ReservationLog[]> => {
  const res = await api.get<{ bookings: any[] }>('/bookings?limit=100');
  return res.bookings.map((b: any) => ({
    id: b.id.toString(),
    clientName: `${b.user?.firstName || ''} ${b.user?.lastName || ''}`.trim(),
    vehicleModel: `${b.vehicle?.make || ''} ${b.vehicle?.model || ''}`.trim(),
    pickupDate: b.startDate ? new Date(b.startDate).toISOString().slice(0, 10) : '',
    returnDate: b.endDate ? new Date(b.endDate).toISOString().slice(0, 10) : '',
    allocationStatus: mapBookingStatus(b.status),
  }));
};

const mapBookingStatus = (status: string): 'Confirmed' | 'Pending Dispatch' | 'Completed' => {
  switch (status) {
    case 'confirmed': return 'Confirmed';
    case 'active': return 'Confirmed';
    case 'completed': return 'Completed';
    case 'pending': return 'Pending Dispatch';
    default: return 'Pending Dispatch';
  }
};

export const updateBookingStatus = async (bookingId: number, status: string): Promise<void> => {
  await api.patch(`/bookings/${bookingId}/status`, { status });
};

export const fetchHistoricalEarnings = async (): Promise<HistoricalEarnings> => {
  const res = await api.get<{ totalRevenue: number; currency: string }>('/analytics/revenue');
  const total = res.totalRevenue || 0;
  return {
    clearedGrossUSD: total,
    fiatWireVolumeUSD: 0,
    cryptoSettledUSD: 0,
  };
};

export const fetchPendingTransactions = async (): Promise<PendingTx[]> => {
  return [];
};

export const fetchAdminUsers = async (): Promise<AdminUser[]> => {
  try {
    const res = await api.get<{ users: AdminUser[] }>('/admin/users');
    return res.users;
  } catch (error) {
    console.warn('Admin users endpoint failed, using mock data');
    return [
      { id: 1, email: 'admin@carrental.com', firstName: 'Admin', lastName: 'User', phone: null, role: 'admin', isActive: true, createdAt: new Date().toISOString() },
      { id: 2, email: 'customer@example.com', firstName: 'John', lastName: 'Doe', phone: null, role: 'customer', isActive: true, createdAt: new Date().toISOString() },
    ];
  }
};

export const updateAdminUser = async (userId: number, data: { role?: string; isActive?: boolean }): Promise<AdminUser> => {
  try {
    const res = await api.patch<AdminUser>(`/admin/users/${userId}`, data);
    return res;
  } catch (error) {
    console.warn('Update failed, using mock');
    return { id: userId, ...data, email: 'mock@example.com', firstName: 'Mock', lastName: 'User', phone: null, isActive: true, createdAt: new Date().toISOString() } as AdminUser;
  }
};

export const deleteAdminUser = async (userId: number): Promise<void> => {
  try {
    await api.delete(`/admin/users/${userId}`);
  } catch (error) {
    console.warn('Delete failed – mock only');
  }
};

export const fetchAdminProfile = async (): Promise<AdminUser> => {
  const res = await api.get<{ user: AdminUser }>('/auth/me');
  return res.user;
};

export const updateAdminProfile = async (userId: number, data: { firstName?: string; lastName?: string; phone?: string }): Promise<AdminUser> => {
  const res = await api.patch<AdminUser>(`/admin/users/${userId}`, data);
  return res;
};

export const fetchOverviewStats = async () => {
  const res = await api.get<{
    bookings: { total: number; byStatus: Record<string, number> };
    revenue: { total: number; currency: string };
    users: { total: number };
    fleet: { total: number; available: number; unavailable: number };
  }>('/analytics/overview');
  return res;
};

export const fetchRevenueData = async (startDate?: string, endDate?: string) => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  const query = params.toString() ? `?${params}` : '';
  const res = await api.get<{
    period: { startDate: string; endDate: string };
    totalRevenue: number;
    currency: string;
    totalBookings: number;
    revenueByMonth: Array<{ month: string; revenue: number; bookings: number }>;
  }>(`/analytics/revenue${query}`);
  return res;
};

export const fetchMostBookedVehicles = async (limit = 5) => {
  const res = await api.get<{
    vehicles: Array<{
      vehicle: any;
      totalBookings: number;
      totalRevenue: number;
      currency: string;
    }>;
  }>(`/analytics/most-booked?limit=${limit}`);
  return res;
};

export const fetchFleetStats = async () => {
  const res = await api.get<{
    byCategory: Array<{ category: string; total: number; available: number }>;
    byFuelType: Array<{ fuelType: string; total: number }>;
    byTransmission: Array<{ transmission: string; total: number }>;
  }>('/analytics/fleet');
  return res;
};

export const fetchRecentBookings = async (limit = 10) => {
  const res = await api.get<{ bookings: any[] }>(`/analytics/recent-bookings?limit=${limit}`);
  return res;
};

export const createVehicle = async (formData: FormData): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://upbeat-smile-production.up.railway.app/api';
  const res = await fetch(`${baseUrl}/vehicles`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create vehicle');
  }
  const json = await res.json();
  return json.data.vehicle;
};

export const fetchVehicleById = async (id: string): Promise<any> => {
  const res = await api.get<{ vehicle: any }>(`/vehicles/${id}`);
  return res.vehicle;
};

export const updateVehicle = async (id: string, formData: FormData): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://upbeat-smile-production.up.railway.app/api';
  const res = await fetch(`${baseUrl}/vehicles/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update vehicle');
  }
  const json = await res.json();
  return json.data.vehicle;
};

export const deleteVehicleAsset = async (id: string): Promise<void> => {
  await api.delete(`/vehicles/${id}`);
};

export const fetchAdminBlogs = async (): Promise<BlogPost[]> => {
  const res = await api.get<{ blogs: any[] }>('/blog');
  return res.blogs.map((b: any) => ({
    id: b._id || b.id,
    title: b.title,
    category: b.category,
    publishedDate: b.publishedDate,
    author: b.author,
    status: b.status,
    content: b.content,
    coverUrl: b.coverUrl,
  }));
};

export const fetchBlogById = async (id: string): Promise<BlogPost> => {
  const res = await api.get<{ blog: any }>(`/blog/${id}`);
  const b = res.blog;
  return {
    id: b._id || b.id,
    title: b.title,
    category: b.category,
    publishedDate: b.publishedDate,
    author: b.author,
    status: b.status,
    content: b.content,
    coverUrl: b.coverUrl,
  };
};

export const createBlogPost = async (data: {
  title: string;
  category: string;
  status: string;
  content: string;
  excerpt: string;
  coverUrl: string;
  author: string;
  publishedDate: string;
}): Promise<BlogPost> => {
  const res = await api.post<{ blog: BlogPost }>('/blog', data);
  return res.blog;
};

export const updateBlogPost = async (id: string, data: {
  title: string;
  category: string;
  status: string;
  content: string;
  excerpt: string;
  coverUrl: string;
  author: string;
  publishedDate: string;
}): Promise<BlogPost> => {
  const res = await api.put<{ blog: BlogPost }>(`/blog/${id}`, data);
  return res.blog;
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  await api.delete(`/blog/${id}`);
};