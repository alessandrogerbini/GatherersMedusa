# Rich Text Editor for Product Descriptions

## Overview

A custom rich text editor widget has been added to the Medusa admin to enhance product description editing with formatting capabilities.

---

## Features

### ✅ What's Included

1. **Markdown Support** - Use markdown syntax for rich formatting
2. **Formatting Toolbar** - Quick buttons for common formatting
3. **Live Preview** - See how your description will look
4. **Auto-save** - Save button to update descriptions

### 📝 Supported Formatting

| Format | Markdown Syntax | Result |
|--------|----------------|--------|
| **Bold** | `**text**` | **text** |
| *Italic* | `*text*` | *text* |
| Heading | `### Heading` | Large heading text |
| Bullet List | `- Item` | • Bulleted item |
| Link | `[Text](url)` | Clickable link |
| Divider | `---` | Horizontal line |

---

## How to Use

### In Admin Panel

1. **Navigate to a Product**
   - Go to http://localhost:9000/app
   - Click on Products → Select a product

2. **Scroll to Rich Text Editor**
   - Below the basic product information
   - You'll see "Rich Text Product Description" section

3. **Format Your Description**
   - Use the toolbar buttons for quick formatting
   - Or type markdown directly
   - View the live preview below the editor

4. **Save Changes**
   - Click "Save Description" button
   - Changes will be saved to the product

### On Storefront

The formatted description will display with proper HTML styling on product pages.

---

## Installation

The widget is already installed at:
```
medusa-backend/src/admin/widgets/product-description-editor.tsx
```

### Restart Backend to Activate

```powershell
cd "G:\FastGrams program files\GG Medusa V2 website\medusa-backend"
# Stop the current server (Ctrl+C)
npm run dev
```

Wait 30-40 seconds for the backend to fully restart, then refresh the admin panel.

---

## Advanced: Upgrading to Full WYSIWYG

If you want a full "What You See Is What You Get" editor (like Microsoft Word), you can integrate a library:

### Option 1: TipTap Editor (Recommended)

```bash
cd medusa-backend
npm install @tiptap/react @tiptap/starter-kit @tiptap/pm
```

### Option 2: React Quill

```bash
cd medusa-backend
npm install react-quill
```

### Option 3: Slate.js

```bash
cd medusa-backend
npm install slate slate-react slate-history
```

After installing, you can update the widget to use one of these libraries for a more visual editing experience.

---

## Displaying Rich Content on Storefront

The storefront needs to render the markdown/HTML properly. Update your product template:

### Example: Product Info Component

```tsx
// medusa-storefront/src/modules/products/templates/product-info/index.tsx

import ReactMarkdown from 'react-markdown'

const ProductInfo = ({ product }) => {
  return (
    <div>
      <h2>{product.title}</h2>
      
      {/* Render markdown as formatted HTML */}
      <ReactMarkdown 
        className="prose prose-sm"
        components={{
          strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
          em: ({node, ...props}) => <em className="italic" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-bold my-2" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc ml-6" {...props} />,
          a: ({node, ...props}) => <a className="text-blue-600 underline" {...props} />,
        }}
      >
        {product.description}
      </ReactMarkdown>
    </div>
  )
}
```

### Install markdown renderer (if needed):

```bash
cd medusa-storefront
npm install react-markdown
```

---

## Troubleshooting

### Widget Not Showing

1. **Restart Backend**
   ```powershell
   # In backend terminal: Ctrl+C
   npm run dev
   ```

2. **Clear Browser Cache**
   - Hard refresh: `Ctrl + Shift + R`
   - Or use incognito mode

3. **Check Widget Location**
   - File must be in: `medusa-backend/src/admin/widgets/`
   - Filename must end with `.tsx`

### Formatting Not Displaying on Storefront

- Make sure you're rendering the description as HTML/markdown
- Install and use `react-markdown` or similar library
- Check that the description field contains the formatted text

### Preview Not Updating

- The preview uses basic regex replacement
- For complex formatting, the full rendered version on storefront will be more accurate

---

## Future Enhancements

Possible upgrades to consider:

1. ✅ **Full WYSIWYG Editor** - Visual editing (TipTap recommended)
2. **Image Upload** - Insert images directly in descriptions
3. **HTML Editing** - Allow raw HTML for advanced users
4. **Templates** - Pre-made description templates
5. **AI Assistance** - Generate descriptions with AI
6. **Version History** - Track description changes

---

## Resources

- [Markdown Guide](https://www.markdownguide.org/basic-syntax/)
- [TipTap Documentation](https://tiptap.dev/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [Medusa Admin Widgets](https://docs.medusajs.com/learn/fundamentals/admin/widgets)

---

**Need help?** The current implementation supports basic markdown. For more advanced features, we can upgrade to a full WYSIWYG editor library.



