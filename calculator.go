package main

import (
	"encoding/json"
	"fmt"
	"math"
	"net/http"
	"strconv"
)

type ConversionRequest struct {
	Value     float64 `json:"value"`
	FromScale string  `json:"fromScale"`
	ToScale   string  `json:"toScale"`
}

type ConversionResult struct {
	OriginalValue    float64            `json:"originalValue"`
	OriginalScale    string             `json:"originalScale"`
	ConvertedValue   float64            `json:"convertedValue"`
	ConvertedScale   string             `json:"convertedScale"`
	AllValues        map[string]float64 `json:"allValues"`
	FreezingPoints   map[string]float64 `json:"freezingPoints"`
	BoilingPoints    map[string]float64 `json:"boilingPoints"`
	CalculationSteps []string           `json:"calculationSteps"`
}

func round(num float64) float64 {
	return math.Round(num*100) / 100
}

func celsiusToFahrenheit(c float64) float64 {
	return round(c*9/5 + 32)
}

func celsiusToKelvin(c float64) float64 {
	return round(c + 273.15)
}

func fahrenheitToCelsius(f float64) float64 {
	return round((f - 32) * 5 / 9)
}

func fahrenheitToKelvin(f float64) float64 {
	return round((f-32)*5/9 + 273.15)
}

func kelvinToCelsius(k float64) float64 {
	return round(k - 273.15)
}

func kelvinToFahrenheit(k float64) float64 {
	return round((k-273.15)*9/5 + 32)
}

func convertTemperature(value float64, fromScale, toScale string) ConversionResult {
	result := ConversionResult{
		OriginalValue:  value,
		OriginalScale:  fromScale,
		ConvertedScale: toScale,
		AllValues:      make(map[string]float64),
		FreezingPoints: map[string]float64{
			"celsius":    0.0,
			"fahrenheit": 32.0,
			"kelvin":     273.15,
		},
		BoilingPoints: map[string]float64{
			"celsius":    100.0,
			"fahrenheit": 212.0,
			"kelvin":     373.15,
		},
		CalculationSteps: []string{},
	}

	var celsius, fahrenheit, kelvin float64

	switch fromScale {
	case "celsius":
		celsius = value
		fahrenheit = celsiusToFahrenheit(celsius)
		kelvin = celsiusToKelvin(celsius)
		result.CalculationSteps = append(result.CalculationSteps,
			fmt.Sprintf("Valor original: %.2f°C", value))
		result.CalculationSteps = append(result.CalculationSteps,
			fmt.Sprintf("Para Fahrenheit: F = C × 9/5 + 32 = %.2f × 9/5 + 32 = %.2f°F", value, fahrenheit))
		result.CalculationSteps = append(result.CalculationSteps,
			fmt.Sprintf("Para Kelvin: K = C + 273.15 = %.2f + 273.15 = %.2fK", value, kelvin))

	case "fahrenheit":
		fahrenheit = value
		celsius = fahrenheitToCelsius(fahrenheit)
		kelvin = fahrenheitToKelvin(fahrenheit)
		result.CalculationSteps = append(result.CalculationSteps,
			fmt.Sprintf("Valor original: %.2f°F", value))
		result.CalculationSteps = append(result.CalculationSteps,
			fmt.Sprintf("Para Celsius: C = (F − 32) × 5/9 = (%.2f − 32) × 5/9 = %.2f°C", value, celsius))
		result.CalculationSteps = append(result.CalculationSteps,
			fmt.Sprintf("Para Kelvin: K = (F − 32) × 5/9 + 273.15 = %.2fK", kelvin))

	case "kelvin":
		kelvin = value
		celsius = kelvinToCelsius(kelvin)
		fahrenheit = kelvinToFahrenheit(kelvin)
		result.CalculationSteps = append(result.CalculationSteps,
			fmt.Sprintf("Valor original: %.2fK", value))
		result.CalculationSteps = append(result.CalculationSteps,
			fmt.Sprintf("Para Celsius: C = K − 273.15 = %.2f − 273.15 = %.2f°C", value, celsius))
		result.CalculationSteps = append(result.CalculationSteps,
			fmt.Sprintf("Para Fahrenheit: F = (K − 273.15) × 9/5 + 32 = %.2f°F", fahrenheit))
	}

	result.AllValues["celsius"] = celsius
	result.AllValues["fahrenheit"] = fahrenheit
	result.AllValues["kelvin"] = kelvin
	result.ConvertedValue = result.AllValues[toScale]

	return result
}

func enableCORS(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func convertHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(&w)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var req ConversionRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Erro ao processar requisição", http.StatusBadRequest)
		return
	}

	result := convertTemperature(req.Value, req.FromScale, req.ToScale)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func main() {
	http.HandleFunc("/convert", convertHandler)

	fmt.Println("Servidor rodando na porta 8080...")
	http.ListenAndServe(":8080", nil)
}