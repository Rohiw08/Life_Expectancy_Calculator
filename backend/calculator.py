import numpy as np
import pandas as pd

def calculate_lifespan_change(input_dict, gender):
    """
    Calculates the change in life expectancy based on the user's input.
    :param input_vector: List of binary responses (1 for 'yes', 0 for 'no') to lifestyle questions.
    :param gender: The gender of the user ('male' or 'female').
    :return: Total change in lifespan.
    """

    def convert_to_vector(input_dict):
        """
        Convert a dictionary of user responses to a vector of numeric values.
        :param input_dict: Dictionary with question index as key and response as value
        :return: A list of numeric values representing user responses
        """
        # Define the mapping from response strings to their respective numerical values
        response_mapping = {
            "never": 0,
            "rarely": 0.2514,
            "slightly": 0.2514,  # In some contexts, "Slightly" corresponds to 0.2514
            "sometimes": 0.7486,
            "moderately": 0.7486,  # In some contexts, "Moderately" corresponds to 0.7486
            "frequently": 1,
            "regularly": 1,
            "yes": 1,
            "no": 0
        }

        # Convert each value in the input_dict using the response_mapping
        output_vector = []
        for value in input_dict.values():
            # Normalize the response to lowercase and remove extra words
            normalized_value = value.lower().split()[
                0]  # Take the first word only (e.g., "slightly" from "slightly balanced")
            if normalized_value in response_mapping:
                output_vector.append(response_mapping[normalized_value])
            else:
                raise ValueError(f"Unrecognized response: {value}")

        return output_vector
    input_vector = convert_to_vector()
    import pandas as pd

    # Data dictionary
    data = {
        "Factor": [
            "Smoking", "Alcohol (heavy abuse)", "A little alcohol", "A little wine",
            "Healthy Eating", "Red Meat", "Less Food", "More Exercise", "A little exercise",
            "Too much sleeping", "more professional responsibility", "more professional responsibility",
            "More Health Checks #2", "Avoid heart disease", "Avoid Cancer", "Good genetics",
            "Mental Illness", "Obesity", "More Optimism", "More conscientious & stable",
            "More Pets", "Spending more time with women", "Good marriage", "More close Friends",
            "More Money", "More Meditation", "City living", "Country living", "Living at high altitude",
            "being a woman", "Polygamy"
        ],
        "Years gained / lost": [
            -10.00, -11.00, 2.00, 5.00,
            7.00, -1.00, 11.67, 2.00, 2.00,
            -1.50, 3.50, 3.50,
            0.14, 13.00, 15.00, 5.00,
            -25.00, -8.50, 2.00, 2.50,
            3.00, 15.00, 10.00, 5.30,
            7.50, 12.00, -2.50, 8.00, 2.00,
            5.10, 9.30
        ],
        "Strength of science as a number": [
            3, 2, 1, 1,
            3, 2, 1, 3, 3,
            1, 1, 1,
            2, 1, 1, 3,
            3, 3, 1, 1,
            2, 1, 2, 1,
            2, 1, 1, 1, 3,
            2, 1
        ],
        "Sexes affected": [
            "Both", "Both", "Male", "Male",
            "Both", "Both", "Both", "Both", "Both",
            "Both", "Male", "Male",
            "Both", "Both", "Both", "Both",
            "Both", "Both", "Female", "Both",
            "Both", "Male", "Both", "Both",
            "Both", "Both", "Both", "Both, but esp. for men",
            "Female", "Male"
        ]
    }

    # Convert the dictionary to a DataFrame
    df = pd.DataFrame(data)

    if len(input_vector) != len(df):
        raise ValueError(f"Input vector must have {len(df)} elements, one for each factor.")

    if gender.lower() not in ['male', 'female']:
        raise ValueError("Gender must be either 'male' or 'female'.")

    # Calculate the total lifespan change based on gender and factor impact
    total_change = 0
    for i, (years, affected) in enumerate(zip(df['Years gained / lost'], df['sexes affected'])):
        # Apply gender filter for affected categories
        if (gender == 'male' and affected.lower() != 'female') or \
                (gender == 'female' and affected.lower() != 'male'):
            total_change += years * input_vector[i]

    return total_change/6

