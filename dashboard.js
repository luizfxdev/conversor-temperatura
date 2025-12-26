const audioElement = document.getElementById('theme-audio');
const playBtn = document.getElementById('play-audio');
const pauseBtn = document.getElementById('pause-audio');
const calculateBtn = document.getElementById('calculate-btn');
const returnBtn = document.getElementById('return-btn');
const resultSection = document.getElementById('result-section');

let comparisonChart = null;
let gaugeChart = null;
let boilingChart = null;

playBtn.addEventListener('click', () => {
    audioElement.play();
});

pauseBtn.addEventListener('click', () => {
    audioElement.pause();
});

function round(num) {
    return Math.round(num * 100) / 100;
}

function celsiusToFahrenheit(c) {
    return round(c * 9/5 + 32);
}

function celsiusToKelvin(c) {
    return round(c + 273.15);
}

function fahrenheitToCelsius(f) {
    return round((f - 32) * 5/9);
}

function fahrenheitToKelvin(f) {
    return round((f - 32) * 5/9 + 273.15);
}

function kelvinToCelsius(k) {
    return round(k - 273.15);
}

function kelvinToFahrenheit(k) {
    return round((k - 273.15) * 9/5 + 32);
}

function convertTemperature(value, fromScale, toScale) {
    const result = {
        originalValue: value,
        originalScale: fromScale,
        convertedScale: toScale,
        allValues: {},
        freezingPoints: {
            celsius: 0.0,
            fahrenheit: 32.0,
            kelvin: 273.15
        },
        boilingPoints: {
            celsius: 100.0,
            fahrenheit: 212.0,
            kelvin: 373.15
        },
        calculationSteps: []
    };

    let celsius, fahrenheit, kelvin;

    switch(fromScale) {
        case 'celsius':
            celsius = value;
            fahrenheit = celsiusToFahrenheit(celsius);
            kelvin = celsiusToKelvin(celsius);
            result.calculationSteps.push(`Valor original: ${value.toFixed(2)}°C`);
            result.calculationSteps.push(`Para Fahrenheit: F = C × 9/5 + 32 = ${value.toFixed(2)} × 9/5 + 32 = ${fahrenheit.toFixed(2)}°F`);
            result.calculationSteps.push(`Para Kelvin: K = C + 273.15 = ${value.toFixed(2)} + 273.15 = ${kelvin.toFixed(2)}K`);
            break;

        case 'fahrenheit':
            fahrenheit = value;
            celsius = fahrenheitToCelsius(fahrenheit);
            kelvin = fahrenheitToKelvin(fahrenheit);
            result.calculationSteps.push(`Valor original: ${value.toFixed(2)}°F`);
            result.calculationSteps.push(`Para Celsius: C = (F − 32) × 5/9 = (${value.toFixed(2)} − 32) × 5/9 = ${celsius.toFixed(2)}°C`);
            result.calculationSteps.push(`Para Kelvin: K = (F − 32) × 5/9 + 273.15 = ${kelvin.toFixed(2)}K`);
            break;

        case 'kelvin':
            kelvin = value;
            celsius = kelvinToCelsius(kelvin);
            fahrenheit = kelvinToFahrenheit(kelvin);
            result.calculationSteps.push(`Valor original: ${value.toFixed(2)}K`);
            result.calculationSteps.push(`Para Celsius: C = K − 273.15 = ${value.toFixed(2)} − 273.15 = ${celsius.toFixed(2)}°C`);
            result.calculationSteps.push(`Para Fahrenheit: F = (K − 273.15) × 9/5 + 32 = ${fahrenheit.toFixed(2)}°F`);
            break;
    }

    result.allValues.celsius = celsius;
    result.allValues.fahrenheit = fahrenheit;
    result.allValues.kelvin = kelvin;
    result.convertedValue = result.allValues[toScale];

    return result;
}

function getScaleSymbol(scale) {
    const symbols = {
        'celsius': '°C',
        'fahrenheit': '°F',
        'kelvin': 'K'
    };
    return symbols[scale] || '';
}

function displayResult(result) {
    const conversionResult = document.getElementById('conversion-result');
    const calculationSteps = document.getElementById('calculation-steps');

    const fromSymbol = getScaleSymbol(result.originalScale);
    const toSymbol = getScaleSymbol(result.convertedScale);

    conversionResult.innerHTML = `
        <strong>${result.originalValue.toFixed(2)}${fromSymbol}</strong> = 
        <strong style="color: #03e9f4; font-size: 1.4em;">${result.convertedValue.toFixed(2)}${toSymbol}</strong>
    `;

    let stepsHTML = '<h3>📊 Cálculo Detalhado</h3>';
    result.calculationSteps.forEach(step => {
        stepsHTML += `<p>▸ ${step}</p>`;
    });

    stepsHTML += '<h3 style="margin-top: 20px;">❄️ Pontos de Congelamento</h3>';
    stepsHTML += `<p>▸ Celsius: ${result.freezingPoints.celsius}°C</p>`;
    stepsHTML += `<p>▸ Fahrenheit: ${result.freezingPoints.fahrenheit}°F</p>`;
    stepsHTML += `<p>▸ Kelvin: ${result.freezingPoints.kelvin}K</p>`;

    stepsHTML += '<h3 style="margin-top: 20px;">🔥 Pontos de Ebulição</h3>';
    stepsHTML += `<p>▸ Celsius: ${result.boilingPoints.celsius}°C</p>`;
    stepsHTML += `<p>▸ Fahrenheit: ${result.boilingPoints.fahrenheit}°F</p>`;
    stepsHTML += `<p>▸ Kelvin: ${result.boilingPoints.kelvin}K</p>`;

    calculationSteps.innerHTML = stepsHTML;

    resultSection.classList.add('active');
    
    updateCharts(result);
}

