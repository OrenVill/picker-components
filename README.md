# Picker Components

This repository contains two standalone, reusable picker components:

1. **CircularTimePicker** - A modern circular 24-hour time picker with dual circles
2. **SimpleDatePicker** - A clean, compact date picker with range selection

## Features

### CircularTimePicker
- 24-hour format without AM/PM
- Dual concentric circles (inner: 13-24, outer: 1-12)
- Smooth mode switching between hours and minutes
- Auto-progression from hours to minutes
- Clean, modern design
- Theme-aware styling

### SimpleDatePicker
- Compact calendar grid with minimal height
- Month navigation
- Date range selection support
- Today highlighting
- Clean, professional styling
- Theme-aware design

## Usage

Integrating these components into your project is straightforward:

### 1. Installation

Clone or copy this repository, or copy the specific component files you need into your project.

```bash
git clone https://github.com/OrenVill/picker-components.git
# or manually copy component files into your project
```

### 2. Import the Component

Import the desired picker component into your project files.  
For example, in a React project:

```jsx
import CircularTimePicker from './path/to/CircularTimePicker';
import SimpleDatePicker from './path/to/SimpleDatePicker';
```

### 3. Use in Your App

Add the picker components to your JSX and provide any required props:

```jsx
// CircularTimePicker example
<CircularTimePicker
  value={selectedTime}
  onChange={setSelectedTime}
  theme="light" // or "dark"
/>

// SimpleDatePicker example
<SimpleDatePicker
  startDate={startDate}
  endDate={endDate}
  onChange={({ start, end }) => {
    setStartDate(start);
    setEndDate(end);
  }}
  theme="light" // or "dark"
/>
```

### 4. Styling

The components use CSS custom properties for theming.  
Customize appearance by overriding these variables in your CSS:

```css
:root {
  --picker-primary: #007aff;
  --picker-bg: #fff;
  --picker-accent: #e0e7ef;
  /* ...other variables */
}
```

### 5. Browser Support

- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design
- Requires support for CSS custom properties

---

For detailed prop documentation and advanced usage, refer to the documentation/comments inside each component file.

## License

MIT License
