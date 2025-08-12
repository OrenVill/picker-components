# CircularTimePicker

A modern, circular 24-hour time picker with dual concentric circles.

## Features

- **24-hour format** without AM/PM
- **Dual concentric circles**: Inner circle (13-24), Outer circle (1-12)
- **Auto-progression** from hours to minutes
- **5-minute intervals** for minute selection
- **Theme-aware styling** (light/dark mode support)
- **Smooth animations** and transitions
- **Keyboard support** (ESC to close)

## Usage

### 1. Include Dependencies

```html
<!-- Bootstrap CSS (required) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Bootstrap Icons (optional, for icons) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">

<!-- CircularTimePicker CSS -->
<link rel="stylesheet" href="circular-time-picker.css">
```

### 2. Add HTML Structure

```html
<!-- Input field with display -->
<div class="time-input-container">
    <div class="time-input-display" id="timeDisplay1" onclick="openTimePicker('timeInput1')">
        Select time...
    </div>
    <button class="time-input-btn" onclick="openTimePicker('timeInput1')">
        <i class="bi bi-clock"></i>
    </button>
    <input type="hidden" id="timeInput1" />
</div>

<!-- Time Picker Overlay (add once to your page) -->
<div class="circular-timepicker-overlay" id="circularTimePicker">
    <div class="circular-timepicker">
        <div class="time-display" id="timeDisplay">12:00</div>
        
        <div class="time-mode-toggle">
            <button class="time-mode-btn active" id="hourModeBtn" onclick="setTimeMode('hours')">
                <i class="bi bi-clock"></i> Hours
            </button>
            <button class="time-mode-btn" id="minuteModeBtn" onclick="setTimeMode('minutes')">
                <i class="bi bi-stopwatch"></i> Minutes
            </button>
        </div>
        
        <div class="clock-face" id="clockFace">
            <div class="clock-center"></div>
            <div class="clock-numbers-container" id="clockNumbers"></div>
        </div>
        
        <div class="time-picker-instructions">
            <span id="modeInstructions">Select hour (1-24)</span>
        </div>
        
        <div class="timepicker-actions">
            <button class="timepicker-btn clear" onclick="clearTime()">CLEAR</button>
            <button class="timepicker-btn cancel" onclick="closeTimePicker()">CANCEL</button>
            <button class="timepicker-btn ok" onclick="confirmTime()">OK</button>
        </div>
    </div>
</div>
```

### 3. Include JavaScript

```html
<script src="circular-time-picker.js"></script>
```

### 4. Open the Picker

```javascript
// Open the time picker for a specific input
openTimePicker('timeInput1');
```

## API

### Global Functions

- `openTimePicker(targetId)` - Opens the time picker for the specified input element
- `closeTimePicker()` - Closes the time picker
- `setTimeMode(mode)` - Sets the picker mode ('hours' or 'minutes')
- `clearTime()` - Clears the selected time
- `confirmTime()` - Confirms the selected time and closes the picker

### Class Methods

If you prefer to use the class directly:

```javascript
const timePicker = new CircularTimePicker();
timePicker.openTimePicker('timeInput1');
```

## Events

The time picker triggers a `change` event on the target input element when a time is selected.

```javascript
document.getElementById('timeInput1').addEventListener('change', function() {
    console.log('Selected time:', this.value); // Format: "HH:MM"
});
```

## Customization

### CSS Variables

You can customize the appearance by overriding CSS variables:

```css
:root {
    --bs-primary: #your-color;
    --bs-body-bg: #your-bg-color;
    --bs-border-color: #your-border-color;
}
```

### Dark Theme

The component automatically supports Bootstrap's dark theme:

```html
<html data-bs-theme="dark">
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License