def get_user_input():
    """
    Gathers user responses to lifestyle questions and asks for gender.
    :return: A tuple containing the input_vector (list of binary responses) and gender.
    """
    questions = [
        "How often do you smoke? (1: Never, 2: Rarely, 3: Sometimes, 4: Regularly)",
        "How often do you spend long periods of time sitting each day? (1: Never, 2: Occasionally, 3: Frequently, 4: Every day)",
        "How often do you sleep for more than 9 hours a night? (1: Never, 2: Occasionally, 3: Frequently, 4: Always)",
        "To what extent would you describe yourself as an optimistic person? (1: Not at all, 2: Slightly, 3: Moderately, 4: Very optimistic)",
        "How often do you spend time with pets or animals? (1: Never, 2: Rarely, 3: Sometimes, 4: Regularly)",
        "How much professional responsibility or stress do you experience at work? (1: None, 2: Low, 3: Moderate, 4: High)",
        "How balanced and healthy is your diet? (1: Not at all, 2: Slightly balanced, 3: Moderately balanced, 4: Very balanced and healthy)",
        "How often do you eat red meat? (1: Never, 2: Occasionally, 3: Frequently, 4: Regularly)",
        "How often do you consume alcohol in excessive amounts? (1: Never, 2: Rarely, 3: Sometimes, 4: Regularly)",
        "Do you live in a city or urban environment? (1: No, 2: Slightly urban, 3: Moderately urban, 4: Completely urban)",
        "Have you been diagnosed with a mental illness? (1: No, 2: Mild diagnosis, 3: Moderate diagnosis, 4: Severe diagnosis)",
        "To what extent do you consider yourself overweight or obese? (1: Not at all, 2: Slightly, 3: Moderately, 4: Extremely)",
        "How often do you get regular health check-ups or screenings? (1: Never, 2: Rarely, 3: Sometimes, 4: Regularly)",
        "How much time do you spend at high altitudes? (1: None, 2: A little, 3: Moderate amount, 4: A lot)",
        "How happy or healthy would you describe your marriage? (1: Not happy/healthy, 2: Slightly happy/healthy, 3: Moderately happy/healthy, 4: Very happy/healthy)",
        "How often do you intentionally eat smaller portions of food to maintain or reduce weight? (1: Never, 2: Occasionally, 3: Frequently, 4: Always)",
        "How often do you meditate? (1: Never, 2: Occasionally, 3: Frequently, 4: Regularly)",
        "How actively do you take steps to prevent heart disease? (1: Not at all, 2: Slightly, 3: Moderately, 4: Very actively)",
        "To what extent do you maintain a lifestyle that includes non-smoking, regular exercise, and healthy eating? (1: Not at all, 2: Slightly, 3: Moderately, 4: Very much so)",
        "How often do you spend significant time in the company of women? (1: Never, 2: Occasionally, 3: Frequently, 4: Regularly)",
        "How much effort do you put into reducing your risk of cancer? (1: None, 2: A little, 3: Some, 4: A lot)",
        "How often do you exercise? (1: Never, 2: Occasionally, 3: Frequently, 4: Regularly)",
        "How often do you drink alcohol in moderation? (1: Never, 2: Rarely, 3: Sometimes, 4: Frequently)",
        "How conscientious and emotionally stable would you describe yourself? (1: Not at all, 2: Slightly, 3: Moderately, 4: Very much so)",
        "How often do you experience sexual activity or orgasms? (1: Never, 2: Rarely, 3: Sometimes, 4: Regularly)",
        "How often do you drink a small amount of wine? (1: Never, 2: Rarely, 3: Sometimes, 4: Regularly)",
        "How financially secure do you feel? (1: Not at all, 2: Slightly secure, 3: Moderately secure, 4: Very secure)",
        "Are you a woman? (1: No, 4: Yes)",
        "How close is your group of friends, and how often do you spend time with them? (1: Not close/never, 2: Slightly close/rarely, 3: Moderately close/sometimes, 4: Very close/regularly)",
        "How often do you attend religious services or practice a strong faith? (1: Never, 2: Rarely, 3: Sometimes, 4: Regularly)",
        "Do you live in a rural or country environment? (1: No, 4: Yes)",
        "Do you practice or believe in polygamy? (1: No, 4: Yes)",
        "How strong is your family history of good health or longevity? (1: Not at all, 2: Slightly, 3: Moderately, 4: Very strong)",
        "How often do you engage in light physical activity? (1: Never, 2: Occasionally, 3: Frequently, 4: Regularly)",
        "How often do you interact with dogs? (1: Never, 2: Rarely, 3: Sometimes, 4: Regularly)"
    ]

    print("Please answer the following questions about your lifestyle:")
    input_vector = []

    # Ask each question and collect the response
    for question in questions:
        while True:
            response = input(f"{question} (option no 1/2/3/4): ").lower()
            if response in ['1', '2', '3', '4']:
                if response == '1':
                    input_vector.append(0) # P( Z < - INF SIGMA) = 0
                elif response == '2':
                    input_vector.append(0.2514) # P( Z < -0.67 SIGMA) = 0.2514
                elif response == '3':
                    input_vector.append(0.7486) # P( Z < 0.67 SIGMA) = 0.7486
                else:  # response == '4'
                    input_vector.append(1)  # P( Z < INF SIGMA) = 1
                break
            else:
                print("Please answer with 1/2/3/4.")

    # Ask for gender
    while True:
        gender = input("What is your gender? (male/female): ").lower()
        if gender in ['male', 'female']:
            break
        else:
            print("Please enter either 'male' or 'female'.")

    return input_vector, gender


