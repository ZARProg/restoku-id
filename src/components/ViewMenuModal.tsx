import React from 'react';
import { X, MapPin, Clock, Star } from 'lucide-react';
import { MenuItem } from '../types';

interface ViewMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menu: MenuItem | null;
}

const ViewMenuModal: React.FC<ViewMenuModalProps> = ({ isOpen, onClose, menu }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  if (!isOpen || !menu) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img 
            src={menu.image} 
            alt={menu.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-lg transition-all duration-200 shadow-sm"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
              menu.available 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {menu.available ? 'Tersedia' : 'Tidak Tersedia'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title and Category */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900">{menu.name}</h2>
              <span className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
                {menu.category}
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(menu.price)}</p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Deskripsi</h3>
            <p className="text-gray-600 leading-relaxed">{menu.description}</p>
          </div>

          {/* Additional Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span>Kategori: {menu.category.charAt(0).toUpperCase() + menu.category.slice(1)}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span>Status: {menu.available ? 'Tersedia untuk dipesan' : 'Sementara tidak tersedia'}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Star className="h-4 w-4 mr-2 text-gray-400" />
              <span>ID Menu: {menu.id}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Tutup
            </button>
            {menu.available && (
              <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Tambah ke Pesanan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMenuModal;