import React, { useState } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { MenuItem } from '../types';

interface DeleteMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menu: MenuItem | null;
  onDelete: (menuId: string) => void;
}

const DeleteMenuModal: React.FC<DeleteMenuModalProps> = ({ isOpen, onClose, menu, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!menu) return;
    
    setIsDeleting(true);
    
    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onDelete(menu.id);
      
      alert(`Menu "${menu.name}" berhasil dihapus!`);
      onClose();
    } catch (error) {
      alert('Gagal menghapus menu. Silakan coba lagi.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  if (!isOpen || !menu) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-lg mr-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Hapus Menu</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Warning Message */}
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Apakah Anda yakin ingin menghapus menu ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            
            {/* Menu Info */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-3">
                <img 
                  src={menu.image} 
                  alt={menu.name}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{menu.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{menu.category}</p>
                  <p className="text-lg font-bold text-blue-600">{formatCurrency(menu.price)}</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="mb-1"><strong>Deskripsi:</strong> {menu.description}</p>
                <p><strong>Status:</strong> {menu.available ? 'Tersedia' : 'Tidak Tersedia'}</p>
              </div>
            </div>
          </div>

          {/* Warning Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Peringatan:</p>
                <p>Menu yang dihapus akan hilang dari sistem dan tidak dapat dipulihkan. Pastikan tidak ada pesanan aktif yang menggunakan menu ini.</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menghapus...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus Menu
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMenuModal;