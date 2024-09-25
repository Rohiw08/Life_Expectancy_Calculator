
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('lifespanForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const inputVector = new Array(form.querySelectorAll('input[name="factor"]').length).fill(0);
        const gender = formData.get('gender');

        formData.getAll('factor').forEach(index => {
            inputVector[parseInt(index)] = 1;
        });

        try {
            const response = await fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input_vector: inputVector, gender: gender }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            document.getElementById('estimatedLifespan').textContent = `Your estimated lifespan is ${data.estimated_lifespan} years.`;
            document.getElementById('extraYears').textContent = data.extra_years;

            const negativeFactors = document.getElementById('negativeFactors');
            const positiveFactors = document.getElementById('positiveFactors');

            negativeFactors.innerHTML = '<h4>Negative Factors:</h4>' +
                (data.negative_factors.length ? data.negative_factors.map(f => `<p>${f}</p>`).join('') : '<p>None</p>');
            positiveFactors.innerHTML = '<h4>Positive Factors:</h4>' +
                (data.positive_factors.length ? data.positive_factors.map(f => `<p>${f}</p>`).join('') : '<p>None</p>');

            resultDiv.classList.remove('hidden');
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while calculating your lifespan. Please try again.');
        }
    });
});