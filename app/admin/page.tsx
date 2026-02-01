'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        price: 0,
        unit: 'kg',
        category: 'Rau xanh',
        origin: 'Việt Nam',
        description: '',
        isNew: false,
        rating: 5,
        reviews: 0,
        image: '',
    });

    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    // 1. Fetch Products
    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (error) {
            console.error('Error:', error);
        } else {
            const mappedProducts: Product[] = data.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                originalPrice: item.original_price,
                unit: item.unit,
                image: item.image,
                category: item.category,
                origin: item.origin,
                rating: item.rating,
                reviews: item.reviews,
                isNew: item.is_new,
                isVietGap: item.is_viet_gap,
                description: item.description,
                reviewsList: []
            }));
            setProducts(mappedProducts);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push('/account'); // Redirect if not logged in
            } else {
                fetchProducts();
            }
        }
    }, [user, authLoading, router]);

    // 2. Handle Image Upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            setMessage(null);

            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('Bạn cần chọn một file ảnh.');
            }

            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload to Supabase Storage bucket 'images'
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, image: publicUrl }));
            setMessage({ text: 'Upload ảnh thành công!', type: 'success' });

        } catch (error: any) {
            setMessage({ text: error.message || 'Lỗi upload ảnh.', type: 'error' });
        } finally {
            setUploading(false);
        }
    };

    // 3. Handle Submit (Add Product)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.price) {
            setMessage({ text: 'Vui lòng điền tên và giá sản phẩm.', type: 'error' });
            return;
        }

        try {
            setLoading(true);

            const newProduct = {
                id: crypto.randomUUID(), // Generate simplified ID
                name: formData.name,
                price: formData.price,
                unit: formData.unit,
                category: formData.category,
                origin: formData.origin,
                image: formData.image || 'https://via.placeholder.com/300', // Default if empty
                description: formData.description,
                is_new: formData.isNew || false,
                rating: 5,
                reviews: 0
            };

            const { error } = await supabase
                .from('products')
                .insert([newProduct]);

            if (error) throw error;

            setMessage({ text: 'Thêm sản phẩm thành công!', type: 'success' });
            setFormData({ // Reset Form
                name: '', price: 0, unit: 'kg', category: 'Rau xanh', origin: 'Việt Nam',
                description: '', isNew: false, image: ''
            });
            fetchProducts(); // Refresh list

        } catch (error: any) {
            setMessage({ text: error.message || 'Lỗi thêm sản phẩm.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // 4. Delete Product
    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa sản phẩm này không?')) return;

        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            setMessage({ text: 'Xóa thành công!', type: 'success' });
            fetchProducts();
        } catch (error: any) {
            setMessage({ text: 'Lỗi xóa sản phẩm.', type: 'error' });
        }
    };

    if (authLoading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-black mb-8 text-primary">Trang Quản Trị (Admin)</h1>

                {/* Message Alert */}
                {message && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        <span className="material-symbols-outlined text-lg">{message.type === 'success' ? 'check_circle' : 'error'}</span>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT: Add Product Form */}
                    <div className="lg:col-span-1 bg-white dark:bg-[#1a2e1a] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-green-800/50 h-fit">
                        <h2 className="text-xl font-bold mb-6">Thêm sản phẩm mới</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Image Upload */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Hình ảnh sản phẩm</label>
                                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-center hover:bg-gray-50 dark:hover:bg-black/20 transition-colors">
                                    {formData.image ? (
                                        <div className="relative">
                                            <img src={formData.image} alt="Preview" className="w-full h-40 object-cover rounded-xl mb-3" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image: '' })}
                                                className="text-xs text-red-500 font-bold hover:underline"
                                            >
                                                Xóa ảnh
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="size-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2">
                                                <span className="material-symbols-outlined">cloud_upload</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploading}
                                                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                            />
                                            {uploading && <p className="text-xs text-primary font-bold mt-2">Đang tải ảnh lên...</p>}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tên sản phẩm</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-3 bg-gray-50 dark:bg-black/20 rounded-xl font-bold text-sm border-transparent focus:border-primary focus:ring-0"
                                    placeholder="Ví dụ: Cà chua bi"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Giá (VNĐ)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                        className="w-full p-3 bg-gray-50 dark:bg-black/20 rounded-xl font-bold text-sm border-transparent focus:border-primary focus:ring-0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Đơn vị</label>
                                    <input
                                        type="text"
                                        value={formData.unit}
                                        onChange={e => setFormData({ ...formData, unit: e.target.value })}
                                        className="w-full p-3 bg-gray-50 dark:bg-black/20 rounded-xl font-bold text-sm border-transparent focus:border-primary focus:ring-0"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Danh mục</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full p-3 bg-gray-50 dark:bg-black/20 rounded-xl font-bold text-sm border-transparent focus:border-primary focus:ring-0"
                                    >
                                        <option>Rau xanh</option>
                                        <option>Củ quả</option>
                                        <option>Trái cây</option>
                                        <option>Nấm & Gia vị</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Xuất xứ</label>
                                    <input
                                        type="text"
                                        value={formData.origin}
                                        onChange={e => setFormData({ ...formData, origin: e.target.value })}
                                        className="w-full p-3 bg-gray-50 dark:bg-black/20 rounded-xl font-bold text-sm border-transparent focus:border-primary focus:ring-0"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || uploading}
                                className="w-full py-3 bg-primary text-black font-black rounded-xl hover:bg-green-500 transition-colors shadow-lg shadow-primary/20"
                            >
                                {loading ? 'Đang xử lý...' : 'Thêm sản phẩm'}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT: Product List */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold mb-6">Danh sách sản phẩm ({products.length})</h2>
                        <div className="bg-white dark:bg-[#1a2e1a] rounded-3xl shadow-sm border border-gray-100 dark:border-green-800/50 overflow-hidden">
                            {products.length === 0 ? (
                                <div className="p-10 text-center text-gray-500">Chưa có sản phẩm nào.</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 dark:bg-black/20 text-xs text-gray-500 uppercase font-bold">
                                            <tr>
                                                <th className="p-4 text-left">Sản phẩm</th>
                                                <th className="p-4 text-left">Giá</th>
                                                <th className="p-4 text-left">Danh mục</th>
                                                <th className="p-4 text-right">Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                                <tr key={product.id} className="border-b border-gray-100 dark:border-green-900/30 last:border-0 hover:bg-gray-50 dark:hover:bg-green-900/10 transition-colors">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <img src={product.image} alt={product.name} className="size-12 rounded-lg object-cover bg-gray-100" />
                                                            <div>
                                                                <div className="font-bold text-sm">{product.name}</div>
                                                                <div className="text-xs text-gray-500">{product.origin}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-sm font-bold">{product.price.toLocaleString()}đ / {product.unit}</td>
                                                    <td className="p-4 text-sm text-gray-500">{product.category}</td>
                                                    <td className="p-4 text-right">
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            className="size-8 inline-flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all ml-2" title="Xóa"
                                                        >
                                                            <span className="material-symbols-outlined text-lg">delete</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
