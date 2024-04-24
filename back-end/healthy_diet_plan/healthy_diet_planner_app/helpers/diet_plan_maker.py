
def add_food_to_meal(meal_plan, meal_name, item, quantity):
    meal_plan['meals'][meal_name]['items'][item['name']] = {
        "carbs": round(item['carbs'] * quantity),
        "protein": round(item['protein'] * quantity),
        "fat": round(item['fats'] * quantity),
    }
    added_calories = round(item['calories'] * quantity)
    meal_plan['meals'][meal_name]['calories'] += added_calories
    meal_plan['calories'] += added_calories
    meal_plan['cost'] += round(item['cost'] * quantity, 2)

## Function will take take the optimized food  
##  and convert them into a meal plan structure
def convert_to_meal_plan(food_quantities, allowed_foods):
    print(food_quantities)
    meal_plan = {
        "calories": 0,
        "cost": 0,
        "meals": {
            "breakfast": {"items": {}, "calories": 0},
            "lunch": {"items": {}, "calories": 0},
            "dinner": {"items": {}, "calories": 0}
        }
    }

    meals = ["breakfast", "lunch", "dinner"]
    meal_index = 0

    for item in allowed_foods:
        name = item['name']
        quantity = food_quantities.get(name, 0)
        if quantity > 0:
            meal_name = meals[meal_index % 3]
            add_food_to_meal(meal_plan, meal_name, item, quantity)
            meal_index += 1

    meal_plan['calories'] = round(meal_plan['calories'])
    meal_plan['cost'] = round(meal_plan['cost'], 2)

    return meal_plan

