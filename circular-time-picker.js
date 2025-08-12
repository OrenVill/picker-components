/**
 * CircularTimePicker - A modern 24-hour circular time picker
 * 
 * Features:
 * - 24-hour format without AM/PM
 * - Dual concentric circles (inner: 13-24, outer: 1-12)
 * - Smooth mode switching between hours and minutes
 * - Auto-progression from hours to minutes
 * - Theme-aware styling
 * 
 * Usage:
 * 1. Include the CSS and JS files
 * 2. Add the HTML structure to your page
 * 3. Call openTimePicker('yourInputId') to open the picker
 */

class CircularTimePicker {
    constructor() {
        this.currentTimePicker = {
            targetElement: null,
            displayElement: null,
            hours: 12,
            minutes: 0,
            mode: 'hours' // 'hours' or 'minutes'
        };
        
        this.init();
    }
    
    init() {
        // Initialize clock interactions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('clock-number')) {
                this.handleNumberClick(e);
            }
        });
        
        // Close on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('circular-timepicker-overlay')) {
                this.closeTimePicker();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('circularTimePicker').classList.contains('show')) {
                this.closeTimePicker();
            }
        });
    }
    
    handleNumberClick(e) {
        const value = parseInt(e.target.getAttribute('data-value'));
        
        if (this.currentTimePicker.mode === 'hours') {
            this.currentTimePicker.hours = value;
            this.updateTimeDisplay();
            
            // Update visual selection
            document.querySelectorAll('.clock-number').forEach(num => {
                num.classList.remove('selected');
            });
            e.target.classList.add('selected');
            
            // Auto-switch to minutes after 0.8 seconds
            setTimeout(() => {
                this.setTimeMode('minutes');
            }, 800);
            
        } else if (this.currentTimePicker.mode === 'minutes') {
            this.currentTimePicker.minutes = value;
            this.updateTimeDisplay();
            
            // Update visual selection
            document.querySelectorAll('.clock-number').forEach(num => {
                num.classList.remove('selected');
            });
            e.target.classList.add('selected');
        }
    }
    
    openTimePicker(targetId) {
        this.currentTimePicker.targetElement = document.getElementById(targetId);
        this.currentTimePicker.displayElement = document.getElementById(targetId + 'Display');
        
        // Get current value if any
        const currentValue = this.currentTimePicker.targetElement.value;
        if (currentValue) {
            const [hours, minutes] = currentValue.split(':');
            this.currentTimePicker.hours = parseInt(hours);
            this.currentTimePicker.minutes = parseInt(minutes);
        } else {
            // Default to current time
            const now = new Date();
            this.currentTimePicker.hours = now.getHours();
            this.currentTimePicker.minutes = Math.round(now.getMinutes() / 5) * 5;
        }
        
        // Always start with hours mode
        this.setTimeMode('hours');
        this.updateTimeDisplay();
        
        document.getElementById('circularTimePicker').classList.add('show');
    }
    
    closeTimePicker() {
        document.getElementById('circularTimePicker').classList.remove('show');
    }
    
    setTimeMode(mode) {
        this.currentTimePicker.mode = mode;
        
        // Update button states
        document.getElementById('hourModeBtn').classList.toggle('active', mode === 'hours');
        document.getElementById('minuteModeBtn').classList.toggle('active', mode === 'minutes');
        
        // Update instructions
        const instructions = document.getElementById('modeInstructions');
        
        // Generate appropriate numbers
        this.generateClockNumbers(mode);
        
        if (mode === 'hours') {
            instructions.textContent = 'Inner circle: 13-24, Outer circle: 1-12';
        } else {
            instructions.textContent = 'Select minutes (5-minute intervals)';
        }
    }
    
    generateClockNumbers(mode) {
        const container = document.getElementById('clockNumbers');
        container.innerHTML = '';
        
        if (mode === 'hours') {
            // Generate inner circle (13-24) - closer to center
            for (let i = 13; i <= 24; i++) {
                const angle = (i - 13) * 30; // Start from 13 (like 1 o'clock position)
                const radius = 70; // Inner circle radius - more spaced from center
                
                const x = Math.sin(angle * Math.PI / 180) * radius;
                const y = -Math.cos(angle * Math.PI / 180) * radius;
                
                const number = document.createElement('div');
                number.className = 'clock-number inner-circle';
                number.textContent = i === 24 ? '00' : i;
                number.setAttribute('data-value', i === 24 ? 0 : i);
                number.style.left = `calc(50% + ${x}px - 18px)`;
                number.style.top = `calc(50% + ${y}px - 18px)`;
                
                // Highlight current selection
                const hourValue = i === 24 ? 0 : i;
                if (hourValue === this.currentTimePicker.hours) {
                    number.classList.add('selected');
                }
                
                container.appendChild(number);
            }
            
            // Generate outer circle (1-12) - on the edge
            for (let i = 1; i <= 12; i++) {
                const angle = (i - 1) * 30; // 360/12 = 30 degrees each
                const radius = 130; // Outer circle radius - further out
                
                const x = Math.sin(angle * Math.PI / 180) * radius;
                const y = -Math.cos(angle * Math.PI / 180) * radius;
                
                const number = document.createElement('div');
                number.className = 'clock-number outer-circle';
                number.textContent = i;
                number.setAttribute('data-value', i);
                number.style.left = `calc(50% + ${x}px - 18px)`;
                number.style.top = `calc(50% + ${y}px - 18px)`;
                
                // Highlight current selection
                if (i === this.currentTimePicker.hours) {
                    number.classList.add('selected');
                }
                
                container.appendChild(number);
            }
        } else {
            // Generate minutes (0, 5, 10, 15, ..., 55) in middle circle
            for (let i = 0; i < 12; i++) {
                const minute = i * 5;
                const angle = i * 30; // 360/12 = 30 degrees each
                const radius = 105; // Middle radius for minutes
                
                const x = Math.sin(angle * Math.PI / 180) * radius;
                const y = -Math.cos(angle * Math.PI / 180) * radius;
                
                const number = document.createElement('div');
                number.className = 'clock-number minute-circle';
                number.textContent = minute.toString().padStart(2, '0');
                number.setAttribute('data-value', minute);
                number.style.left = `calc(50% + ${x}px - 18px)`;
                number.style.top = `calc(50% + ${y}px - 18px)`;
                
                // Highlight current selection
                if (minute === this.currentTimePicker.minutes) {
                    number.classList.add('selected');
                }
                
                container.appendChild(number);
            }
        }
    }
    
    clearTime() {
        this.currentTimePicker.targetElement.value = '';
        this.currentTimePicker.displayElement.textContent = 'Select time...';
        this.closeTimePicker();
    }
    
    confirmTime() {
        const timeString = this.formatTime24(this.currentTimePicker.hours, this.currentTimePicker.minutes);
        const displayTimeString = this.formatTimeDisplay(this.currentTimePicker.hours, this.currentTimePicker.minutes);
        
        this.currentTimePicker.targetElement.value = timeString;
        this.currentTimePicker.displayElement.textContent = displayTimeString;
        
        // Trigger change event
        this.currentTimePicker.targetElement.dispatchEvent(new Event('change'));
        
        this.closeTimePicker();
    }
    
    updateTimeDisplay() {
        const displayTimeString = this.formatTimeDisplay(this.currentTimePicker.hours, this.currentTimePicker.minutes);
        document.getElementById('timeDisplay').textContent = displayTimeString;
    }
    
    formatTimeDisplay(hours, minutes) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    
    formatTime24(hours, minutes) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
}

// Initialize the time picker when the DOM is loaded
let timePickerInstance;

document.addEventListener('DOMContentLoaded', function() {
    timePickerInstance = new CircularTimePicker();
});

// Global functions for backward compatibility
function openTimePicker(targetId) {
    if (timePickerInstance) {
        timePickerInstance.openTimePicker(targetId);
    }
}

function closeTimePicker() {
    if (timePickerInstance) {
        timePickerInstance.closeTimePicker();
    }
}

function setTimeMode(mode) {
    if (timePickerInstance) {
        timePickerInstance.setTimeMode(mode);
    }
}

function clearTime() {
    if (timePickerInstance) {
        timePickerInstance.clearTime();
    }
}

function confirmTime() {
    if (timePickerInstance) {
        timePickerInstance.confirmTime();
    }
}
