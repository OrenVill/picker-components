/**
 * SimpleDatePicker - A clean, compact date picker with range selection
 * 
 * Features:
 * - Compact calendar grid (reduced height)
 * - Month navigation
 * - Date range selection support
 * - Today highlighting
 * - Theme-aware styling
 * - Keyboard navigation support
 * 
 * Usage:
 * 1. Include the CSS and JS files
 * 2. Add the HTML structure to your page
 * 3. Add the class 'simple-datepicker' to input elements
 * 4. The picker will automatically initialize on DOMContentLoaded
 */

class SimpleDatePicker {
    constructor() {
        this.currentTarget = null;
        this.pickerDate = new Date();
        this.startDate = null;
        this.endDate = null;
        this.selectingStart = true;
        this.modal = null;
        
        this.init();
    }
    
    init() {
        // Wait for Bootstrap to be available
        if (typeof bootstrap !== 'undefined') {
            this.initializePickers();
        } else {
            // Retry after a short delay if Bootstrap isn't ready
            setTimeout(() => this.init(), 100);
        }
    }
    
    initializePickers() {
        // Handle date input clicks
        document.querySelectorAll('.simple-datepicker').forEach(input => {
            input.addEventListener('click', (e) => this.handleInputClick(e));
        });
        
        // Navigation buttons
        document.getElementById('simplePrevMonth')?.addEventListener('click', () => {
            this.pickerDate.setMonth(this.pickerDate.getMonth() - 1);
            this.updateCalendar();
        });
        
        document.getElementById('simpleNextMonth')?.addEventListener('click', () => {
            this.pickerDate.setMonth(this.pickerDate.getMonth() + 1);
            this.updateCalendar();
        });
        
        // Confirm date selection
        document.getElementById('confirmDateBtn')?.addEventListener('click', () => {
            this.confirmDateSelection();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal && this.modal._isShown) {
                this.handleKeyboardNavigation(e);
            }
        });
    }
    
    handleInputClick(e) {
        this.currentTarget = e.target;
        this.startDate = null;
        this.endDate = null;
        this.selectingStart = true;
        
        // Clear any existing selection
        this.clearSelection();
        
        this.pickerDate = new Date();
        this.updateCalendar();
        
        // Show modal
        const modalElement = document.getElementById('simpleDatePickerModal');
        if (modalElement) {
            this.modal = new bootstrap.Modal(modalElement);
            this.modal.show();
        }
    }
    
    clearSelection() {
        document.querySelectorAll('.calendar-day.selected').forEach(cell => {
            cell.classList.remove('selected');
        });
        document.querySelectorAll('.calendar-day.range-start').forEach(cell => {
            cell.classList.remove('range-start');
        });
        document.querySelectorAll('.calendar-day.range-end').forEach(cell => {
            cell.classList.remove('range-end');
        });
        document.querySelectorAll('.calendar-day.in-range').forEach(cell => {
            cell.classList.remove('in-range');
        });
    }
    
    updateCalendar() {
        // Update month/year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        const monthYearElement = document.getElementById('simpleMonthYear');
        if (monthYearElement) {
            monthYearElement.textContent = 
                `${monthNames[this.pickerDate.getMonth()]} ${this.pickerDate.getFullYear()}`;
        }
        
        // Generate calendar days
        const daysContainer = document.getElementById('simpleDays');
        if (!daysContainer) return;
        
        daysContainer.innerHTML = '';
        
        const firstDay = new Date(this.pickerDate.getFullYear(), this.pickerDate.getMonth(), 1);
        const lastDay = new Date(this.pickerDate.getFullYear(), this.pickerDate.getMonth() + 1, 0);
        const startOfCalendar = new Date(firstDay);
        startOfCalendar.setDate(startOfCalendar.getDate() - firstDay.getDay());
        
        const today = new Date();
        
        for (let week = 0; week < 6; week++) {
            const weekRow = document.createElement('div');
            weekRow.className = 'calendar-week';
            
            for (let day = 0; day < 7; day++) {
                const currentDate = new Date(startOfCalendar);
                currentDate.setDate(startOfCalendar.getDate() + (week * 7) + day);
                
                const dayCell = document.createElement('div');
                dayCell.className = 'calendar-day';
                dayCell.textContent = currentDate.getDate();
                dayCell.tabIndex = 0; // Make focusable for keyboard navigation
                
                // Add classes for styling
                if (currentDate.getMonth() !== this.pickerDate.getMonth()) {
                    dayCell.classList.add('other-month');
                }
                if (currentDate.toDateString() === today.toDateString()) {
                    dayCell.classList.add('today');
                }
                
                // Handle date range selection
                if (this.startDate && this.endDate) {
                    if (currentDate.toDateString() === this.startDate.toDateString()) {
                        dayCell.classList.add('range-start');
                    }
                    if (currentDate.toDateString() === this.endDate.toDateString()) {
                        dayCell.classList.add('range-end');
                    }
                    if (currentDate > this.startDate && currentDate < this.endDate) {
                        dayCell.classList.add('in-range');
                    }
                } else if (this.startDate && currentDate.toDateString() === this.startDate.toDateString()) {
                    dayCell.classList.add('selected');
                }
                
                // Click handler for range selection
                dayCell.addEventListener('click', () => this.handleDateClick(currentDate));
                
                // Keyboard handler
                dayCell.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.handleDateClick(currentDate);
                    }
                });
                
                weekRow.appendChild(dayCell);
            }
            
            daysContainer.appendChild(weekRow);
        }
    }
    
    handleDateClick(clickedDate) {
        if (this.selectingStart) {
            this.startDate = new Date(clickedDate);
            this.endDate = null;
            this.selectingStart = false;
        } else {
            if (clickedDate < this.startDate) {
                this.endDate = new Date(this.startDate);
                this.startDate = new Date(clickedDate);
            } else {
                this.endDate = new Date(clickedDate);
            }
            this.selectingStart = true;
        }
        
        this.updateCalendar(); // Refresh the calendar display
    }
    
    confirmDateSelection() {
        if (this.currentTarget && this.startDate && this.endDate) {
            // Update the visible input
            const startStr = this.formatDateForInput(this.startDate);
            const endStr = this.formatDateForInput(this.endDate);
            
            if (this.startDate.toDateString() === this.endDate.toDateString()) {
                this.currentTarget.value = startStr;
            } else {
                this.currentTarget.value = `${startStr} → ${endStr}`;
            }
            
            // Trigger change event
            this.currentTarget.dispatchEvent(new Event('change'));
            
            // Update hidden inputs if they exist (for compatibility)
            const targetId = this.currentTarget.id;
            if (targetId === 'dateRange') {
                const startInput = document.getElementById('startDate');
                const endInput = document.getElementById('endDate');
                if (startInput) startInput.value = this.formatDateForInput(this.startDate);
                if (endInput) endInput.value = this.formatDateForInput(this.endDate);
            }
        }
    }
    
    handleKeyboardNavigation(e) {
        const focusedDay = document.querySelector('.calendar-day:focus');
        if (!focusedDay) return;
        
        let targetDay = null;
        const allDays = Array.from(document.querySelectorAll('.calendar-day'));
        const currentIndex = allDays.indexOf(focusedDay);
        
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                targetDay = allDays[currentIndex - 1];
                break;
            case 'ArrowRight':
                e.preventDefault();
                targetDay = allDays[currentIndex + 1];
                break;
            case 'ArrowUp':
                e.preventDefault();
                targetDay = allDays[currentIndex - 7];
                break;
            case 'ArrowDown':
                e.preventDefault();
                targetDay = allDays[currentIndex + 7];
                break;
            case 'Home':
                e.preventDefault();
                targetDay = allDays[0];
                break;
            case 'End':
                e.preventDefault();
                targetDay = allDays[allDays.length - 1];
                break;
        }
        
        if (targetDay) {
            targetDay.focus();
        }
    }
    
    formatDateForInput(date) {
        const options = { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }
}

// Initialize the date picker when the DOM is loaded
let datePickerInstance;

document.addEventListener('DOMContentLoaded', function() {
    datePickerInstance = new SimpleDatePicker();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleDatePicker;
}
