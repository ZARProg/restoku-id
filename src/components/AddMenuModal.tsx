import React, { useState } from 'react';
import { X, Upload, Save } from 'lucide-react';
import { MenuItem } from '../types';

interface AddMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (menuData: Omit<MenuItem, 'id'>) => void;
}

const AddMenuModal: React.FC<AddMenuModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: 'makanan' as 'makanan' | 'minuman',
    image: '',
    available: true,
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim() || formData.price <= 0) {
      alert('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onSave(formData);
      
      // Reset form
      setFormData({
        name: '',
        price: 0,
        category: 'makanan',
        image: '',
        available: true,
        description: ''
      });
      
      alert('Menu berhasil ditambahkan!');
      onClose();
    } catch (error) {
      alert('Gagal menambahkan menu. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultImages = {
    makanan: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    minuman: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Tambah Menu Baru</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nama Menu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Menu *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan nama menu"
              required
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
            </select>
          </div>

          {/* Harga */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Harga *
            </label>
            <input
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan deskripsi menu"
              required
            />
          </div>

          {/* URL Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Gambar
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Kosongkan untuk menggunakan gambar default
            </p>
          </div>

          {/* Status Ketersediaan */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              checked={formData.available}
              onChange={(e) => handleInputChange('available', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
              Menu tersedia
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Menu
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuModal;