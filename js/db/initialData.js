/**
 * Al-Muslim Group Garments Factory Maintenance Machine ERP
 * Rich Initial Master Data & Inventory Dataset
 * Real-World Hierarchy: Category -> Machine Name -> Multiple Brands -> Multiple Models -> Multiple Physical Machines
 */

import { DEFAULT_PERMISSION_TEMPLATES } from './schema.js';

export const INITIAL_DATA = {
  groups: [
    { id: 'grp-1', name: 'Al-Muslim Group', code: 'AMG', description: 'Premier Garments & Textile Conglomerate', status: 'ACTIVE' }
  ],

  units: [
    { id: 'unt-1', groupId: 'grp-1', name: 'AKM Knit Wear Ltd.', code: 'AKM', location: 'Savar, Dhaka', status: 'ACTIVE' },
    { id: 'unt-2', groupId: 'grp-1', name: 'Pacific Blue (Jeans Wear) Ltd.', code: 'PBJ', location: 'Ashulia, Dhaka', status: 'ACTIVE' },
    { id: 'unt-3', groupId: 'grp-1', name: 'Al-Muslim Apparels Ltd.', code: 'AMA', location: 'Savar, Dhaka', status: 'ACTIVE' },
    { id: 'unt-4', groupId: 'grp-1', name: 'Al-Muslim Garments Accessories Ltd', code: 'AGA', location: 'Gazipur, Dhaka', status: 'ACTIVE' },
    { id: 'unt-5', groupId: 'grp-1', name: 'Al-Muslim Fashion & Specilized Ltd.', code: 'AMFS', location: 'Savar, Dhaka', status: 'ACTIVE' }
  ],

  floors: [
    { id: 'flr-1', unitId: 'unt-1', name: 'Ground Floor', code: 'GF', building: 'Building 1', status: 'ACTIVE' },
    { id: 'flr-2', unitId: 'unt-1', name: '1st Floor', code: '1F', building: 'Building 1', status: 'ACTIVE' },
    { id: 'flr-3', unitId: 'unt-1', name: '2nd Floor', code: '2F', building: 'Building 1', status: 'ACTIVE' },
    { id: 'flr-4', unitId: 'unt-1', name: '3rd Floor', code: '3F', building: 'Building 1', status: 'ACTIVE' },
    { id: 'flr-5', unitId: 'unt-1', name: '4th Floor', code: '4F', building: 'Building 1', status: 'ACTIVE' },
    { id: 'flr-6', unitId: 'unt-1', name: '5th Floor', code: '5F', building: 'Building 1', status: 'ACTIVE' },
    { id: 'flr-7', unitId: 'unt-2', name: 'Jamuna Floor', code: 'JA', building: 'Denim Plant', status: 'ACTIVE' },
    { id: 'flr-8', unitId: 'unt-2', name: 'Buriganga Floor', code: 'BG', building: 'Denim Plant', status: 'ACTIVE' },
    { id: 'flr-9', unitId: 'unt-2', name: 'Padma Floor', code: 'PD', building: 'Denim Plant', status: 'ACTIVE' },
    { id: 'flr-10', unitId: 'unt-3', name: 'Main Production Floor', code: 'MPF', building: 'Apparel Complex', status: 'ACTIVE' },
    { id: 'flr-11', unitId: 'unt-3', name: 'Sample', code: 'SM', building: 'Design Wing', status: 'ACTIVE' },
    { id: 'flr-12', unitId: 'unt-4', name: 'Finishing & Utility Floor', code: 'FUF', building: 'Auxiliary Wing', status: 'ACTIVE' },
    { id: 'flr-13', unitId: 'unt-5', name: 'Specialized Sewing Floor', code: 'SSF', building: 'Fashion Complex', status: 'ACTIVE' },
    { id: 'flr-14', unitId: 'unt-5', name: 'Fashion & Finishing Floor', code: 'FFF', building: 'Fashion Complex', status: 'ACTIVE' },
    { id: 'flr-15', unitId: 'unt-2', name: 'Titas Floor', code: 'TT', building: 'Denim Plant', status: 'ACTIVE' },
    { id: 'flr-16', unitId: 'unt-2', name: 'Chitra Floor', code: 'CH', building: 'Denim Plant', status: 'ACTIVE' },
    { id: 'flr-17', unitId: 'unt-2', name: 'Tista Floor', code: 'TS', building: 'Denim Plant', status: 'ACTIVE' },
    { id: 'flr-20', unitId: 'unt-2', name: 'Surma Floor', code: 'SU', building: 'Denim Plant', status: 'ACTIVE' },
    { id: 'flr-21', unitId: 'unt-2', name: 'Meghna Floor', code: 'MG', building: 'Denim Plant', status: 'ACTIVE' },
    { id: 'flr-18', unitId: 'unt-3', name: 'Pilot', code: 'PT', building: 'Apparel Complex', status: 'ACTIVE' },
    { id: 'flr-19', unitId: 'unt-3', name: 'Model Line', code: 'ML', building: 'Apparel Complex', status: 'ACTIVE' }
  ],

  lines: [
      {
          "id": "lin-1",
          "floorId": "flr-4",
          "name": "3F-A",
          "code": "3F-A",
          "supervisor": "Md. Faruk Hossain",
          "status": "ACTIVE"
      },
      {
          "id": "lin-2",
          "floorId": "flr-4",
          "name": "3F-B",
          "code": "3F-B",
          "supervisor": "Md. Shahidul Islam",
          "status": "ACTIVE"
      },
      {
          "id": "lin-3",
          "floorId": "flr-4",
          "name": "3F-C",
          "code": "3F-C",
          "supervisor": "Kabir Ahmed",
          "status": "ACTIVE"
      },
      {
          "id": "lin-4",
          "floorId": "flr-5",
          "name": "4F-A",
          "code": "4F-A",
          "supervisor": "Tanvir Hasan",
          "status": "ACTIVE"
      },
      {
          "id": "lin-5",
          "floorId": "flr-5",
          "name": "4F-B",
          "code": "4F-B",
          "supervisor": "Sazzad Hossain",
          "status": "ACTIVE"
      },
      {
          "id": "lin-6",
          "floorId": "flr-6",
          "name": "5F-A",
          "code": "5F-A",
          "supervisor": "Md. Nazmul Huda",
          "status": "ACTIVE"
      },
      {
          "id": "lin-7",
          "floorId": "flr-6",
          "name": "5F-B",
          "code": "5F-B",
          "supervisor": "Anisur Rahman",
          "status": "ACTIVE"
      },
      {
          "id": "lin-8",
          "floorId": "flr-6",
          "name": "5F-C",
          "code": "5F-C",
          "supervisor": "Rezaul Karim",
          "status": "ACTIVE"
      },
      {
          "id": "lin-9",
          "floorId": "flr-7",
          "name": "JA-A",
          "code": "JA-A",
          "supervisor": "Golam Mostafa",
          "status": "ACTIVE"
      },
      {
          "id": "lin-10",
          "floorId": "flr-7",
          "name": "JA-B",
          "code": "JA-B",
          "supervisor": "Abdur Rahim",
          "status": "ACTIVE"
      },
      {
          "id": "lin-ja-ss",
          "floorId": "flr-7",
          "name": "JA-Size Set",
          "code": "JA-Size Set",
          "supervisor": "Line Master (Size Set)",
          "status": "ACTIVE"
      },
      {
          "id": "lin-ja-ey-apw",
          "floorId": "flr-7",
          "name": "JA-Eyelet & APW Room",
          "code": "JA-Eyelet & APW Room",
          "supervisor": "Eyelet & APW Room Specialist",
          "status": "ACTIVE"
      },
      {
          "id": "lin-11",
          "floorId": "flr-8",
          "name": "BG-A",
          "code": "BG-A",
          "supervisor": "Zahid Hasan",
          "status": "ACTIVE"
      },
      {
          "id": "lin-pd-a",
          "floorId": "flr-9",
          "name": "PD-A",
          "code": "PD-A",
          "supervisor": "Md. Shafiul Islam",
          "status": "ACTIVE"
      },
      {
          "id": "lin-pd-b",
          "floorId": "flr-9",
          "name": "PD-B",
          "code": "PD-B",
          "supervisor": "Md. Zahidul Haque",
          "status": "ACTIVE"
      },
      {
          "id": "lin-pd-c",
          "floorId": "flr-9",
          "name": "PD-C",
          "code": "PD-C",
          "supervisor": "Nurul Amin",
          "status": "ACTIVE"
      },
      {
          "id": "lin-12",
          "floorId": "flr-10",
          "name": "MPF-A",
          "code": "MPF-A",
          "supervisor": "Sharif Ahmed",
          "status": "ACTIVE"
      },
      {
          "id": "lin-13",
          "floorId": "flr-10",
          "name": "MPF-B",
          "code": "MPF-B",
          "supervisor": "Mahfuzur Rahman",
          "status": "ACTIVE"
      },
      {
          "id": "lin-14",
          "floorId": "flr-11",
          "name": "SM-A",
          "code": "SM-A",
          "supervisor": "Master Tailor Al-Amin",
          "status": "ACTIVE"
      },
      {
          "id": "lin-15",
          "floorId": "flr-1",
          "name": "GF-A",
          "code": "GF-A",
          "supervisor": "Engr. Sohel Rana",
          "status": "ACTIVE"
      },
      {
          "id": "lin-16",
          "floorId": "flr-13",
          "name": "SSF-A",
          "code": "SSF-A",
          "supervisor": "Tariqul Islam",
          "status": "ACTIVE"
      },
      {
          "id": "lin-17",
          "floorId": "flr-14",
          "name": "FFF-A",
          "code": "FFF-A",
          "supervisor": "Habibur Rahman",
          "status": "ACTIVE"
      },
      {
          "id": "lin-18",
          "floorId": "flr-15",
          "name": "TT-A",
          "code": "TT-A",
          "supervisor": "Md. Al-Amin",
          "status": "ACTIVE"
      },
      {
          "id": "lin-19",
          "floorId": "flr-16",
          "name": "CH-A",
          "code": "CH-A",
          "supervisor": "Md. Kamrul Hasan",
          "status": "ACTIVE"
      },
      {
          "id": "lin-20",
          "floorId": "flr-17",
          "name": "TS-A",
          "code": "TS-A",
          "supervisor": "Md. Monirul Islam",
          "status": "ACTIVE"
      },
      {
          "id": "lin-21",
          "floorId": "flr-18",
          "name": "PT-A",
          "code": "PT-A",
          "supervisor": "Engr. Sohel Rana",
          "status": "ACTIVE"
      },
      {
          "id": "lin-22",
          "floorId": "flr-19",
          "name": "ML-A",
          "code": "ML-A",
          "supervisor": "Md. Tariqul Islam",
          "status": "ACTIVE"
      },
      {
          "id": "lin-23",
          "floorId": "flr-20",
          "name": "SU-A",
          "code": "SU-A",
          "supervisor": "Md. Enamul Haque",
          "status": "ACTIVE"
      },
      {
          "id": "lin-24",
          "floorId": "flr-21",
          "name": "MG-A",
          "code": "MG-A",
          "supervisor": "Md. Asaduzzaman",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-21",
          "floorId": "flr-21",
          "name": "MG-Idle",
          "code": "MG-Idle",
          "supervisor": "Floor Maintenance Technician",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-1",
          "floorId": "flr-1",
          "name": "GF-Idle",
          "code": "GF-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-2",
          "floorId": "flr-2",
          "name": "1F-Idle",
          "code": "1F-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-3",
          "floorId": "flr-3",
          "name": "2F-Idle",
          "code": "2F-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-4",
          "floorId": "flr-4",
          "name": "3F-Idle",
          "code": "3F-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-5",
          "floorId": "flr-5",
          "name": "4F-Idle",
          "code": "4F-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-6",
          "floorId": "flr-6",
          "name": "5F-Idle",
          "code": "5F-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-7",
          "floorId": "flr-7",
          "name": "JA-Idle",
          "code": "JA-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-8",
          "floorId": "flr-8",
          "name": "BG-Idle",
          "code": "BG-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-9",
          "floorId": "flr-9",
          "name": "PD-Idle",
          "code": "PD-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-10",
          "floorId": "flr-10",
          "name": "MPF-Idle",
          "code": "MPF-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-11",
          "floorId": "flr-11",
          "name": "SM-Idle",
          "code": "SM-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-12",
          "floorId": "flr-12",
          "name": "FUF-Idle",
          "code": "FUF-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-13",
          "floorId": "flr-13",
          "name": "SSF-Idle",
          "code": "SSF-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-14",
          "floorId": "flr-14",
          "name": "FFF-Idle",
          "code": "FFF-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-15",
          "floorId": "flr-15",
          "name": "TT-Idle",
          "code": "TT-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-16",
          "floorId": "flr-16",
          "name": "CH-Idle",
          "code": "CH-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-17",
          "floorId": "flr-17",
          "name": "TS-Idle",
          "code": "TS-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-18",
          "floorId": "flr-18",
          "name": "PT-Idle",
          "code": "PT-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-19",
          "floorId": "flr-19",
          "name": "ML-Idle",
          "code": "ML-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-idl-20",
          "floorId": "flr-20",
          "name": "SU-Idle",
          "code": "SU-Idle",
          "supervisor": "Standby / Maintenance Pool",
          "status": "ACTIVE"
      },
      {
          "id": "lin-flr-7-c",
          "floorId": "flr-7",
          "name": "JA-C",
          "code": "JA-C",
          "supervisor": "Line Incharge (JA-C)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.563Z",
          "updatedAt": "2026-09-06T09:21:20.565Z"
      },
      {
          "id": "lin-flr-7-d",
          "floorId": "flr-7",
          "name": "JA-D",
          "code": "JA-D",
          "supervisor": "Line Incharge (JA-D)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.565Z",
          "updatedAt": "2026-09-06T09:21:20.565Z"
      },
      {
          "id": "lin-flr-7-e",
          "floorId": "flr-7",
          "name": "JA-E",
          "code": "JA-E",
          "supervisor": "Line Incharge (JA-E)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.565Z",
          "updatedAt": "2026-09-06T09:21:20.565Z"
      },
      {
          "id": "lin-flr-7-f",
          "floorId": "flr-7",
          "name": "JA-F",
          "code": "JA-F",
          "supervisor": "Line Incharge (JA-F)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.565Z",
          "updatedAt": "2026-09-06T09:21:20.565Z"
      },
      {
          "id": "lin-flr-7-g",
          "floorId": "flr-7",
          "name": "JA-G",
          "code": "JA-G",
          "supervisor": "Line Incharge (JA-G)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.565Z",
          "updatedAt": "2026-09-06T09:21:20.565Z"
      },
      {
          "id": "lin-flr-7-h",
          "floorId": "flr-7",
          "name": "JA-H",
          "code": "JA-H",
          "supervisor": "Line Incharge (JA-H)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.565Z",
          "updatedAt": "2026-09-06T09:21:20.565Z"
      },
      {
          "id": "lin-flr-7-i",
          "floorId": "flr-7",
          "name": "JA-I",
          "code": "JA-I",
          "supervisor": "Line Incharge (JA-I)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.565Z",
          "updatedAt": "2026-09-06T09:21:20.565Z"
      },
      {
          "id": "lin-flr-7-j",
          "floorId": "flr-7",
          "name": "JA-J",
          "code": "JA-J",
          "supervisor": "Line Incharge (JA-J)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.565Z",
          "updatedAt": "2026-09-06T09:21:20.565Z"
      },
      {
          "id": "lin-flr-7-k",
          "floorId": "flr-7",
          "name": "JA-K",
          "code": "JA-K",
          "supervisor": "Line Incharge (JA-K)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.565Z",
          "updatedAt": "2026-09-06T09:21:20.565Z"
      },
      {
          "id": "lin-flr-7-l",
          "floorId": "flr-7",
          "name": "JA-L",
          "code": "JA-L",
          "supervisor": "Line Incharge (JA-L)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.565Z",
          "updatedAt": "2026-09-06T09:21:20.565Z"
      },
      {
          "id": "lin-flr-7-m",
          "floorId": "flr-7",
          "name": "JA-M",
          "code": "JA-M",
          "supervisor": "Line Incharge (JA-M)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.565Z",
          "updatedAt": "2026-09-06T09:21:20.565Z"
      },
      {
          "id": "lin-flr-7-n",
          "floorId": "flr-7",
          "name": "JA-N",
          "code": "JA-N",
          "supervisor": "Line Incharge (JA-N)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.565Z",
          "updatedAt": "2026-09-06T09:21:20.565Z"
      },
      {
          "id": "lin-flr-7-p",
          "floorId": "flr-7",
          "name": "JA-P",
          "code": "JA-P",
          "supervisor": "Line Incharge (JA-P)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.565Z",
          "updatedAt": "2026-09-06T09:21:20.565Z"
      },
      {
          "id": "lin-flr-7-cutting",
          "floorId": "flr-7",
          "name": "JA-Cutting",
          "code": "JA-Cutting",
          "supervisor": "Cutting Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-7-finishing",
          "floorId": "flr-7",
          "name": "JA-Finishing",
          "code": "JA-Finishing",
          "supervisor": "Finishing Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-b",
          "floorId": "flr-8",
          "name": "BG-B",
          "code": "BG-B",
          "supervisor": "Line Incharge (BG-B)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-c",
          "floorId": "flr-8",
          "name": "BG-C",
          "code": "BG-C",
          "supervisor": "Line Incharge (BG-C)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-d",
          "floorId": "flr-8",
          "name": "BG-D",
          "code": "BG-D",
          "supervisor": "Line Incharge (BG-D)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-e",
          "floorId": "flr-8",
          "name": "BG-E",
          "code": "BG-E",
          "supervisor": "Line Incharge (BG-E)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-f",
          "floorId": "flr-8",
          "name": "BG-F",
          "code": "BG-F",
          "supervisor": "Line Incharge (BG-F)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-g",
          "floorId": "flr-8",
          "name": "BG-G",
          "code": "BG-G",
          "supervisor": "Line Incharge (BG-G)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-h",
          "floorId": "flr-8",
          "name": "BG-H",
          "code": "BG-H",
          "supervisor": "Line Incharge (BG-H)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-i",
          "floorId": "flr-8",
          "name": "BG-I",
          "code": "BG-I",
          "supervisor": "Line Incharge (BG-I)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-j",
          "floorId": "flr-8",
          "name": "BG-J",
          "code": "BG-J",
          "supervisor": "Line Incharge (BG-J)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-k",
          "floorId": "flr-8",
          "name": "BG-K",
          "code": "BG-K",
          "supervisor": "Line Incharge (BG-K)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-l",
          "floorId": "flr-8",
          "name": "BG-L",
          "code": "BG-L",
          "supervisor": "Line Incharge (BG-L)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-m",
          "floorId": "flr-8",
          "name": "BG-M",
          "code": "BG-M",
          "supervisor": "Line Incharge (BG-M)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-n",
          "floorId": "flr-8",
          "name": "BG-N",
          "code": "BG-N",
          "supervisor": "Line Incharge (BG-N)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-p",
          "floorId": "flr-8",
          "name": "BG-P",
          "code": "BG-P",
          "supervisor": "Line Incharge (BG-P)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-size-set",
          "floorId": "flr-8",
          "name": "BG-Size Set",
          "code": "BG-Size Set",
          "supervisor": "Size Set Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-eyelet---apw-room",
          "floorId": "flr-8",
          "name": "BG-Eyelet & APW Room",
          "code": "BG-Eyelet & APW Room",
          "supervisor": "Eyelet & APW Room Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-cutting",
          "floorId": "flr-8",
          "name": "BG-Cutting",
          "code": "BG-Cutting",
          "supervisor": "Cutting Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-8-finishing",
          "floorId": "flr-8",
          "name": "BG-Finishing",
          "code": "BG-Finishing",
          "supervisor": "Finishing Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-a",
          "floorId": "flr-9",
          "name": "PD-A",
          "code": "PD-A",
          "supervisor": "Line Incharge (PD-A)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-b",
          "floorId": "flr-9",
          "name": "PD-B",
          "code": "PD-B",
          "supervisor": "Line Incharge (PD-B)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-c",
          "floorId": "flr-9",
          "name": "PD-C",
          "code": "PD-C",
          "supervisor": "Line Incharge (PD-C)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-d",
          "floorId": "flr-9",
          "name": "PD-D",
          "code": "PD-D",
          "supervisor": "Line Incharge (PD-D)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-e",
          "floorId": "flr-9",
          "name": "PD-E",
          "code": "PD-E",
          "supervisor": "Line Incharge (PD-E)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-f",
          "floorId": "flr-9",
          "name": "PD-F",
          "code": "PD-F",
          "supervisor": "Line Incharge (PD-F)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-g",
          "floorId": "flr-9",
          "name": "PD-G",
          "code": "PD-G",
          "supervisor": "Line Incharge (PD-G)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-h",
          "floorId": "flr-9",
          "name": "PD-H",
          "code": "PD-H",
          "supervisor": "Line Incharge (PD-H)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-i",
          "floorId": "flr-9",
          "name": "PD-I",
          "code": "PD-I",
          "supervisor": "Line Incharge (PD-I)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-j",
          "floorId": "flr-9",
          "name": "PD-J",
          "code": "PD-J",
          "supervisor": "Line Incharge (PD-J)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-k",
          "floorId": "flr-9",
          "name": "PD-K",
          "code": "PD-K",
          "supervisor": "Line Incharge (PD-K)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-l",
          "floorId": "flr-9",
          "name": "PD-L",
          "code": "PD-L",
          "supervisor": "Line Incharge (PD-L)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-m",
          "floorId": "flr-9",
          "name": "PD-M",
          "code": "PD-M",
          "supervisor": "Line Incharge (PD-M)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-n",
          "floorId": "flr-9",
          "name": "PD-N",
          "code": "PD-N",
          "supervisor": "Line Incharge (PD-N)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-p",
          "floorId": "flr-9",
          "name": "PD-P",
          "code": "PD-P",
          "supervisor": "Line Incharge (PD-P)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-size-set",
          "floorId": "flr-9",
          "name": "PD-Size Set",
          "code": "PD-Size Set",
          "supervisor": "Size Set Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-eyelet---apw-room",
          "floorId": "flr-9",
          "name": "PD-Eyelet & APW Room",
          "code": "PD-Eyelet & APW Room",
          "supervisor": "Eyelet & APW Room Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-cutting",
          "floorId": "flr-9",
          "name": "PD-Cutting",
          "code": "PD-Cutting",
          "supervisor": "Cutting Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-9-finishing",
          "floorId": "flr-9",
          "name": "PD-Finishing",
          "code": "PD-Finishing",
          "supervisor": "Finishing Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-b",
          "floorId": "flr-15",
          "name": "TT-B",
          "code": "TT-B",
          "supervisor": "Line Incharge (TT-B)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-c",
          "floorId": "flr-15",
          "name": "TT-C",
          "code": "TT-C",
          "supervisor": "Line Incharge (TT-C)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-d",
          "floorId": "flr-15",
          "name": "TT-D",
          "code": "TT-D",
          "supervisor": "Line Incharge (TT-D)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-e",
          "floorId": "flr-15",
          "name": "TT-E",
          "code": "TT-E",
          "supervisor": "Line Incharge (TT-E)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-f",
          "floorId": "flr-15",
          "name": "TT-F",
          "code": "TT-F",
          "supervisor": "Line Incharge (TT-F)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-g",
          "floorId": "flr-15",
          "name": "TT-G",
          "code": "TT-G",
          "supervisor": "Line Incharge (TT-G)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-h",
          "floorId": "flr-15",
          "name": "TT-H",
          "code": "TT-H",
          "supervisor": "Line Incharge (TT-H)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-i",
          "floorId": "flr-15",
          "name": "TT-I",
          "code": "TT-I",
          "supervisor": "Line Incharge (TT-I)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-j",
          "floorId": "flr-15",
          "name": "TT-J",
          "code": "TT-J",
          "supervisor": "Line Incharge (TT-J)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-k",
          "floorId": "flr-15",
          "name": "TT-K",
          "code": "TT-K",
          "supervisor": "Line Incharge (TT-K)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-l",
          "floorId": "flr-15",
          "name": "TT-L",
          "code": "TT-L",
          "supervisor": "Line Incharge (TT-L)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-m",
          "floorId": "flr-15",
          "name": "TT-M",
          "code": "TT-M",
          "supervisor": "Line Incharge (TT-M)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-n",
          "floorId": "flr-15",
          "name": "TT-N",
          "code": "TT-N",
          "supervisor": "Line Incharge (TT-N)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-p",
          "floorId": "flr-15",
          "name": "TT-P",
          "code": "TT-P",
          "supervisor": "Line Incharge (TT-P)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-size-set",
          "floorId": "flr-15",
          "name": "TT-Size Set",
          "code": "TT-Size Set",
          "supervisor": "Size Set Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-eyelet---apw-room",
          "floorId": "flr-15",
          "name": "TT-Eyelet & APW Room",
          "code": "TT-Eyelet & APW Room",
          "supervisor": "Eyelet & APW Room Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-cutting",
          "floorId": "flr-15",
          "name": "TT-Cutting",
          "code": "TT-Cutting",
          "supervisor": "Cutting Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-15-finishing",
          "floorId": "flr-15",
          "name": "TT-Finishing",
          "code": "TT-Finishing",
          "supervisor": "Finishing Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-b",
          "floorId": "flr-16",
          "name": "CH-B",
          "code": "CH-B",
          "supervisor": "Line Incharge (CH-B)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-c",
          "floorId": "flr-16",
          "name": "CH-C",
          "code": "CH-C",
          "supervisor": "Line Incharge (CH-C)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-d",
          "floorId": "flr-16",
          "name": "CH-D",
          "code": "CH-D",
          "supervisor": "Line Incharge (CH-D)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-e",
          "floorId": "flr-16",
          "name": "CH-E",
          "code": "CH-E",
          "supervisor": "Line Incharge (CH-E)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-f",
          "floorId": "flr-16",
          "name": "CH-F",
          "code": "CH-F",
          "supervisor": "Line Incharge (CH-F)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-g",
          "floorId": "flr-16",
          "name": "CH-G",
          "code": "CH-G",
          "supervisor": "Line Incharge (CH-G)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-h",
          "floorId": "flr-16",
          "name": "CH-H",
          "code": "CH-H",
          "supervisor": "Line Incharge (CH-H)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-i",
          "floorId": "flr-16",
          "name": "CH-I",
          "code": "CH-I",
          "supervisor": "Line Incharge (CH-I)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-j",
          "floorId": "flr-16",
          "name": "CH-J",
          "code": "CH-J",
          "supervisor": "Line Incharge (CH-J)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-k",
          "floorId": "flr-16",
          "name": "CH-K",
          "code": "CH-K",
          "supervisor": "Line Incharge (CH-K)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-l",
          "floorId": "flr-16",
          "name": "CH-L",
          "code": "CH-L",
          "supervisor": "Line Incharge (CH-L)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-m",
          "floorId": "flr-16",
          "name": "CH-M",
          "code": "CH-M",
          "supervisor": "Line Incharge (CH-M)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-n",
          "floorId": "flr-16",
          "name": "CH-N",
          "code": "CH-N",
          "supervisor": "Line Incharge (CH-N)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-p",
          "floorId": "flr-16",
          "name": "CH-P",
          "code": "CH-P",
          "supervisor": "Line Incharge (CH-P)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-size-set",
          "floorId": "flr-16",
          "name": "CH-Size Set",
          "code": "CH-Size Set",
          "supervisor": "Size Set Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-eyelet---apw-room",
          "floorId": "flr-16",
          "name": "CH-Eyelet & APW Room",
          "code": "CH-Eyelet & APW Room",
          "supervisor": "Eyelet & APW Room Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-cutting",
          "floorId": "flr-16",
          "name": "CH-Cutting",
          "code": "CH-Cutting",
          "supervisor": "Cutting Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-16-finishing",
          "floorId": "flr-16",
          "name": "CH-Finishing",
          "code": "CH-Finishing",
          "supervisor": "Finishing Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-b",
          "floorId": "flr-17",
          "name": "TS-B",
          "code": "TS-B",
          "supervisor": "Line Incharge (TS-B)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-c",
          "floorId": "flr-17",
          "name": "TS-C",
          "code": "TS-C",
          "supervisor": "Line Incharge (TS-C)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-d",
          "floorId": "flr-17",
          "name": "TS-D",
          "code": "TS-D",
          "supervisor": "Line Incharge (TS-D)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-e",
          "floorId": "flr-17",
          "name": "TS-E",
          "code": "TS-E",
          "supervisor": "Line Incharge (TS-E)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-f",
          "floorId": "flr-17",
          "name": "TS-F",
          "code": "TS-F",
          "supervisor": "Line Incharge (TS-F)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-g",
          "floorId": "flr-17",
          "name": "TS-G",
          "code": "TS-G",
          "supervisor": "Line Incharge (TS-G)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-h",
          "floorId": "flr-17",
          "name": "TS-H",
          "code": "TS-H",
          "supervisor": "Line Incharge (TS-H)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-i",
          "floorId": "flr-17",
          "name": "TS-I",
          "code": "TS-I",
          "supervisor": "Line Incharge (TS-I)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-j",
          "floorId": "flr-17",
          "name": "TS-J",
          "code": "TS-J",
          "supervisor": "Line Incharge (TS-J)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-k",
          "floorId": "flr-17",
          "name": "TS-K",
          "code": "TS-K",
          "supervisor": "Line Incharge (TS-K)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-l",
          "floorId": "flr-17",
          "name": "TS-L",
          "code": "TS-L",
          "supervisor": "Line Incharge (TS-L)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-m",
          "floorId": "flr-17",
          "name": "TS-M",
          "code": "TS-M",
          "supervisor": "Line Incharge (TS-M)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-n",
          "floorId": "flr-17",
          "name": "TS-N",
          "code": "TS-N",
          "supervisor": "Line Incharge (TS-N)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-p",
          "floorId": "flr-17",
          "name": "TS-P",
          "code": "TS-P",
          "supervisor": "Line Incharge (TS-P)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-size-set",
          "floorId": "flr-17",
          "name": "TS-Size Set",
          "code": "TS-Size Set",
          "supervisor": "Size Set Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-eyelet---apw-room",
          "floorId": "flr-17",
          "name": "TS-Eyelet & APW Room",
          "code": "TS-Eyelet & APW Room",
          "supervisor": "Eyelet & APW Room Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-cutting",
          "floorId": "flr-17",
          "name": "TS-Cutting",
          "code": "TS-Cutting",
          "supervisor": "Cutting Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-17-finishing",
          "floorId": "flr-17",
          "name": "TS-Finishing",
          "code": "TS-Finishing",
          "supervisor": "Finishing Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-b",
          "floorId": "flr-20",
          "name": "SU-B",
          "code": "SU-B",
          "supervisor": "Line Incharge (SU-B)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-c",
          "floorId": "flr-20",
          "name": "SU-C",
          "code": "SU-C",
          "supervisor": "Line Incharge (SU-C)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-d",
          "floorId": "flr-20",
          "name": "SU-D",
          "code": "SU-D",
          "supervisor": "Line Incharge (SU-D)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-e",
          "floorId": "flr-20",
          "name": "SU-E",
          "code": "SU-E",
          "supervisor": "Line Incharge (SU-E)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-f",
          "floorId": "flr-20",
          "name": "SU-F",
          "code": "SU-F",
          "supervisor": "Line Incharge (SU-F)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-g",
          "floorId": "flr-20",
          "name": "SU-G",
          "code": "SU-G",
          "supervisor": "Line Incharge (SU-G)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-h",
          "floorId": "flr-20",
          "name": "SU-H",
          "code": "SU-H",
          "supervisor": "Line Incharge (SU-H)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-i",
          "floorId": "flr-20",
          "name": "SU-I",
          "code": "SU-I",
          "supervisor": "Line Incharge (SU-I)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-j",
          "floorId": "flr-20",
          "name": "SU-J",
          "code": "SU-J",
          "supervisor": "Line Incharge (SU-J)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-k",
          "floorId": "flr-20",
          "name": "SU-K",
          "code": "SU-K",
          "supervisor": "Line Incharge (SU-K)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-l",
          "floorId": "flr-20",
          "name": "SU-L",
          "code": "SU-L",
          "supervisor": "Line Incharge (SU-L)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-m",
          "floorId": "flr-20",
          "name": "SU-M",
          "code": "SU-M",
          "supervisor": "Line Incharge (SU-M)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-n",
          "floorId": "flr-20",
          "name": "SU-N",
          "code": "SU-N",
          "supervisor": "Line Incharge (SU-N)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-p",
          "floorId": "flr-20",
          "name": "SU-P",
          "code": "SU-P",
          "supervisor": "Line Incharge (SU-P)",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-size-set",
          "floorId": "flr-20",
          "name": "SU-Size Set",
          "code": "SU-Size Set",
          "supervisor": "Size Set Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-eyelet---apw-room",
          "floorId": "flr-20",
          "name": "SU-Eyelet & APW Room",
          "code": "SU-Eyelet & APW Room",
          "supervisor": "Eyelet & APW Room Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-cutting",
          "floorId": "flr-20",
          "name": "SU-Cutting",
          "code": "SU-Cutting",
          "supervisor": "Cutting Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      },
      {
          "id": "lin-flr-20-finishing",
          "floorId": "flr-20",
          "name": "SU-Finishing",
          "code": "SU-Finishing",
          "supervisor": "Finishing Supervisor",
          "status": "ACTIVE",
          "createdAt": "2026-09-06T09:21:20.566Z",
          "updatedAt": "2026-09-06T09:21:20.566Z"
      }
  ],

  categories: [
    { id: 'cat-1', name: 'Sewing Machines', code: 'SEW', description: 'Production floor stitching & sewing equipment', status: 'ACTIVE' },
    { id: 'cat-2', name: 'Cutting Machines', code: 'CUT', description: 'CAD/CAM and manual knife cutting tools', status: 'ACTIVE' },
    { id: 'cat-3', name: 'Finishing & Pressing', code: 'FIN', description: 'Steam irons, vacuum tables, continuous fusing', status: 'ACTIVE' },
    { id: 'cat-4', name: 'Heavy Utility & Power', code: 'UTL', description: 'Steam Boilers, Rotary Compressors, Generators', status: 'ACTIVE' },
    { id: 'cat-5', name: 'Specialty & Quality Assurance', code: 'SPC', description: 'Conveyor Needle detectors, snap testers, trimmers', status: 'ACTIVE' }
  ],

  machine_names: [
    { id: 'mn-1', categoryId: 'cat-1', name: 'Plane Machine', code: 'PM', description: 'Single Needle Direct Drive Plain Lockstitch', status: 'ACTIVE' },
    { id: 'mn-2', categoryId: 'cat-1', name: 'Overlock Machine', code: 'OL', description: '3/4/5 Thread High Speed Overedging Machine', status: 'ACTIVE' },
    { id: 'mn-3', categoryId: 'cat-1', name: 'Flatlock / Interlock', code: 'FL', description: 'Cylinder Bed / Flat Bed Interlock Stitch', status: 'ACTIVE' },
    { id: 'mn-4', categoryId: 'cat-1', name: 'Kansai Special / Multi-Needle', code: 'KS', description: 'Multi-needle Chainstitch Waistband Machine', status: 'ACTIVE' },
    { id: 'mn-5', categoryId: 'cat-1', name: 'Bartack Machine', code: 'BT', description: 'Computerized Electronic Bartacking Machine', status: 'ACTIVE' },
    { id: 'mn-6', categoryId: 'cat-1', name: 'Button Hole Machine', code: 'BH', description: 'Electronic Indexer Eyelet & Straight Buttonholer', status: 'ACTIVE' },
    { id: 'mn-7', categoryId: 'cat-1', name: 'Button Attach Machine', code: 'BA', description: 'Direct Drive Electronic Button Attaching', status: 'ACTIVE' },
    { id: 'mn-8', categoryId: 'cat-1', name: 'Feed of the Arm', code: 'FOA', description: '3-Needle Feed-off-the-Arm Lap Seaming Machine', status: 'ACTIVE' },
    { id: 'mn-9', categoryId: 'cat-3', name: 'Fusing Machine', code: 'FUS', description: 'Continuous Rotary Belt Interlining Press', status: 'ACTIVE' },
    { id: 'mn-10', categoryId: 'cat-2', name: 'Auto Cutting Machine', code: 'ACM', description: 'Computerized Multi-Ply Fabric Cutter', status: 'ACTIVE' },
    { id: 'mn-11', categoryId: 'cat-2', name: 'Fabric Spreading Machine', code: 'FSM', description: 'Automatic Tension-Free Spreader', status: 'ACTIVE' },
    { id: 'mn-12', categoryId: 'cat-3', name: 'Steam Iron Station', code: 'SIS', description: 'Vacuum & Blowing Ironing Table with Steam Boiler', status: 'ACTIVE' },
    { id: 'mn-13', categoryId: 'cat-4', name: 'Boiler', code: 'BLR', description: 'Gas/Diesel Fired High Pressure Steam Boiler', status: 'ACTIVE' },
    { id: 'mn-14', categoryId: 'cat-4', name: 'Air Compressor', code: 'CMP', description: 'Rotary Screw Industrial Air Compressor', status: 'ACTIVE' },
    { id: 'mn-15', categoryId: 'cat-4', name: 'Diesel Generator', code: 'GEN', description: 'Prime Power Heavy Duty Diesel Generator', status: 'ACTIVE' },
    { id: 'mn-16', categoryId: 'cat-5', name: 'Needle Detector', code: 'NDT', description: 'Conveyorized High Sensitivity Metal Detector', status: 'ACTIVE' }
  ],

  brands: [],

  // Models explicitly linked to both machineNameId AND brandId
  models: [
    // 1. Plane Machine (mn-1) -> Multiple Brands & Models
    // Under JUKI (brd-1)
    { id: 'mdl-1', brandId: 'brd-1', machineNameId: 'mn-1', name: 'DDL-8700-7', description: '1-Needle Lockstitch High Speed 5500 RPM with Trimmer', status: 'ACTIVE' },
    { id: 'mdl-2', brandId: 'brd-1', machineNameId: 'mn-1', name: 'DDL-9000 Series', description: 'Direct-drive Semi-Dry Head Digital Sewing System', status: 'ACTIVE' },
    { id: 'mdl-3', brandId: 'brd-1', machineNameId: 'mn-1', name: 'DDL-900BB & C', description: 'Direct-drive High Speed 1-needle Lockstitch', status: 'ACTIVE' },
    { id: 'mdl-4', brandId: 'brd-1', machineNameId: 'mn-1', name: 'DDL-8000 Series', description: 'Direct Drive Smart Lockstitch with Voice Guide', status: 'ACTIVE' },
    
    // Under JACK (brd-13)
    { id: 'mdl-5', brandId: 'brd-13', machineNameId: 'mn-1', name: 'A4 Direct Drive', description: 'Computerized Lockstitch Machine with Speaker Guidance', status: 'ACTIVE' },
    { id: 'mdl-6', brandId: 'brd-13', machineNameId: 'mn-1', name: 'A5E-A Computerized', description: 'Smart Thread Trimming Direct Drive Lockstitch', status: 'ACTIVE' },
    { id: 'mdl-7', brandId: 'brd-13', machineNameId: 'mn-1', name: 'F4 High Speed', description: 'Energy Saving Direct Drive Plain Machine', status: 'ACTIVE' },

    // Under TYPICAL (brd-14)
    { id: 'mdl-8', brandId: 'brd-14', machineNameId: 'mn-1', name: 'GC-6720', description: 'Direct Drive High Speed 1-Needle Lockstitch', status: 'ACTIVE' },
    { id: 'mdl-9', brandId: 'brd-14', machineNameId: 'mn-1', name: 'GC-6150MD', description: 'Single Needle Heavy Duty Lockstitch', status: 'ACTIVE' },

    // Under BROTHER (brd-2)
    { id: 'mdl-10', brandId: 'brd-2', machineNameId: 'mn-1', name: 'S-7200C', description: 'Direct Drive Electronic Lockstitch with Thread Trimmer', status: 'ACTIVE' },
    { id: 'mdl-11', brandId: 'brd-2', machineNameId: 'mn-1', name: 'S-7300A Nexio', description: 'Electronic Direct Drive Lockstitch with Digiflex', status: 'ACTIVE' },

    // 2. Overlock Machine (mn-2) -> Multiple Brands & Models
    { id: 'mdl-12', brandId: 'brd-1', machineNameId: 'mn-2', name: 'MO-6800 Series', description: 'High-speed 4-Thread Overlock Industrial Machine', status: 'ACTIVE' },
    { id: 'mdl-13', brandId: 'brd-1', machineNameId: 'mn-2', name: 'MO-6714S', description: 'Semi-dry Direct Drive 4-Thread Overlock', status: 'ACTIVE' },
    { id: 'mdl-14', brandId: 'brd-3', machineNameId: 'mn-2', name: 'M952-52', description: 'Ultra High Speed 4-Thread Overlock 7000 RPM', status: 'ACTIVE' },
    { id: 'mdl-15', brandId: 'brd-3', machineNameId: 'mn-2', name: 'EX5200 Ultra Speed', description: 'Advanced Direct Drive Overedge Machine', status: 'ACTIVE' },
    { id: 'mdl-16', brandId: 'brd-9', machineNameId: 'mn-2', name: '747K Super Speed', description: '4-Thread Direct Drive Overlock', status: 'ACTIVE' },
    { id: 'mdl-17', brandId: 'brd-13', machineNameId: 'mn-2', name: 'C4-4 Automatic', description: 'Fully Automatic Voice-guided Overlock', status: 'ACTIVE' },

    // 3. Flatlock / Interlock (mn-3) -> Multiple Brands & Models
    { id: 'mdl-18', brandId: 'brd-4', machineNameId: 'mn-3', name: 'VG2700', description: 'High Speed 3-Needle Cylinder Bed Interlock Machine', status: 'ACTIVE' },
    { id: 'mdl-19', brandId: 'brd-4', machineNameId: 'mn-3', name: 'VT1500 Flat Bed', description: 'Top and Bottom Coverstitch Interlock', status: 'ACTIVE' },
    { id: 'mdl-20', brandId: 'brd-3', machineNameId: 'mn-3', name: 'W500PV Flatbed', description: 'Oil Barrier Flatbed Interlock Flatlock', status: 'ACTIVE' },
    { id: 'mdl-21', brandId: 'brd-1', machineNameId: 'mn-3', name: 'MF-7923', description: 'Cylinder-bed High-speed Flatlock Interlock', status: 'ACTIVE' },

    // 4. Kansai Special (mn-4)
    { id: 'mdl-22', brandId: 'brd-5', machineNameId: 'mn-4', name: 'DLR-1508P', description: '4-Needle Flatbed Multi-Needle Waistband Machine', status: 'ACTIVE' },
    { id: 'mdl-23', brandId: 'brd-5', machineNameId: 'mn-4', name: 'FX-4412P', description: '12-Needle Cylinder Bed Chainstitch Machine', status: 'ACTIVE' },

    // 5. Bartack Machine (mn-5)
    { id: 'mdl-24', brandId: 'brd-1', machineNameId: 'mn-5', name: 'LK-1900BN', description: 'Computer-controlled Electronic Bartacking Machine', status: 'ACTIVE' },
    { id: 'mdl-25', brandId: 'brd-2', machineNameId: 'mn-5', name: 'KE-430FS', description: 'Electronic Direct Drive Bartacker with Clean Sewing', status: 'ACTIVE' },
    { id: 'mdl-26', brandId: 'brd-13', machineNameId: 'mn-5', name: 'JK-1900BS', description: 'Direct Drive Electronic Pattern Bartacker', status: 'ACTIVE' },

    // 6. Button Hole Machine (mn-6)
    { id: 'mdl-27', brandId: 'brd-1', machineNameId: 'mn-6', name: 'LBH-1790AN', description: 'Computer-controlled High-speed Buttonholing', status: 'ACTIVE' },
    { id: 'mdl-28', brandId: 'brd-2', machineNameId: 'mn-6', name: 'HE-800C', description: 'Electronic Direct Drive Buttonholer', status: 'ACTIVE' },
    { id: 'mdl-29', brandId: 'brd-13', machineNameId: 'mn-6', name: 'JK-T1790', description: 'Smart Electronic Eyelet Buttonholing Machine', status: 'ACTIVE' },

    // 7. Button Attach Machine (mn-7)
    { id: 'mdl-30', brandId: 'brd-1', machineNameId: 'mn-7', name: 'MB-373', description: 'Single-thread Chainstitch Button Sewing Machine', status: 'ACTIVE' },

    // 8. Utility & Cutting Equipment
    { id: 'mdl-31', brandId: 'brd-6', machineNameId: 'mn-9', name: 'HP-450MS', description: 'Continuous Fusing Press with Electronic Temp Control', status: 'ACTIVE' },
    { id: 'mdl-32', brandId: 'brd-7', machineNameId: 'mn-10', name: '629X Blue Streak II', description: 'Straight Knife Heavy Duty Fabric Cutting Machine', status: 'ACTIVE' },
    { id: 'mdl-33', brandId: 'brd-8', machineNameId: 'mn-10', name: 'Next 70 CNC', description: 'Automatic High-Ply CNC Cutting System', status: 'ACTIVE' },
    { id: 'mdl-34', brandId: 'brd-10', machineNameId: 'mn-14', name: 'CSD 75 Sigma', description: 'Rotary Screw Compressor 75kW with Sigma Profile', status: 'ACTIVE' },
    { id: 'mdl-35', brandId: 'brd-11', machineNameId: 'mn-15', name: '3412 Diesel 500kVA', description: 'Heavy Duty 500kVA Industrial Diesel Generator', status: 'ACTIVE' },
    { id: 'mdl-36', brandId: 'brd-6', machineNameId: 'mn-16', name: 'HN-880C Conveyor', description: 'Conveyor High Sensitivity Metal & Needle Detector', status: 'ACTIVE' }
  ],

  custom_fields: [
    { id: 'cf-1', code: 'motor_hp', label: 'Motor HP', type: 'DECIMAL', required: false, options: [], order: 1, showInTable: true, showInFilter: true, status: 'ACTIVE' },
    { id: 'cf-2', code: 'max_rpm', label: 'Max RPM', type: 'NUMBER', required: false, options: [], order: 2, showInTable: true, showInFilter: true, status: 'ACTIVE' },
    { id: 'cf-3', code: 'voltage', label: 'Operating Voltage', type: 'DROPDOWN', required: true, options: ['220V Single Phase', '380V 3-Phase', '415V 3-Phase', '110V AC'], order: 3, showInTable: true, showInFilter: true, status: 'ACTIVE' },
    { id: 'cf-4', code: 'needle_gauge', label: 'Needle Gauge / System', type: 'TEXT', required: false, options: [], order: 4, showInTable: true, showInFilter: false, status: 'ACTIVE' },
    { id: 'cf-5', code: 'bed_type', label: 'Bed Type', type: 'DROPDOWN', required: false, options: ['Flat Bed', 'Cylinder Bed', 'Post Bed', 'Feed-off-the-arm'], order: 5, showInTable: false, showInFilter: true, status: 'ACTIVE' },
    { id: 'cf-6', code: 'lubrication', label: 'Lubrication System', type: 'DROPDOWN', required: false, options: ['Fully Automatic Semi-Dry', 'Oil Bath', 'Micro-quantity Direct', 'Sealed Dry Head'], order: 6, showInTable: false, showInFilter: true, status: 'ACTIVE' },
    { id: 'cf-7', code: 'supplier', label: 'Supplier / Vendor', type: 'DROPDOWN', required: false, options: ['Juki Singapore Pte Ltd', 'Brother International Corp', 'Jack Sewing Machine Co.', 'Typical International', 'Pacific Associates Ltd'], order: 7, showInTable: false, showInFilter: true, status: 'ACTIVE' },
    { id: 'cf-8', code: 'purchase_date', label: 'Purchase Date', type: 'DATE', required: false, options: [], order: 8, showInTable: true, showInFilter: false, status: 'ACTIVE' },
    { id: 'cf-9', code: 'warranty_expiry', label: 'Warranty Expiry', type: 'DATE', required: false, options: [], order: 9, showInTable: false, showInFilter: false, status: 'ACTIVE' },
    { id: 'cf-10', code: 'maintenance_freq', label: 'Maintenance Frequency', type: 'DROPDOWN', required: false, options: ['Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Biannual'], order: 10, showInTable: true, showInFilter: true, status: 'ACTIVE' }
  ],

  import_history: [
    {
      id: 'imp-1',
      fileName: 'AlMuslim_Plant_Machinery_Master.xlsx',
      importedAt: '2026-08-20T08:30:00Z',
      importedBy: 'superadmin',
      mode: 'NEW_INSERT',
      totalRows: 175,
      validRows: 175,
      invalidRows: 0,
      duplicateRows: 0,
      status: 'COMPLETED'
    }
  ],

  roles: [
    {
      id: 'role-super-admin',
      code: 'SUPER_ADMIN',
      name: 'Super Administrator',
      description: 'Master system authority with unrestricted access across all modules, configuration, and security settings.',
      isSystem: true,
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z',
      permissions: JSON.parse(JSON.stringify(DEFAULT_PERMISSION_TEMPLATES.SUPER_ADMIN))
    },
    {
      id: 'role-admin',
      code: 'ADMIN',
      name: 'Administrator',
      description: 'Central maintenance administrator with full inventory management, master data, transfers, and report access.',
      isSystem: true,
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z',
      permissions: JSON.parse(JSON.stringify(DEFAULT_PERMISSION_TEMPLATES.ADMIN))
    },
    {
      id: 'role-manager',
      code: 'MANAGER',
      name: 'Maintenance Manager',
      description: 'Floor and shift management with machine edit, transfer approval, maintenance log review, and export rights.',
      isSystem: true,
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z',
      permissions: JSON.parse(JSON.stringify(DEFAULT_PERMISSION_TEMPLATES.MANAGER))
    },
    {
      id: 'role-maintenance-user',
      code: 'MAINTENANCE_USER',
      name: 'Maintenance User',
      description: 'Workshop and line mechanical technician authorized to request transfers and record spare parts replacements.',
      isSystem: true,
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z',
      permissions: JSON.parse(JSON.stringify(DEFAULT_PERMISSION_TEMPLATES.MAINTENANCE_USER))
    },
    {
      id: 'role-store-user',
      code: 'STORE_USER',
      name: 'Store User',
      description: 'Spare parts stockroom officer with parts catalog management, import/export, and stock receipt access.',
      isSystem: true,
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z',
      permissions: JSON.parse(JSON.stringify(DEFAULT_PERMISSION_TEMPLATES.STORE_USER))
    },
    {
      id: 'role-viewer',
      code: 'VIEWER',
      name: 'Viewer / Auditor',
      description: 'Read-only access for compliance auditors, line supervisors, and factory visitors.',
      isSystem: true,
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z',
      permissions: JSON.parse(JSON.stringify(DEFAULT_PERMISSION_TEMPLATES.VIEWER))
    }
  ],

  users: [
    {
      id: 'usr-super-admin',
      username: 'superadmin',
      password: 'admin123',
      name: 'Engr. Tanvir Ahmed (Super Administrator)',
      employeeId: 'AMG-HQ-001',
      email: 'tanvir.eng@al-muslim.com',
      phone: '+8801711000001',
      department: 'Central Engineering & Maintenance',
      designation: 'Head of Maintenance & System Director',
      role: 'SUPER_ADMIN',
      roleId: 'role-super-admin',
      status: 'ACTIVE',
      mustChangePassword: false,
      assignedScope: { allGroups: true, groupIds: [], unitIds: [], floorIds: [], lineIds: [] },
      permissions: JSON.parse(JSON.stringify(DEFAULT_PERMISSION_TEMPLATES.SUPER_ADMIN)),
      createdAt: '2026-01-01T00:00:00Z',
      lastLoginAt: '2026-08-22T08:15:00Z'
    }
  ],

  spare_parts_master: [
    { id: 'spm-1', name: 'Motor', code: 'SP-001', areaOfUse: 'Main Drive Unit / Machine Motor', brandModelOrigin: 'JUKI / DDL-8700-7 / Japan', category: 'Electrical', unit: 'PCS', description: 'Machine Direct Drive Servo Motor 550W', defaultPrice: 8500, status: 'ACTIVE' },
    { id: 'spm-2', name: 'Motor Belt', code: 'SP-002', areaOfUse: 'Motor Power Transmission', brandModelOrigin: 'Universal / M-38 / China', category: 'Mechanical', unit: 'PCS', description: 'Synchronous Timing Motor Belt (M-38 / M-42)', defaultPrice: 350, status: 'ACTIVE' },
    { id: 'spm-3', name: 'Motor Pulley', code: 'SP-003', areaOfUse: 'Motor Shaft Drive Assembly', brandModelOrigin: 'JUKI / 65mm / Japan', category: 'Mechanical', unit: 'PCS', description: 'Aluminium Motor Drive Pulley 65mm', defaultPrice: 450, status: 'ACTIVE' },
    { id: 'spm-4', name: 'Motor Coupling', code: 'SP-004', areaOfUse: 'Direct Drive Shaft Connector', brandModelOrigin: 'JACK / A4 / China', category: 'Mechanical', unit: 'PCS', description: 'Flexible Rubber Motor Shaft Coupling', defaultPrice: 280, status: 'ACTIVE' },
    { id: 'spm-5', name: 'Motor Carbon Brush', code: 'SP-005', areaOfUse: 'Clutch Motor Commutator', brandModelOrigin: 'National / Standard / Taiwan', category: 'Electrical', unit: 'SET', description: 'Copper Carbon Brush Set for Clutch Motor', defaultPrice: 180, status: 'ACTIVE' },
    { id: 'spm-6', name: 'Needle Bar', code: 'SP-006', areaOfUse: 'Plane & Overlock Needle Assembly', brandModelOrigin: 'JUKI / DDL-9000 / Japan', category: 'Mechanical', unit: 'PCS', description: 'Titanium Coated Needle Bar Assembly', defaultPrice: 650, status: 'ACTIVE' },
    { id: 'spm-7', name: 'Needle Clamp', code: 'SP-007', areaOfUse: 'Needle Holding Clamp Mechanism', brandModelOrigin: 'Brother / S-7200C / Japan', category: 'Mechanical', unit: 'PCS', description: 'Precision Needle Clamp with Screw', defaultPrice: 220, status: 'ACTIVE' },
    { id: 'spm-8', name: 'Needle Plate', code: 'SP-008', areaOfUse: 'Bed Throat Plate for Fabric Feeding', brandModelOrigin: 'JUKI / E-18 / Japan', category: 'Mechanical', unit: 'PCS', description: 'Needle Throat Plate for Medium to Heavy Fabric', defaultPrice: 480, status: 'ACTIVE' },
    { id: 'spm-9', name: 'Needle Feed Dog', code: 'SP-009', areaOfUse: 'Fabric Feeding Dog Mechanism', brandModelOrigin: 'JUKI / B-24 / Japan', category: 'Mechanical', unit: 'PCS', description: '4-Row Fine Tooth Needle Feed Dog', defaultPrice: 380, status: 'ACTIVE' },
    { id: 'spm-10', name: 'Needle Thread Guide', code: 'SP-010', areaOfUse: 'Upper Needle Bar Thread Eyelet', brandModelOrigin: 'JUKI / Standard / Japan', category: 'Mechanical', unit: 'PCS', description: 'Upper Needle Bar Thread Guide Eyelet', defaultPrice: 120, status: 'ACTIVE' },
    { id: 'spm-11', name: 'Rotary Hook / Shuttle', code: 'SP-011', areaOfUse: 'Lower Stitch Formation & Bobbin', brandModelOrigin: 'Hirose / Koban / Japan', category: 'Mechanical', unit: 'PCS', description: 'Double Capacity Automatic Lubrication Rotary Hook', defaultPrice: 2800, status: 'ACTIVE' },
    { id: 'spm-12', name: 'Bobbin Case & Bobbin', code: 'SP-012', areaOfUse: 'Under-thread Bobbin Housing', brandModelOrigin: 'Towa / Standard / Japan', category: 'Mechanical', unit: 'SET', description: 'Steel Bobbin Case with Anti-Backlash Spring', defaultPrice: 250, status: 'ACTIVE' },
    { id: 'spm-13', name: 'Main Control PCB Board', code: 'SP-013', areaOfUse: 'Main Machine Control Box Electronics', brandModelOrigin: 'JUKI / SC-920 / Japan', category: 'Electrical', unit: 'PCS', description: 'Main Motherboard PCB Control Unit (8800 Series)', defaultPrice: 6200, status: 'ACTIVE' },
    { id: 'spm-14', name: 'Optical Synchronizer Sensor', code: 'SP-014', areaOfUse: 'Needle Up/Down Position Detection', brandModelOrigin: 'JUKI / Synchronizer / Japan', category: 'Electrical', unit: 'PCS', description: 'Needle Positioning Optical Encoder Sensor', defaultPrice: 950, status: 'ACTIVE' },
    { id: 'spm-15', name: 'Upper & Lower Knife Blades', code: 'SP-015', areaOfUse: 'Overlock & Interlock Fabric Trimming', brandModelOrigin: 'Pegasus / M700 / Japan', category: 'Mechanical', unit: 'SET', description: 'Tungsten Carbide Upper & Lower Knife Set for Overlock', defaultPrice: 750, status: 'ACTIVE' },
    { id: 'spm-16', name: 'Presser Foot (Heavy Duty)', code: 'SP-016', areaOfUse: 'Fabric Holding & Guiding Assembly', brandModelOrigin: 'JUKI / Standard / Japan', category: 'Mechanical', unit: 'PCS', description: 'Standard Hinged Presser Foot with Finger Guard', defaultPrice: 320, status: 'ACTIVE' },
    { id: 'spm-17', name: 'Thread Tension Disc Set', code: 'SP-017', areaOfUse: 'Upper Thread Tension Regulator', brandModelOrigin: 'JUKI / 8700 / Japan', category: 'Mechanical', unit: 'SET', description: 'Topstitch Thread Tension Disc & Check Spring Assembly', defaultPrice: 280, status: 'ACTIVE' },
    { id: 'spm-18', name: 'Solenoid Thread Trimmer Coil', code: 'SP-018', areaOfUse: 'Auto Under-bed Thread Trimming', brandModelOrigin: 'JUKI / 24V / Japan', category: 'Electrical', unit: 'PCS', description: '24V DC Automatic Thread Trimmer Actuator Solenoid', defaultPrice: 1450, status: 'ACTIVE' },
    { id: 'spm-19', name: 'Pneumatic Auto-Foot Lifter', code: 'SP-019', areaOfUse: 'Air-driven Automatic Presser Lifter', brandModelOrigin: 'SMC / AK-85 / Japan', category: 'Pneumatic', unit: 'PCS', description: 'Pneumatic Cylinder Auto Foot Lifter Valve', defaultPrice: 1900, status: 'ACTIVE' },
    { id: 'spm-20', name: 'LED Machine Work Light', code: 'SP-020', areaOfUse: 'Needle Area Work Illuminator', brandModelOrigin: 'Kaigu / Gooseneck / Taiwan', category: 'Electrical', unit: 'PCS', description: 'Multi-Angle Flexible Gooseneck Sewing LED Lamp', defaultPrice: 550, status: 'ACTIVE' }
  ],

  employees: [
    {
      id: 'emp-1001',
      cardNumber: '1001',
      name: 'Engr. Tanvir Ahmed',
      designation: 'Head of Maintenance & System Director',
      floor: 'All Factory Floors',
      unit: 'Central Engineering HQ',
      joinDate: '2018-01-01',
      phone: '+8801711000001',
      status: 'ACTIVE',
      specialization: 'Central Machinery Architecture, Automation & Plant Operations'
    },
    {
      id: 'emp-1015',
      cardNumber: '1015',
      name: 'Md. Delwar Hossain',
      designation: 'Maintenance Supervisor',
      floor: 'Jamuna Floor',
      unit: 'Unit-01 (Knitwear)',
      joinDate: '2019-05-12',
      phone: '+8801711200015',
      status: 'ACTIVE',
      specialization: 'Floor Operations, Overhaul Scheduling & Team Lead'
    },
    {
      id: 'emp-1042',
      cardNumber: '1042',
      name: 'Md. Kabir Hossain',
      designation: 'Senior Mechanic',
      floor: 'Jamuna Floor',
      unit: 'Unit-01 (Knitwear)',
      joinDate: '2021-04-10',
      phone: '+8801711301042',
      status: 'ACTIVE',
      specialization: 'Single Needle Plane, Direct Drive Motor & Feed Dog Specialist'
    },
    {
      id: 'emp-1055',
      cardNumber: '1055',
      name: 'Md. Rafiqul Islam',
      designation: 'Maintenance Engineer',
      floor: 'Titas Floor',
      unit: 'Unit-01 (Knitwear)',
      joinDate: '2020-02-15',
      phone: '+8801711401055',
      status: 'ACTIVE',
      specialization: 'Rotary Hook Timing, Needle Bar Calibration & Pneumatics'
    },
    {
      id: 'emp-1089',
      cardNumber: '1089',
      name: 'Md. Jahangir Alam',
      designation: 'Line Mechanic',
      floor: 'Chitra Floor',
      unit: 'Unit-02 (Woven)',
      joinDate: '2022-06-01',
      phone: '+8801711501089',
      status: 'ACTIVE',
      specialization: 'Overlock 4-Thread & Interlock Cylinder Bed Overhaul'
    },
    {
      id: 'emp-1104',
      cardNumber: '1104',
      name: 'Md. Anowar Hossain',
      designation: 'Electrical Technician',
      floor: 'Central Workshop',
      unit: 'Unit-01 (Knitwear)',
      joinDate: '2019-11-20',
      phone: '+8801711601104',
      status: 'ACTIVE',
      specialization: 'PCB Motherboard Repair, Optical Synchronizer & Servos'
    },
    {
      id: 'emp-1128',
      cardNumber: '1128',
      name: 'Md. Saiful Islam',
      designation: 'Senior Mechanic',
      floor: 'Jamuna Floor',
      unit: 'Unit-01 (Knitwear)',
      joinDate: '2021-09-05',
      phone: '+8801711701128',
      status: 'ACTIVE',
      specialization: 'Heavy Duty Topstitch & Automatic Thread Trimmer Systems'
    },
    {
      id: 'emp-1142',
      cardNumber: '1142',
      name: 'Md. Mizanur Rahman',
      designation: 'Overlock Specialist Mechanic',
      floor: 'Padma Floor',
      unit: 'Unit-02 (Woven)',
      joinDate: '2023-01-10',
      phone: '+8801711801142',
      status: 'ACTIVE',
      specialization: 'Pegasus & Yamato Looper Timing and Knife Blade Alignment'
    },
    {
      id: 'emp-1160',
      cardNumber: '1160',
      name: 'Md. Kamal Uddin',
      designation: 'Mechanical Technician',
      floor: 'Meghna Floor',
      unit: 'Unit-01 (Knitwear)',
      joinDate: '2022-08-18',
      phone: '+8801711901160',
      status: 'ACTIVE',
      specialization: 'Button Hole, Bartack & Pattern Sewer Electronics'
    }
  ],

  generateInitialMachines: function() {
    const list = [];
    let idCounter = 1;

    const pad = (n, width) => {
      const s = String(n);
      return s.length >= width ? s : new Array(width - s.length + 1).join('0') + s;
    };

    // 1. Over 70+ Plane Machines demonstrating Multi-Brand & Multi-Model under "Plane Machine":
    // JUKI (DDL-9000, DDL-8700-7, DDL-8000, DDL-900BB)
    // JACK (A4, A5E-A, F4)
    // TYPICAL (GC-6720, GC-6150MD)
    // BROTHER (S-7200C, S-7300A)
    for (let i = 1; i <= 70; i++) {
      let brandId = 'brd-1'; // JUKI default
      let modelId = 'mdl-1'; // DDL-8700-7
      let prefix = 'JS';

      if (i <= 20) {
        brandId = 'brd-1'; // JUKI
        modelId = i <= 10 ? 'mdl-2' : 'mdl-1'; // DDL-9000 Series or DDL-8700-7
        prefix = 'JK-PM';
      } else if (i <= 35) {
        brandId = 'brd-13'; // JACK
        modelId = i <= 28 ? 'mdl-5' : 'mdl-6'; // A4 Direct Drive or A5E-A
        prefix = 'JACK-PM';
      } else if (i <= 50) {
        brandId = 'brd-14'; // TYPICAL
        modelId = i <= 42 ? 'mdl-8' : 'mdl-9'; // GC-6720 or GC-6150MD
        prefix = 'TYP-PM';
      } else {
        brandId = 'brd-2'; // BROTHER
        modelId = i <= 60 ? 'mdl-10' : 'mdl-11'; // S-7200C or S-7300A Nexio
        prefix = 'BRO-PM';
      }

      let floorId = 'flr-4';
      let lineId = 'lin-1';
      if (i <= 15) { floorId = 'flr-4'; lineId = 'lin-1'; }
      else if (i <= 30) { floorId = 'flr-4'; lineId = 'lin-2'; }
      else if (i <= 50) { floorId = 'flr-6'; lineId = 'lin-6'; }
      else { floorId = 'flr-6'; lineId = 'lin-7'; }

      const status = i === 12 ? 'MAINTENANCE' : (i === 33 ? 'BREAKDOWN' : (i === 48 ? 'IDLE' : 'ACTIVE'));

      list.push({
        id: `mc-${idCounter++}`,
        sl: list.length + 1,
        machineNameId: 'mn-1', // Plane Machine
        brandId: brandId,
        modelId: modelId,
        serialNumber: `${prefix}-${pad(i, 5)}`,
        groupId: 'grp-1',
        unitId: 'unt-1',
        floorId: floorId,
        lineId: lineId,
        quantity: 1,
        status: status,
        remarks: 'Plane Machine with direct drive servo motor',
        customValues: {
          motor_hp: 0.55,
          max_rpm: 5000,
          voltage: '220V Single Phase',
          needle_gauge: 'DBx1 #11-14',
          bed_type: 'Flat Bed',
          lubrication: 'Fully Automatic Semi-Dry',
          supplier: 'Official Group Vendor',
          purchase_date: '2023-03-15',
          warranty_expiry: '2025-03-15',
          maintenance_freq: 'Monthly'
        },
        createdBy: 'usr-1',
        createdAt: '2023-03-20T08:30:00Z',
        updatedBy: 'usr-2',
        updatedAt: '2026-08-10T14:15:00Z'
      });
    }

    // 2. 40+ Overlock Machines across JUKI, PEGASUS, SIRUBA, and JACK
    for (let i = 1; i <= 40; i++) {
      let brandId = 'brd-1';
      let modelId = 'mdl-12';
      let prefix = 'JUKI-OL';

      if (i <= 15) {
        brandId = 'brd-1';
        modelId = 'mdl-12'; // MO-6800
        prefix = 'JUKI-OL';
      } else if (i <= 25) {
        brandId = 'brd-3';
        modelId = 'mdl-14'; // M952-52
        prefix = 'PEG-OL';
      } else if (i <= 35) {
        brandId = 'brd-9';
        modelId = 'mdl-16'; // 747K
        prefix = 'SIR-OL';
      } else {
        brandId = 'brd-13';
        modelId = 'mdl-17'; // C4-4 Automatic
        prefix = 'JK-OL';
      }

      list.push({
        id: `mc-${idCounter++}`,
        sl: list.length + 1,
        machineNameId: 'mn-2', // Overlock Machine
        brandId: brandId,
        modelId: modelId,
        serialNumber: `${prefix}-${pad(i, 5)}`,
        groupId: 'grp-1',
        unitId: 'unt-1',
        floorId: i <= 20 ? 'flr-4' : 'flr-5',
        lineId: i <= 20 ? 'lin-2' : 'lin-4',
        quantity: 1,
        status: i === 8 ? 'MAINTENANCE' : 'ACTIVE',
        remarks: '4-thread overedge differential feed',
        customValues: {
          motor_hp: 0.75,
          max_rpm: 6500,
          voltage: '220V Single Phase',
          needle_gauge: 'DCx27 #11',
          bed_type: 'Flat Bed',
          lubrication: 'Fully Automatic Semi-Dry',
          supplier: 'Pacific Associates Ltd',
          purchase_date: '2023-06-10',
          warranty_expiry: '2025-06-10',
          maintenance_freq: 'Bi-Weekly'
        },
        createdBy: 'usr-1',
        createdAt: '2023-06-12T09:00:00Z',
        updatedBy: 'usr-3',
        updatedAt: '2026-07-15T11:20:00Z'
      });
    }

    // 3. 30+ Flatlock Machines across YAMATO, PEGASUS, and JUKI
    for (let i = 1; i <= 30; i++) {
      let brandId = i <= 12 ? 'brd-4' : (i <= 22 ? 'brd-3' : 'brd-1');
      let modelId = i <= 12 ? 'mdl-18' : (i <= 22 ? 'mdl-20' : 'mdl-21');
      let prefix = i <= 12 ? 'YAM-FL' : (i <= 22 ? 'PEG-FL' : 'JUK-FL');

      list.push({
        id: `mc-${idCounter++}`,
        sl: list.length + 1,
        machineNameId: 'mn-3', // Flatlock
        brandId: brandId,
        modelId: modelId,
        serialNumber: `${prefix}-${pad(i, 5)}`,
        groupId: 'grp-1',
        unitId: 'unt-1',
        floorId: 'flr-6',
        lineId: 'lin-8',
        quantity: 1,
        status: 'ACTIVE',
        remarks: 'Cylinder bed bottom hemming & coverstitch',
        customValues: {
          motor_hp: 0.75,
          max_rpm: 6000,
          voltage: '220V Single Phase',
          bed_type: 'Cylinder Bed',
          lubrication: 'Oil Bath',
          supplier: 'Aamra Technologies Ltd',
          purchase_date: '2023-08-01',
          warranty_expiry: '2025-08-01',
          maintenance_freq: 'Monthly'
        },
        createdBy: 'usr-2',
        createdAt: '2023-08-05T10:00:00Z',
        updatedBy: 'usr-2',
        updatedAt: '2026-08-01T16:00:00Z'
      });
    }

    // 4. Kansai Special, Bartack, Button Hole & Utilities
    const specialty = [
      { mn: 'mn-4', brd: 'brd-5', mdl: 'mdl-22', sn: 'KS-00001', unt: 'unt-2', flr: 'flr-7', lin: 'lin-9', rm: 'Multi-needle waistband' },
      { mn: 'mn-4', brd: 'brd-5', mdl: 'mdl-23', sn: 'KS-00002', unt: 'unt-2', flr: 'flr-7', lin: 'lin-9', rm: '12-needle chainstitch' },
      { mn: 'mn-5', brd: 'brd-1', mdl: 'mdl-24', sn: 'JUK-BT-01', unt: 'unt-1', flr: 'flr-6', lin: 'lin-7', rm: 'JUKI Electronic Bartack' },
      { mn: 'mn-5', brd: 'brd-2', mdl: 'mdl-25', sn: 'BRO-BT-01', unt: 'unt-1', flr: 'flr-6', lin: 'lin-7', rm: 'BROTHER Electronic Bartack' },
      { mn: 'mn-5', brd: 'brd-13', mdl: 'mdl-26', sn: 'JK-BT-01', unt: 'unt-1', flr: 'flr-6', lin: 'lin-7', rm: 'JACK Direct Drive Bartack' },
      { mn: 'mn-6', brd: 'brd-1', mdl: 'mdl-27', sn: 'JUK-BH-01', unt: 'unt-1', flr: 'flr-6', lin: 'lin-8', rm: 'JUKI Electronic Buttonholer' },
      { mn: 'mn-6', brd: 'brd-2', mdl: 'mdl-28', sn: 'BRO-BH-01', unt: 'unt-1', flr: 'flr-6', lin: 'lin-8', rm: 'BROTHER Nexio Buttonholer' },
      { mn: 'mn-7', brd: 'brd-1', mdl: 'mdl-30', sn: 'JUK-BA-01', unt: 'unt-1', flr: 'flr-6', lin: 'lin-8', rm: 'JUKI Button Attaching' },
      { mn: 'mn-9', brd: 'brd-6', mdl: 'mdl-31', sn: 'FUS-00301', unt: 'unt-1', flr: 'flr-2', lin: 'lin-1', rm: 'Continuous Fusing Press' },
      { mn: 'mn-10', brd: 'brd-8', mdl: 'mdl-33', sn: 'ACM-00801', unt: 'unt-1', flr: 'flr-3', lin: 'lin-1', rm: 'Morgan Tecnica CNC Cutter' },
      { mn: 'mn-14', brd: 'brd-10', mdl: 'mdl-34', sn: 'CMP-00101', unt: 'unt-1', flr: 'flr-1', lin: 'lin-15', rm: 'Kaeser 75kW Rotary Compressor' },
      { mn: 'mn-15', brd: 'brd-11', mdl: 'mdl-35', sn: 'GEN-00501', unt: 'unt-1', flr: 'flr-1', lin: 'lin-15', rm: 'Caterpillar 500kVA Diesel Generator' },
      { mn: 'mn-16', brd: 'brd-6', mdl: 'mdl-36', sn: 'NDT-00201', unt: 'unt-1', flr: 'flr-6', lin: 'lin-8', rm: 'Hashima Conveyor Needle Detector' }
    ];

    specialty.forEach(s => {
      list.push({
        id: `mc-${idCounter++}`,
        sl: list.length + 1,
        machineNameId: s.mn,
        brandId: s.brd,
        modelId: s.mdl,
        serialNumber: s.sn,
        groupId: 'grp-1',
        unitId: s.unt,
        floorId: s.flr,
        lineId: s.lin,
        quantity: 1,
        status: 'ACTIVE',
        remarks: s.rm,
        customValues: {
          voltage: '380V 3-Phase',
          maintenance_freq: 'Monthly',
          purchase_date: '2023-01-10'
        },
        createdBy: 'usr-1',
        createdAt: '2023-01-15T08:00:00Z',
        updatedBy: 'usr-2',
        updatedAt: '2026-08-15T09:00:00Z'
      });
    });

    // 6. Explicitly seed Machines with Standard Floor Short Code Format: [FloorCode]-[Number]
    // Examples: JA-01..03 (Jamuna), BG-01..03 (Buriganga), TT-01..03 (Titash), TS-01..03 (Tista), CH-01..03 (Chitra), PD-01..03 (Padma), PT-01..03 (Pilot), ML-01..03 (Model Line)
    
    // JA-01: Commissioned on Jamuna Floor, relocated to Titash Floor, now on Chitra Floor (Retains immutable birth serial JA-01)
    list.push({
      id: 'mc-ja-01',
      sl: list.length + 1,
      machineNameId: 'mn-1', // Plane Machine
      brandId: 'brd-1',      // JUKI
      modelId: 'mdl-1',      // DDL-8700-7
      serialNumber: 'JA-01',
      groupId: 'grp-1',
      unitId: 'unt-2',       // Pacific Blue (Jeans Wear) Ltd.
      floorId: 'flr-16',     // Chitra Floor (Current Location after transfer)
      lineId: 'lin-19',      // Line CTR-01
      quantity: 1,
      status: 'ACTIVE',
      remarks: 'Single Needle Direct Drive Plain Lockstitch — Commissioned on Jamuna Floor (JA), now on Chitra Floor (CH)',
      customValues: {
        motor_hp: 0.75,
        max_rpm: 5500,
        voltage: '220V Single Phase',
        needle_gauge: 'DBx1 #14',
        bed_type: 'Flat Bed',
        lubrication: 'Fully Automatic Semi-Dry',
        supplier: 'Juki Singapore Pte Ltd',
        purchase_date: '2025-01-05',
        warranty_expiry: '2027-01-05',
        maintenance_freq: 'Monthly'
      },
      createdBy: 'usr-1',
      createdAt: '2025-01-05T09:00:00Z',
      updatedBy: 'usr-2',
      updatedAt: '2026-08-22T08:30:00Z'
    });

    const floorShortCodeExamples = [
      // Jamuna Floor (JA)
      { id: 'mc-ja-02', serial: 'JA-02', floorId: 'flr-7', lineId: 'lin-9', mnId: 'mn-1', brdId: 'brd-1', mdlId: 'mdl-1', name: 'Jamuna Floor' },
      { id: 'mc-ja-03', serial: 'JA-03', floorId: 'flr-7', lineId: 'lin-10', mnId: 'mn-2', brdId: 'brd-1', mdlId: 'mdl-13', name: 'Jamuna Floor' },
      // Buriganga Floor (BG)
      { id: 'mc-bg-01', serial: 'BG-01', floorId: 'flr-8', lineId: 'lin-11', mnId: 'mn-1', brdId: 'brd-13', mdlId: 'mdl-5', name: 'Buriganga Floor' },
      { id: 'mc-bg-02', serial: 'BG-02', floorId: 'flr-8', lineId: 'lin-11', mnId: 'mn-2', brdId: 'brd-3', mdlId: 'mdl-14', name: 'Buriganga Floor' },
      { id: 'mc-bg-03', serial: 'BG-03', floorId: 'flr-8', lineId: 'lin-11', mnId: 'mn-3', brdId: 'brd-4', mdlId: 'mdl-18', name: 'Buriganga Floor' },
      // Titash Floor (TT)
      { id: 'mc-tt-01', serial: 'TT-01', floorId: 'flr-15', lineId: 'lin-18', mnId: 'mn-1', brdId: 'brd-14', mdlId: 'mdl-8', name: 'Titash Floor' },
      { id: 'mc-tt-02', serial: 'TT-02', floorId: 'flr-15', lineId: 'lin-18', mnId: 'mn-2', brdId: 'brd-9', mdlId: 'mdl-16', name: 'Titash Floor' },
      { id: 'mc-tt-03', serial: 'TT-03', floorId: 'flr-15', lineId: 'lin-18', mnId: 'mn-1', brdId: 'brd-2', mdlId: 'mdl-10', name: 'Titash Floor' },
      // Tista Floor (TS)
      { id: 'mc-ts-01', serial: 'TS-01', floorId: 'flr-17', lineId: 'lin-20', mnId: 'mn-1', brdId: 'brd-1', mdlId: 'mdl-2', name: 'Tista Floor' },
      { id: 'mc-ts-02', serial: 'TS-02', floorId: 'flr-17', lineId: 'lin-20', mnId: 'mn-2', brdId: 'brd-13', mdlId: 'mdl-17', name: 'Tista Floor' },
      { id: 'mc-ts-03', serial: 'TS-03', floorId: 'flr-17', lineId: 'lin-20', mnId: 'mn-3', brdId: 'brd-3', mdlId: 'mdl-20', name: 'Tista Floor' },
      // Chitra Floor (CH)
      { id: 'mc-ch-01', serial: 'CH-01', floorId: 'flr-16', lineId: 'lin-19', mnId: 'mn-1', brdId: 'brd-1', mdlId: 'mdl-1', name: 'Chitra Floor' },
      { id: 'mc-ch-02', serial: 'CH-02', floorId: 'flr-16', lineId: 'lin-19', mnId: 'mn-2', brdId: 'brd-1', mdlId: 'mdl-13', name: 'Chitra Floor' },
      { id: 'mc-ch-03', serial: 'CH-03', floorId: 'flr-16', lineId: 'lin-19', mnId: 'mn-3', brdId: 'brd-1', mdlId: 'mdl-21', name: 'Chitra Floor' },
      // Padma Floor (PD)
      { id: 'mc-pd-01', serial: 'PD-01', floorId: 'flr-9', lineId: 'lin-pd-a', mnId: 'mn-1', brdId: 'brd-13', mdlId: 'mdl-6', name: 'Padma Floor' },
      { id: 'mc-pd-02', serial: 'PD-02', floorId: 'flr-9', lineId: 'lin-pd-a', mnId: 'mn-2', brdId: 'brd-13', mdlId: 'mdl-17', name: 'Padma Floor' },
      { id: 'mc-pd-03', serial: 'PD-03', floorId: 'flr-9', lineId: 'lin-pd-b', mnId: 'mn-3', brdId: 'brd-4', mdlId: 'mdl-19', name: 'Padma Floor' },
      // Pilot Section (PT)
      { id: 'mc-pt-01', serial: 'PT-01', floorId: 'flr-18', lineId: 'lin-21', mnId: 'mn-1', brdId: 'brd-1', mdlId: 'mdl-2', name: 'Pilot Section' },
      { id: 'mc-pt-02', serial: 'PT-02', floorId: 'flr-18', lineId: 'lin-21', mnId: 'mn-2', brdId: 'brd-1', mdlId: 'mdl-13', name: 'Pilot Section' },
      { id: 'mc-pt-03', serial: 'PT-03', floorId: 'flr-18', lineId: 'lin-21', mnId: 'mn-4', brdId: 'brd-1', mdlId: 'mdl-22', name: 'Pilot Section' },
      // Surma Floor (SU)
      { id: 'mc-su-01', serial: 'SU-01', floorId: 'flr-20', lineId: 'lin-23', mnId: 'mn-1', brdId: 'brd-1', mdlId: 'mdl-2', name: 'Surma Floor' },
      { id: 'mc-su-02', serial: 'SU-02', floorId: 'flr-20', lineId: 'lin-23', mnId: 'mn-2', brdId: 'brd-13', mdlId: 'mdl-17', name: 'Surma Floor' },
      { id: 'mc-su-03', serial: 'SU-03', floorId: 'flr-20', lineId: 'lin-23', mnId: 'mn-3', brdId: 'brd-3', mdlId: 'mdl-20', name: 'Surma Floor' },
      // Model Line (ML)
      { id: 'mc-ml-01', serial: 'ML-01', floorId: 'flr-19', lineId: 'lin-22', mnId: 'mn-1', brdId: 'brd-2', mdlId: 'mdl-11', name: 'Model Line Floor' },
      { id: 'mc-ml-02', serial: 'ML-02', floorId: 'flr-19', lineId: 'lin-22', mnId: 'mn-2', brdId: 'brd-3', mdlId: 'mdl-14', name: 'Model Line Floor' },
      { id: 'mc-ml-03', serial: 'ML-03', floorId: 'flr-19', lineId: 'lin-22', mnId: 'mn-5', brdId: 'brd-1', mdlId: 'mdl-25', name: 'Model Line Floor' }
    ];

    floorShortCodeExamples.forEach(ex => {
      list.push({
        id: ex.id,
        sl: list.length + 1,
        machineNameId: ex.mnId,
        brandId: ex.brdId,
        modelId: ex.mdlId,
        serialNumber: ex.serial,
        groupId: 'grp-1',
        unitId: ex.floorId === 'flr-18' || ex.floorId === 'flr-19' ? 'unt-3' : 'unt-2',
        floorId: ex.floorId,
        lineId: ex.lineId,
        quantity: 1,
        status: 'ACTIVE',
        remarks: `Standard Asset on ${ex.name} (${ex.serial})`,
        customValues: {
          motor_hp: 0.75,
          max_rpm: 5000,
          voltage: '220V Single Phase',
          needle_gauge: 'DBx1 #14',
          bed_type: 'Flat Bed',
          lubrication: 'Fully Automatic Semi-Dry',
          supplier: 'Pacific Associates Ltd',
          purchase_date: '2025-01-10',
          warranty_expiry: '2027-01-10',
          maintenance_freq: 'Monthly'
        },
        createdBy: 'usr-1',
        createdAt: '2025-01-10T09:00:00Z',
        updatedBy: 'usr-1',
        updatedAt: '2026-08-20T10:00:00Z'
      });
    });

    // Explicitly seed MCH-00125 alias from user prompt with full lifetime history
    list.push({
      id: 'mc-125',
      sl: list.length + 1,
      machineNameId: 'mn-1', // Plane Machine
      brandId: 'brd-1',      // JUKI
      modelId: 'mdl-1',      // DDL-8700-7
      serialNumber: 'MCH-00125',
      groupId: 'grp-1',
      unitId: 'unt-2',       // Pacific Blue (Jeans Wear) Ltd.
      floorId: 'flr-16',     // Chitra Floor (Current Location)
      lineId: 'lin-19',      // Line CTR-01
      quantity: 1,
      status: 'ACTIVE',
      remarks: 'Single Needle Direct Drive Plain Lockstitch - Relocated to Chitra Floor',
      customValues: {
        motor_hp: 0.75,
        max_rpm: 5500,
        voltage: '220V Single Phase',
        needle_gauge: 'DBx1 #14',
        bed_type: 'Flat Bed',
        lubrication: 'Fully Automatic Semi-Dry',
        supplier: 'Juki Singapore Pte Ltd',
        purchase_date: '2025-01-05',
        warranty_expiry: '2027-01-05',
        maintenance_freq: 'Monthly'
      },
      createdBy: 'usr-1',
      createdAt: '2025-01-05T09:00:00Z',
      updatedBy: 'usr-2',
      updatedAt: '2026-08-22T08:30:00Z'
    });

    return list.map(m => {
      const running = m.status === 'ACTIVE' ? 1 : 0;
      const usableIdle = m.status === 'IDLE' ? 1 : 0;
      const repairableIdle = (m.status === 'MAINTENANCE' || m.status === 'BREAKDOWN') ? 1 : 0;
      const totalQuantity = running + usableIdle + repairableIdle || 1;
      return {
        ...m,
        running: running,
        usableIdle: usableIdle,
        repairableIdle: repairableIdle,
        totalQuantity: totalQuantity,
        quantity: totalQuantity
      };
    });
  },

  approval_requests: [
    {
      id: 'appr-1',
      machineId: 'mc-45',
      type: 'EDIT_MACHINE',
      requestedBy: 'usr-4',
      requestedByName: 'Rahim Uddin',
      requestedByRole: 'MAINTENANCE_USER',
      requestedAt: '2026-08-21T10:30:00Z',
      status: 'PENDING',
      remarks: 'Replaced feed dog and adjusted RPM to 4800 for high density twill fabric.',
      targetLocation: { unit: 'AKM Knitwear Ltd.', floor: '5th Floor', line: 'Line JA-A' },
      machineInfo: { machineName: 'Plane Machine', brand: 'TYPICAL', model: 'GC-6720', serialNumber: 'TYP-PM-00045' },
      diffs: [
        { field: 'remarks', label: 'Remarks', oldValue: 'Plane Machine with direct drive', newValue: 'Serviced feed dog, replaced presser foot, tested on twill' },
        { field: 'status', label: 'Machine Status', oldValue: 'ACTIVE', newValue: 'MAINTENANCE' },
        { field: 'customValues.max_rpm', label: 'Max RPM', oldValue: '5000', newValue: '4800' }
      ]
    }
  ],

  transfer_workflows: [
    {
      id: 'wf-default',
      name: 'Standard Factory Transfer (Source → Dest → Admin)',
      description: 'Standard 3-stage relocation protocol for sewing and finishing machinery.',
      isDefault: true,
      scope: {},
      requireDocument: true,
      sequential: true,
      status: 'ACTIVE',
      levels: [
        { level: 1, title: 'Source Floor In-Charge Release', approverType: 'SOURCE_LOCATION', description: 'Release equipment from source line.' },
        { level: 2, title: 'Destination Floor In-Charge Acceptance', approverType: 'DEST_LOCATION', description: 'Accept machine at target destination.' },
        { level: 3, title: 'Central Maintenance Admin Authorization', approverType: 'ADMIN', description: 'Final gate pass sign-off and inventory update.' }
      ],
      createdBy: 'usr-1',
      createdAt: '2026-08-10T08:00:00Z'
    },
    {
      id: 'wf-fast-track',
      name: 'Option A: Admin Direct Authorization (Fast-Track)',
      description: 'Emergency production line balancing approved directly by Super Admin.',
      isDefault: false,
      scope: {},
      requireDocument: false,
      sequential: true,
      status: 'ACTIVE',
      levels: [
        { level: 1, title: 'Super Admin / Maintenance Admin', approverType: 'ADMIN', description: 'Direct one-step authorization.' }
      ],
      createdBy: 'usr-1',
      createdAt: '2026-08-10T08:00:00Z'
    },
    {
      id: 'wf-dest-admin',
      name: 'Option C: Destination User + Admin Approval',
      description: 'Destination verification followed by Central Maintenance Admin authorization.',
      isDefault: false,
      scope: {},
      requireDocument: true,
      sequential: true,
      status: 'ACTIVE',
      levels: [
        { level: 1, title: 'Destination Floor In-Charge', approverType: 'DEST_LOCATION', description: 'Confirms line space & electrical readiness.' },
        { level: 2, title: 'Central Maintenance Admin Sign-off', approverType: 'ADMIN', description: 'Official management authorization.' }
      ],
      createdBy: 'usr-1',
      createdAt: '2026-08-10T08:00:00Z'
    },
    {
      id: 'wf-enterprise-4',
      name: 'Option E: Multi-Level Enterprise Workflow (4 Levels)',
      description: 'Comprehensive 4-stage hierarchy for inter-unit and major plant transfers.',
      isDefault: false,
      scope: { categoryId: 'cat-4' },
      requireDocument: true,
      sequential: true,
      status: 'ACTIVE',
      levels: [
        { level: 1, title: 'Source Floor Maintenance Engineer', approverType: 'SOURCE_LOCATION', description: 'Mechanical/electrical disconnection audit.' },
        { level: 2, title: 'Destination Floor In-Charge', approverType: 'DEST_LOCATION', description: 'Utility connection and safety inspection.' },
        { level: 3, title: 'Central Maintenance Manager', approverType: 'MAINTENANCE_MANAGER', description: 'Asset compliance & overhaul approval.' },
        { level: 4, title: 'Executive Admin Final Approval', approverType: 'ADMIN', description: 'Final live location database update.' }
      ],
      createdBy: 'usr-1',
      createdAt: '2026-08-10T08:00:00Z'
    }
  ],

  transfer_requests: [
    {
      id: 'trq-101',
      requestNumber: 'TR-2026-000001',
      machineId: 'mc-1',
      machineInfo: {
        machineName: 'Plane Machine',
        brand: 'JUKI',
        model: 'DDL-8700-7',
        serialNumber: 'JUK-PM-00001',
        category: 'Sewing Machines'
      },
      sourceGroupId: 'grp-1',
      sourceUnitId: 'unt-1',
      sourceFloorId: 'flr-4',
      sourceLineId: 'lin-2',
      sourceLocation: { unit: 'AKM Knitwear Ltd.', floor: '3rd Floor', line: 'Line JA-B' },
      sourcePath: 'Al-Muslim Group > AKM Knitwear Ltd. > 3rd Floor > Line JA-B',
      destGroupId: 'grp-1',
      destUnitId: 'unt-1',
      destFloorId: 'flr-4',
      destLineId: 'lin-1',
      destLocation: { unit: 'AKM Knitwear Ltd.', floor: '3rd Floor', line: 'Line JA-A' },
      destPath: 'Al-Muslim Group > AKM Knitwear Ltd. > 3rd Floor > Line JA-A',
      reason: 'Urgent capacity alignment for Tommy Hilfiger Polo Shirt order.',
      remarks: 'Machine calibrated for single-needle lockstitch with automatic thread trimmer.',
      workflowId: 'wf-default',
      workflowName: 'Standard Factory Transfer (Source → Dest → Admin)',
      currentLevel: 3,
      totalLevels: 3,
      levels: [
        { level: 1, title: 'Source Floor In-Charge Release', approverType: 'SOURCE_LOCATION', status: 'APPROVED', approvedBy: 'usr-2', approvedByName: 'Engr. Tanvir Ahmed', approvedAt: '2026-08-14T08:30:00Z', remarks: 'Released from Line JA-B.' },
        { level: 2, title: 'Destination Floor In-Charge Acceptance', approverType: 'DEST_LOCATION', status: 'APPROVED', approvedBy: 'usr-3', approvedByName: 'Delwar Hossain', approvedAt: '2026-08-14T09:00:00Z', remarks: 'Line JA-A space and electrical socket ready.' },
        { level: 3, title: 'Central Maintenance Admin Authorization', approverType: 'ADMIN', status: 'APPROVED', approvedBy: 'usr-1', approvedByName: 'Super Administrator', approvedAt: '2026-08-14T09:30:00Z', remarks: 'Gate pass authorized.' }
      ],
      documents: [
        {
          id: 'doc-1',
          name: 'Management_Approval_Letter_JUK001.pdf',
          type: 'application/pdf',
          size: '245 KB',
          uploadedBy: 'usr-2',
          uploadedByName: 'Engr. Tanvir Ahmed',
          uploadedAt: '2026-08-14T08:00:00Z',
          approvalLevel: 0
        },
        {
          id: 'doc-2',
          name: 'Line_Capacity_Verification_Note.png',
          type: 'image/png',
          size: '180 KB',
          uploadedBy: 'usr-3',
          uploadedByName: 'Delwar Hossain',
          uploadedAt: '2026-08-14T09:00:00Z',
          approvalLevel: 2
        }
      ],
      approvalHistory: [
        { level: 0, action: 'REQUEST_SUBMITTED', approverName: 'Engr. Tanvir Ahmed', approverRole: 'MAINTENANCE_MANAGER', date: '14/08/2026', time: '08:00', timestamp: '2026-08-14T08:00:00Z', remarks: 'Transfer request submitted.' },
        { level: 1, levelTitle: 'Source Floor In-Charge Release', action: 'APPROVED', approverName: 'Engr. Tanvir Ahmed', approverRole: 'MAINTENANCE_MANAGER', date: '14/08/2026', time: '08:30', timestamp: '2026-08-14T08:30:00Z', remarks: 'Released from Line JA-B.' },
        { level: 2, levelTitle: 'Destination Floor In-Charge Acceptance', action: 'APPROVED', approverName: 'Delwar Hossain', approverRole: 'MAINTENANCE_USER', date: '14/08/2026', time: '09:00', timestamp: '2026-08-14T09:00:00Z', remarks: 'Space verified on Line JA-A.' },
        { level: 3, levelTitle: 'Central Maintenance Admin Authorization', action: 'APPROVED', approverName: 'Super Administrator', approverRole: 'SUPER_ADMIN', date: '14/08/2026', time: '09:30', timestamp: '2026-08-14T09:30:00Z', remarks: 'Final gate pass approved.' }
      ],
      status: 'COMPLETED',
      requestedBy: 'usr-2',
      requestedByName: 'Engr. Tanvir Ahmed',
      requestedByRole: 'MAINTENANCE_MANAGER',
      requestedAt: '2026-08-14T08:00:00Z',
      completedAt: '2026-08-14T09:30:00Z',
      completedBy: 'usr-1',
      completedByName: 'Super Administrator'
    },
    {
      id: 'trq-102',
      requestNumber: 'TR-2026-000002',
      machineId: 'mc-5',
      machineInfo: {
        machineName: 'Plane Machine',
        brand: 'JUKI',
        model: 'DDL-8700-7',
        serialNumber: 'JUK-PM-00005',
        category: 'Sewing Machines'
      },
      sourceGroupId: 'grp-1',
      sourceUnitId: 'unt-1',
      sourceFloorId: 'flr-4',
      sourceLineId: 'lin-1',
      sourceLocation: { unit: 'AKM Knitwear Ltd.', floor: '3rd Floor', line: 'Line JA-A' },
      sourcePath: 'Al-Muslim Group > AKM Knitwear Ltd. > 3rd Floor > Line JA-A',
      destGroupId: 'grp-1',
      destUnitId: 'unt-1',
      destFloorId: 'flr-6',
      destLineId: 'lin-6',
      destLocation: { unit: 'AKM Knitwear Ltd.', floor: '5th Floor', line: 'Line JA-A' },
      destPath: 'Al-Muslim Group > AKM Knitwear Ltd. > 5th Floor > Line JA-A',
      reason: 'Urgent setup for Denim Jacket collar stitching line.',
      remarks: 'Machine equipped with Teflon foot and heavy duty needle bar.',
      workflowId: 'wf-default',
      workflowName: 'Standard Factory Transfer (Source → Dest → Admin)',
      currentLevel: 1,
      totalLevels: 3,
      levels: [
        { level: 1, title: 'Source Floor In-Charge Release', approverType: 'SOURCE_LOCATION', status: 'PENDING', approvedBy: null, approvedByName: null, approvedAt: null, remarks: null },
        { level: 2, title: 'Destination Floor In-Charge Acceptance', approverType: 'DEST_LOCATION', status: 'PENDING', approvedBy: null, approvedByName: null, approvedAt: null, remarks: null },
        { level: 3, title: 'Central Maintenance Admin Authorization', approverType: 'ADMIN', status: 'PENDING', approvedBy: null, approvedByName: null, approvedAt: null, remarks: null }
      ],
      documents: [
        {
          id: 'doc-3',
          name: 'Management_Permission_Copy_Jackets.pdf',
          type: 'application/pdf',
          size: '310 KB',
          uploadedBy: 'usr-3',
          uploadedByName: 'Delwar Hossain',
          uploadedAt: '2026-08-22T08:15:00Z',
          approvalLevel: 0
        }
      ],
      approvalHistory: [
        { level: 0, action: 'REQUEST_SUBMITTED', approverName: 'Delwar Hossain', approverRole: 'MAINTENANCE_USER', date: '22/08/2026', time: '08:15', timestamp: '2026-08-22T08:15:00Z', remarks: 'Transfer request submitted. Awaiting Level 1 Source Release.' }
      ],
      status: 'PENDING_APPROVAL',
      requestedBy: 'usr-3',
      requestedByName: 'Delwar Hossain',
      requestedByRole: 'MAINTENANCE_USER',
      requestedAt: '2026-08-22T08:15:00Z',
      completedAt: null,
      completedBy: null
    },
    {
      id: 'trq-103',
      requestNumber: 'TR-2026-000003',
      machineId: 'mc-12',
      machineInfo: {
        machineName: 'Overlock Machine',
        brand: 'JUKI',
        model: 'MO-6800 Series',
        serialNumber: 'JUK-OL-00012',
        category: 'Sewing Machines'
      },
      sourceGroupId: 'grp-1',
      sourceUnitId: 'unt-1',
      sourceFloorId: 'flr-4',
      sourceLineId: 'lin-2',
      sourceLocation: { unit: 'AKM Knitwear Ltd.', floor: '3rd Floor', line: 'Line JA-B' },
      sourcePath: 'Al-Muslim Group > AKM Knitwear Ltd. > 3rd Floor > Line JA-B',
      destGroupId: 'grp-1',
      destUnitId: 'unt-2',
      destFloorId: 'flr-7',
      destLineId: 'lin-9',
      destLocation: { unit: 'Pacific Blue (Jeans Wear) Ltd.', floor: 'Jamuna Floor', line: 'Line PB-01' },
      destPath: 'Al-Muslim Group > Pacific Blue (Jeans Wear) Ltd. > Jamuna Floor > Line PB-01',
      reason: 'Inter-Unit Plant Transfer for Denim Bottom Hem Overedging.',
      remarks: 'Equipped with pneumatic chain cutter and waste suction pipe.',
      workflowId: 'wf-dest-admin',
      workflowName: 'Option C: Destination User + Admin Approval',
      currentLevel: 2,
      totalLevels: 2,
      levels: [
        { level: 1, title: 'Destination Floor In-Charge', approverType: 'DEST_LOCATION', status: 'APPROVED', approvedBy: 'usr-2', approvedByName: 'Engr. Tanvir Ahmed', approvedAt: '2026-08-21T14:20:00Z', remarks: 'Line PB-01 pneumatic air supply and operator assigned.' },
        { level: 2, title: 'Central Maintenance Admin Sign-off', approverType: 'ADMIN', status: 'PENDING', approvedBy: null, approvedByName: null, approvedAt: null, remarks: null }
      ],
      documents: [
        {
          id: 'doc-4',
          name: 'Inter_Unit_Transfer_Sanction_Letter.pdf',
          type: 'application/pdf',
          size: '420 KB',
          uploadedBy: 'usr-2',
          uploadedByName: 'Engr. Tanvir Ahmed',
          uploadedAt: '2026-08-21T11:00:00Z',
          approvalLevel: 0
        }
      ],
      approvalHistory: [
        { level: 0, action: 'REQUEST_SUBMITTED', approverName: 'Engr. Tanvir Ahmed', approverRole: 'MAINTENANCE_MANAGER', date: '21/08/2026', time: '11:00', timestamp: '2026-08-21T11:00:00Z', remarks: 'Transfer request submitted.' },
        { level: 1, levelTitle: 'Destination Floor In-Charge', action: 'APPROVED', approverName: 'Engr. Tanvir Ahmed', approverRole: 'MAINTENANCE_MANAGER', date: '21/08/2026', time: '14:20', timestamp: '2026-08-21T14:20:00Z', remarks: 'Destination space and pneumatic connection confirmed.' }
      ],
      status: 'PARTIALLY_APPROVED',
      requestedBy: 'usr-2',
      requestedByName: 'Engr. Tanvir Ahmed',
      requestedByRole: 'MAINTENANCE_MANAGER',
      requestedAt: '2026-08-21T11:00:00Z',
      completedAt: null,
      completedBy: null
    }
  ],

  transfers: [
    {
      id: 'trf-1',
      requestId: 'trq-101',
      requestNumber: 'TR-2026-000001',
      machineId: 'mc-1',
      serialNumber: 'JUK-PM-00001',
      machineName: 'Plane Machine',
      sourceGroupId: 'grp-1',
      sourceUnitId: 'unt-1',
      sourceFloorId: 'flr-4',
      sourceLineId: 'lin-2',
      sourcePath: 'Al-Muslim Group > AKM Knitwear Ltd. > 3rd Floor > Line JA-B',
      destGroupId: 'grp-1',
      destUnitId: 'unt-1',
      destFloorId: 'flr-4',
      destLineId: 'lin-1',
      destPath: 'Al-Muslim Group > AKM Knitwear Ltd. > 3rd Floor > Line JA-A',
      reason: 'Line re-balancing for critical order.',
      transferredBy: 'usr-2',
      transferredByName: 'Engr. Tanvir Ahmed',
      transferredAt: '2026-08-14T08:00:00Z',
      completedAt: '2026-08-14T09:30:00Z',
      completedBy: 'usr-1',
      completedByName: 'Super Administrator',
      approvedBy: 'Super Administrator'
    }
  ],

  import_history: [
    {
      id: 'imp-101',
      fileName: 'Initial_Factory_Plant_Machines_2026.xlsx',
      importedAt: '2026-08-18T11:45:00Z',
      importedBy: 'Super Administrator',
      mode: 'MULTI_SHEET_CREATE_UPDATE',
      totalRows: 120,
      validRows: 120,
      insertedRows: 110,
      updatedRows: 10,
      failedRows: 0,
      skippedRows: 0,
      sheetStats: [
        { sheetName: 'Plain Sewing Machines', total: 60, inserted: 55, updated: 5, failed: 0 },
        { sheetName: 'Overlock & Interlock', total: 40, inserted: 38, updated: 2, failed: 0 },
        { sheetName: 'Heavy & Special Machines', total: 20, inserted: 17, updated: 3, failed: 0 }
      ],
      status: 'SUCCESS'
    },
    {
      id: 'imp-102',
      fileName: 'Pacific_Blue_Denim_Relocation_Batch.xlsx',
      importedAt: '2026-08-20T14:20:00Z',
      importedBy: 'Engr. Tanvir Ahmed',
      mode: 'BULK_UPDATE',
      totalRows: 45,
      validRows: 45,
      insertedRows: 0,
      updatedRows: 45,
      failedRows: 0,
      skippedRows: 0,
      sheetStats: [
        { sheetName: 'Line PB-01 Machines', total: 25, inserted: 0, updated: 25, failed: 0 },
        { sheetName: 'Line PB-02 Machines', total: 20, inserted: 0, updated: 20, failed: 0 }
      ],
      status: 'SUCCESS'
    }
  ],

  excel_structures: [
    {
      id: 'ex-struct-default',
      name: 'Standard Garments Machinery Layout',
      isDefault: true,
      columns: [
        { id: 'col-1', header: 'Machine Name', fieldKey: 'machine_name', required: true, defaultValue: '', order: 1, visible: true },
        { id: 'col-2', header: 'Machine Brand', fieldKey: 'machine_brand', required: true, defaultValue: '', order: 2, visible: true },
        { id: 'col-3', header: 'Machine Model', fieldKey: 'machine_model', required: true, defaultValue: '', order: 3, visible: true },
        { id: 'col-4', header: 'Machine Serial', fieldKey: 'machine_serial', required: false, defaultValue: '', order: 4, visible: true },
        { id: 'col-5', header: 'Unit/Factory', fieldKey: 'unit_factory', required: true, defaultValue: 'AKM Knitwear Ltd.', order: 5, visible: true },
        { id: 'col-6', header: 'Floor', fieldKey: 'floor', required: true, defaultValue: '3rd Floor', order: 6, visible: true },
        { id: 'col-7', header: 'Line', fieldKey: 'line', required: true, defaultValue: 'Line JA-A', order: 7, visible: true },
        { id: 'col-8', header: 'Running', fieldKey: 'running', required: false, defaultValue: '1', order: 8, visible: true },
        { id: 'col-9', header: 'Usable Idle', fieldKey: 'usable_idle', required: false, defaultValue: '0', order: 9, visible: true },
        { id: 'col-10', header: 'Repairable Idle', fieldKey: 'repairable_idle', required: false, defaultValue: '0', order: 10, visible: true },
        { id: 'col-11', header: 'Total Quantity', fieldKey: 'total_quantity', required: false, defaultValue: '— (Auto-Calculated)', order: 11, visible: true, isCalculated: true, readOnly: true },
        { id: 'col-12', header: 'Machine Status', fieldKey: 'machine_status', required: false, defaultValue: 'ACTIVE', order: 12, visible: true },
        { id: 'col-13', header: 'Remarks', fieldKey: 'remarks', required: false, defaultValue: '', order: 13, visible: true }
      ]
    }
  ],

  audit_logs: [
    {
      id: 'aud-1',
      userId: 'usr-1',
      username: 'superadmin',
      action: 'SYSTEM_INITIALIZED',
      entity: 'SYSTEM',
      entityId: 'ROOT',
      details: 'Garments Factory Machine Inventory ERP initialized with multi-brand, multi-model master data and dynamic approval workflows.',
      ip: '192.168.1.10',
      timestamp: '2026-08-20T08:00:00Z'
    }
  ],

  notifications: [
    {
      id: 'notif-1',
      title: 'Pending Machine Transfer Request',
      message: 'Delwar Hossain submitted transfer request TR-2026-000002 for Machine JUK-PM-00005 (Line JA-A → Line JA-A 5F).',
      type: 'TRANSFER_REQUEST',
      targetUrl: '#approvals',
      read: false,
      timestamp: '2026-08-22T08:15:00Z'
    }
  ],

  generateInitialSpareParts: function() {
    return [
      // JA-01 Standard Floor Code Example Lifetime Spare Parts Tracking (Jamuna -> Titash -> Chitra)
      {
        id: 'sp-ja-1',
        machineId: 'mc-ja-01',
        serialNumber: 'JA-01',
        partName: 'Servo Motor 550W',
        partNumber: 'MOT-550W-DD',
        partSerialNumber: 'MOT-9921',
        quantity: 1,
        floorLocation: 'Jamuna Floor',
        replacementDate: '2025-01-10',
        replacementReason: 'Motor replaced due to coil overheating on Jamuna Floor',
        technician: 'Md. Rafiqul Islam',
        remarks: 'Genuine OEM 550W direct drive servo motor installed & calibrated',
        createdAt: '2025-01-10T11:30:00Z',
        createdBy: 'usr-1',
        createdByName: 'Super Administrator'
      },
      {
        id: 'sp-ja-2',
        machineId: 'mc-ja-01',
        serialNumber: 'JA-01',
        partName: 'Needle Bar and Presser Foot',
        partNumber: 'NB-PF-SET-01',
        partSerialNumber: 'NB-5510',
        quantity: 1,
        floorLocation: 'Titash Floor',
        replacementDate: '2025-06-15',
        replacementReason: 'Needle Bar and Presser Foot replaced during twill run overhaul on Titash Floor',
        technician: 'Rahim Uddin',
        remarks: 'Needle bar height set to 1.8mm above needle plate, heavy duty presser foot fitted',
        createdAt: '2025-06-15T14:15:00Z',
        createdBy: 'usr-4',
        createdByName: 'Rahim Uddin'
      },
      {
        id: 'sp-ja-3',
        machineId: 'mc-ja-01',
        serialNumber: 'JA-01',
        partName: 'Main Board and Sensor',
        partNumber: 'PCB-SEN-8800',
        partSerialNumber: 'PCB-8800A',
        quantity: 1,
        floorLocation: 'Chitra Floor',
        replacementDate: '2026-08-22',
        replacementReason: 'Main Board and Sensor replaced after power surge breakdown on Chitra Floor',
        technician: 'Engr. Tanvir Ahmed',
        remarks: 'Main control motherboard and optical needle positioning sensor replaced, firmware updated',
        createdAt: '2026-08-22T08:30:00Z',
        createdBy: 'usr-2',
        createdByName: 'Engr. Tanvir Ahmed'
      },
      // MCH-00125 Example Lifetime Spare Parts Tracking
      {
        id: 'sp-mch-1',
        machineId: 'mc-125',
        serialNumber: 'MCH-00125',
        partName: 'Servo Motor 550W',
        partNumber: 'MOT-550W-DD',
        partSerialNumber: 'MOT-9921',
        quantity: 1,
        floorLocation: 'Jamuna Floor',
        replacementDate: '2025-01-10',
        replacementReason: 'Motor replaced due to coil overheating and speed fluctuation',
        technician: 'Md. Rafiqul Islam',
        remarks: 'Genuine OEM 550W direct drive servo motor installed & calibrated',
        createdAt: '2025-01-10T11:30:00Z',
        createdBy: 'usr-1',
        createdByName: 'Super Administrator'
      },
      {
        id: 'sp-mch-2',
        machineId: 'mc-125',
        serialNumber: 'MCH-00125',
        partName: 'Needle Bar and Presser Foot',
        partNumber: 'NB-PF-SET-01',
        partSerialNumber: 'NB-5510',
        quantity: 1,
        floorLocation: 'Titas Floor',
        replacementDate: '2025-06-15',
        replacementReason: 'Needle Bar and Presser Foot replaced during twill run overhaul',
        technician: 'Rahim Uddin',
        remarks: 'Needle bar height set to 1.8mm above needle plate, heavy duty presser foot fitted',
        createdAt: '2025-06-15T14:15:00Z',
        createdBy: 'usr-4',
        createdByName: 'Rahim Uddin'
      },
      {
        id: 'sp-mch-3',
        machineId: 'mc-125',
        serialNumber: 'MCH-00125',
        partName: 'Main Board and Sensor',
        partNumber: 'PCB-SEN-8800',
        partSerialNumber: 'PCB-8800A',
        quantity: 1,
        floorLocation: 'Chitra Floor',
        replacementDate: '2026-08-22',
        replacementReason: 'Main Board and Sensor replaced after power surge breakdown',
        technician: 'Engr. Tanvir Ahmed',
        remarks: 'Main control motherboard and optical needle positioning sensor replaced, firmware updated',
        createdAt: '2026-08-22T08:30:00Z',
        createdBy: 'usr-2',
        createdByName: 'Engr. Tanvir Ahmed'
      },
      // JK-PM-00001 & Other Machines Spare Parts
      {
        id: 'sp-101',
        machineId: 'mc-1',
        serialNumber: 'JK-PM-00001',
        partName: 'Rotary Hook Assembly',
        partNumber: 'JK-RH-204',
        partSerialNumber: 'RH-9982',
        quantity: 1,
        floorLocation: '3rd Floor',
        replacementDate: '2026-08-10',
        replacementReason: 'Thread catching & skipped stitches on knit jersey',
        technician: 'Md. Rafiqul Islam',
        remarks: 'Genuine JUKI OEM hook installed, timing calibrated to 0.05mm gap',
        createdAt: '2026-08-10T11:20:00Z',
        createdBy: 'usr-1',
        createdByName: 'Super Administrator'
      },
      {
        id: 'sp-102',
        machineId: 'mc-1',
        serialNumber: 'JK-PM-00001',
        partName: 'Needle Bar & Needle Clamp',
        partNumber: 'NB-8700-02',
        partSerialNumber: 'NB-4421',
        quantity: 1,
        floorLocation: '3rd Floor',
        replacementDate: '2026-08-18',
        replacementReason: 'Bent needle bar after twill pocket jam',
        technician: 'Rahim Uddin',
        remarks: 'Replaced with heavy duty titanium coated needle bar',
        createdAt: '2026-08-18T14:30:00Z',
        createdBy: 'usr-4',
        createdByName: 'Rahim Uddin'
      },
      {
        id: 'sp-103',
        machineId: 'mc-2',
        serialNumber: 'JK-PM-00002',
        partName: 'Feed Dog (Fine Tooth)',
        partNumber: 'FD-348-FT',
        partSerialNumber: 'FD-1033',
        quantity: 1,
        floorLocation: '3rd Floor',
        replacementDate: '2026-08-12',
        replacementReason: 'Worn out teeth causing fabric slip on rib knit',
        technician: 'Delwar Hossain',
        remarks: 'Calibrated height to 1.2mm above needle plate',
        createdAt: '2026-08-12T09:15:00Z',
        createdBy: 'usr-3',
        createdByName: 'Delwar Hossain'
      },
      {
        id: 'sp-104',
        machineId: 'mc-3',
        serialNumber: 'JK-PM-00003',
        partName: 'Tension Disc & Check Spring',
        partNumber: 'TD-099-SP',
        partSerialNumber: 'TD-3320',
        quantity: 2,
        floorLocation: '3rd Floor',
        replacementDate: '2026-08-15',
        replacementReason: 'Thread tension fluctuation during topstitch',
        technician: 'Md. Rafiqul Islam',
        remarks: 'Tested with 40/2 polyester thread',
        createdAt: '2026-08-15T16:45:00Z',
        createdBy: 'usr-1',
        createdByName: 'Super Administrator'
      },
      {
        id: 'sp-105',
        machineId: 'mc-12',
        serialNumber: 'JK-OL-00012',
        partName: 'Carbide Upper & Lower Knife Blades',
        partNumber: 'KB-OL-45C',
        partSerialNumber: 'KB-8821',
        quantity: 1,
        floorLocation: '4th Floor',
        replacementDate: '2026-08-19',
        replacementReason: 'Dull cutting edge causing frayed fleece edges',
        technician: 'Engr. Tanvir Ahmed',
        remarks: 'Installed tungsten carbide blades for extended lifespan',
        createdAt: '2026-08-19T10:00:00Z',
        createdBy: 'usr-2',
        createdByName: 'Engr. Tanvir Ahmed'
      },
      {
        id: 'sp-106',
        machineId: 'mc-45',
        serialNumber: 'TYP-PM-00045',
        partName: 'Direct Drive Synchronizer Sensor',
        partNumber: 'SYN-6720',
        partSerialNumber: 'SN-7729',
        quantity: 1,
        floorLocation: '5th Floor',
        replacementDate: '2026-08-21',
        replacementReason: 'Erratic needle up/down positioning sensor error E-07',
        technician: 'Rahim Uddin',
        remarks: 'PCB board recalibrated and needle positioning confirmed',
        createdAt: '2026-08-21T15:10:00Z',
        createdBy: 'usr-4',
        createdByName: 'Rahim Uddin'
      }
    ];
  },

  generateInitialHistory: function() {
    return [
      // JA-01 Standard Floor Code Lifetime Movement & Service History (Jamuna Floor -> Titash Floor -> Chitra Floor)
      {
        id: 'hist-ja-1',
        machineId: 'mc-ja-01',
        serialNumber: 'JA-01',
        actionType: 'ADD_MACHINE',
        title: 'Machine Registered & Commissioned',
        details: 'Commissioned new JUKI Plain Lockstitch machine into Pacific Blue Denim Plant at Jamuna Floor (JA).',
        performedBy: 'usr-1',
        performedByName: 'Super Administrator',
        timestamp: '2025-01-05T09:00:00Z',
        fromLocation: null,
        toLocation: {
          groupId: 'grp-1',
          unitId: 'unt-2',
          floorId: 'flr-7',
          lineId: 'lin-9',
          groupName: 'Al-Muslim Group',
          unitName: 'Pacific Blue (Jeans Wear) Ltd.',
          floorName: 'Jamuna Floor',
          lineName: 'Line PB-01'
        },
        previousValue: null,
        newValue: { status: 'ACTIVE', floor: 'Jamuna Floor', line: 'Line PB-01' },
        remarks: 'Factory initial commissioning on Jamuna Floor (JA-01)'
      },
      {
        id: 'hist-ja-2',
        machineId: 'mc-ja-01',
        serialNumber: 'JA-01',
        actionType: 'SERVICE_REPAIR',
        title: 'Repair: Motor Replaced',
        details: 'Motor replaced due to coil overheating. Installed replacement 550W servo motor and calibrated encoder on Jamuna Floor.',
        performedBy: 'usr-1',
        performedByName: 'Super Administrator',
        timestamp: '2025-01-10T11:30:00Z',
        serviceRecord: {
          serviceDate: '2025-01-10',
          floorLocation: 'Jamuna Floor',
          serviceType: 'REPAIR',
          problemComplaint: 'Motor overheating and severe RPM fluctuation under load',
          workPerformed: 'Dismantled defective servo motor, installed replacement OEM 550W servo motor, and calibrated encoder timing',
          sparePartsUsed: 'Servo Motor 550W',
          sparePartSerial: 'MOT-9921',
          sparePartQty: 1,
          technician: 'Md. Rafiqul Islam',
          remarks: '10-01-2025 — Jamuna Floor — Motor replaced',
          addedBy: 'Engr. M. A. Hasan',
          addedAt: '2025-01-10T11:30:00Z'
        },
        sparePart: {
          partName: 'Servo Motor 550W',
          partNumber: 'MOT-550W-DD',
          partSerialNumber: 'MOT-9921',
          quantity: 1,
          floorLocation: 'Jamuna Floor',
          replacementDate: '2025-01-10',
          replacementReason: 'Motor replaced',
          technician: 'Md. Rafiqul Islam',
          remarks: 'OEM 550W motor fitted'
        },
        remarks: '10-01-2025 — Jamuna Floor — Motor replaced'
      },
      {
        id: 'hist-ja-3',
        machineId: 'mc-ja-01',
        serialNumber: 'JA-01',
        actionType: 'TRANSFER_MACHINE',
        title: 'Machine Relocated to Titash Floor',
        details: 'Transferred machine from Pacific Blue Jamuna Floor (Line PB-01) to Titash Floor (Line TTS-01) for denim line balancing. Serial number JA-01 preserved.',
        performedBy: 'usr-2',
        performedByName: 'Engr. Tanvir Ahmed',
        timestamp: '2025-06-15T09:00:00Z',
        fromLocation: {
          groupId: 'grp-1',
          unitId: 'unt-2',
          floorId: 'flr-7',
          lineId: 'lin-9',
          groupName: 'Al-Muslim Group',
          unitName: 'Pacific Blue (Jeans Wear) Ltd.',
          floorName: 'Jamuna Floor',
          lineName: 'Line PB-01'
        },
        toLocation: {
          groupId: 'grp-1',
          unitId: 'unt-2',
          floorId: 'flr-15',
          lineId: 'lin-18',
          groupName: 'Al-Muslim Group',
          unitName: 'Pacific Blue (Jeans Wear) Ltd.',
          floorName: 'Titash Floor',
          lineName: 'Line TTS-01'
        },
        previousValue: { floor: 'Jamuna Floor' },
        newValue: { floor: 'Titash Floor' },
        remarks: 'Jamuna Floor → Titash Floor on 15-06-2025'
      },
      {
        id: 'hist-ja-4',
        machineId: 'mc-ja-01',
        serialNumber: 'JA-01',
        actionType: 'SERVICE_REPAIR',
        title: 'Servicing: Needle Bar and Presser Foot Replaced',
        details: 'Needle Bar and Presser Foot replaced during routine servicing and heavy twill pocket setup on Titash Floor. Aligned needle bar stroke.',
        performedBy: 'usr-4',
        performedByName: 'Rahim Uddin',
        timestamp: '2025-06-15T14:15:00Z',
        serviceRecord: {
          serviceDate: '2025-06-15',
          floorLocation: 'Titash Floor',
          serviceType: 'SERVICING',
          problemComplaint: 'Needle deflection and thread friction during heavy twill pocket stitching',
          workPerformed: 'Replaced worn Needle Bar and Presser Foot assembly, calibrated needle to hook clearance',
          sparePartsUsed: 'Needle Bar and Presser Foot',
          sparePartSerial: 'NB-5510',
          sparePartQty: 1,
          technician: 'Rahim Uddin',
          remarks: '15-06-2025 — Titash Floor — Needle Bar and Presser Foot replaced',
          addedBy: 'Rahim Uddin',
          addedAt: '2025-06-15T14:15:00Z'
        },
        sparePart: {
          partName: 'Needle Bar and Presser Foot',
          partNumber: 'NB-PF-SET-01',
          partSerialNumber: 'NB-5510',
          quantity: 1,
          floorLocation: 'Titash Floor',
          replacementDate: '2025-06-15',
          replacementReason: 'Needle Bar and Presser Foot replaced',
          technician: 'Rahim Uddin',
          remarks: 'Titanium needle bar fitted'
        },
        remarks: '15-06-2025 — Titash Floor — Needle Bar and Presser Foot replaced'
      },
      {
        id: 'hist-ja-5',
        machineId: 'mc-ja-01',
        serialNumber: 'JA-01',
        actionType: 'TRANSFER_MACHINE',
        title: 'Machine Relocated to Chitra Floor',
        details: 'Transferred machine from Pacific Blue Titash Floor (Line TTS-01) to Chitra Floor (Line CTR-01) for export order expansion. Serial number JA-01 preserved.',
        performedBy: 'usr-2',
        performedByName: 'Engr. Tanvir Ahmed',
        timestamp: '2026-08-22T08:00:00Z',
        fromLocation: {
          groupId: 'grp-1',
          unitId: 'unt-2',
          floorId: 'flr-15',
          lineId: 'lin-18',
          groupName: 'Al-Muslim Group',
          unitName: 'Pacific Blue (Jeans Wear) Ltd.',
          floorName: 'Titash Floor',
          lineName: 'Line TTS-01'
        },
        toLocation: {
          groupId: 'grp-1',
          unitId: 'unt-2',
          floorId: 'flr-16',
          lineId: 'lin-19',
          groupName: 'Al-Muslim Group',
          unitName: 'Pacific Blue (Jeans Wear) Ltd.',
          floorName: 'Chitra Floor',
          lineName: 'Line CTR-01'
        },
        previousValue: { floor: 'Titash Floor' },
        newValue: { floor: 'Chitra Floor' },
        remarks: 'Titash Floor → Chitra Floor on 22-08-2026'
      },
      {
        id: 'hist-ja-6',
        machineId: 'mc-ja-01',
        serialNumber: 'JA-01',
        actionType: 'SERVICE_REPAIR',
        title: 'Breakdown: Main Board and Sensor Replaced',
        details: 'Main Board and Sensor replaced after electrical power surge breakdown on Chitra Floor. Installed OEM main board and synchronized needle positioning sensor.',
        performedBy: 'usr-2',
        performedByName: 'Engr. Tanvir Ahmed',
        timestamp: '2026-08-22T08:30:00Z',
        serviceRecord: {
          serviceDate: '2026-08-22',
          floorLocation: 'Chitra Floor',
          serviceType: 'BREAKDOWN',
          problemComplaint: 'Machine power supply failure with Error code E-01 and sensor misreading',
          workPerformed: 'Replaced burnt main circuit board and optical synchronizer sensor, loaded machine parameter firmware',
          sparePartsUsed: 'Main Board and Sensor',
          sparePartSerial: 'PCB-8800A',
          sparePartQty: 1,
          technician: 'Engr. Tanvir Ahmed',
          remarks: '22-08-2026 — Chitra Floor — Main Board and Sensor replaced',
          addedBy: 'Engr. Tanvir Ahmed',
          addedAt: '2026-08-22T08:30:00Z'
        },
        sparePart: {
          partName: 'Main Board and Sensor',
          partNumber: 'PCB-SEN-8800',
          partSerialNumber: 'PCB-8800A',
          quantity: 1,
          floorLocation: 'Chitra Floor',
          replacementDate: '2026-08-22',
          replacementReason: 'Main Board and Sensor replaced',
          technician: 'Engr. Tanvir Ahmed',
          remarks: 'Main control board replaced'
        },
        remarks: '22-08-2026 — Chitra Floor — Main Board and Sensor replaced'
      },
      // MCH-00125 Lifetime Movement & Service History
      {
        id: 'hist-mch-1',
        machineId: 'mc-125',
        serialNumber: 'MCH-00125',
        actionType: 'ADD_MACHINE',
        title: 'Machine Registered & Commissioned',
        details: 'Commissioned new JUKI Plain Lockstitch machine into Pacific Blue Denim Plant at Jamuna Floor.',
        performedBy: 'usr-1',
        performedByName: 'Super Administrator',
        timestamp: '2025-01-05T09:00:00Z',
        fromLocation: null,
        toLocation: {
          groupId: 'grp-1',
          unitId: 'unt-2',
          floorId: 'flr-7',
          lineId: 'lin-9',
          groupName: 'Al-Muslim Group',
          unitName: 'Pacific Blue (Jeans Wear) Ltd.',
          floorName: 'Jamuna Floor',
          lineName: 'Line PB-01'
        },
        previousValue: null,
        newValue: { status: 'ACTIVE', floor: 'Jamuna Floor', line: 'Line PB-01' },
        remarks: 'Factory initial commissioning and baseline calibration'
      },
      {
        id: 'hist-mch-2',
        machineId: 'mc-125',
        serialNumber: 'MCH-00125',
        actionType: 'SERVICE_REPAIR',
        title: 'Repair: Motor Replaced',
        details: 'Motor replaced due to coil overheating and speed fluctuation. Dismantled burnt servo motor, installed replacement 550W servo motor and calibrated encoder.',
        performedBy: 'usr-1',
        performedByName: 'Super Administrator',
        timestamp: '2025-01-10T11:30:00Z',
        serviceRecord: {
          serviceDate: '2025-01-10',
          floorLocation: 'Jamuna Floor',
          serviceType: 'REPAIR',
          problemComplaint: 'Motor overheating, buzzing noise, and severe RPM fluctuation under load',
          workPerformed: 'Dismantled defective servo motor, installed replacement OEM 550W servo motor, and calibrated encoder timing',
          sparePartsUsed: 'Servo Motor 550W',
          sparePartSerial: 'MOT-9921',
          sparePartQty: 1,
          technician: 'Md. Rafiqul Islam',
          remarks: 'Motor replaced on Jamuna Floor; tested on 14oz denim fabric with stable RPM',
          addedBy: 'Engr. M. A. Hasan',
          addedAt: '2025-01-10T11:30:00Z'
        },
        sparePart: {
          partName: 'Servo Motor 550W',
          partNumber: 'MOT-550W-DD',
          partSerialNumber: 'MOT-9921',
          quantity: 1,
          floorLocation: 'Jamuna Floor',
          replacementDate: '2025-01-10',
          replacementReason: 'Motor replaced',
          technician: 'Md. Rafiqul Islam',
          remarks: 'OEM 550W motor fitted'
        },
        remarks: '10-01-2025 — Jamuna Floor — Motor replaced'
      },
      {
        id: 'hist-mch-3',
        machineId: 'mc-125',
        serialNumber: 'MCH-00125',
        actionType: 'TRANSFER_MACHINE',
        title: 'Machine Relocated to Titas Floor',
        details: 'Transferred machine from Pacific Blue Jamuna Floor (Line PB-01) to Titas Floor (Line TTS-01) for heavy denim line balancing.',
        performedBy: 'usr-2',
        performedByName: 'Engr. Tanvir Ahmed',
        timestamp: '2025-06-15T09:00:00Z',
        fromLocation: {
          groupId: 'grp-1',
          unitId: 'unt-2',
          floorId: 'flr-7',
          lineId: 'lin-9',
          groupName: 'Al-Muslim Group',
          unitName: 'Pacific Blue (Jeans Wear) Ltd.',
          floorName: 'Jamuna Floor',
          lineName: 'Line PB-01'
        },
        toLocation: {
          groupId: 'grp-1',
          unitId: 'unt-2',
          floorId: 'flr-15',
          lineId: 'lin-18',
          groupName: 'Al-Muslim Group',
          unitName: 'Pacific Blue (Jeans Wear) Ltd.',
          floorName: 'Titas Floor',
          lineName: 'Line TTS-01'
        },
        previousValue: { floor: 'Jamuna Floor' },
        newValue: { floor: 'Titas Floor' },
        remarks: 'Jamuna Floor → Titas Floor on 15-06-2025'
      },
      {
        id: 'hist-mch-4',
        machineId: 'mc-125',
        serialNumber: 'MCH-00125',
        actionType: 'SERVICE_REPAIR',
        title: 'Servicing: Needle Bar and Presser Foot Replaced',
        details: 'Needle Bar and Presser Foot replaced during routine servicing and heavy twill pocket setup. Aligned needle bar stroke and timing.',
        performedBy: 'usr-4',
        performedByName: 'Rahim Uddin',
        timestamp: '2025-06-15T14:15:00Z',
        serviceRecord: {
          serviceDate: '2025-06-15',
          floorLocation: 'Titas Floor',
          serviceType: 'SERVICING',
          problemComplaint: 'Needle deflection and thread friction during heavy twill pocket stitching',
          workPerformed: 'Replaced worn Needle Bar and Presser Foot assembly, calibrated needle to hook clearance',
          sparePartsUsed: 'Needle Bar and Presser Foot',
          sparePartSerial: 'NB-5510',
          sparePartQty: 1,
          technician: 'Rahim Uddin',
          remarks: 'Needle Bar and Presser Foot replaced at Titas Floor; test sewn 50 pcs',
          addedBy: 'Rahim Uddin',
          addedAt: '2025-06-15T14:15:00Z'
        },
        sparePart: {
          partName: 'Needle Bar and Presser Foot',
          partNumber: 'NB-PF-SET-01',
          partSerialNumber: 'NB-5510',
          quantity: 1,
          floorLocation: 'Titas Floor',
          replacementDate: '2025-06-15',
          replacementReason: 'Needle Bar and Presser Foot replaced',
          technician: 'Rahim Uddin',
          remarks: 'Titanium needle bar fitted'
        },
        remarks: '15-06-2025 — Titas Floor — Needle Bar and Presser Foot replaced'
      },
      {
        id: 'hist-mch-5',
        machineId: 'mc-125',
        serialNumber: 'MCH-00125',
        actionType: 'TRANSFER_MACHINE',
        title: 'Machine Relocated to Chitra Floor',
        details: 'Transferred machine from Pacific Blue Titas Floor (Line TTS-01) to Chitra Floor (Line CTR-01) for export order expansion.',
        performedBy: 'usr-2',
        performedByName: 'Engr. Tanvir Ahmed',
        timestamp: '2026-08-22T08:00:00Z',
        fromLocation: {
          groupId: 'grp-1',
          unitId: 'unt-2',
          floorId: 'flr-15',
          lineId: 'lin-18',
          groupName: 'Al-Muslim Group',
          unitName: 'Pacific Blue (Jeans Wear) Ltd.',
          floorName: 'Titas Floor',
          lineName: 'Line TTS-01'
        },
        toLocation: {
          groupId: 'grp-1',
          unitId: 'unt-2',
          floorId: 'flr-16',
          lineId: 'lin-19',
          groupName: 'Al-Muslim Group',
          unitName: 'Pacific Blue (Jeans Wear) Ltd.',
          floorName: 'Chitra Floor',
          lineName: 'Line CTR-01'
        },
        previousValue: { floor: 'Titas Floor' },
        newValue: { floor: 'Chitra Floor' },
        remarks: 'Titas Floor → Chitra Floor on 22-08-2026'
      },
      {
        id: 'hist-mch-6',
        machineId: 'mc-125',
        serialNumber: 'MCH-00125',
        actionType: 'SERVICE_REPAIR',
        title: 'Breakdown: Main Board and Sensor Replaced',
        details: 'Main Board and Sensor replaced after electrical power surge breakdown. Installed new motherboard and optical sensor, flashed firmware.',
        performedBy: 'usr-2',
        performedByName: 'Engr. Tanvir Ahmed',
        timestamp: '2026-08-22T08:30:00Z',
        serviceRecord: {
          serviceDate: '2026-08-22',
          floorLocation: 'Chitra Floor',
          serviceType: 'BREAKDOWN',
          problemComplaint: 'Machine power tripping with error code E-01 (main control PCB communication error & sensor failure)',
          workPerformed: 'Replaced Main Board motherboard and optical positioning Sensor, updated system firmware and test run completed',
          sparePartsUsed: 'Main Board and Sensor',
          sparePartSerial: 'PCB-8800A',
          sparePartQty: 1,
          technician: 'Engr. Tanvir Ahmed',
          remarks: 'Main Board and Sensor replaced at Chitra Floor; machine fully operational',
          addedBy: 'Engr. Tanvir Ahmed',
          addedAt: '2026-08-22T08:30:00Z'
        },
        sparePart: {
          partName: 'Main Board and Sensor',
          partNumber: 'PCB-SEN-8800',
          partSerialNumber: 'PCB-8800A',
          quantity: 1,
          floorLocation: 'Chitra Floor',
          replacementDate: '2026-08-22',
          replacementReason: 'Main Board and Sensor replaced',
          technician: 'Engr. Tanvir Ahmed',
          remarks: 'Motherboard and sensor replacement'
        },
        remarks: '22-08-2026 — Chitra Floor — Main Board and Sensor replaced'
      },

      // JK-PM-00001 Lifetime History
      {
        id: 'hist-1',
        machineId: 'mc-1',
        serialNumber: 'JK-PM-00001',
        actionType: 'ADD_MACHINE',
        title: 'Machine Registered & Commissioned',
        details: 'Commissioned new JUKI DDL-9000 Plain Lockstitch machine into central inventory.',
        performedBy: 'usr-1',
        performedByName: 'Super Administrator',
        timestamp: '2026-08-01T08:30:00Z',
        fromLocation: null,
        toLocation: {
          groupId: 'grp-1',
          unitId: 'unt-1',
          floorId: 'flr-4',
          lineId: 'lin-1',
          groupName: 'Al-Muslim Group',
          unitName: 'AKM Knitwear Ltd.',
          floorName: '3rd Floor',
          lineName: 'Line JA-A'
        },
        previousValue: null,
        newValue: { status: 'ACTIVE', line: 'Line JA-A', floor: '3rd Floor' },
        remarks: 'Brand new unit, 5000 RPM direct drive motor tested and approved.'
      },
      {
        id: 'hist-2',
        machineId: 'mc-1',
        serialNumber: 'JK-PM-00001',
        actionType: 'SPARE_PART_REPLACEMENT',
        title: 'Spare Part Replaced: Rotary Hook Assembly',
        details: 'Replaced Rotary Hook Assembly (Part: JK-RH-204, Qty: 1) by Md. Rafiqul Islam. Reason: Thread catching & skipped stitches on knit jersey.',
        performedBy: 'usr-1',
        performedByName: 'Super Administrator',
        timestamp: '2026-08-10T11:20:00Z',
        fromLocation: null,
        toLocation: null,
        serviceRecord: {
          serviceDate: '2026-08-10',
          floorLocation: '3rd Floor',
          serviceType: 'REPAIR',
          problemComplaint: 'Thread catching & skipped stitches on knit jersey',
          workPerformed: 'Replaced rotary hook assembly and adjusted hook-to-needle timing',
          sparePartsUsed: 'Rotary Hook Assembly',
          sparePartSerial: 'RH-9982',
          sparePartQty: 1,
          technician: 'Md. Rafiqul Islam',
          remarks: 'Genuine JUKI OEM hook installed, timing calibrated to 0.05mm gap',
          addedBy: 'Engr. M. A. Hasan',
          addedAt: '2026-08-10T11:20:00Z'
        },
        sparePart: {
          partName: 'Rotary Hook Assembly',
          partNumber: 'JK-RH-204',
          partSerialNumber: 'RH-9982',
          quantity: 1,
          floorLocation: '3rd Floor',
          replacementDate: '2026-08-10',
          replacementReason: 'Thread catching & skipped stitches on knit jersey',
          technician: 'Md. Rafiqul Islam',
          remarks: 'Genuine JUKI OEM hook installed, timing calibrated to 0.05mm gap'
        },
        remarks: 'Genuine JUKI OEM hook installed, timing calibrated to 0.05mm gap'
      },
      {
        id: 'hist-3',
        machineId: 'mc-1',
        serialNumber: 'JK-PM-00001',
        actionType: 'MAINTENANCE_SERVICE',
        title: 'Preventive Maintenance (500-Hour Service)',
        details: 'Conducted 500-hour comprehensive lubrication, needle plate polishing, hook timing inspection, and suction vacuum cleaning.',
        performedBy: 'usr-4',
        performedByName: 'Rahim Uddin',
        timestamp: '2026-08-14T09:00:00Z',
        serviceRecord: {
          serviceDate: '2026-08-14',
          floorLocation: '3rd Floor',
          serviceType: 'PREVENTIVE_MAINTENANCE',
          problemComplaint: 'Scheduled 500-hour routine maintenance check',
          workPerformed: 'Full oil refill, oil pump pressure check, lint removal from feed dog mechanism',
          sparePartsUsed: 'None (Lubricants & Filters)',
          sparePartSerial: '',
          sparePartQty: 0,
          technician: 'Rahim Uddin',
          remarks: 'All parameters within factory tolerances',
          addedBy: 'Rahim Uddin',
          addedAt: '2026-08-14T09:00:00Z'
        },
        maintenance: {
          serviceType: 'PREVENTIVE_MAINTENANCE',
          problemReported: 'Scheduled 500-hour routine maintenance',
          actionTaken: 'Full oil refill, oil pump pressure check, lint removal from feed dog mechanism',
          technician: 'Rahim Uddin',
          durationMinutes: 45,
          status: 'COMPLETED'
        },
        remarks: 'All parameters within factory tolerances.'
      },
      {
        id: 'hist-4',
        machineId: 'mc-1',
        serialNumber: 'JK-PM-00001',
        actionType: 'TRANSFER_MACHINE',
        title: 'Inter-Line Production Balancing Transfer',
        details: 'Relocated machine from AKM 3rd Floor Line JA-A to AKM 3rd Floor Line JA-B for Polo Shirt Collar setting.',
        performedBy: 'usr-2',
        performedByName: 'Engr. Tanvir Ahmed',
        timestamp: '2026-08-16T13:40:00Z',
        fromLocation: {
          groupId: 'grp-1',
          unitId: 'unt-1',
          floorId: 'flr-4',
          lineId: 'lin-1',
          groupName: 'Al-Muslim Group',
          unitName: 'AKM Knitwear Ltd.',
          floorName: '3rd Floor',
          lineName: 'Line JA-A'
        },
        toLocation: {
          groupId: 'grp-1',
          unitId: 'unt-1',
          floorId: 'flr-4',
          lineId: 'lin-2',
          groupName: 'Al-Muslim Group',
          unitName: 'AKM Knitwear Ltd.',
          floorName: '3rd Floor',
          lineName: 'Line JA-B'
        },
        previousValue: { line: 'Line JA-A' },
        newValue: { line: 'Line JA-B' },
        remarks: 'Line JA-B collar run expansion approved by Floor In-charge.'
      },
      {
        id: 'hist-5',
        machineId: 'mc-1',
        serialNumber: 'JK-PM-00001',
        actionType: 'SPARE_PART_REPLACEMENT',
        title: 'Spare Part Replaced: Needle Bar & Clamp',
        details: 'Replaced Needle Bar & Needle Clamp (Part: NB-8700-02, Qty: 1) by Rahim Uddin. Reason: Bent needle bar after twill pocket jam.',
        performedBy: 'usr-4',
        performedByName: 'Rahim Uddin',
        timestamp: '2026-08-18T14:30:00Z',
        serviceRecord: {
          serviceDate: '2026-08-18',
          floorLocation: '3rd Floor',
          serviceType: 'REPAIR',
          problemComplaint: 'Bent needle bar after twill pocket jam',
          workPerformed: 'Replaced needle bar and clamp with titanium unit, calibrated stroke',
          sparePartsUsed: 'Needle Bar & Needle Clamp',
          sparePartSerial: 'NB-4421',
          sparePartQty: 1,
          technician: 'Rahim Uddin',
          remarks: 'Replaced with heavy duty titanium coated needle bar',
          addedBy: 'Rahim Uddin',
          addedAt: '2026-08-18T14:30:00Z'
        },
        sparePart: {
          partName: 'Needle Bar & Needle Clamp',
          partNumber: 'NB-8700-02',
          partSerialNumber: 'NB-4421',
          quantity: 1,
          floorLocation: '3rd Floor',
          replacementDate: '2026-08-18',
          replacementReason: 'Bent needle bar after twill pocket jam',
          technician: 'Rahim Uddin',
          remarks: 'Replaced with heavy duty titanium coated needle bar'
        },
        remarks: 'Replaced with heavy duty titanium coated needle bar'
      },
      {
        id: 'hist-6',
        machineId: 'mc-1',
        serialNumber: 'JK-PM-00001',
        actionType: 'STATUS_CHANGE',
        title: 'Status Updated: Active Operational',
        details: 'Status changed from UNDER MAINTENANCE to ACTIVE after test sewing 50 garment sample panels.',
        performedBy: 'usr-1',
        performedByName: 'Super Administrator',
        timestamp: '2026-08-18T16:00:00Z',
        previousValue: { status: 'MAINTENANCE' },
        newValue: { status: 'ACTIVE' },
        remarks: 'Quality inspector verified zero puckering and even stitch density.'
      }
    ];
  },

  et_companies: [
    { id: 'etc-1', name: 'JUKI Bangladesh Ltd. - Technical Service Center', contactPerson: 'Engr. Mahbubul Alam', phone: '+8801713000111', email: 'service@juki-bd.com', address: 'Plot 14, Sector 7, Uttara, Dhaka', status: 'ACTIVE' },
    { id: 'etc-2', name: 'Brother International BD Support & Repair Lab', contactPerson: 'Engr. Sazzad Karim', phone: '+8801712888222', email: 'support@brother-bd.com', address: 'Tejgaon Industrial Area, Dhaka', status: 'ACTIVE' },
    { id: 'etc-3', name: 'Jack Tech Automation Ltd.', contactPerson: 'Hassan Mahmud', phone: '+8801819333444', email: 'tech@jack-bd.com', address: 'Savar Commercial Area, Dhaka', status: 'ACTIVE' },
    { id: 'etc-4', name: 'Micro Embedded Circuit & PCB Lab Dhaka', contactPerson: 'Engr. Kazi Tariq', phone: '+8801911444555', email: 'repairs@microlab-bd.com', address: 'Elephant Road, Dhaka', status: 'ACTIVE' },
    { id: 'etc-5', name: 'Singer Industrial Electronics Service Center', contactPerson: 'Md. Rafiqul Islam', phone: '+8801715666777', email: 'industrial@singer-bd.com', address: 'Mohakhali C/A, Dhaka', status: 'ACTIVE' },
    { id: 'etc-6', name: 'Pegasus Asian Electronics Support', contactPerson: 'Engr. Asif Reza', phone: '+8801718999888', email: 'service@pegasus-bd.com', address: 'Gazipur Chourasta, Dhaka', status: 'ACTIVE' }
  ],

  et_categories: [
    { id: 'etcat-1', name: 'Main CPU Control Board', code: 'MAIN_CPU', description: 'Central processing and logic microcontroller PCB', status: 'ACTIVE' },
    { id: 'etcat-2', name: 'Servo Motor Drive PCB', code: 'SERVO_DRV', description: 'Brushless servo motor drive and power inverter controller', status: 'ACTIVE' },
    { id: 'etcat-3', name: 'Operation Panel & Display PCB', code: 'OP_PANEL', description: 'Operator digital touch/key control and display console', status: 'ACTIVE' },
    { id: 'etcat-4', name: 'Power Supply & Transformer Unit', code: 'PWR_SPLY', description: 'AC/DC switching power regulator and filter board', status: 'ACTIVE' },
    { id: 'etcat-5', name: 'Sensor & Position Encoder Board', code: 'SENSOR_ENC', description: 'Needle position synchronizer and optical sensor PCB', status: 'ACTIVE' },
    { id: 'etcat-6', name: 'Trimmer & Solenoid Drive PCB', code: 'TRIM_SOL', description: 'Under-bed thread trimmer, wiper and presser foot driver', status: 'ACTIVE' }
  ],

  generateInitialEtBoards() {
    return [
      {
        id: 'brd-1',
        boardSerial: 'BRD-00001',
        modelNo: 'CP-180A',
        partName: 'Main CPU Control Board',
        partNo: '400-05831',
        slNo: 'SL-99201',
        qty: 1,
        comeDate: '2025-11-10',
        gpNo: 'GP-2025-108',
        billNo: 'BILL-2025-014',
        remarks: 'Factory original motherboard for DDL-8700-7',
        jukiSlNo: 'JUK-882910',
        category: 'Main CPU Control Board',
        status: 'INSTALLED',
        currentMachineSerial: 'JA-01',
        currentMachineId: 'mc-1',
        installedDate: '2026-01-05',
        installedBy: 'Engr. Tanvir Ahmed',
        location: 'Pacific Blue (Jeans Wear) Ltd. -> Jamuna Floor -> Line PB-01'
      },
      {
        id: 'brd-2',
        boardSerial: 'BRD-00002',
        modelNo: 'SC-920CN',
        partName: 'Servo Motor Drive Board',
        partNo: '229-21503',
        slNo: 'SL-99202',
        qty: 1,
        comeDate: '2025-11-12',
        gpNo: 'GP-2025-109',
        billNo: 'BILL-2025-015',
        remarks: 'Direct-drive servo inverter drive PCB',
        jukiSlNo: 'JUK-882911',
        category: 'Servo Motor Drive PCB',
        status: 'INSTALLED',
        currentMachineSerial: 'JA-02',
        currentMachineId: 'mc-2',
        installedDate: '2026-01-10',
        installedBy: 'Engr. Delwar Hossain',
        location: 'Pacific Blue (Jeans Wear) Ltd. -> Jamuna Floor -> Line PB-01'
      },
      {
        id: 'brd-3',
        boardSerial: 'BRD-00003',
        modelNo: 'IP-110',
        partName: 'Operation Panel PCB',
        partNo: 'M8510-580-0A0',
        slNo: 'SL-99203',
        qty: 1,
        comeDate: '2025-12-01',
        gpNo: 'GP-2025-114',
        billNo: 'BILL-2025-021',
        remarks: 'Digital stitch programming LCD panel',
        jukiSlNo: 'JUK-773412',
        category: 'Operation Panel & Display PCB',
        status: 'INSTALLED',
        currentMachineSerial: 'BG-01',
        currentMachineId: 'mc-5',
        installedDate: '2026-01-15',
        installedBy: 'Engr. Tanvir Ahmed',
        location: 'Pacific Blue (Jeans Wear) Ltd. -> Buriganga Floor -> Line PB-03'
      },
      {
        id: 'brd-4',
        boardSerial: 'BRD-00004',
        modelNo: 'PWR-8700',
        partName: 'Power Supply & Transformer Board',
        partNo: '400-11209',
        slNo: 'SL-99204',
        qty: 1,
        comeDate: '2026-01-05',
        gpNo: 'GP-2026-002',
        billNo: 'BILL-2026-005',
        remarks: 'High stability SMPS unit with surge filter',
        jukiSlNo: 'JUK-665510',
        category: 'Power Supply & Transformer Unit',
        status: 'INSTALLED',
        currentMachineSerial: 'TT-01',
        currentMachineId: 'mc-8',
        installedDate: '2026-02-01',
        installedBy: 'Engr. Delwar Hossain',
        location: 'Pacific Blue (Jeans Wear) Ltd. -> Titash Floor -> Line TTS-01'
      },
      {
        id: 'brd-5',
        boardSerial: 'BRD-00005',
        modelNo: 'CP-180A',
        partName: 'Main CPU Control Board',
        partNo: '400-05831',
        slNo: 'SL-99205',
        qty: 1,
        comeDate: '2026-02-10',
        gpNo: 'GP-2026-019',
        billNo: 'BILL-2026-033',
        remarks: 'Pre-tested backup board in ENT Lab Shelf A-01',
        jukiSlNo: 'JUK-882915',
        category: 'Main CPU Control Board',
        status: 'AVAILABLE_SPARE',
        currentMachineSerial: null,
        currentMachineId: null,
        installedDate: null,
        installedBy: null,
        location: 'ENT Lab - Shelf A-01 (Spare Stock)'
      },
      {
        id: 'brd-6',
        boardSerial: 'BRD-00006',
        modelNo: 'SC-920CN',
        partName: 'Servo Motor Drive Board',
        partNo: '229-21503',
        slNo: 'SL-99206',
        qty: 1,
        comeDate: '2026-02-15',
        gpNo: 'GP-2026-025',
        billNo: 'BILL-2026-041',
        remarks: 'ENT Lab ready standby spare unit',
        jukiSlNo: 'JUK-882918',
        category: 'Servo Motor Drive PCB',
        status: 'AVAILABLE_SPARE',
        currentMachineSerial: null,
        currentMachineId: null,
        installedDate: null,
        installedBy: null,
        location: 'ENT Lab - Shelf A-02 (Spare Stock)'
      },
      {
        id: 'brd-7',
        boardSerial: 'BRD-00007',
        modelNo: 'SEN-700',
        partName: 'Sensor & Position Encoder Board',
        partNo: '400-88912',
        slNo: 'SL-99207',
        qty: 1,
        comeDate: '2026-03-01',
        gpNo: 'GP-2026-034',
        billNo: 'BILL-2026-050',
        remarks: 'Removed from Jamuna line for diagnostic overhaul',
        jukiSlNo: 'JUK-554410',
        category: 'Sensor & Position Encoder Board',
        status: 'UNDER_INHOUSE_REPAIR',
        currentMachineSerial: null,
        currentMachineId: null,
        installedDate: null,
        installedBy: null,
        location: 'ENT Lab Workstation #3 (In-House Repair)',
        inhouseRepair: {
          problem: 'Error E-07 Optical needle sensor jitter during auto backtack',
          startDate: '2026-08-20',
          repairedBy: 'Engr. Delwar Hossain',
          details: 'Replacing optical coupler photodiodes and cleaning PCB tracks',
          remarks: 'Expected test completion today'
        }
      },
      {
        id: 'brd-8',
        boardSerial: 'BRD-00008',
        modelNo: 'SC-920CN',
        partName: 'Servo Motor Drive Board',
        partNo: '229-21503',
        slNo: 'SL-99208',
        qty: 1,
        comeDate: '2026-03-10',
        gpNo: 'GP-2026-045',
        billNo: 'BILL-2026-062',
        remarks: 'Dispatched to official JUKI center for IGBT module replacement',
        jukiSlNo: 'JUK-882922',
        category: 'Servo Motor Drive PCB',
        status: 'SENT_EXTERNAL',
        currentMachineSerial: null,
        currentMachineId: null,
        installedDate: null,
        installedBy: null,
        location: 'External: JUKI Bangladesh Ltd. - Technical Service Center',
        externalRepair: {
          companyName: 'JUKI Bangladesh Ltd. - Technical Service Center',
          problem: 'Overcurrent fault Err-03 on high load denim waistband stitching',
          sendDate: '2026-08-16',
          expectedReturnDate: '2026-08-28',
          remarks: 'Official warranty RMA gatepass issued'
        }
      },
      {
        id: 'brd-9',
        boardSerial: 'BRD-00009',
        modelNo: 'IP-110',
        partName: 'Operation Panel PCB',
        partNo: 'M8510-580-0A0',
        slNo: 'SL-99209',
        qty: 1,
        comeDate: '2026-03-15',
        gpNo: 'GP-2026-052',
        billNo: 'BILL-2026-077',
        remarks: 'Returned from Micro Lab with certified test report',
        jukiSlNo: 'JUK-773420',
        category: 'Operation Panel & Display PCB',
        status: 'RETURNED',
        currentMachineSerial: null,
        currentMachineId: null,
        installedDate: null,
        installedBy: null,
        location: 'ENT Lab - Shelf B-01 (Tested & Returned)',
        lastExternalRepair: {
          companyName: 'Micro Embedded Circuit & PCB Lab Dhaka',
          problem: 'Touch membrane unresponsive on button 4 and 5',
          sendDate: '2026-08-05',
          returnDate: '2026-08-19',
          durationDays: 14,
          repairResult: 'Repaired & Quality Passed',
          repairDetails: 'Replaced membrane flex connector and refreshed EEPROM firmware',
          remarks: 'Bench tested for 48 hours without error'
        }
      },
      {
        id: 'brd-10',
        boardSerial: 'BRD-00010',
        modelNo: 'TRM-900',
        partName: 'Trimmer & Solenoid Drive PCB',
        partNo: '400-33211',
        slNo: 'SL-99210',
        qty: 1,
        comeDate: '2026-04-01',
        gpNo: 'GP-2026-060',
        billNo: 'BILL-2026-088',
        remarks: 'Auto-trimmer solenoid pulse board',
        jukiSlNo: 'JUK-441209',
        category: 'Trimmer & Solenoid Drive PCB',
        status: 'INSTALLED',
        currentMachineSerial: 'CH-01',
        currentMachineId: 'mc-10',
        installedDate: '2026-04-15',
        installedBy: 'Engr. Tanvir Ahmed',
        location: 'Pacific Blue (Jeans Wear) Ltd. -> Chitra Floor -> Line CTR-01'
      },
      {
        id: 'brd-11',
        boardSerial: 'BRD-00011',
        modelNo: 'CP-180A',
        partName: 'Main CPU Control Board',
        partNo: '400-05831',
        slNo: 'SL-99211',
        qty: 1,
        comeDate: '2026-04-10',
        gpNo: 'GP-2026-068',
        billNo: null,
        remarks: 'Extra standby board without previous billing',
        jukiSlNo: 'JUK-882930',
        category: 'Main CPU Control Board',
        status: 'AVAILABLE_SPARE',
        currentMachineSerial: null,
        currentMachineId: null,
        installedDate: null,
        installedBy: null,
        location: 'ENT Lab - Shelf A-03 (Spare Stock)'
      },
      {
        id: 'brd-12',
        boardSerial: 'BRD-00012',
        modelNo: 'SC-920CN',
        partName: 'Servo Motor Drive Board',
        partNo: '229-21503',
        slNo: 'SL-99212',
        qty: 1,
        comeDate: '2026-04-15',
        gpNo: 'GP-2026-072',
        billNo: 'BILL-2026-095',
        remarks: 'Severely burned tracks during plant high-voltage surge',
        jukiSlNo: 'JUK-882935',
        category: 'Servo Motor Drive PCB',
        status: 'DAMAGED_SCRAP',
        currentMachineSerial: null,
        currentMachineId: null,
        installedDate: null,
        installedBy: null,
        location: 'ENT Lab - Scrap Bin #01 (Archived)'
      },
      {
        id: 'brd-25',
        boardSerial: 'BRD-00025',
        modelNo: 'CP-180A',
        partName: 'Main CPU Control Board',
        partNo: '400-05831',
        slNo: 'SL-99225',
        qty: 1,
        comeDate: '2026-01-02',
        gpNo: 'GP-2026-001',
        billNo: 'BILL-2026-089',
        remarks: 'Multi-machine lifecycle tracked unit across Jamuna, Buriganga, and Tista floors',
        jukiSlNo: 'JUK-990025',
        category: 'Main CPU Control Board',
        status: 'INSTALLED',
        currentMachineSerial: 'TS-01',
        currentMachineId: 'mc-15',
        installedDate: '2026-08-22',
        installedBy: 'Engr. Tanvir Ahmed',
        location: 'Pacific Blue (Jeans Wear) Ltd. -> Tista Floor -> Line TS-01'
      }
    ];
  },

  generateInitialEtHistory() {
    return [
      // BRD-00001 Lifetime
      {
        id: 'eth-1',
        boardSerial: 'BRD-00001',
        action: 'CREATE',
        actionLabel: 'Registered in ENT Lab',
        timestamp: '2025-11-10T10:00:00Z',
        machineSerial: null,
        location: 'ENT Lab Master Stock',
        performedBy: 'usr-super-admin',
        performedByName: 'Engr. Tanvir Ahmed',
        remarks: 'New board received from supplier under Gate Pass GP-2025-108, Bill No: BILL-2025-014'
      },
      {
        id: 'eth-2',
        boardSerial: 'BRD-00001',
        action: 'INSTALL',
        actionLabel: 'Installed on Machine',
        timestamp: '2026-01-05T09:30:00Z',
        machineSerial: 'JA-01',
        location: 'Jamuna Floor -> Line PB-01',
        performedBy: 'usr-super-admin',
        performedByName: 'Engr. Tanvir Ahmed',
        remarks: 'Initial installation on JUKI 1-Needle Lockstitch machine JA-01'
      },

      // BRD-00025 Complete Multi-Machine Lifetime Journey
      {
        id: 'eth-25-1',
        boardSerial: 'BRD-00025',
        action: 'CREATE',
        actionLabel: 'Registered in ENT Lab',
        timestamp: '2026-01-02T10:00:00Z',
        machineSerial: null,
        location: 'ENT Lab Master Stock',
        performedBy: 'usr-super-admin',
        performedByName: 'Engr. Tanvir Ahmed',
        remarks: 'Received in lab stock with initial Bill No: BILL-2026-089'
      },
      {
        id: 'eth-25-2',
        boardSerial: 'BRD-00025',
        action: 'INSTALL',
        actionLabel: 'Installed on Machine',
        timestamp: '2026-06-01T09:00:00Z',
        machineSerial: 'JA-01',
        location: 'Jamuna Floor -> Line PB-01',
        performedBy: 'usr-super-admin',
        performedByName: 'Engr. Tanvir Ahmed',
        remarks: 'Installed on Machine JA-01 (JUKI DDL-8700-7)'
      },
      {
        id: 'eth-25-3',
        boardSerial: 'BRD-00025',
        action: 'REMOVE',
        actionLabel: 'Removed from Machine',
        timestamp: '2026-07-10T11:00:00Z',
        machineSerial: 'JA-01',
        location: 'ENT Lab Diagnostics',
        performedBy: 'usr-super-admin',
        performedByName: 'Engr. Delwar Hossain',
        removalReason: 'Err-02 Thread Trimmer signal pulse loss',
        remarks: 'Sent to ENT Lab for testing and solder reflow'
      },
      {
        id: 'eth-25-4',
        boardSerial: 'BRD-00025',
        action: 'INHOUSE_START',
        actionLabel: 'Started In-House Repair',
        timestamp: '2026-07-11T10:00:00Z',
        machineSerial: null,
        location: 'ENT Lab Workstation #1',
        performedBy: 'usr-super-admin',
        performedByName: 'Engr. Delwar Hossain',
        repairType: 'In-House',
        problem: 'Err-02 Trimmer pulse MOSFET damaged',
        remarks: 'Technician started component replacement'
      },
      {
        id: 'eth-25-5',
        boardSerial: 'BRD-00025',
        action: 'INHOUSE_COMPLETE',
        actionLabel: 'Completed In-House Repair',
        timestamp: '2026-07-14T16:00:00Z',
        machineSerial: null,
        location: 'ENT Lab Shelf A-01 (Tested Ready)',
        performedBy: 'usr-super-admin',
        performedByName: 'Engr. Delwar Hossain',
        repairType: 'In-House',
        repairDetails: 'Replaced IRF540 MOSFET and recalibrated timing gate',
        remarks: 'Bench test passed 100%'
      },
      {
        id: 'eth-25-6',
        boardSerial: 'BRD-00025',
        action: 'INSTALL',
        actionLabel: 'Installed on Machine',
        timestamp: '2026-07-15T09:30:00Z',
        machineSerial: 'GB-05',
        location: 'Buriganga Floor -> Line PB-03',
        performedBy: 'usr-super-admin',
        performedByName: 'Engr. Tanvir Ahmed',
        remarks: 'Re-assigned to Machine GB-05 on Buriganga Floor'
      },
      {
        id: 'eth-25-7',
        boardSerial: 'BRD-00025',
        action: 'REMOVE',
        actionLabel: 'Removed from Machine',
        timestamp: '2026-08-10T14:00:00Z',
        machineSerial: 'GB-05',
        location: 'ENT Lab Diagnostics',
        performedBy: 'usr-super-admin',
        performedByName: 'Engr. Delwar Hossain',
        removalReason: 'Complex DSP processor communication blackout',
        remarks: 'Required specialized external micro-soldering'
      },
      {
        id: 'eth-25-8',
        boardSerial: 'BRD-00025',
        action: 'SEND_EXTERNAL',
        actionLabel: 'Sent to External Company',
        timestamp: '2026-08-12T10:00:00Z',
        machineSerial: null,
        location: 'External: JUKI Bangladesh Ltd. - Technical Service Center',
        companyName: 'JUKI Bangladesh Ltd. - Technical Service Center',
        repairType: 'External Company',
        problem: 'DSP processor communication blackout on CAN bus',
        performedBy: 'usr-super-admin',
        performedByName: 'Engr. Tanvir Ahmed',
        remarks: 'Dispatched with Gate Pass GP-2026-078. Duplicate Bill Checked: YES (BILL-2026-089)'
      },
      {
        id: 'eth-25-9',
        boardSerial: 'BRD-00025',
        action: 'RECEIVE_EXTERNAL',
        actionLabel: 'Received from External Company',
        timestamp: '2026-08-20T15:00:00Z',
        machineSerial: null,
        location: 'ENT Lab Shelf A-01 (Tested & Returned)',
        companyName: 'JUKI Bangladesh Ltd. - Technical Service Center',
        repairType: 'External Company',
        repairDurationDays: 8,
        repairResult: 'Repaired & Certified by JUKI Senior Tech',
        repairDetails: 'Replaced CAN transceiver IC SN65HVD230 and re-flashed system firmware',
        performedBy: 'usr-super-admin',
        performedByName: 'Engr. Tanvir Ahmed',
        remarks: 'Returned in pristine condition, total turnaround 8 days'
      },
      {
        id: 'eth-25-10',
        boardSerial: 'BRD-00025',
        action: 'INSTALL',
        actionLabel: 'Installed on Machine',
        timestamp: '2026-08-22T10:00:00Z',
        machineSerial: 'TS-01',
        location: 'Tista Floor -> Line TS-01',
        performedBy: 'usr-super-admin',
        performedByName: 'Engr. Tanvir Ahmed',
        remarks: 'Currently active and operating on Machine TS-01'
      }
    ];
  },

  tools_master: [
    { id: 'tool-001', code: '001', name: 'Flat Screw Driver (Large)', category: 'TOOLS', totalStock: 150, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'Heavy duty flat tip blade' },
    { id: 'tool-002', code: '002', name: 'Flat Screw Driver (Medium)', category: 'TOOLS', totalStock: 180, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'Standard adjustment screwdriver' },
    { id: 'tool-003', code: '003', name: 'Flat Screw Driver (Small)', category: 'TOOLS', totalStock: 200, unit: 'Pcs', minStock: 25, status: 'ACTIVE', remarks: 'Fine tension adjustment screwdriver' },
    { id: 'tool-014', code: '014', name: 'Pliers (Long Nose)', category: 'TOOLS', totalStock: 120, unit: 'Pcs', minStock: 15, status: 'ACTIVE', remarks: 'Precision needle nose pliers' },
    { id: 'tool-015', code: '015', name: 'Pliers (Combination / Cutting)', category: 'TOOLS', totalStock: 120, unit: 'Pcs', minStock: 15, status: 'ACTIVE', remarks: 'Side cutting mechanics pliers' },
    { id: 'tool-021', code: '021', name: 'Hex Allen Key (01.50mm)', category: 'TOOLS', totalStock: 250, unit: 'Pcs', minStock: 30, status: 'ACTIVE', remarks: 'Standard 1.5mm L-key' },
    { id: 'tool-022', code: '022', name: 'Hex Allen Key (02mm)', category: 'TOOLS', totalStock: 250, unit: 'Pcs', minStock: 30, status: 'ACTIVE', remarks: 'Standard 2.0mm L-key' },
    { id: 'tool-023', code: '023', name: 'Hex Allen Key (02.50mm)', category: 'TOOLS', totalStock: 250, unit: 'Pcs', minStock: 30, status: 'ACTIVE', remarks: 'Standard 2.5mm L-key' },
    { id: 'tool-024', code: '024', name: 'Hex Allen Key (03mm)', category: 'TOOLS', totalStock: 250, unit: 'Pcs', minStock: 30, status: 'ACTIVE', remarks: 'Standard 3.0mm L-key' },
    { id: 'tool-025', code: '025', name: 'Hex Allen Key (03.50mm)', category: 'TOOLS', totalStock: 200, unit: 'Pcs', minStock: 25, status: 'ACTIVE', remarks: 'Standard 3.5mm L-key' },
    { id: 'tool-026', code: '026', name: 'Hex Allen Key (04mm)', category: 'TOOLS', totalStock: 220, unit: 'Pcs', minStock: 25, status: 'ACTIVE', remarks: 'Standard 4.0mm L-key' },
    { id: 'tool-027', code: '027', name: 'Hex Allen Key (04.50mm)', category: 'TOOLS', totalStock: 190, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'Standard 4.5mm L-key' },
    { id: 'tool-028', code: '028', name: 'Hex Allen Key (05mm)', category: 'TOOLS', totalStock: 240, unit: 'Pcs', minStock: 25, status: 'ACTIVE', remarks: 'Standard 5.0mm L-key' },
    { id: 'tool-029', code: '029', name: 'Hex Allen Key (06mm)', category: 'TOOLS', totalStock: 200, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'Standard 6.0mm L-key' },
    { id: 'tool-037', code: '037', name: 'T-Handle Allen Key (02.50mm)', category: 'TOOLS', totalStock: 160, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'T-Grip high torque 2.5mm' },
    { id: 'tool-038', code: '038', name: 'T-Handle Allen Key (03mm)', category: 'TOOLS', totalStock: 180, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'T-Grip high torque 3.0mm' },
    { id: 'tool-039', code: '039', name: 'T-Handle Allen Key (04mm)', category: 'TOOLS', totalStock: 175, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'T-Grip high torque 4.0mm' },
    { id: 'tool-040', code: '040', name: 'T-Handle Allen Key (05mm)', category: 'TOOLS', totalStock: 150, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'T-Grip high torque 5.0mm' },
    { id: 'tool-045', code: '045', name: 'Needle Allen Key (01.58mm)', category: 'TOOLS', totalStock: 300, unit: 'Pcs', minStock: 40, status: 'ACTIVE', remarks: '1/16" 1.58mm Needle clamp key' },
    { id: 'tool-051', code: '051', name: 'Adjustable Wrench (10inch)', category: 'TOOLS', totalStock: 90, unit: 'Pcs', minStock: 15, status: 'ACTIVE', remarks: '10 inch chrome forged monkey wrench' },
    { id: 'tool-064', code: '064', name: 'Open End Spanner (10-11mm)', category: 'TOOLS', totalStock: 140, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'Double open-end wrench 10-11mm' },
    { id: 'tool-070', code: '070', name: 'Open End Spanner (12-13mm)', category: 'TOOLS', totalStock: 130, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'Double open-end wrench 12-13mm' },
    { id: 'tool-071', code: '071', name: 'Open End Spanner (14-17mm)', category: 'TOOLS', totalStock: 120, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'Double open-end wrench 14-17mm' },
    { id: 'tool-091', code: '091', name: 'Combination Spanner (05mm)', category: 'TOOLS', totalStock: 150, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'Ring + open spanner 5mm' },
    { id: 'tool-092', code: '092', name: 'Combination Spanner (06mm)', category: 'TOOLS', totalStock: 150, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'Ring + open spanner 6mm' },
    { id: 'tool-093', code: '093', name: 'Combination Spanner (07mm)', category: 'TOOLS', totalStock: 150, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'Ring + open spanner 7mm' },
    { id: 'tool-094', code: '094', name: 'Combination Spanner (08mm)', category: 'TOOLS', totalStock: 150, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'Ring + open spanner 8mm' },
    { id: 'tool-095', code: '095', name: 'Combination Spanner (09mm)', category: 'TOOLS', totalStock: 150, unit: 'Pcs', minStock: 20, status: 'ACTIVE', remarks: 'Ring + open spanner 9mm' },
    { id: 'tool-111', code: '111', name: 'File (Diamond File)', category: 'TOOLS', totalStock: 100, unit: 'Pcs', minStock: 15, status: 'ACTIVE', remarks: 'Diamond needle rasp file for burr smoothing' }
  ],

  accessories_master: [
    { id: 'acc-001', code: 'ACC-01', name: 'Super Glue', category: 'ACCESSORIES', defaultQty: '01 Pcs', defaultRemarks: '±01', unit: 'Pcs', totalStock: 500, status: 'ACTIVE' },
    { id: 'acc-002', code: 'ACC-02', name: 'Sand Paper', category: 'ACCESSORIES', defaultQty: 'Required', defaultRemarks: '', unit: 'Sheet', totalStock: 1000, status: 'ACTIVE' },
    { id: 'acc-003', code: 'ACC-03', name: 'Take-up Spring', category: 'ACCESSORIES', defaultQty: '05 Pcs', defaultRemarks: '±03', unit: 'Pcs', totalStock: 800, status: 'ACTIVE' },
    { id: 'acc-004', code: 'ACC-04', name: 'Wiper Stick', category: 'ACCESSORIES', defaultQty: '05 Pcs', defaultRemarks: '±03', unit: 'Pcs', totalStock: 450, status: 'ACTIVE' },
    { id: 'acc-005', code: 'ACC-05', name: 'Eye/Safety Guard', category: 'ACCESSORIES', defaultQty: '02 Pcs', defaultRemarks: '±01', unit: 'Pcs', totalStock: 300, status: 'ACTIVE' },
    { id: 'acc-006', code: 'ACC-06', name: 'Safety Glass', category: 'ACCESSORIES', defaultQty: '01 Pcs', defaultRemarks: '±01', unit: 'Pcs', totalStock: 250, status: 'ACTIVE' },
    { id: 'acc-007', code: 'ACC-07', name: 'Screw, Nut-Bolt, & Washer', category: 'ACCESSORIES', defaultQty: '30 Pcs', defaultRemarks: '±10', unit: 'Pcs', totalStock: 5000, status: 'ACTIVE' },
    { id: 'acc-008', code: 'ACC-08', name: 'Cable Tie', category: 'ACCESSORIES', defaultQty: '10 Pcs', defaultRemarks: '±05', unit: 'Pcs', totalStock: 3000, status: 'ACTIVE' },
    { id: 'acc-009', code: 'ACC-09', name: 'P/M Needle Plate', category: 'ACCESSORIES', defaultQty: '02 Pcs', defaultRemarks: '±01', unit: 'Pcs', totalStock: 400, status: 'ACTIVE' },
    { id: 'acc-010', code: 'ACC-010', name: 'P/M Feed Dog', category: 'ACCESSORIES', defaultQty: '02 Pcs', defaultRemarks: '±01', unit: 'Pcs', totalStock: 400, status: 'ACTIVE' },
    { id: 'acc-011', code: 'ACC-11', name: 'Tools Bag (Canvas / Leather)', category: 'ACCESSORIES', defaultQty: '01 Pcs', defaultRemarks: 'Standard Mechanic Kit Bag', unit: 'Pcs', totalStock: 350, status: 'ACTIVE' }
  ],

  generateInitialToolAllocations: function() {
    const list = [];
    const standardTools = [
      { sl: '01', code: '001', name: 'Flat Screw Driver (Large)', qty: '1', remarks: '' },
      { sl: '02', code: '002', name: 'Flat Screw Driver (Medium)', qty: '1', remarks: '' },
      { sl: '03', code: '003', name: 'Flat Screw Driver (Small)', qty: '1', remarks: '' },
      { sl: '04', code: '014', name: 'Pliers (Long Nose)', qty: '1', remarks: '' },
      { sl: '05', code: '015', name: 'Pliers (Long Nose)', qty: '1', remarks: '' },
      { sl: '06', code: '021', name: 'Hex Allen Key (01.50mm)', qty: '1', remarks: '' },
      { sl: '07', code: '022', name: 'Hex Allen Key (01.50mm)', qty: '1', remarks: '' },
      { sl: '08', code: '023', name: 'Hex Allen Key (02mm)', qty: '1', remarks: '' },
      { sl: '09', code: '024', name: 'Hex Allen Key (02.50mm)', qty: '1', remarks: '' },
      { sl: '10', code: '025', name: 'Hex Allen Key (03mm)', qty: '1', remarks: '' },
      { sl: '11', code: '026', name: 'Hex Allen Key (03.50mm)', qty: '1', remarks: '' },
      { sl: '12', code: '027', name: 'Hex Allen Key (04mm)', qty: '1', remarks: '' },
      { sl: '13', code: '028', name: 'Hex Allen Key (04.50mm)', qty: '1', remarks: '' },
      { sl: '14', code: '029', name: 'Hex Allen Key (05mm)', qty: '1', remarks: '' },
      { sl: '15', code: '037', name: 'Hex Allen Key (06mm)', qty: '1', remarks: '' },
      { sl: '16', code: '038', name: 'T-Handle Allen Key (02.50mm)', qty: '1', remarks: '' },
      { sl: '17', code: '039', name: 'T-Handle Allen Key (03mm)', qty: '1', remarks: '' },
      { sl: '18', code: '040', name: 'T-Handle Allen Key (04mm)', qty: '1', remarks: '' },
      { sl: '19', code: '045', name: 'T-Handle Allen Key (05mm)', qty: '1', remarks: '' },
      { sl: '20', code: '051', name: 'Needle Allen Key (01.58mm)', qty: '1', remarks: '' },
      { sl: '21', code: '064', name: 'Open End Spanner (10-11mm)', qty: '1', remarks: '' },
      { sl: '22', code: '070', name: 'Open End Spanner (12-13mm)', qty: '1', remarks: '' },
      { sl: '23', code: '091', name: 'Combination Spanner (05mm)', qty: '1', remarks: '' },
      { sl: '24', code: '092', name: 'Combination Spanner (06mm)', qty: '1', remarks: '' },
      { sl: '25', code: '093', name: 'Combination Spanner (07mm)', qty: '1', remarks: '' },
      { sl: '26', code: '094', name: 'Combination Spanner (08mm)', qty: '1', remarks: '' },
      { sl: '27', code: '095', name: 'Combination Spanner (09mm)', qty: '1', remarks: '' },
      { sl: '28', code: '111', name: 'File (Dimond File)', qty: '1', remarks: '' }
    ];

    const standardAccessories = [
      { code: 'ACC-01', name: 'Super Glue', qty: '01 Pcs', remarks: '±01' },
      { code: 'ACC-02', name: 'Sand Paper', qty: 'Required', remarks: '' },
      { code: 'ACC-03', name: 'Take-up Spring', qty: '05 Pcs', remarks: '±03' },
      { code: 'ACC-04', name: 'Wiper Stick', qty: '05 Pcs', remarks: '±03' },
      { code: 'ACC-05', name: 'Eye/Safety Guard', qty: '02 Pcs', remarks: '±01' },
      { code: 'ACC-06', name: 'Safety Glass', qty: '01 Pcs', remarks: '±01' },
      { code: 'ACC-07', name: 'Screw, Nut-Bolt, & Washer', qty: '30 Pcs', remarks: '±10' },
      { code: 'ACC-08', name: 'Cable Tie', qty: '10 Pcs', remarks: '±05' },
      { code: 'ACC-09', name: 'P/M Needle Plate', qty: '02 Pcs', remarks: '±01' },
      { code: 'ACC-010', name: 'P/M Feed Dog', qty: '02 Pcs', remarks: '±01' }
    ];

    // Reg 1196 - Ashraful Alam Shahed (Full 28 Tools + 10 Accessories)
    standardTools.forEach((t, i) => {
      list.push({
        id: 'alloc-1196-t-' + (i + 1),
        regNo: '1196',
        issueDate: '2025-10-25',
        userId: 'AMG-0147075',
        userName: 'Ashraful Alam Shahed',
        jobTitle: 'Senior Mechanic',
        workingArea: 'Sewing - Jamuna',
        itemType: 'TOOL',
        itemCode: t.code,
        itemName: t.name,
        quantity: t.qty,
        changeStatus: 'NEW_ISSUE',
        changeDate: null,
        remarks: t.remarks || '',
        status: 'ACTIVE',
        createdAt: '2025-10-25T08:00:00Z',
        createdBy: 'admin'
      });
    });

    standardAccessories.forEach((a, i) => {
      list.push({
        id: 'alloc-1196-a-' + (i + 1),
        regNo: '1196',
        issueDate: '2025-10-25',
        userId: 'AMG-0147075',
        userName: 'Ashraful Alam Shahed',
        jobTitle: 'Senior Mechanic',
        workingArea: 'Sewing - Jamuna',
        itemType: 'ACCESSORY',
        itemCode: a.code,
        itemName: a.name,
        quantity: a.qty,
        changeStatus: 'NEW_ISSUE',
        changeDate: null,
        remarks: a.remarks || '',
        status: 'ACTIVE',
        createdAt: '2025-10-25T08:00:00Z',
        createdBy: 'admin'
      });
    });

    // Historical Records from Image 5 (Reg 1195 down to 1187)
    const historyStaff = [
      { regNo: '1195', date: '2025-10-23', id: 'AMG0072256', name: 'Md. Jabad', title: 'Junior Mechanic (W)', area: 'Embroidery Section' },
      { regNo: '1194', date: '2025-10-14', id: 'AMG-0146997', name: 'Md. Monirul Islam', title: 'Senior Mechanic', area: 'Sewing - Padma' },
      { regNo: '1193', date: '2025-09-23', id: 'AMG0144906', name: 'Md. Jahid Khan', title: 'Assistant Mechanic (W)', area: 'Special M/C (P.A)' },
      { regNo: '1192', date: '2025-09-06', id: 'AMG-0144970', name: 'Md. Shamim Hossain', title: 'Senior Mechanic', area: 'Sewing - Model Line' },
      { regNo: '1191', date: '2025-09-06', id: 'AMG0141530', name: 'Md. Jaed Hossan', title: 'Assistant Mechanic (W)', area: 'Sewing - Titas' },
      { regNo: '1190', date: '2025-08-25', id: 'AMG-0144901', name: 'Md. Ainal Haque', title: 'Senior Mechanic', area: 'Sample Section' },
      { regNo: '1189', date: '2025-07-22', id: 'AMG-0144578', name: 'Md. Mosharraf Hossain', title: 'Senior Mechanic', area: 'Sewing - Surma' },
      { regNo: '1188', date: '2025-07-01', id: 'AMG-0143448', name: 'Md. Sumon Mia', title: 'Senior Mechanic', area: 'Sewing - Model Line' },
      { regNo: '1187', date: '2025-07-01', id: 'AMG-0142711', name: 'Prosanto Kumar Sarkar', title: 'Senior Mechanic', area: 'Sewing - Model Line' }
    ];

    historyStaff.forEach(st => {
      // Allocate standard tool subset for each past registration
      standardTools.slice(0, 15).forEach((t, idx) => {
        list.push({
          id: `alloc-${st.regNo}-t-${idx + 1}`,
          regNo: st.regNo,
          issueDate: st.date,
          userId: st.id,
          userName: st.name,
          jobTitle: st.title,
          workingArea: st.area,
          itemType: 'TOOL',
          itemCode: t.code,
          itemName: t.name,
          quantity: '1',
          changeStatus: idx === 3 ? 'REPLACED' : 'NEW_ISSUE',
          changeDate: idx === 3 ? '2025-10-01' : null,
          remarks: idx === 3 ? 'Worn tip replaced' : '',
          status: 'ACTIVE',
          createdAt: st.date + 'T08:00:00Z',
          createdBy: 'admin'
        });
      });
      standardAccessories.slice(0, 5).forEach((a, idx) => {
        list.push({
          id: `alloc-${st.regNo}-a-${idx + 1}`,
          regNo: st.regNo,
          issueDate: st.date,
          userId: st.id,
          userName: st.name,
          jobTitle: st.title,
          workingArea: st.area,
          itemType: 'ACCESSORY',
          itemCode: a.code,
          itemName: a.name,
          quantity: a.qty,
          changeStatus: 'NEW_ISSUE',
          changeDate: null,
          remarks: a.remarks || '',
          status: 'ACTIVE',
          createdAt: st.date + 'T08:00:00Z',
          createdBy: 'admin'
        });
      });
    });

    // Md. Nuru Nabi (Image 3 - Database)
    standardTools.slice(0, 18).forEach((t, idx) => {
      list.push({
        id: `alloc-1180-t-${idx + 1}`,
        regNo: '1180',
        issueDate: '2025-06-15',
        userId: 'AMG-0140022',
        userName: 'Md. Nuru Nabi',
        jobTitle: 'Mechanic',
        workingArea: 'Finishing Section',
        itemType: 'TOOL',
        itemCode: t.code,
        itemName: t.name,
        quantity: '1',
        changeStatus: 'NEW_ISSUE',
        changeDate: null,
        remarks: '',
        status: 'ACTIVE',
        createdAt: '2025-06-15T08:00:00Z',
        createdBy: 'admin'
      });
    });

    return list;
  },

  employees: [
    {
      id: 'emp-101',
      name: 'Engr. Tanvir Ahmed',
      cardNumber: '1001',
      designation: 'Senior Maintenance Engineer',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-4',
      lineId: 'lin-1',
      workingArea: '3rd Floor Maintenance Bay',
      phone: '+880 1711-234567',
      joinDate: '2020-01-15',
      status: 'ACTIVE'
    },
    {
      id: 'emp-102',
      name: 'Md. Faruk Hossain',
      cardNumber: '1042',
      designation: 'Floor Line Supervisor',
      department: 'Sewing & Assembly',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-4',
      lineId: 'lin-1',
      workingArea: 'Line JA-A Production Floor',
      phone: '+880 1819-556677',
      joinDate: '2021-03-10',
      status: 'ACTIVE'
    },
    {
      id: 'emp-103',
      name: 'Rahim Uddin',
      cardNumber: '1088',
      designation: 'Senior Sewing Mechanic',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-4',
      lineId: 'lin-2',
      workingArea: 'Line JA-B Sewing Support',
      phone: '+880 1912-334455',
      joinDate: '2022-06-01',
      status: 'ACTIVE'
    },
    {
      id: 'emp-104',
      name: 'Nurul Islam',
      cardNumber: '1105',
      designation: 'Electrical Technician',
      department: 'Electrical & Utility',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-1',
      lineId: 'lin-4',
      workingArea: 'Ground Floor Substation & Line',
      phone: '+880 1723-889900',
      joinDate: '2023-01-20',
      status: 'ACTIVE'
    },
    {
      id: 'emp-105',
      name: 'Kalam Sheikh',
      cardNumber: '1120',
      designation: 'Maintenance Technician',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-2',
      floorId: 'flr-5',
      lineId: 'lin-3',
      workingArea: 'Washing Plant Maintenance Desk',
      phone: '+880 1634-112244',
      joinDate: '2023-08-15',
      status: 'ON_LEAVE'
    },
    {
      id: 'emp-106',
      name: 'Fatema Begum',
      cardNumber: '1155',
      designation: 'Quality Control Inspector',
      department: 'Quality Assurance (QA)',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-2',
      lineId: 'lin-1',
      workingArea: '1st Floor QC Inspection Table',
      phone: '+880 1521-778899',
      joinDate: '2022-11-10',
      status: 'ACTIVE'
    },
    {
      id: 'emp-107',
      name: 'Al-Amin Mia',
      cardNumber: '1182',
      designation: 'Senior Machine Operator',
      department: 'Sewing & Assembly',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-4',
      lineId: 'lin-1',
      workingArea: 'Line JA-A Heavy Duty Lockstitch',
      phone: '+880 1845-667788',
      joinDate: '2024-02-01',
      status: 'ACTIVE'
    },
    {
      id: 'emp-108',
      name: 'Mizanur Rahman',
      cardNumber: '1190',
      designation: 'Store Officer',
      department: 'Store & Inventory',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-1',
      lineId: 'lin-4',
      workingArea: 'Central Spare Parts & Machine Store',
      phone: '+880 1766-443322',
      joinDate: '2021-09-01',
      status: 'ACTIVE'
    },
    {
      id: 'emp-109',
      name: 'Ashraful Alam Shahed',
      cardNumber: 'AMG-0147075',
      designation: 'Senior Mechanic',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-7',
      lineId: 'lin-1',
      workingArea: 'Sewing - Jamuna',
      phone: '+880 1712-345678',
      joinDate: '2021-04-10',
      status: 'ACTIVE'
    },
    {
      id: 'emp-110',
      name: 'Md. Jabad',
      cardNumber: 'AMG0072256',
      designation: 'Junior Mechanic (W)',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-1',
      lineId: 'lin-2',
      workingArea: 'Embroidery Section',
      phone: '+880 1819-223344',
      joinDate: '2022-01-15',
      status: 'ACTIVE'
    },
    {
      id: 'emp-111',
      name: 'Md. Monirul Islam',
      cardNumber: 'AMG-0146997',
      designation: 'Senior Mechanic',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-9',
      lineId: 'lin-3',
      workingArea: 'Sewing - Padma',
      phone: '+880 1913-445566',
      joinDate: '2021-07-20',
      status: 'ACTIVE'
    },
    {
      id: 'emp-112',
      name: 'Md. Jahid Khan',
      cardNumber: 'AMG0144906',
      designation: 'Assistant Mechanic (W)',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-4',
      lineId: 'lin-4',
      workingArea: 'Special M/C (P.A)',
      phone: '+880 1724-556677',
      joinDate: '2023-03-01',
      status: 'ACTIVE'
    },
    {
      id: 'emp-113',
      name: 'Md. Shamim Hossain',
      cardNumber: 'AMG-0144970',
      designation: 'Senior Mechanic',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-19',
      lineId: 'lin-22',
      workingArea: 'Sewing - Model Line',
      phone: '+880 1635-667788',
      joinDate: '2020-11-12',
      status: 'ACTIVE'
    },
    {
      id: 'emp-114',
      name: 'Md. Jaed Hossan',
      cardNumber: 'AMG0141530',
      designation: 'Assistant Mechanic (W)',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-15',
      lineId: 'lin-18',
      workingArea: 'Sewing - Titas',
      phone: '+880 1522-778899',
      joinDate: '2023-05-18',
      status: 'ON_LEAVE'
    },
    {
      id: 'emp-115',
      name: 'Md. Ainal Haque',
      cardNumber: 'AMG-0144901',
      designation: 'Senior Mechanic',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-11',
      lineId: 'lin-14',
      workingArea: 'Sample Section',
      phone: '+880 1846-889900',
      joinDate: '2021-08-05',
      status: 'ACTIVE'
    },
    {
      id: 'emp-116',
      name: 'Md. Mosharraf Hossain',
      cardNumber: 'AMG-0144578',
      designation: 'Senior Mechanic',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-6',
      lineId: 'lin-6',
      workingArea: 'Sewing - Surma',
      phone: '+880 1767-990011',
      joinDate: '2020-09-15',
      status: 'ACTIVE'
    },
    {
      id: 'emp-117',
      name: 'Md. Sumon Mia',
      cardNumber: 'AMG-0143448',
      designation: 'Senior Mechanic',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-19',
      lineId: 'lin-22',
      workingArea: 'Sewing - Model Line',
      phone: '+880 1978-112233',
      joinDate: '2022-04-01',
      status: 'ACTIVE'
    },
    {
      id: 'emp-118',
      name: 'Prosanto Kumar Sarkar',
      cardNumber: 'AMG-0142711',
      designation: 'Senior Mechanic',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-19',
      lineId: 'lin-22',
      workingArea: 'Sewing - Model Line',
      phone: '+880 1689-223344',
      joinDate: '2019-06-20',
      status: 'INACTIVE'
    },
    {
      id: 'emp-119',
      name: 'Md. Nuru Nabi',
      cardNumber: 'AMG-0140022',
      designation: 'Mechanic',
      department: 'Finishing & Packing',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-12',
      lineId: 'lin-15',
      workingArea: 'Finishing Section',
      phone: '+880 1735-334455',
      joinDate: '2022-09-10',
      status: 'ACTIVE'
    },
    {
      id: 'emp-120',
      name: 'Madhob Chandra',
      cardNumber: 'AMG-0147291',
      designation: 'Senior Mechanic',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-7',
      lineId: 'lin-1',
      workingArea: 'Sewing - Jamuna',
      phone: '+880 1715-445566',
      joinDate: '2021-05-15',
      status: 'ACTIVE'
    },
    {
      id: 'emp-121',
      name: 'Md. Shojib',
      cardNumber: 'AMG-0132694',
      designation: 'Senior Mechanic',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-7',
      lineId: 'lin-2',
      workingArea: 'Sewing - Jamuna',
      phone: '+880 1812-778899',
      joinDate: '2020-08-10',
      status: 'ACTIVE'
    },
    {
      id: 'emp-122',
      name: 'Md. Najmul Hossain',
      cardNumber: 'AMG-0142472',
      designation: 'Senior Mechanic',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-7',
      lineId: 'lin-1',
      workingArea: 'Sewing - Jamuna',
      phone: '+880 1718-992233',
      joinDate: '2021-03-01',
      status: 'ACTIVE'
    },
    {
      id: 'emp-123',
      name: 'Dipok Roy',
      cardNumber: 'AMG-0143446',
      designation: 'Senior Mechanic',
      department: 'Mechanical Maintenance',
      groupId: 'grp-1',
      unitId: 'unt-1',
      floorId: 'flr-1',
      lineId: 'lin-1',
      workingArea: 'Sample Floor',
      phone: '+880 1718-556677',
      joinDate: '2022-03-01',
      status: 'ACTIVE'
    }
  ],

  tool_change_history: [
    {
      id: 'thist-101',
      allocationId: 'alloc-1196-t-1',
      regNo: '1196',
      userId: 'AMG-0147075',
      userName: 'Ashraful Alam Shahed',
      workingArea: 'Sewing - Jamuna',
      itemType: 'TOOL',
      itemCode: '001',
      itemName: 'Flat Screw Driver (Large)',
      changeType: 'REPLACED',
      replacementCount: 1,
      changeDate: '10-08-2025',
      reason: 'Broken blade / worn tip',
      oldCondition: 'Broken (Returned to store)',
      remarks: 'Replaced with heavy duty chrome vanadium driver',
      changedBy: 'admin',
      createdAt: '2025-08-10T09:30:00Z'
    },
    {
      id: 'thist-102',
      allocationId: 'alloc-1196-t-1',
      regNo: '1196',
      userId: 'AMG-0147075',
      userName: 'Ashraful Alam Shahed',
      workingArea: 'Sewing - Jamuna',
      itemType: 'TOOL',
      itemCode: '001',
      itemName: 'Flat Screw Driver (Large)',
      changeType: 'REPLACED',
      replacementCount: 2,
      changeDate: '15-02-2026',
      reason: 'Worn grip & bent shaft',
      oldCondition: 'Damaged (Scrap)',
      remarks: 'Second replacement issued by AGM Maintenance',
      changedBy: 'admin',
      createdAt: '2026-02-15T11:15:00Z'
    },
    {
      id: 'thist-103',
      allocationId: 'alloc-1196-t-5',
      regNo: '1196',
      userId: 'AMG-0147075',
      userName: 'Ashraful Alam Shahed',
      workingArea: 'Sewing - Jamuna',
      itemType: 'TOOL',
      itemCode: '005',
      itemName: 'Cross Screw Driver (Medium)',
      changeType: 'REPLACED',
      replacementCount: 1,
      changeDate: '20-11-2025',
      reason: 'Stripped cross head from heavy torque',
      oldCondition: 'Worn Out',
      remarks: 'Magnetic tip replacement issued',
      changedBy: 'admin',
      createdAt: '2025-11-20T14:00:00Z'
    },
    {
      id: 'thist-104',
      allocationId: 'alloc-1196-t-19',
      regNo: '1196',
      userId: 'AMG-0147075',
      userName: 'Ashraful Alam Shahed',
      workingArea: 'Sewing - Jamuna',
      itemType: 'TOOL',
      itemCode: '060',
      itemName: 'Open End Spanner (08-09mm)',
      changeType: 'REPLACED',
      replacementCount: 1,
      changeDate: '12-05-2026',
      reason: 'Jaw expanded & slipping on locknuts',
      oldCondition: 'Damaged',
      remarks: 'Forged alloy spanner provided',
      changedBy: 'admin',
      createdAt: '2026-05-12T10:45:00Z'
    },
    {
      id: 'thist-105',
      allocationId: 'alloc-1190-t-2',
      regNo: '1190',
      userId: 'AMG0072256',
      userName: 'Md. Jabad',
      workingArea: 'Embroidery Section',
      itemType: 'TOOL',
      itemCode: '002',
      itemName: 'Flat Screw Driver (Medium)',
      changeType: 'REPLACED',
      replacementCount: 1,
      changeDate: '05-09-2025',
      reason: 'Tip chipped during needle plate servicing',
      oldCondition: 'Broken (Returned)',
      remarks: 'Exchanged at Central Tool Store',
      changedBy: 'admin',
      createdAt: '2025-09-05T08:20:00Z'
    },
    {
      id: 'thist-106',
      allocationId: 'alloc-1180-t-10',
      regNo: '1180',
      userId: 'AMG-0140022',
      userName: 'Md. Nuru Nabi',
      workingArea: 'Finishing Section',
      itemType: 'TOOL',
      itemCode: '010',
      itemName: 'Allen Key (05mm)',
      changeType: 'REPLACED',
      replacementCount: 1,
      changeDate: '22-07-2025',
      reason: 'Hex head rounded',
      oldCondition: 'Worn Out',
      remarks: 'Hardened steel replacement key given',
      changedBy: 'admin',
      createdAt: '2025-07-22T15:30:00Z'
    }
  ],

  storage_master: [
    // 1. Machine & Model Storage
    {
      id: 'sm-m-1',
      category: 'MACHINE',
      machineName: 'Plane Machine',
      brand: 'JUKI',
      model: 'DDL-8700',
      description: '1-Needle Direct-Drive Lockstitch Machine',
      aliases: ['juki', 'juky', 'ddl 8700', 'ddl8700', 'ddl-8700', 'juki ddl-8700', 'plain machine', 'single needle'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-m-2',
      category: 'MACHINE',
      machineName: 'Plane Machine',
      brand: 'JUKI',
      model: 'DDL-9000B',
      description: 'Direct-Drive High Speed Lockstitch System with Automatic Thread Trimmer',
      aliases: ['juki 9000', 'ddl9000b', 'ddl 9000b', 'ddl-9000', 'ddl-9000b'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-m-3',
      category: 'MACHINE',
      machineName: 'Plane Machine',
      brand: 'BROTHER',
      model: 'S-7200C',
      description: 'Direct Drive Lockstitcher with Electronic Feeding & Thread Trimmer',
      aliases: ['brother', 's7200', 's 7200', 's7200c', 's-7200c', 'brother s-7200c'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-m-4',
      category: 'MACHINE',
      machineName: 'Over Lock Machine',
      brand: 'JUKI',
      model: 'MO-6814S',
      description: 'Semi-Dry-Head High-Speed Overlock / Safety Stitch Machine',
      aliases: ['mo6814', 'mo 6814s', 'mo6814s', 'juki overlock', 'over lock 4 thread', '4 thread overlock'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-m-5',
      category: 'MACHINE',
      machineName: 'Over Lock Machine',
      brand: 'PEGASUS',
      model: 'M952-52',
      description: 'Ultra High Speed 4-Thread Overedging Sewing Machine',
      aliases: ['pegasus', 'pegasus overlock', 'm952', 'm952-52', 'm 952', 'pegasus m952'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-m-6',
      category: 'MACHINE',
      machineName: 'Over Lock Machine',
      brand: 'SIRUBA',
      model: '757K-516M2-35',
      description: '5-Thread Heavy Duty Safety Stitch Machine',
      aliases: ['siruba', 'siruba 5 thread', '757k', 'siruba 757k'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-m-7',
      category: 'MACHINE',
      machineName: 'Flat Lock Machine',
      brand: 'YAMATO',
      model: 'VG-2700',
      description: '3-Needle 5-Thread Cylinder Bed Interlock Machine',
      aliases: ['yamato', 'vg2700', 'vg 2700', 'yamato flatlock', 'cylinder flatlock'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-m-8',
      category: 'MACHINE',
      machineName: 'Button Hole Machine',
      brand: 'JUKI',
      model: 'LBH-1790S',
      description: 'Computer-controlled High-speed Lockstitch Buttonholing Machine',
      aliases: ['lbh1790', 'lbh 1790', 'lbh1790s', 'button hole', 'juki button hole'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-m-9',
      category: 'MACHINE',
      machineName: 'Bar tak Machine',
      brand: 'JUKI',
      model: 'LK-1900BN',
      description: 'Computer-controlled High-speed Bar Tacking Machine with NFC',
      aliases: ['lk1900', 'lk 1900', 'lk1900bn', 'bartack', 'bar tack', 'juki bartack'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-m-10',
      category: 'MACHINE',
      machineName: 'Feed of The Arm Machine',
      brand: 'KANSAI SPECIAL',
      model: 'DLR-1508P',
      description: 'High Speed Cylinder Bed Multi-needle Double Chainstitch Machine',
      aliases: ['kansai', 'kansai special', 'feed off the arm', 'dlr1508', 'dlr 1508p', 'kanche'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },

    // 2. Spare Parts Storage
    {
      id: 'sm-p-1',
      category: 'SPARE_PART',
      name: 'Bobbin Case (Original)',
      code: 'BC-DB1-NBL',
      partCategory: 'Mechanical',
      compatibleModels: 'JUKI DDL-8700, BROTHER S-7200C',
      unit: 'Pcs',
      description: 'High precision rotary hook bobbin case with no-backlash spring',
      aliases: ['bobin', 'bobin case', 'bobbin', 'bobbin case', 'bc db1'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-p-2',
      category: 'SPARE_PART',
      name: 'Needle Plate (Single Needle Heavy)',
      code: 'NP-110-01503',
      partCategory: 'Mechanical',
      compatibleModels: 'JUKI DDL-8700, DDL-9000B',
      unit: 'Pcs',
      description: 'Standard single needle throat needle plate',
      aliases: ['needle plate', 'nidle plate', 'niddle plate', 'plate', 'np 110'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-p-3',
      category: 'SPARE_PART',
      name: 'Rotary Hook Assembly',
      code: 'RH-DSH-7.94BTR',
      partCategory: 'Mechanical',
      compatibleModels: 'JUKI DDL-8700, DDL-9000B, BROTHER S-7200C',
      unit: 'Pcs',
      description: 'Titanium-coated rotary hook with automatic thread trimmer clearance',
      aliases: ['hook', 'rotary hook', 'huk', 'rotary'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-p-4',
      category: 'SPARE_PART',
      name: 'Upper Looper (Overlock)',
      code: 'LP-118-88104',
      partCategory: 'Mechanical',
      compatibleModels: 'JUKI MO-6814S, PEGASUS M952',
      unit: 'Pcs',
      description: 'High tensile chromium steel upper thread looper',
      aliases: ['looper', 'upper looper', 'lopar', 'luper', 'uper looper'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-p-5',
      category: 'SPARE_PART',
      name: 'Lower Knife / Blade',
      code: 'KB-118-45807',
      partCategory: 'Consumable',
      compatibleModels: 'JUKI MO-6814S, SIRUBA 757K',
      unit: 'Pcs',
      description: 'Tungsten carbide tipped trimming lower knife',
      aliases: ['knife', 'blade', 'lower knife', 'naif', 'churi'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-p-6',
      category: 'SPARE_PART',
      name: 'Tension Assembly Complete',
      code: 'TA-229-45356',
      partCategory: 'Mechanical',
      compatibleModels: 'JUKI DDL-8700, DDL-9000B',
      unit: 'Set',
      description: 'Thread tension disc, spring, and post assembly',
      aliases: ['tension', 'tension post', 'tension set', 'thread tension'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },

    // 3. Tools & Equipment Storage
    {
      id: 'sm-t-1',
      category: 'TOOL',
      name: 'Flat Screw Driver (Medium)',
      code: 'TL-SD-002',
      specs: '150mm Chrome Vanadium Magnetic Tip',
      kit: 'Mechanic Standard Kit',
      aliases: ['screwdriver', 'screw driver', 'flat screwdriver', 'skru draibar'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-t-2',
      category: 'TOOL',
      name: 'Allen Key Set (1.5mm - 10mm)',
      code: 'TL-AK-001',
      specs: '9-Piece Ball Point Hex Key L-Wrench Set',
      kit: 'Mechanic Standard Kit',
      aliases: ['allen key', 'elkey', 'l key', 'hex key', 'allen key set'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-t-3',
      category: 'TOOL',
      name: 'Digital Vernier Caliper',
      code: 'TL-VC-005',
      specs: '0-150mm Stainless Steel 0.01mm Accuracy',
      kit: 'Maintenance Lab Set',
      aliases: ['vernier', 'vernier caliper', 'varnier', 'caliper'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-t-4',
      category: 'TOOL',
      name: 'Digital Multimeter & Continuity Tester',
      code: 'TL-MM-009',
      specs: 'True RMS AC/DC 600V with Temperature Probe',
      kit: 'Electrical & Electronics Lab',
      aliases: ['multimeter', 'meter', 'avometer', 'voltmeter'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },

    // 4. Locations & Lines Storage
    {
      id: 'sm-l-1',
      category: 'LOCATION',
      unitName: 'Unit-01',
      floorName: '1st Floor',
      lineName: 'Line-A',
      aliases: ['line a', 'line-a', 'linea', '1st floor line a'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-l-2',
      category: 'LOCATION',
      unitName: 'Unit-01',
      floorName: '1st Floor',
      lineName: 'Size Set',
      aliases: ['size set', 'sizeset', 'size-set'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-l-3',
      category: 'LOCATION',
      unitName: 'Unit-01',
      floorName: '1st Floor',
      lineName: 'Eyelet & APW Room',
      aliases: ['apw', 'eyelet', 'eyelet and apw', 'apw room', 'eyelet & apw'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-l-4',
      category: 'LOCATION',
      unitName: 'Pacific Blue (Jeans Wear) Ltd.',
      floorName: 'Meghna Floor',
      lineName: 'MG-A',
      code: 'MG',
      aliases: ['mg', 'meghna', 'meghna floor', 'meghna flr', 'mg-a', 'line mg-a'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    },
    {
      id: 'sm-l-5',
      category: 'LOCATION',
      unitName: 'Pacific Blue (Jeans Wear) Ltd.',
      floorName: 'Meghna Floor',
      lineName: 'MG-B',
      code: 'MG',
      aliases: ['mg-b', 'line mg-b'],
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z'
    }
  ],

  storage_correction_rules: [
    { id: 'scr-1', rawPattern: 'juki', targetValue: 'JUKI', category: 'BRAND', issueType: 'casing', note: 'Uppercase brand name' },
    { id: 'scr-2', rawPattern: 'juky', targetValue: 'JUKI', category: 'BRAND', issueType: 'spelling', note: 'Common typo' },
    { id: 'scr-3', rawPattern: 'brother', targetValue: 'BROTHER', category: 'BRAND', issueType: 'casing', note: 'Uppercase brand name' },
    { id: 'scr-4', rawPattern: 'brothr', targetValue: 'BROTHER', category: 'BRAND', issueType: 'spelling', note: 'Common typo' },
    { id: 'scr-5', rawPattern: 'pegasus', targetValue: 'PEGASUS', category: 'BRAND', issueType: 'casing', note: 'Uppercase brand name' },
    { id: 'scr-6', rawPattern: 'siruba', targetValue: 'SIRUBA', category: 'BRAND', issueType: 'casing', note: 'Uppercase brand name' },
    { id: 'scr-7', rawPattern: 'yamato', targetValue: 'YAMATO', category: 'BRAND', issueType: 'casing', note: 'Uppercase brand name' },
    { id: 'scr-8', rawPattern: 'kansai', targetValue: 'KANSAI SPECIAL', category: 'BRAND', issueType: 'alias', note: 'Full brand name' },
    { id: 'scr-9', rawPattern: 'kanche', targetValue: 'KANSAI SPECIAL', category: 'BRAND', issueType: 'slang', note: 'Factory slang' },
    { id: 'scr-10', rawPattern: 'ddl 8700', targetValue: 'DDL-8700', category: 'MODEL', issueType: 'formatting', note: 'Standard hyphen' },
    { id: 'scr-11', rawPattern: 'ddl8700', targetValue: 'DDL-8700', category: 'MODEL', issueType: 'formatting', note: 'Missing hyphen' },
    { id: 'scr-12', rawPattern: 'ddl-9000', targetValue: 'DDL-9000B', category: 'MODEL', issueType: 'formatting', note: 'Model suffix' },
    { id: 'scr-13', rawPattern: 'ddl9000b', targetValue: 'DDL-9000B', category: 'MODEL', issueType: 'formatting', note: 'Standard hyphen' },
    { id: 'scr-14', rawPattern: 's 7200', targetValue: 'S-7200C', category: 'MODEL', issueType: 'formatting', note: 'Standard hyphen' },
    { id: 'scr-15', rawPattern: 's7200c', targetValue: 'S-7200C', category: 'MODEL', issueType: 'formatting', note: 'Standard hyphen' },
    { id: 'scr-16', rawPattern: 'mo 6814', targetValue: 'MO-6814S', category: 'MODEL', issueType: 'formatting', note: 'Model suffix' },
    { id: 'scr-17', rawPattern: 'mo6814s', targetValue: 'MO-6814S', category: 'MODEL', issueType: 'formatting', note: 'Standard hyphen' },
    { id: 'scr-18', rawPattern: 'lk 1900', targetValue: 'LK-1900BN', category: 'MODEL', issueType: 'formatting', note: 'Model suffix' },
    { id: 'scr-19', rawPattern: 'lk1900bn', targetValue: 'LK-1900BN', category: 'MODEL', issueType: 'formatting', note: 'Standard hyphen' },
    { id: 'scr-20', rawPattern: 'lbh 1790', targetValue: 'LBH-1790S', category: 'MODEL', issueType: 'formatting', note: 'Model suffix' },
    { id: 'scr-21', rawPattern: 'plain mashin', targetValue: 'Plain Machine 1-Needle', category: 'MACHINE_NAME', issueType: 'spelling', note: 'Bangla phonetic spelling' },
    { id: 'scr-22', rawPattern: 'plane machine', targetValue: 'Plain Machine 1-Needle', category: 'MACHINE_NAME', issueType: 'spelling', note: 'Spelling typo' },
    { id: 'scr-23', rawPattern: 'over lock', targetValue: 'Overlock 4-Thread', category: 'MACHINE_NAME', issueType: 'formatting', note: 'Compound word' },
    { id: 'scr-24', rawPattern: 'bobin', targetValue: 'Bobbin Case (Original)', category: 'SPARE_PART', issueType: 'spelling', note: 'Spelling typo' },
    { id: 'scr-25', rawPattern: 'lopar', targetValue: 'Upper Looper (Overlock)', category: 'SPARE_PART', issueType: 'spelling', note: 'Phonetic typo' },
    { id: 'scr-26', rawPattern: 'luper', targetValue: 'Upper Looper (Overlock)', category: 'SPARE_PART', issueType: 'spelling', note: 'Phonetic typo' },
    { id: 'scr-27', rawPattern: 'nidle plate', targetValue: 'Needle Plate (Single Needle Heavy)', category: 'SPARE_PART', issueType: 'spelling', note: 'Spelling typo' },
    { id: 'scr-28', rawPattern: 'skru draibar', targetValue: 'Flat Screw Driver (Medium)', category: 'TOOL', issueType: 'spelling', note: 'Bangla phonetic' },
    { id: 'scr-29', rawPattern: 'elkey', targetValue: 'Allen Key Set (1.5mm - 10mm)', category: 'TOOL', issueType: 'slang', note: 'Factory mechanic slang' },
    { id: 'scr-30', rawPattern: 'meghna', targetValue: 'Meghna Floor', category: 'LOCATION', issueType: 'formatting', note: 'Standard floor name' },
    { id: 'scr-31', rawPattern: 'meghna flr', targetValue: 'Meghna Floor', category: 'LOCATION', issueType: 'formatting', note: 'Standard floor name' },
    { id: 'scr-32', rawPattern: 'mg floor', targetValue: 'Meghna Floor', category: 'LOCATION', issueType: 'alias', note: 'Floor short code alias' },
    { id: 'scr-33', rawPattern: 'mg', targetValue: 'MG', category: 'LOCATION', issueType: 'casing', note: 'Meghna Floor short code' }
  ],

  preventive_config: [
      {
          "id": "pm-cfg-1",
          "machineType": "Plane / Lock Stitch Machine",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days (Quarterly)",
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Pump Flow, Oil Level & Oil Filter Gauze Cleaning",
              "Needle Bar Height & Hook Timing Alignment",
              "Thread Tension Assembly, Thread Take-up Spring Inspection",
              "Bobbin Case, Rotary Hook & Feed Dog Clearance Cleaning",
              "Safety Guard, Finger Protector & Eye Shield Intactness",
              "Dust & Lint Vacuum / Compressed Air Cleaning",
              "Electrical Wiring, Foot Pedal Switch & Earth Grounding"
          ],
          "status": "ACTIVE",
          "createdAt": "2026-01-01T00:00:00Z",
          "aliases": [
              "Lock Stitch",
              "Plane Machine",
              "Manual Embroidery Machine (Single Needle)"
          ],
          "machineCount": 332
      },
      {
          "id": "pm-cfg-2",
          "machineType": "Overlock Machine",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days (Quarterly)",
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "checklist": [
              "Upper & Lower Looper Timing & Clearance",
              "Upper & Lower Knife Blade Sharpness & Engagement",
              "Differential Feed Mechanism & Stitch Length Cam",
              "Silicon Oil Cooling Tank & Thread Lubricator Reservoir",
              "Oil Level, Oil Sight Glass & High-Speed Circulation",
              "Needle Cooler Air Jet & Suction Waste Pipe Clearing",
              "Needle Guard Clearance Check & Adjustment",
              "Motor Carbon Brushes & Drive Belt Tension"
          ],
          "status": "ACTIVE",
          "createdAt": "2026-01-01T00:00:00Z",
          "aliases": [
              "Overlock",
              "Over Lock Machine",
              "Over Lock Mechine"
          ],
          "machineCount": 66
      },
      {
          "id": "pm-cfg-double-needle-auto-machine",
          "machineType": "Double Needle Auto Machine",
          "aliases": [
              "Double Needle Auto"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 32,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-8",
          "machineType": "Feed of The Arm Machine",
          "frequencyDays": 60,
          "frequencyLabel": "Every 60 Days",
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "checklist": [
              "Cylinder Bed Looper Timing & Needle Guards",
              "Puller Roller Feed Pressure & Synchronization",
              "Lap Seam Folder Alignment & Clearance",
              "Oil Pump Gasket & Bed Drainage Inspection"
          ],
          "status": "ACTIVE",
          "createdAt": "2026-01-01T00:00:00Z",
          "aliases": [
              "Feed Off The Arm",
              "Feed of The Arm Machine",
              "Feed of The Arm-Brother",
              "Feed of The Arm-Narrow",
              "Feed of The Arm-AGM",
              "Feed of The Arm"
          ],
          "machineCount": 26
      },
      {
          "id": "pm-cfg-vertical-machine",
          "machineType": "Vertical Machine",
          "aliases": [
              "Vertical Machine",
              "Vertical Bedoly"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 20,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-zipper-joint-machine",
          "machineType": "Zipper Joint Machine",
          "aliases": [
              "Zipper Joint Machine",
              "Zipper Joint"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 20,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-multi-needle-chain-stitch",
          "machineType": "Multi Needle Chain Stitch",
          "aliases": [
              "Multi Needle Chain Stitch Machine",
              "Multi Needle Chain Stitch"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 19,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-chain-stitch-machine",
          "machineType": "Chain Stitch Machine",
          "aliases": [
              "Chain Stitch Machine",
              "Chain Stitch"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 12,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-loop-attach-machine",
          "machineType": "Loop Attach Machine",
          "aliases": [
              "Loop Attach Machine",
              "Loop Attach"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 7,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-snap-button-machine",
          "machineType": "Snap Button Machine",
          "aliases": [
              "Snap Button Machine",
              "Snap Button Hydrolic"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 7,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-top-stitch-machine",
          "machineType": "Top Stitch Machine",
          "aliases": [
              "Top Stitch Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 5,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-4",
          "machineType": "Button Hole Machine",
          "frequencyDays": 30,
          "frequencyLabel": "Every 30 Days (Monthly)",
          "reminderDays": [
              5,
              2,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "checklist": [
              "Knife Drop Mechanism & Cutting Block Blade Sharpness",
              "Work Clamp Foot Pressure & Cloth Gripping Teeth",
              "Hook Timing, Needle Bar Stop Position Sensor",
              "X-Y Stepper Motor Linear Bearing Lubrication",
              "Air Pressure Regulator & Moisture Trap Filter Drain",
              "Upper & Lower Thread Trimmer Solenoid & Cutters",
              "Emergency Stop Switch & Safety Interlock Test"
          ],
          "status": "ACTIVE",
          "createdAt": "2026-01-01T00:00:00Z",
          "aliases": [
              "Button Hole",
              "Button Hole Machine",
              "Botton Hole"
          ],
          "machineCount": 4
      },
      {
          "id": "pm-cfg-pocket-facing-machine",
          "machineType": "Pocket Facing Machine",
          "aliases": [
              "Pocket Facing"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 4,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-sleeve-joint-machine",
          "machineType": "Sleeve Joint Machine",
          "aliases": [
              "Sleeve Joint Machine",
              "Sleeve Joint"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 3,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-double-needle-manual-machine",
          "machineType": "Double Needle Manual Machine",
          "aliases": [
              "Double Needle Manual"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 1,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-3",
          "machineType": "Flatlock Machine",
          "frequencyDays": 60,
          "frequencyLabel": "Every 60 Days (Bi-Monthly)",
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "checklist": [
              "Spreader / Top Cover Thread Mechanism Timing",
              "Looper Avoid Mechanism & Needle Guard Timing",
              "Differential Feed Ratio Calibration",
              "Pneumatic Foot Lifter Cylinder & Solenoid Valves",
              "Thread Trimmer Blades Alignment & Vacuum Waste Suction",
              "Central Oil Circulation & Filter Cartridge Inspection",
              "Vibration & Motor Pulley Noise Diagnostic"
          ],
          "status": "ACTIVE",
          "createdAt": "2026-01-01T00:00:00Z",
          "aliases": [
              "Flatlock",
              "Flat Lock Machine"
          ],
          "machineCount": 1
      },
      {
          "id": "pm-cfg-applique-laser-cutting-machine",
          "machineType": "Applique Laser Cutting Machine",
          "aliases": [
              "Applique Laser Cutting Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 180,
          "frequencyLabel": "Every 180 Days",
          "serviceIntervalDays": 180,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-auto-fabric-relax-machine",
          "machineType": "Auto Fabric Relax Machine",
          "aliases": [
              "Auto Fabric Relax Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-automatic-hole-punching-machine",
          "machineType": "Automatic Hole Punching Machine",
          "aliases": [
              "Automatic Hole Punching Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-automatic-pocket-welting",
          "machineType": "Automatic Pocket Welting",
          "aliases": [
              "Automatic Pocket Welting"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-band-knife-cutting-machine",
          "machineType": "Band Knife Cutting Machine",
          "aliases": [
              "Band Knife Cutting Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 180,
          "frequencyLabel": "Every 180 Days",
          "serviceIntervalDays": 180,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-7",
          "machineType": "Bar Tack Machine",
          "frequencyDays": 60,
          "frequencyLabel": "Every 60 Days (Bi-Monthly)",
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "checklist": [
              "X-Y Feed Plate Linear Bushings Lubrication",
              "Work Clamp Lift Height & Foot Solenoid",
              "Needle Thread Wiper & Thread Nipper Spring",
              "Direct Drive Motor Encoder & Safety Sensor"
          ],
          "status": "ACTIVE",
          "createdAt": "2026-01-01T00:00:00Z",
          "aliases": [
              "Bar Tack",
              "Bar tak Machine"
          ],
          "machineCount": 0
      },
      {
          "id": "pm-cfg-belt-cutter-machine",
          "machineType": "Belt Cutter Machine",
          "aliases": [
              "Belt Cutter Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-beltloop-blind-stitch-machine",
          "machineType": "Beltloop Blind Stitch Machine",
          "aliases": [
              "Beltloop Blind Stitch Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-bottom-hemming-chain-stitch",
          "machineType": "Bottom Hemming Chain Stitch",
          "aliases": [
              "Bottom Hamming Chain Stitch Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-bottom-hemming-lock-stitch",
          "machineType": "Bottom Hemming Lock Stitch",
          "aliases": [
              "Bottom Hamming Lock Stitch Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-6",
          "machineType": "Button Stitch / Attach Machine",
          "frequencyDays": 45,
          "frequencyLabel": "Every 45 Days",
          "reminderDays": [
              7,
              2,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "checklist": [
              "Button Clamp Holder Alignment with Needle Hole",
              "Knotting Mechanism & Thread Pull-Off Wiper",
              "Under-bed Thread Trimmer Blade Clearance",
              "Stop Motion Brake Spring & Cam Inspection"
          ],
          "status": "ACTIVE",
          "createdAt": "2026-01-01T00:00:00Z",
          "aliases": [
              "Button Attach",
              "Button Stitch"
          ],
          "machineCount": 0
      },
      {
          "id": "pm-cfg-cloth-cutting-machine",
          "machineType": "Cloth Cutting Machine",
          "aliases": [
              "Cloth Cutting Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 180,
          "frequencyLabel": "Every 180 Days",
          "serviceIntervalDays": 180,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-crease-license-machine",
          "machineType": "Crease License Machine",
          "aliases": [
              "Crease License Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-cuff-rolling-machine",
          "machineType": "Cuff Rolling Machine",
          "aliases": [
              "Cuff Rolling Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-dosting-machine",
          "machineType": "Dosting Machine",
          "aliases": [
              "Dosting Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-double-head-auto-elastic-joint-sewing-machine",
          "machineType": "Double Head Auto Elastic Joint Sewing Machine",
          "aliases": [
              "Double Head Auto Elastic Joint Sewing Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-double-needle-machine",
          "machineType": "Double Needle Machine",
          "aliases": [
              "Double Needle Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-elastic-cutting-machine-with-rotary-cutter-ultrasonic-auto",
          "machineType": "Elastic Cutting Machine with Rotary Cutter Ultrasonic Auto",
          "aliases": [
              "Elastic Cutting Machine with Rotary Cutter Ultrasonic Auto"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 180,
          "frequencyLabel": "Every 180 Days",
          "serviceIntervalDays": 180,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-embroidery-machine",
          "machineType": "Embroidery Machine",
          "aliases": [
              "Embroidery Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-end-cutter-machine",
          "machineType": "End Cutter Machine",
          "aliases": [
              "End Cutter Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-eyelet-hole-machine",
          "machineType": "Eyelet Hole Machine",
          "aliases": [
              "Eye let Hole Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 30,
          "frequencyLabel": "Every 30 Days",
          "serviceIntervalDays": 30,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-fabric-inspection-machine",
          "machineType": "Fabric Inspection Machine",
          "aliases": [
              "Fabric Inspection  Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-fabric-relax-machine",
          "machineType": "Fabric Relax Machine",
          "aliases": [
              "Fabric Relax Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-fake-down-filling-machine",
          "machineType": "Fake Down Filling Machine",
          "aliases": [
              "Fake Down Filling Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-flatlock-with-raw-edge-cutting",
          "machineType": "Flatlock with Raw Edge Cutting",
          "aliases": [
              "Flat Lock with Raw Edge Cutting Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 60,
          "frequencyLabel": "Every 60 Days",
          "serviceIntervalDays": 60,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-four-head-template",
          "machineType": "Four Head Template",
          "aliases": [
              "Four Head Template"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-fusing-machine",
          "machineType": "Fusing Machine",
          "aliases": [
              "Fusing Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 180,
          "frequencyLabel": "Every 180 Days",
          "serviceIntervalDays": 180,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-ham-blind-stitch-machine",
          "machineType": "Ham Blind Stitch Machine",
          "aliases": [
              "Ham  Blind Stitch Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-heat-transfer-machine",
          "machineType": "Heat Transfer Machine",
          "aliases": [
              "Heat Transfer Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-lagar-machine",
          "machineType": "Lagar Machine",
          "aliases": [
              "Lagar Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-laser-cut-apw-machine",
          "machineType": "Laser Cut APW Machine",
          "aliases": [
              "Laser Cut APW Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-leg-design-machine",
          "machineType": "Leg Design Machine",
          "aliases": [
              "Leg Design Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-manual-fake-down-filling-machine",
          "machineType": "Manual Fake Down Filling Machine",
          "aliases": [
              "Manual Fake Down Filling Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-needle-detector",
          "machineType": "Needle Detector",
          "aliases": [
              "Needle Detector"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-p-p-belt-machine",
          "machineType": "P. P. Belt Machine",
          "aliases": [
              "P. P. Belt Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-pattern-machine",
          "machineType": "Pattern Machine",
          "aliases": [
              "Pattern Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-piping-cutting-machine",
          "machineType": "Piping Cutting Machine",
          "aliases": [
              "Piping Cutting Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 180,
          "frequencyLabel": "Every 180 Days",
          "serviceIntervalDays": 180,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-plastic-staple-attache-machine",
          "machineType": "Plastic Staple Attache Machine",
          "aliases": [
              "Plastic Staple Attache Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-plotter-machine",
          "machineType": "Plotter Machine",
          "aliases": [
              "Plotter Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-pneumatic-topper-trouser-machine",
          "machineType": "Pneumatic Topper Trouser Machine",
          "aliases": [
              "Pneumatic Topper Trouser Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-pocket-attach-machine",
          "machineType": "Pocket Attach Machine",
          "aliases": [
              "Pocket Attach Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-pocket-processing-machine",
          "machineType": "Pocket Processing Machine",
          "aliases": [
              "Pocket Rolling Machine",
              "Pocket Iron Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-power-cloth-drill-machine",
          "machineType": "Power Cloth Drill Machine",
          "aliases": [
              "Power Cloth Drill Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-quilting-bobbin-machine",
          "machineType": "Quilting Bobbin Machine",
          "aliases": [
              "Quilting Bobbin Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-quilting-machine",
          "machineType": "Quilting Machine",
          "aliases": [
              "Quilting Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-quilting-rolling-machine",
          "machineType": "Quilting Rolling Machine",
          "aliases": [
              "Quilting Rolling Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-rib-cutting-machine",
          "machineType": "Rib Cutting Machine",
          "aliases": [
              "Rib Cutting Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 180,
          "frequencyLabel": "Every 180 Days",
          "serviceIntervalDays": 180,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-rib-pipping-rolling-machine",
          "machineType": "Rib Pipping Rolling Machine",
          "aliases": [
              "Rib Pipping Rolling Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-saddle-stitch",
          "machineType": "Saddle Stitch",
          "aliases": [
              "Saddle Stitch"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-safety-stitch-m-c",
          "machineType": "Safety Stitch M/C",
          "aliases": [
              "Safety Stitch M/C"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-sim-siling-machine",
          "machineType": "Sim Siling Machine",
          "aliases": [
              "Sim Siling Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-single-head-template",
          "machineType": "Single Head Template",
          "aliases": [
              "Single Head Template"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-5",
          "machineType": "Spreading Machine",
          "frequencyDays": 180,
          "frequencyLabel": "Every 180 Days (Half-Yearly)",
          "reminderDays": [
              14,
              7,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "checklist": [
              "Main Drive Track Rails Cleaning, Levelling & Alignment",
              "Fabric Feed Roller Belt & Tension Sensor Calibration",
              "End Cutter Blade Sharpening & Lubrication",
              "Infrared Edge Alignment Sensors & Photocells Test",
              "Emergency Wire Pull Cord & Optical Safety Bumpers",
              "Servo Motor Drive Belts & Gearbox Grease Check"
          ],
          "status": "ACTIVE",
          "createdAt": "2026-01-01T00:00:00Z",
          "aliases": [
              "Spreading Machine"
          ],
          "machineCount": 0
      },
      {
          "id": "pm-cfg-template-plastic-cutter-machine",
          "machineType": "Template Plastic Cutter Machine",
          "aliases": [
              "Template Plastic Cutter Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-thread-sucker",
          "machineType": "Thread Sucker",
          "aliases": [
              "Thread Sucker"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-toper-coating-machine",
          "machineType": "Toper Coating Machine",
          "aliases": [
              "Toper Coating Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-velcro-attach-machine",
          "machineType": "Velcro Attach Machine",
          "aliases": [
              "Velcro Attach Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-velcro-cutter-machine",
          "machineType": "Velcro Cutter Machine",
          "aliases": [
              "Velcro Cutter Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-wrapping-knotting-machine",
          "machineType": "Wrapping & Knotting Machine",
          "aliases": [
              "Wrapping & Knotting Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      },
      {
          "id": "pm-cfg-zig-zag-machine",
          "machineType": "Zig Zag Machine",
          "aliases": [
              "Zig Zag Machine"
          ],
          "modelId": "ALL",
          "modelName": "All Models",
          "frequencyDays": 90,
          "frequencyLabel": "Every 90 Days",
          "serviceIntervalDays": 90,
          "reminderDays": [
              7,
              3,
              0
          ],
          "responsibleDepartment": "Mechanical Maintenance",
          "defaultManpowerId": null,
          "defaultManpowerName": null,
          "machineCount": 0,
          "checklist": [
              "Motor & Drive Belt Inspection & Tension Adjustment",
              "Oil Level & High Speed Lubrication System",
              "Needle Bar Height & Timing Alignment",
              "Safety Guard & Eye Shield Intactness Check",
              "Dust, Lint Cleaning & Waste Suction"
          ],
          "status": "ACTIVE",
          "syncedFromMasterData": true,
          "createdAt": "2026-09-09T04:48:48.437Z",
          "updatedAt": "2026-09-09T04:48:48.437Z"
      }
  ],

  generateInitialPreventiveMaintenance: function() {
    return [
      {
        id: 'pm-rec-1',
        machineId: 'm-1',
        serialNumber: 'JA-01',
        machineName: 'Plain Machine 1-Needle',
        machineType: 'Lock Stitch',
        model: 'DDL-8700',
        brand: 'JUKI',
        unit: 'Pacific Blue (Jeans Wear) Ltd.',
        floor: 'Jamuna Floor',
        line: 'JA-A',
        workingArea: 'Jamuna Production Sewing Line A',
        serviceDate: '2026-06-11',
        serviceType: 'PREVENTIVE_SERVICE',
        serviceStatus: 'OVERDUE',
        serviceStickerSerial: 'STK-2026-06-0042',
        servicedBy: 'Rahim Uddin',
        servicedByCardNumber: '1088',
        servicedByDesignation: 'Senior Sewing Mechanic',
        servicedByDepartment: 'Mechanical Maintenance',
        servicedById: 'emp-103',
        assignedManpower: 'Rahim Uddin',
        frequencyDays: 90,
        lastServiceDate: '2026-06-11',
        nextServiceDate: '2026-09-08',
        isNextDateOverridden: false,
        serviceChecklist: [
          { item: 'Motor & Drive Belt Inspection & Tension Adjustment', checked: true, notes: 'OK' },
          { item: 'Oil Pump Flow, Oil Level & Oil Filter Gauze Cleaning', checked: true, notes: 'Oil topped up' },
          { item: 'Needle Bar Height & Hook Timing Alignment', checked: true, notes: 'Calibrated' },
          { item: 'Safety Guard, Finger Protector & Eye Shield Intactness', checked: true, notes: 'Re-tightened' }
        ],
        serviceRemarks: 'Regular quarterly service executed. Machine running smooth.',
        partsReplaced: 'Rotary Hook Retainer Spring (1 pcs)',
        createdAt: '2026-06-11T10:00:00Z',
        updatedAt: '2026-06-11T10:00:00Z'
      },
      {
        id: 'pm-rec-2',
        machineId: 'm-2',
        serialNumber: 'JA-02',
        machineName: 'Overlock 4-Thread',
        machineType: 'Overlock',
        model: 'MO-6814S',
        brand: 'JUKI',
        unit: 'Pacific Blue (Jeans Wear) Ltd.',
        floor: 'Jamuna Floor',
        line: 'JA-A',
        workingArea: 'Jamuna Production Sewing Line A',
        serviceDate: '2026-06-11',
        serviceType: 'PREVENTIVE_SERVICE',
        serviceStatus: 'DUE_TODAY',
        serviceStickerSerial: 'STK-2026-06-0048',
        servicedBy: 'Rahim Uddin',
        servicedByCardNumber: '1088',
        servicedByDesignation: 'Senior Sewing Mechanic',
        servicedByDepartment: 'Mechanical Maintenance',
        servicedById: 'emp-103',
        assignedManpower: 'Rahim Uddin',
        frequencyDays: 90,
        lastServiceDate: '2026-06-11',
        nextServiceDate: '2026-09-09',
        isNextDateOverridden: false,
        serviceChecklist: [
          { item: 'Upper & Lower Looper Timing & Clearance', checked: true, notes: 'Checked' },
          { item: 'Upper & Lower Knife Blade Sharpness & Engagement', checked: true, notes: 'Sharpened' },
          { item: 'Silicon Oil Cooling Tank & Thread Lubricator Reservoir', checked: true, notes: 'Cleaned' }
        ],
        serviceRemarks: 'Due for preventive service today.',
        partsReplaced: 'Lower Knife Blade (1 pcs)',
        createdAt: '2026-06-11T11:00:00Z',
        updatedAt: '2026-06-11T11:00:00Z'
      },
      {
        id: 'pm-rec-3',
        machineId: 'm-3',
        serialNumber: 'JA-03',
        machineName: 'Button Hole Machine',
        machineType: 'Button Hole',
        model: 'LBH-1790S',
        brand: 'JUKI',
        unit: 'Pacific Blue (Jeans Wear) Ltd.',
        floor: 'Jamuna Floor',
        line: 'JA-B',
        workingArea: 'Jamuna Production Sewing Line B',
        serviceDate: '2026-08-12',
        serviceType: 'PREVENTIVE_SERVICE',
        serviceStatus: 'DUE_SOON',
        serviceStickerSerial: 'STK-2026-08-0115',
        servicedBy: 'Engr. Tanvir Ahmed',
        servicedByCardNumber: '1001',
        servicedByDesignation: 'Senior Maintenance Engineer',
        servicedByDepartment: 'Mechanical Maintenance',
        servicedById: 'emp-101',
        assignedManpower: 'Engr. Tanvir Ahmed',
        frequencyDays: 30,
        lastServiceDate: '2026-08-12',
        nextServiceDate: '2026-09-11',
        isNextDateOverridden: false,
        serviceChecklist: [
          { item: 'Knife Drop Mechanism & Cutting Block Blade Sharpness', checked: true, notes: 'Tested' },
          { item: 'Air Pressure Regulator & Moisture Trap Filter Drain', checked: true, notes: 'Drained' }
        ],
        serviceRemarks: 'Pneumatic line inspected.',
        partsReplaced: '',
        createdAt: '2026-08-12T09:30:00Z',
        updatedAt: '2026-08-12T09:30:00Z'
      },
      {
        id: 'pm-rec-4',
        machineId: 'm-4',
        serialNumber: 'GB-05',
        machineName: 'Plain Machine 1-Needle',
        machineType: 'Lock Stitch',
        model: 'S-7200C',
        brand: 'BROTHER',
        unit: 'Pacific Blue (Jeans Wear) Ltd.',
        floor: 'Buriganga Floor',
        line: 'BG-A',
        workingArea: 'Buriganga Floor Production Line A',
        serviceDate: '2026-09-02',
        serviceType: 'PREVENTIVE_SERVICE',
        serviceStatus: 'SCHEDULED',
        serviceStickerSerial: 'STK-2026-09-0012',
        servicedBy: 'Md. Faruk Hossain',
        servicedByCardNumber: '1042',
        servicedByDesignation: 'Floor Line Supervisor',
        servicedByDepartment: 'Sewing & Assembly',
        servicedById: 'emp-102',
        assignedManpower: 'Md. Faruk Hossain',
        frequencyDays: 90,
        lastServiceDate: '2026-09-02',
        nextServiceDate: '2026-12-01',
        isNextDateOverridden: false,
        serviceChecklist: [
          { item: 'Motor & Drive Belt Inspection & Tension Adjustment', checked: true, notes: 'OK' },
          { item: 'Oil Pump Flow, Oil Level & Oil Filter Gauze Cleaning', checked: true, notes: 'OK' },
          { item: 'Dust & Lint Vacuum / Compressed Air Cleaning', checked: true, notes: 'Complete clean' }
        ],
        serviceRemarks: 'Routine comprehensive servicing done. Sticker attached.',
        partsReplaced: 'Drive Belt V-Belt (1 pcs)',
        createdAt: '2026-09-02T14:20:00Z',
        updatedAt: '2026-09-02T14:20:00Z'
      }
    ];
  }
};


