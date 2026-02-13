## Styles Folder - Quick Reference Guide

### 📁 Styles Folder Structure
```
src/styles/
├── index.css              # ← Import this in src/index.js
├── globals.css            # Global + Tailwind setup
├── scrollbar.css          # Custom scrollbars
├── animations.css         # Keyframes + transitions
├── forms.css              # Inputs + form styling
├── components.css         # Cards, badges, buttons
├── layout.css             # Sidebar, header, modals, tables
├── responsive.css         # Media queries
├── utilities.css          # Helper classes
└── STYLES_README.md       # Full documentation
```

---

### 🎨 Common CSS Classes

#### Buttons
```css
.btn              /* Base button */
.btn-primary      /* Blue button */
.btn-secondary    /* Gray button */
.btn-danger       /* Red button */
.btn-success      /* Green button */
.btn-sm           /* Small button */
.btn-lg           /* Large button */
```

#### Badges/Status
```css
.badge            /* Base badge */
.badge-success    /* Green - Approved/Active */
.badge-error      /* Red - Rejected/Error */
.badge-warning    /* Yellow - Warning */
.badge-info       /* Blue - Info */
.badge-pending    /* Yellow - Pending */
.badge-approved   /* Green - Approved */
.badge-rejected   /* Red - Rejected */
```

#### Cards & Containers
```css
.card             /* White card with shadow */
.card-lg          /* Large padding (2rem) */
.card-sm          /* Small padding (1rem) */

.shadow-soft      /* Light shadow */
.shadow-medium    /* Medium shadow */
.shadow-lg        /* Large shadow */
.shadow-xl        /* Extra large shadow */
```

#### Flexbox Utilities
```css
.flex-col         /* flex-direction: column */
.flex-between     /* justify-content: space-between */
.flex-center      /* center align items */
.flex-start       /* justify-content: flex-start */
.flex-end         /* justify-content: flex-end */
```

#### Spacing Utilities
```css
.gap-1, .gap-2, .gap-3, .gap-4, .gap-5, .gap-6
.p-1 to .p-6      /* Padding: 0.25rem to 1.5rem */
.m-1 to .m-6      /* Margin: 0.25rem to 1.5rem */
.m-auto           /* margin: auto (center) */
```

#### Sizing Utilities
```css
.w-full           /* width: 100% */
.h-full           /* height: 100% */
.min-h-screen     /* min-height: 100vh */
.max-w-md         /* Limit width for readability */
```

#### Animations
```css
.animate-slide-in     /* Slide from bottom + fade */
.animate-slide-down   /* Slide from top + fade */
.animate-fade-in      /* Fade in */
.animate-spin         /* Spinning (loading) */
.animate-pulse        /* Pulsing effect */
.animate-bounce       /* Bouncing effect */
```

#### Transitions
```css
.transition-all       /* Smooth all properties */
.transition-colors    /* Smooth color changes */
.transition-transform /* Smooth transform changes */
```

#### Text Utilities
```css
.text-truncate    /* Ellipsis overflow */
.text-clamp-2     /* Max 2 lines, then ellipsis */
.text-clamp-3     /* Max 3 lines, then ellipsis */
```

#### Layout Components
```css
.sidebar          /* Fixed left sidebar */
.header           /* Sticky header */
.modal            /* Modal dialog box */
.modal-sm/.md/.lg /* Modal size variants */
.alert            /* Alert message container */
.alert-success    /* Green alert */
.alert-error      /* Red alert */
.dropdown-menu    /* Dropdown menu container */
.table            /* Table styling */
```

#### Visibility
```css
.hide             /* display: none */
.block            /* display: block */
.inline-block     /* display: inline-block */
.hide-mobile      /* Hidden on mobile (<768px) */
.hide-desktop     /* Hidden on desktop (≥768px) */
.no-print         /* Hidden when printing */
```

#### Cursor & Interaction
```css
.cursor-pointer   /* cursor: pointer */
.cursor-not-allowed
.cursor-text
```

#### Z-Index
```css
.z-0, .z-10, .z-20, .z-30, .z-40, .z-50
```

---

### 📱 Responsive Breakpoints

Mobile-first approach:
```
xs: < 576px      (default styles apply)
sm: ≥ 576px      (landscape phones)
md: ≥ 768px      (tablets)
lg: ≥ 992px      (desktops)
xl: ≥ 1200px     (large desktops)
2xl: ≥ 1400px    (extra large)
```

