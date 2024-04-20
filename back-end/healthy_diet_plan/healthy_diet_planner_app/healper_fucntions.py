def calculate_nutritional_needs(user_data):
    try:
        weight = float(user_data['weight'])
        height = float(user_data['height'])
        age = int(user_data['age'])
        gender = user_data['gender']
        activity_level = user_data['activity_level']

        # gender and activity level input
        if gender not in ['M', 'F'] or activity_level not in ['S', 'LA', 'A', 'VA']:
            raise ValueError("Invalid gender or activity level.")

        # Basic Metabolic Rate (BMR) calculation
        bmr = 10 * weight + 6.25 * height - 5 * age + (5 if gender == 'M' else -161)

        # Activity factors for different levels
        activity_factors = {'S': 1.25, 'LA': 1.375, 'A': 1.55, 'VA': 1.725}
        calories = bmr * activity_factors[activity_level]

        # Adjust calories based on the diet goal
        diet_goal = user_data['diet_goal']
        if diet_goal == 'loss':
            calories -= 500  # Decrease for weight loss
        elif diet_goal == 'gain':
            calories += 500  # Increase for weight gain
        elif diet_goal != 'maintain':
            raise ValueError("Invalid diet goal.")
        
        # Nutrient 
        return {
            'calories': round(calories),
            'protein': round(weight * 1.2),  # Protein needs based on weight and goal
            'carbs': round((calories * 0.5) / 4),  # Carbohydrates as 50% of total calories
            'fats': round((calories * 0.25) / 9)   # Fats as 25% of total calories
        }
    except KeyError as e:
        raise ValueError(f"Missing info: {str(e)}")
    except ValueError as e:
        raise ValueError(f"Data validation error: {str(e)}")
def convert_to_meal_plan(food_quantities, allowed_foods):
    # Initial empty meal plan structure
    meal_plan = {
        "calories": 0,
        "cost": 0,
        "meals": {
            "breakfast": {"items": {}, "calories": 0},
            "lunch": {"items": {}, "calories": 0},
            "dinner": {"items": {}, "calories": 0}
        }
    }

    # Distribute meals - not accurate yet
    meals = ["breakfast", "lunch", "dinner"]
    meal_index = 0

    for item in allowed_foods:
        name = item['name']
        quantity = food_quantities.get(name, 0)
        if quantity > 0:
            meal_name = meals[meal_index % 3]
            meal_plan['meals'][meal_name]['items'][name] = {
                "carbs": round(item['carbs'] * quantity),
                "protein": round(item['protein'] * quantity),
                "fat": round(item['fats'] * quantity),
            }
            meal_plan['meals'][meal_name]['calories'] += round(item['calories'] * quantity)
            meal_plan['calories'] += round(item['calories'] * quantity)
            meal_plan['cost'] += round(item['cost'] * quantity, 2)
            meal_index += 1

    # Rounding off the total calories and cost
    meal_plan['calories'] = round(meal_plan['calories'])
    meal_plan['cost'] = round(meal_plan['cost'], 2)

    return meal_plan

