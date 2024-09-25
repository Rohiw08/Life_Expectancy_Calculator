from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd
import numpy as np
import json

app = Flask(__name__)
CORS(app)
df = pd.read_csv("./newdata.csv")

def convert_to_vector(input_dict):
    response_mapping = {
        "never": 0,
        "rarely": 0.2514,
        "slightly": 0.2514,
        "sometimes": 0.7486,
        "moderately": 0.7486,
        "frequently": 1,
        "regularly": 1,
        "yes": 1,
        "no": 0,
        "very": 1,
        "some": 0.7486,
        "often": 1,
        "moderate": 0.7486,
        "balanced": 0.7486,
        "happy": 1,
        "healthy": 1,
        "close": 1,
        "secure": 1,
        "urban": 1,
        "amount": 0.7486,
        "diagnosis": 0.7486
    }

    output_vector = []
    for value in input_dict.values():
        normalized_value = value.lower().split()[0]
        if normalized_value in response_mapping:
            output_vector.append(response_mapping[normalized_value])
        else:
            # Default to 0.5 if the response is not recognized
            output_vector.append(0.5)
    return output_vector

def calculate_lifespan_change(input_dict):
    input_vector = convert_to_vector(input_dict)
    gender = input_vector[-2]
    if len(input_vector) != len(df):
        raise ValueError(f"Input vector must have {len(df)} elements, one for each factor.")

    if gender not in [1, 0]:
        raise ValueError("Gender must be either 'male' or 'female'.")

    total_change = 0
    for i, (years, affected) in enumerate(zip(df['Years gained / lost'], df['Sexes affected'])):
        if (gender == 0 and affected.lower() != 'female') or \
                (gender == 1 and affected.lower() != 'male'):
            total_change += years * input_vector[i]

    return total_change / 6

def estimated_age(input_dict):
    average_age = 75
    change_in_age = calculate_lifespan_change(input_dict)
    return int(average_age + change_in_age), change_in_age

def report(input_dict):
    estimated_lifespan, change_in_age = estimated_age(input_dict)
    input_vector = convert_to_vector(input_dict)
    gender = input_vector[-2]
    gender_mask = ((gender == 0) & (df['Sexes affected'].str.lower() != 'female')) | \
                  ((gender == 1) & (df['Sexes affected'].str.lower() != 'male'))

    impact = df['Years gained / lost'] * np.array(convert_to_vector(input_dict)) * gender_mask

    factors = df[impact != 0].copy()
    factors['Adjusted Impact'] = impact[impact != 0]
    factors = factors.sort_values('Adjusted Impact', key=abs, ascending=False)

    factors_list = []
    for _, row in factors.iterrows():
        factor = row['Factor']
        full_impact = row['Years gained / lost']
        adjusted_impact = row['Adjusted Impact']
        percentage = (adjusted_impact / full_impact) * 100

        factors_list.append({
            "factor": factor,
            "impact": round(adjusted_impact, 2),
            "percentage_of_full_impact": round(percentage, 1)
        })

    output = {
        "gender": gender,
        "estimated_lifespan": estimated_lifespan,
        "change_in_age": round(change_in_age, 2),
        "factors": factors_list,
        "recommendation": "To improve your health further, we recommend fully adopting positive lifestyle habits and addressing the negative factors listed above."
    }

    return output

@app.route('/calculate', methods=['POST'])
def calculate():
    input_data = request.json
    output = report(input_data)
    return jsonify(output)

if __name__ == '__main__':
    app.run(debug=True)