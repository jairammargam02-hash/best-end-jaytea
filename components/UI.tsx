import React, { useRef } from 'react';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', size = 'md', className = '', ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
    secondary: "bg-stone-800 text-white hover:bg-stone-900 shadow-sm",
    outline: "border border-stone-200 bg-transparent hover:bg-stone-100 text-stone-900",
    ghost: "hover:bg-stone-100 text-stone-700",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-8 text-base"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>}
    <input 
      className={`flex h-10 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props} 
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

// --- Textarea ---
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>}
    <textarea 
      className={`flex w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props} 
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

// --- Rich Text Editor (Lightweight & Safe) ---
interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const HTMLRichTextEditor: React.FC<RichTextEditorProps> = ({ label, value, onChange, className = '' }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertTag = (tagStart: string, tagEnd: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    const newValue = `${before}${tagStart}${selection}${tagEnd}${after}`;
    onChange(newValue);
    
    // Restore focus
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + tagStart.length, end + tagStart.length);
    }, 0);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>}
      <div className="border border-stone-300 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-brand-400">
        <div className="flex flex-wrap gap-1 bg-stone-50 border-b border-stone-200 p-1">
          <button type="button" onClick={() => insertTag('<strong>', '</strong>')} className="px-2 py-1 text-xs font-bold hover:bg-stone-200 rounded">B</button>
          <button type="button" onClick={() => insertTag('<em>', '</em>')} className="px-2 py-1 text-xs italic hover:bg-stone-200 rounded">I</button>
          <button type="button" onClick={() => insertTag('<u>', '</u>')} className="px-2 py-1 text-xs underline hover:bg-stone-200 rounded">U</button>
          <div className="w-px h-4 bg-stone-300 mx-1 self-center"></div>
          <button type="button" onClick={() => insertTag('<h2>', '</h2>')} className="px-2 py-1 text-xs font-bold hover:bg-stone-200 rounded">H2</button>
          <button type="button" onClick={() => insertTag('<h3>', '</h3>')} className="px-2 py-1 text-xs font-bold hover:bg-stone-200 rounded">H3</button>
          <button type="button" onClick={() => insertTag('<p>', '</p>')} className="px-2 py-1 text-xs hover:bg-stone-200 rounded">P</button>
          <div className="w-px h-4 bg-stone-300 mx-1 self-center"></div>
          <button type="button" onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')} className="px-2 py-1 text-xs hover:bg-stone-200 rounded">List</button>
          <button type="button" onClick={() => insertTag('<a href="#">', '</a>')} className="px-2 py-1 text-xs hover:bg-stone-200 rounded text-blue-600 underline">Link</button>
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 text-sm font-mono min-h-[300px] focus:outline-none resize-y"
          placeholder="Type content here..."
        />
      </div>
      <p className="text-[10px] text-stone-400 mt-1">HTML tags are supported. Use the toolbar for quick formatting.</p>
    </div>
  );
};

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-lg border border-stone-200 bg-white text-stone-950 shadow-sm ${className}`}>
    {children}
  </div>
);