def estimated_age(input_vector, gender):
    """
    Estimates the user's life expectancy based on their lifestyle choices and gender.
    :param input_vector: List of binary responses to the lifestyle questions.
    :param gender: The gender of the user.
    :return: Estimated age (life expectancy).
    """
    average_age = 75  # Assuming a baseline average life expectancy of 75 years
    change_in_age = calculate_lifespan_change(input_vector, gender)
    return int(average_age + change_in_age), change_in_age


import json
import numpy as np


def report(input_vector, gender):
    estimated_lifespan, change_in_age = estimated_age(input_vector, gender)

    # Use vectorized operations for faster calculation
    gender_mask = (gender == 'male') & (df['sexes affected'].str.lower() != 'female') | \
                  (gender == 'female') & (df['sexes affected'].str.lower() != 'male')

    # Calculate the impact of each factor, considering partial impacts
    impact = df['Years gained / lost'] * np.array(input_vector) * gender_mask

    # Filter and sort factors by absolute impact
    factors = df[impact != 0].copy()
    factors['Adjusted Impact'] = impact[impact != 0]
    factors = factors.sort_values('Adjusted Impact', key=abs, ascending=False)

    # Prepare the factors list for JSON output
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

    # Prepare the JSON output
    output = {
        "gender": gender,
        "estimated_lifespan": estimated_lifespan,
        "change_in_age": round(change_in_age, 2),
        "factors": factors_list,
        "recommendation": "To improve your health further, we recommend fully adopting positive lifestyle habits and addressing the negative factors listed above."
    }

    # Return the JSON string
    return json.dumps(output, indent=2)

"""if __name__ == "__main__":
    input_vector, gender = get_user_input()
    report(input_vector, gender)
"""
# Example usage:
"""input_vector, gender = get_user_input()  # Gather user input
report(input_vector, gender)  # Generate the report based on input
"""