function updateCharts(result) {
    updateComparisonChart(result);
    updateGaugeChart(result);
    updateBoilingChart(result);
}

function updateComparisonChart(result) {
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    
    if (comparisonChart) {
        comparisonChart.destroy();
    }

    comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Celsius', 'Fahrenheit', 'Kelvin'],
            datasets: [{
                label: 'Temperatura Convertida',
                data: [
                    result.allValues.celsius,
                    result.allValues.fahrenheit,
                    result.allValues.kelvin
                ],
                backgroundColor: [
                    'rgba(3, 233, 244, 0.6)',
                    'rgba(255, 165, 0, 0.6)',
                    'rgba(0, 255, 85, 0.6)'
                ],
                borderColor: [
                    'rgba(3, 233, 244, 1)',
                    'rgba(255, 165, 0, 1)',
                    'rgba(0, 255, 85, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#03e9f4',
                        font: {
                            family: 'Orbitron',
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Comparação entre Escalas',
                    color: '#03e9f4',
                    font: {
                        family: 'Orbitron',
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(3, 233, 244, 0.2)'
                    }
                },
                x: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(3, 233, 244, 0.2)'
                    }
                }
            }
        }
    });
}

function updateGaugeChart(result) {
    const ctx = document.getElementById('gaugeChart').getContext('2d');
    
    if (gaugeChart) {
        gaugeChart.destroy();
    }

    gaugeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Celsius', 'Fahrenheit', 'Kelvin'],
            datasets: [{
                label: 'Valores nas Escalas',
                data: [
                    result.allValues.celsius,
                    result.allValues.fahrenheit,
                    result.allValues.kelvin
                ],
                borderColor: 'rgba(3, 233, 244, 1)',
                backgroundColor: 'rgba(3, 233, 244, 0.2)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointBackgroundColor: 'rgba(3, 233, 244, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#03e9f4',
                        font: {
                            family: 'Orbitron',
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Distribuição de Temperatura',
                    color: '#03e9f4',
                    font: {
                        family: 'Orbitron',
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(3, 233, 244, 0.2)'
                    }
                },
                x: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(3, 233, 244, 0.2)'
                    }
                }
            }
        }
    });
}

function updateBoilingChart(result) {
    const ctx = document.getElementById('boilingChart').getContext('2d');
    
    if (boilingChart) {
        boilingChart.destroy();
    }

    const scale = result.convertedScale;
    const boilingPoint = result.boilingPoints[scale];
    const currentValue = result.convertedValue;
    const freezingPoint = result.freezingPoints[scale];

    boilingChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Congelamento', 'Valor Atual', 'Ebulição'],
            datasets: [{
                label: `Escala ${scale.charAt(0).toUpperCase() + scale.slice(1)}`,
                data: [freezingPoint, currentValue, boilingPoint],
                backgroundColor: [
                    'rgba(0, 150, 255, 0.6)',
                    'rgba(255, 165, 0, 0.6)',
                    'rgba(255, 0, 0, 0.6)'
                ],
                borderColor: [
                    'rgba(0, 150, 255, 1)',
                    'rgba(255, 165, 0, 1)',
                    'rgba(255, 0, 0, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#03e9f4',
                        font: {
                            family: 'Orbitron',
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Pontos de Referência',
                    color: '#03e9f4',
                    font: {
                        family: 'Orbitron',
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(3, 233, 244, 0.2)'
                    }
                },
                x: {
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(3, 233, 244, 0.2)'
                    }
                }
            }
        }
    });
}

calculateBtn.addEventListener('click', () => {
    const tempValue = parseFloat(document.getElementById('temp-value').value);
    const fromScale = document.getElementById('from-scale').value;
    const toScale = document.getElementById('to-scale').value;

    if (isNaN(tempValue)) {
        alert('Por favor, insira um valor numérico válido.');
        return;
    }

    if (fromScale === toScale) {
        alert('Por favor, selecione escalas diferentes para conversão.');
        return;
    }

    const result = convertTemperature(tempValue, fromScale, toScale);
    displayResult(result);
});

returnBtn.addEventListener('click', () => {
    resultSection.classList.remove('active');
    document.getElementById('temp-value').value = '';
    document.getElementById('from-scale').selectedIndex = 0;
    document.getElementById('to-scale').selectedIndex = 0;
});