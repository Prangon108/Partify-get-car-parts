document.addEventListener('DOMContentLoaded', function () {
    // Vehicle data based on the provided CSV
    const vehicleData = [
        { year: '2011', make: 'RAM', model: '1500', productType: 'Front Bumper' },
        { year: '2011', make: 'RAM', model: '1500', productType: 'Rear Bumper' },
        { year: '2012', make: 'RAM', model: '1500', productType: 'Front Bumper' },
        { year: '2012', make: 'RAM', model: '1500', productType: 'Rear Bumper' },
        { year: '2012', make: 'RAM', model: '2500', productType: 'Tailgate' },
        { year: '2013', make: 'RAM', model: '1500', productType: 'Front Bumper' },
        { year: '2013', make: 'RAM', model: '1500', productType: 'Rear Bumper' },
        { year: '2013', make: 'RAM', model: '2500', productType: 'Tailgate' },
        { year: '2013', make: 'Toyota', model: 'Camry', productType: 'Front Bumper' },
        { year: '2013', make: 'Toyota', model: 'Corolla', productType: 'Passenger Side Fender' },
        { year: '2014', make: 'RAM', model: '1500', productType: 'Front Bumper' },
        { year: '2014', make: 'RAM', model: '1500', productType: 'Rear Bumper' },
        { year: '2014', make: 'RAM', model: '2500', productType: 'Tailgate' },
        { year: '2014', make: 'Toyota', model: 'Camry', productType: 'Front Bumper' },
        { year: '2014', make: 'Toyota', model: 'Corolla', productType: 'Passenger Side Fender' },
        { year: '2015', make: 'RAM', model: '1500', productType: 'Front Bumper' },
        { year: '2015', make: 'RAM', model: '1500', productType: 'Rear Bumper' },
        { year: '2015', make: 'RAM', model: '2500', productType: 'Tailgate' },
        { year: '2015', make: 'Toyota', model: 'Camry', productType: 'Front Bumper' },
        { year: '2015', make: 'Toyota', model: 'Corolla', productType: 'Passenger Side Fender' },
        { year: '2016', make: 'RAM', model: '2500', productType: 'Tailgate' },
        { year: '2016', make: 'Toyota', model: 'Camry', productType: 'Front Bumper' },
        { year: '2016', make: 'Toyota', model: 'Corolla', productType: 'Passenger Side Fender' },
        { year: '2017', make: 'Toyota', model: 'Corolla', productType: 'Front Bumper' },
        { year: '2017', make: 'Toyota', model: 'Corolla', productType: 'Passenger Side Fender' }
    ];

    // Get DOM elements
    const yearSelect = document.getElementById('year');
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    const productTypeSelect = document.getElementById('productType');
    const form = document.getElementById('vehicleForm');

    // Enable Make dropdown when Year is selected
    yearSelect.addEventListener('change', function () {
        if (this.value) {
            makeSelect.disabled = false;
            populateMakes(this.value);
            // Reset dependent dropdowns
            modelSelect.disabled = true;
            modelSelect.innerHTML = '<option value="">Select Model</option>';
            productTypeSelect.disabled = true;
            productTypeSelect.innerHTML = '<option value="">Select Product Type</option>';
        } else {
            makeSelect.disabled = true;
            makeSelect.innerHTML = '<option value="">Select Make</option>';
        }
    });

    // Enable Model dropdown when Make is selected
    makeSelect.addEventListener('change', function () {
        if (this.value) {
            modelSelect.disabled = false;
            populateModels(yearSelect.value, this.value);
            // Reset dependent dropdown
            productTypeSelect.disabled = true;
            productTypeSelect.innerHTML = '<option value="">Select Product Type</option>';
        } else {
            modelSelect.disabled = true;
            modelSelect.innerHTML = '<option value="">Select Model</option>';
        }
    });

    // Enable Product Type dropdown when Model is selected
    modelSelect.addEventListener('change', function () {
        if (this.value) {
            productTypeSelect.disabled = false;
            populateProductTypes(yearSelect.value, makeSelect.value, this.value);
        } else {
            productTypeSelect.disabled = true;
            productTypeSelect.innerHTML = '<option value="">Select Product Type</option>';
        }
    });

    // Form submission handler - updated version
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling

        const year = yearSelect.value;
        const make = makeSelect.value;
        const model = modelSelect.value;
        const productType = productTypeSelect.value;

        if (!year || !make || !model || !productType) {
            alert('Please select all fields');
            return false;
        }

        // Format the URL as specified
        const baseUrl = `https://partifyusa.com/collections/${year}-${make.toLowerCase()}-${model.toLowerCase()}`;
        const filter = `filter.p.product_type=${productType.replace(/ /g, '+')}`;
        const fullUrl = `${baseUrl}?${filter}`;

        // Redirect to the product page
        window.location.href = fullUrl;
        return false;
    });

    // Populate Makes based on selected Year
    function populateMakes(selectedYear) {
        // Clear existing options
        makeSelect.innerHTML = '<option value="">Select Make</option>';

        // Get unique makes for the selected year
        const makes = [...new Set(
            vehicleData
                .filter(item => item.year === selectedYear)
                .map(item => item.make)
        )];

        // Add options to the dropdown
        makes.forEach(make => {
            const option = document.createElement('option');
            option.value = make;
            option.textContent = make;
            makeSelect.appendChild(option);
        });
    }

    // Populate Models based on selected Year and Make
    function populateModels(selectedYear, selectedMake) {
        // Clear existing options
        modelSelect.innerHTML = '<option value="">Select Model</option>';

        // Get unique models for the selected year and make
        const models = [...new Set(
            vehicleData
                .filter(item => item.year === selectedYear && item.make === selectedMake)
                .map(item => item.model)
        )];

        // Add options to the dropdown
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }

    // Populate Product Types based on selected Year, Make and Model
    function populateProductTypes(selectedYear, selectedMake, selectedModel) {
        // Clear existing options
        productTypeSelect.innerHTML = '<option value="">Select Product Type</option>';

        // Get unique product types for the selected vehicle
        const productTypes = [...new Set(
            vehicleData
                .filter(item =>
                    item.year === selectedYear &&
                    item.make === selectedMake &&
                    item.model === selectedModel)
                .map(item => item.productType)
        )];

        // Add options to the dropdown
        productTypes.forEach(productType => {
            const option = document.createElement('option');
            option.value = productType;
            option.textContent = productType;
            productTypeSelect.appendChild(option);
        });
    }
});