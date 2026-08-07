import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Trash2, Edit, Plus, Image as ImageIcon, Loader, LogOut, Wand2 } from 'lucide-react';
import './Admin.css';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'bholasofa_admin_2026';
const SESSION_KEY = 'admin_session_expiry';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  // Dashboard State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sofa',
    price: '',
    discount_price: '',
    description: '',
    image_url: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  // Auth Logic
  const checkAuth = () => {
    const expiry = localStorage.getItem(SESSION_KEY);
    if (expiry && new Date().getTime() < parseInt(expiry, 10)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem(SESSION_KEY);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      // Set session for 7 days
      const expiry = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem(SESSION_KEY, expiry.toString());
      setIsAuthenticated(true);
      setPasswordInput('');
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  // Data Logic
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      alert('Error fetching products. Did you run the setup.sql script?');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    try {
      setUploadingImage(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
      
      setFormData({ ...formData, image_url: data.publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error.message);
      alert('Error uploading image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!formData.image_url) {
      alert("Please upload or provide an image URL first.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const imageResponse = await fetch(formData.image_url);
      const blob = await imageResponse.blob();
      
      const base64Promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(blob);
      });
      const base64Data = await base64Promise;
      
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      const prompt = `You are a professional furniture copywriter. Look at this image of a furniture product. 
      Generate a catchy, premium Title and a short, beautiful Description for a furniture store. 
      Return ONLY a JSON object in this exact format without markdown: {"name": "Product Name", "description": "Product Description"}`;
      
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;
      
      const aiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: blob.type || 'image/jpeg',
                  data: base64Data
                }
              }
            ]
          }]
        })
      });
      
      const aiData = await aiResponse.json();
      
      if (aiData.error) throw new Error(aiData.error.message);
      
      const textOutput = aiData.candidates[0].content.parts[0].text;
      
      // Clean up markdown code blocks if present
      const jsonString = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
      
      try {
        const result = JSON.parse(jsonString);
        setFormData(prev => ({
          ...prev,
          name: result.name || prev.name,
          description: result.description || prev.description
        }));
      } catch (parseErr) {
        console.error("Raw AI Output:", textOutput);
        throw new Error("Failed to parse AI response.");
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("AI Generation failed: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase
          .from('products')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([formData]);
        if (error) throw error;
      }
      
      setShowModal(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error.message);
      alert('Error saving product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error.message);
      alert('Error deleting product');
    }
  };

  const openEditModal = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setShowModal(true);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Sofa',
      price: '',
      discount_price: '',
      description: '',
      image_url: ''
    });
    setEditingId(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <form onSubmit={handleLogin} className="admin-login-form">
          <h2>Admin Access</h2>
          <p>Please enter your private key to manage the store.</p>
          <input 
            type="password" 
            placeholder="Password" 
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Store Manager</h1>
        <div className="admin-actions">
          <button onClick={openAddModal} className="btn-add"><Plus size={16}/> Add Product</button>
          <button onClick={handleLogout} className="btn-logout"><LogOut size={16}/> Logout</button>
        </div>
      </div>

      {loading ? (
        <div className="admin-loading"><Loader className="spinner" /> Loading products...</div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="5" style={{textAlign:'center'}}>No products found. Add one!</td></tr>
              ) : (
                products.map(p => (
                  <tr key={p.id}>
                    <td><img src={p.image_url || '/placeholder.jpg'} alt={p.name} className="admin-thumb" /></td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>₹{p.price}</td>
                    <td className="action-cells">
                      <button onClick={() => openEditModal(p)} className="icon-btn edit"><Edit size={16}/></button>
                      <button onClick={() => handleDelete(p.id)} className="icon-btn delete"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="admin-modal">
            <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSaveProduct}>
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required>
                  <option value="Sofa">Sofa</option>
                  <option value="Bed">Bed</option>
                  <option value="Dining">Dining</option>
                  <option value="Chair">Chair</option>
                  <option value="Table">Table</option>
                  <option value="Decor">Decor</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Regular Price (₹)</label>
                  <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Discount Price (₹)</label>
                  <input type="number" value={formData.discount_price} onChange={e => setFormData({...formData, discount_price: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Product Image</label>
                <div className="image-upload-area">
                  {formData.image_url && <img src={formData.image_url} alt="Preview" className="img-preview" />}
                  <label className="upload-btn">
                    {uploadingImage ? <Loader className="spinner" size={16}/> : <ImageIcon size={16}/>}
                    {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{display: 'none'}} />
                  </label>
                  <input type="text" placeholder="Or paste image URL" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="url-input" style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box'}} />
                  
                  {formData.image_url && (
                    <button type="button" onClick={handleGenerateAI} disabled={isGenerating} className="btn-ai-generate">
                      {isGenerating ? <Loader className="spinner" size={16}/> : <Wand2 size={16}/>}
                      {isGenerating ? 'Analyzing Image...' : 'Auto-Generate Details with AI'}
                    </button>
                  )}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">Cancel</button>
                <button type="submit" className="btn-save" disabled={uploadingImage}>Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
