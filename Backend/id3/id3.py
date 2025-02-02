import pandas as pd

def convert_height(height):
    """Converts height from cm or feet to cm."""
    if isinstance(height, int) or isinstance(height, float):
        if height < 100:
            return height * 30.48 # Convert feet to cm
        else:
            return height
    elif pd.isna(height): #check if value null
      return pd.NA
    else:
      try:
        return float(height)
      except ValueError:
        return pd.NaT #check if value is not a number

def bmi_category(bmi): #acc to WHO 
    if bmi < 18.5:
        return ('Underweight', 0)
    elif 18.5 <= bmi < 24.9:
        return ('Normal weight', 1)
    elif 25 <= bmi < 29.9:
        return ('Overweight', 2)
    else:
        return ('Obese', 3)

def age_group(age):
    if age <= 18:
        return ('Adolescents', 0)
    elif age <= 25:
        return ('Young Adults', 1)
    elif age <= 35:
        return ('Adults', 2)
    elif age <= 45:
        return ('Middle-aged', 3)
    else:
        return ('Older Adults', 4)

def period_frequency(months):
    if months == 1:
        return ('Regular', 0)
    elif months <= 3:
        return ('Semi-Regular', 1)
    else:
        return ('Irregular', 2)

def period_duration_group(days):
    if days <= 2:
        return ('Short', 0)
    elif days <= 7:
        return ('Normal', 1)
    else:
        return ('Long', 2)
    
blood_group_mapping = {
    11:'A+',
    12: 'A-',
    13: 'B+',
    14: 'B-',
    15: 'O+',
    16: 'O-',
    17: 'AB+',
    18: 'AB-'
}

def preprocessor(df):
  processed_df = df.copy()
  processed_df['height'] = processed_df['height'].apply(convert_height)
  processed_df['height_m'] = processed_df['height'] / 100  # Convert height to meters
  processed_df['bmi'] = processed_df['weight'] / (processed_df['height_m'] ** 2)

  # encoded from dataset 
  result = processed_df['bmi'].apply(bmi_category)
  processed_df[['bmi_category', 'bmi_category_encoded']] = pd.DataFrame(result.tolist(), index=result.index)

  result = processed_df['age'].apply(age_group)
  processed_df[['age_group', 'age_group_encoded']] = pd.DataFrame(result.tolist(), index=result.index)

  result = processed_df['period_months'].apply(period_frequency)
  processed_df[['period_frequency', 'period_frequency_encoded']] = pd.DataFrame(result.tolist(), index=result.index)

  result = processed_df['period_days'].apply(period_duration_group)
  processed_df[['period_duration_group', 'period_duration_group_encoded']] = pd.DataFrame(result.tolist(), index=result.index)

  processed_df['blood_group_encoded'] = processed_df['blood_group']
  processed_df['blood_group'] = processed_df['blood_group'].map(blood_group_mapping)

  processed_df.drop(columns=['height_m'], inplace=True)

  # return two df, one informational, another calculatable
  informational_df = processed_df
  calculatable_df = pcos_dataset_df = processed_df[['age_group_encoded', 'bmi_category_encoded', 'period_frequency_encoded', 'period_duration_group_encoded', 'blood_group_encoded', 'gained_weight', 'excessive_hair_growth', 'skin_darkening', 'hair_loss', 'pimples', 'eat_fast_food', 'reg_exercise', 'mood_swings', 'reg_periods', 'PCOS']]

  return informational_df, calculatable_df

positive_test = {
    "age": 28,
    "weight": 85,
    "height": 165,
    "blood_group": 13,  # B+
    "period_months": 3,
    "gained_weight": 1,  # Yes
    "excessive_hair_growth": 1,  # Yes
    "skin_darkening": 1,  # Yes
    "hair_loss": 1,  # Yes
    "pimples": 1,  # Yes
    "eat_fast_food": 1,  # Yes
    "reg_exercise": 0,  # No
    "mood_swings": 1,  # Yes
    "reg_periods": 0,  # No
    "period_days": 7,
    "PCOS": 'null'
}

from joblib import dump, load

# Save the trained model
model_filename = "/Users/aditikasingh/Codes/Final Year Project/Arogya/pcos/id3/optimized_decision_tree_model.joblib"

loaded_model = load(model_filename)
print("Model loaded successfully.")

# Function to predict PCOS for new user input
def predict_for_new_user(user_input):
    # Preprocess the user input
    _, preprocessed_input = preprocessor(pd.DataFrame([user_input]))
    preprocessed_input = preprocessed_input.drop('PCOS', axis=1)

    # Predict using the loaded model
    prediction = loaded_model.predict(preprocessed_input)
    return prediction


# For Positive
# prediction = predict_for_new_user(positive_test)
# print(f"Predicted PCOS Diagnosis: {'Yes' if prediction == 1 else 'No'}")

