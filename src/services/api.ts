import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

// ==========================================
// Type Definitions
// ==========================================

export interface Base {
  id?: number;
  name: string;
  location: string;
}

export interface Equipment {
  id?: number;
  name: string;
  category: string;
  quantity: number;
  base?: Base;
  equipmentType?: { id: number }; // Add this line
}

export interface Transfer {
  id?: number;
  fromBase?: Base;
  toBase?: Base;
  equipmentType?: {
    id: number;
    name?: string;
  };
  quantity: number;
  status: string;
  createdAt?: string;
}

export interface TransferRequestPayload {
  fromBaseId: number;
  toBaseId: number;
  equipmentTypeId: number;
  quantity: number;
  userId?: number;
}

// ==========================================
// Military Base Endpoints
// ==========================================

export const fetchBases = async (): Promise<Base[]> => {
  const response = await axios.get<Base[]>(`${API_BASE_URL}/bases`);
  return response.data;
};

export const createBase = async (baseData: { name: string; location: string }): Promise<Base> => {
  const response = await axios.post<Base>(`${API_BASE_URL}/bases`, baseData);
  return response.data;
};

export const updateBase = async (id: number, base: Base): Promise<Base> => {
  const response = await axios.put<Base>(`${API_BASE_URL}/bases/${id}`, base);
  return response.data;
};

export const deleteBase = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/bases/${id}`);
};

// ==========================================
// Equipment Inventory Endpoints
// ==========================================

export const fetchEquipment = async (): Promise<Equipment[]> => {
  const response = await axios.get<Equipment[]>(`${API_BASE_URL}/equipment`);
  return response.data;
};

export const createEquipment = async (equipment: Equipment): Promise<Equipment> => {
  const response = await axios.post<Equipment>(`${API_BASE_URL}/equipment`, equipment);
  return response.data;
};

export const updateEquipment = async (id: number, equipment: Equipment): Promise<Equipment> => {
  const response = await axios.put<Equipment>(`${API_BASE_URL}/equipment/${id}`, equipment);
  return response.data;
};

export const deleteEquipment = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/equipment/${id}`);
};

// ==========================================
// Transfer Management Endpoints
// ==========================================

export const fetchTransfers = async (): Promise<Transfer[]> => {
  const response = await axios.get<Transfer[]>(`${API_BASE_URL}/transfers`);
  return response.data;
};

export const createTransfer = async (payload: TransferRequestPayload): Promise<Transfer> => {
  const response = await axios.post<Transfer>(`${API_BASE_URL}/transfers`, payload);
  return response.data;
};