Use media queries in CSS:
```css
@media (max-width: 767px) {
  /* Mobile styles */
}

@media (min-width: 768px) {
  /* Tablet and up */
}
```

---

### 🎯 Common Usage Examples

#### Card with Badge
```jsx
<div className="card animate-slide-in">
  <div className="flex-between mb-4">
    <h3>Leave Request</h3>
    <span className="badge badge-pending">Pending</span>
  </div>
  <p>From: 2024-01-15 To: 2024-01-20</p>
</div>
```

#### Button Group
```jsx
<div className="flex-start gap-3">
  <button className="btn btn-primary">Approve</button>
  <button className="btn btn-secondary">Cancel</button>
  <button className="btn btn-danger btn-sm">Delete</button>
</div>
```

#### Form Input
```jsx
<div className="mb-4">
  <label className="required">Email Address</label>
  <input type="email" placeholder="user@example.com" />
</div>
```

#### Responsive Grid
```jsx
<div className="grid-auto gap-4">
  <div className="card">Card 1</div>
  <div className="card">Card 2</div>
  <div className="card">Card 3</div>
</div>
```

#### Alert Message
```jsx
<div className="alert alert-success animate-slide-down">
  ✓ Leave request approved successfully!
</div>
```

#### Loading Spinner
```jsx
<div className="flex-center">
  <div className="animate-spin">⟳</div>
</div>
```

#### Status Table Row
```jsx
<tr className="hover:bg-gray-50">
  <td>John Doe</td>
  <td><span className="badge badge-approved">Active</span></td>
  <td className="text-truncate">john.doe@university.edu</td>
</tr>
```

---

### 🔧 Import Path

In your component files:
```javascript
// Already imported globally in src/index.js
// No need to import again in components!

// The styles are available via className prop
<button className="btn btn-primary">Click me</button>
```

---

### ⚙️ Customizing Styles

#### Modify existing class
Edit the appropriate CSS file:
```css
/* In components.css */
.btn-primary {
  background-color: #0284c7;  /* Changed from #0ea5e9 */
  color: #ffffff;
}
```

#### Add new utility class
Add to `utilities.css`:
```css
.my-custom-class {
  display: flex;
  align-items: center;
  gap: 1rem;
}
```

#### Use Tailwind + custom CSS
```jsx
<div className="card p-6 bg-gradient-to-r from-blue-500 to-purple-600">
  Combines custom .card with Tailwind utilities
</div>
```

---

### 📋 File Organization Rules

**globals.css**: Base/root styles
**scrollbar.css**: Browser UI customization
**animations.css**: @keyframes and animation classes
**forms.css**: Form elements (input, select, etc.)
**components.css**: UI components (buttons, badges, cards)
**layout.css**: Page structure (sidebar, header, modal)
**responsive.css**: Media queries and breakpoints
**utilities.css**: Helper/utility classes
**index.css**: Master import file

---

### 🐛 Debugging Styles

1. **Class not working?**
   - Check spelling: `.btn-primary` (not `.btn_primary`)
   - Verify it exists in CSS files
   - Check browser DevTools (F12)

2. **Conflict with Tailwind?**
   - Both custom CSS and Tailwind work together
   - Specificity: custom > Tailwind utilities
   - Check CSS cascade order

3. **Mobile styles not applying?**
   - Check media queries in responsive.css
   - Use `.hide-mobile` or `.hide-desktop` classes
   - Test with browser DevTools device toolbar

4. **Animation not smooth?**
   - Ensure `animation-` class is applied
   - Check `transition-` classes for property changes
   - Verify `prefers-reduced-motion` isn't affecting it

---

### 📚 Related Files

- **Component styles**: Keep in respective component folder if very specific
- **Page styles**: Consider page-specific CSS file if large
- **Theme styles**: Can be added to themes.css (future)
- **Dark mode**: Add to each module (future expansion)

---

### ✨ Best Practices

✅ Use semantic class names (.btn-primary, not .blue-button)
✅ Combine multiple classes for flexibility
✅ Use responsive utilities for mobile-first design
✅ Apply animations to enhance, not overwhelm
✅ Keep classes modular and reusable
✅ Document complex or non-obvious styles

---

### 🚀 Performance Tips

- Minified automatically in production
- Only loaded styles are included in build
- Tailwind CSS + custom CSS work efficiently together
- Consider PurgeCSS for removing unused styles

---

**Last Updated**: 2024
**Quick Ref Version**: 1.0
