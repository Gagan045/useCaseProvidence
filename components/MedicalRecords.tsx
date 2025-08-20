
import React from 'react';
import { MedicalRecord } from '../types';
import { FileTextIcon, DownloadIcon, ImageIcon, TestTubeIcon } from './Icons';

const mockRecords: MedicalRecord[] = [
    { id: 'rec-1', fileName: 'Annual-Physical-Results.pdf', fileType: 'Report', uploadDate: '2025-08-01', size: '1.2MB' },
    { id: 'rec-2', fileName: 'Chest-X-Ray.jpg', fileType: 'Image', uploadDate: '2025-07-22', size: '4.5MB' },
    { id: 'rec-3', fileName: 'Blood-Test-Panel.pdf', fileType: 'Report', uploadDate: '2025-07-20', size: '850KB' },
    { id: 'rec-4', fileName: 'Dermatology-Visit-Notes.pdf', fileType: 'Report', uploadDate: '2025-06-16', size: '500KB' },
];

const FileTypeIcon: React.FC<{ type: MedicalRecord['fileType'] }> = ({ type }) => {
    switch (type) {
        case 'Image':
            return <ImageIcon className="w-6 h-6 text-purple-600" />;
        case 'PDF':
            return <FileTextIcon className="w-6 h-6 text-red-600" />;
        case 'Report':
            return <TestTubeIcon className="w-6 h-6 text-blue-600" />;
        default:
            return <FileTextIcon className="w-6 h-6 text-slate-500" />;
    }
};

const MedicalRecords: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-800">Medical Records</h1>
                <label htmlFor="upload-file" className="bg-providence-green text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-providence-green/90 transition cursor-pointer">
                    + Upload Document
                </label>
                <input type="file" id="upload-file" className="hidden"/>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b">
                            <tr>
                                <th className="p-4 font-semibold text-slate-600">File Name</th>
                                <th className="p-4 font-semibold text-slate-600">Type</th>
                                <th className="p-4 font-semibold text-slate-600">Date Uploaded</th>
                                <th className="p-4 font-semibold text-slate-600">Size</th>
                                <th className="p-4 font-semibold text-slate-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockRecords.map((record, index) => (
                                <tr key={record.id} className={`border-b ${index === mockRecords.length - 1 ? 'border-b-0' : ''}`}>
                                    <td className="p-4 flex items-center">
                                        <div className="bg-slate-100 p-2 rounded-lg mr-4">
                                            <FileTypeIcon type={record.fileType} />
                                        </div>
                                        <span className="font-medium text-slate-800">{record.fileName}</span>
                                    </td>
                                    <td className="p-4 text-slate-500">{record.fileType}</td>
                                    <td className="p-4 text-slate-500">{record.uploadDate}</td>
                                    <td className="p-4 text-slate-500">{record.size}</td>
                                    <td className="p-4">
                                        <button className="text-providence-green hover:text-providence-green/80">
                                            <DownloadIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MedicalRecords;
