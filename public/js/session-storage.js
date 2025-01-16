// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // The form and its fields
    const form = document.getElementById('internship-form');
    const fields = ['email', 'job-title', 'job-location', 'deadline', 'job-type', 'payment-type'];

    // Load saved values from session storage when the page loads
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            const savedValue = store.session.get(field);
            if (savedValue) {
                // Restore the value to the input/select field
                element.value = savedValue;

                // For select elements (e.g., dropdowns), handle selected options
                if (element.tagName === 'SELECT') {
                    Array.from(element.options).forEach(option => {
                        if (option.value === savedValue) {
                            option.selected = true;
                        }
                    });
                }
            }
        }
    });

    // Save field values to session storage on input or change events
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener('input', () => store.session.set(field, element.value));
            element.addEventListener('change', () => store.session.set(field, element.value));
        }
    });

    // Clear session storage when the form is submitted
    if (form) {
        form.addEventListener('submit', () => {
            store.session.clear();
        });
    }
});
