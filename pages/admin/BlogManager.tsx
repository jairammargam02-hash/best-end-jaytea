import React, { useState, useEffect, useRef } from 'react';
import { CMSService } from '../../services/cms';
import { BlogPost, SEOConfig } from '../../types';
import { Button, Input, Textarea, Card } from '../../components/UI';
import { Save, Plus, Trash2, ExternalLink, Calendar, Image as ImageIcon, Upload, X } from 'lucide-react';

export const BlogManager: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogPost | null>(null);
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);
  const [isNew, setIsNew] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefReplace = useRef<HTMLInputElement>(null);

  useEffect(() => { loadBlogs(); }, []);

  const loadBlogs = () => setBlogs(CMSService.getAllBlogs(true));

  useEffect(() => {
    if (selectedId) {
      const blog = blogs.find(b => b.id === selectedId);
      if (blog) {
        setFormData(JSON.parse(JSON.stringify(blog)));
        setIsNew(false);
      }
    }
  }, [selectedId, blogs]);

  const handleCreate = () => {
    const newBlog = CMSService.createEmptyBlog();
    setFormData(newBlog);
    setSelectedId(null);
    setIsNew(true);
  };

  const handleSave = () => {
    if (formData) {
       if (!formData.title || !formData.slug) {
         setNotification({ msg: 'Title and Slug are required', type: 'error' });
         return;
       }
       CMSService.saveBlog(formData);
       loadBlogs();
       if (isNew) setSelectedId(formData.id);
       setNotification({ msg: 'Post saved successfully', type: 'success' });
       setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleDelete = () => {
    if (formData && window.confirm('Delete this post?')) {
      CMSService.deleteBlog(formData.id);
      loadBlogs();
      setFormData(null);
      setSelectedId(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && formData) {
      // Basic validation for size (e.g. 2MB limit to save localStorage space)
      if (file.size > 2 * 1024 * 1024) {
        setNotification({ msg: 'Image size too large (Max 2MB)', type: 'error' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, coverImage: reader.result as string });
        setNotification({ msg: 'Image uploaded successfully', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
        // Reset inputs
        if(fileInputRef.current) fileInputRef.current.value = '';
        if(fileInputRefReplace.current) fileInputRefReplace.current.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold font-serif text-stone-900">Blog Manager</h1>
           <p className="text-sm text-stone-500">Write and manage news articles.</p>
        </div>
        <div className="flex gap-4 items-center">
          {notification && (
            <div className={`px-4 py-2 rounded text-sm border animate-fade-in ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {notification.msg}
            </div>
          )}
          <Button onClick={handleCreate} size="sm" className="flex items-center gap-2">
            <Plus size={16} /> New Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar List */}
        <div className="col-span-12 md:col-span-3">
          <Card className="overflow-hidden h-fit sticky top-6">
            <div className="bg-stone-50 p-3 border-b border-stone-200 font-medium text-sm text-stone-500 uppercase">All Posts</div>
            <div className="divide-y divide-stone-100 max-h-[70vh] overflow-y-auto">
              {blogs.map(blog => (
                <button
                  key={blog.id}
                  onClick={() => setSelectedId(blog.id)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-stone-50 ${
                    selectedId === blog.id ? 'bg-brand-50 text-brand-700 border-l-4 border-l-brand-500' : ''
                  }`}
                >
                  <p className="font-medium truncate">{blog.title}</p>
                  <div className="flex justify-between mt-1">
                    <span className={`text-[10px] px-1.5 rounded ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-stone-200 text-stone-600'}`}>
                      {blog.status}
                    </span>
                    <span className="text-[10px] text-stone-400">{new Date(blog.publishDate).toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Editor */}
        <div className="col-span-12 md:col-span-9">
          {formData ? (
            <div className="space-y-6">
               <Card className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                     <Input label="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                     <Input label="Slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6 mb-4">
                     <div className="space-y-1">
                        <label className="text-sm font-medium text-stone-700">Status</label>
                        <select 
                          className="w-full h-10 border rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 border-stone-300"
                          value={formData.status} 
                          onChange={e => setFormData({...formData, status: e.target.value as any})}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                     </div>
                     <Input label="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                     <Input label="Author" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                  </div>
                  
                  {/* Enhanced Image Upload Section */}
                  <div className="space-y-2">
                     <label className="block text-sm font-medium text-stone-700">Cover Image</label>
                     
                     {!formData.coverImage ? (
                       <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 bg-stone-50 hover:bg-stone-100 transition-colors text-center group">
                         <input ref={fileInputRef} type="file" accept="image/*" className="hidden" id="cover-upload" onChange={handleImageUpload} />
                         <label htmlFor="cover-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                           <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-brand-500 mb-2 group-hover:scale-110 transition-transform">
                             <Upload size={20} />
                           </div>
                           <p className="text-sm font-medium text-stone-700">Click to upload cover image</p>
                           <p className="text-xs text-stone-400 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                         </label>
                         <div className="relative mt-4">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-stone-200"></span></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-stone-50 px-2 text-stone-400">Or paste URL</span></div>
                         </div>
                         <input 
                            type="text" 
                            className="mt-3 w-full text-xs p-2 border rounded text-center bg-white focus:outline-none focus:border-brand-400"
                            placeholder="https://..."
                            onChange={e => setFormData({...formData, coverImage: e.target.value})}
                         />
                       </div>
                     ) : (
                       <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-stone-200 bg-stone-100 group">
                         <img src={formData.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                         <div className="absolute top-2 right-2 flex gap-2">
                            <label htmlFor="cover-upload-replace" className="bg-white/90 p-2 rounded-full cursor-pointer hover:text-brand-600 shadow-sm backdrop-blur">
                               <Upload size={16} />
                               <input ref={fileInputRefReplace} type="file" accept="image/*" className="hidden" id="cover-upload-replace" onChange={handleImageUpload} />
                            </label>
                            <button onClick={() => setFormData({...formData, coverImage: ''})} className="bg-white/90 p-2 rounded-full hover:text-red-600 shadow-sm backdrop-blur">
                               <X size={16} />
                            </button>
                         </div>
                       </div>
                     )}
                  </div>
               </Card>

               <Card className="p-6">
                  <h3 className="font-bold mb-2 text-stone-700">Excerpt (Short Summary)</h3>
                  <Textarea rows={3} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
               </Card>

               <div className="bg-white rounded-lg border shadow-sm p-4">
                  <div className="mb-2 flex items-center justify-between">
                       <p className="text-xs font-bold text-stone-400 uppercase">HTML & Text Editor</p>
                       <span className="text-xs text-stone-400">Accepts standard HTML tags</span>
                  </div>
                  <Textarea 
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={15}
                    className="font-mono text-sm"
                    placeholder="<p>Write your article here...</p>"
                  />
               </div>

               {/* Footer Actions */}
               <div className="flex justify-between items-center sticky bottom-6 bg-white/90 backdrop-blur p-4 rounded-lg shadow border z-10">
                 <Button variant="danger" size="sm" onClick={handleDelete}>
                    <Trash2 size={16} className="mr-2"/> Delete
                 </Button>
                 <Button onClick={handleSave} className="flex items-center gap-2">
                    <Save size={18} /> Save Post
                 </Button>
               </div>
            </div>
          ) : (
             <div className="h-96 flex flex-col items-center justify-center text-stone-400 bg-stone-50 rounded-lg border-2 border-dashed">
                <ImageIcon size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">Select a post to edit</p>
                <p className="text-sm mb-4">or create a new article for your readers</p>
                <Button onClick={handleCreate} variant="outline" className="flex items-center gap-2">
                 <Plus size={16} /> Create New Post
               </Button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};