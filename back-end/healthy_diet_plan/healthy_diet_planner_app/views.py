from django.http import HttpResponse, JsonResponse
from .models import FoodItem
from .optimizer import optimize_diet  
from .healper_fucntions import calculate_nutritional_needs
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json


def index(request):
    return HttpResponse("Welcome to Healthy Diet Planner!")

@csrf_exempt
@require_http_methods(["POST"])
def diet_plan(request):
    if request.method == "POST":
        try:
            user_data = json.loads(request.body.decode('utf-8'))
            # Get user nutritional requirements
            requirements = calculate_nutritional_needs(user_data)

            # Getting the food data from database
            allowed_foods = list(FoodItem.objects.all().values('name', 'cost', 'calories', 'protein', 'carbs', 'fats'))

            # Get optimized food quantities
            food_quantities = optimize_diet(allowed_foods, requirements)

            # Convert to structured meal plan
            meal_plan = convert_to_meal_plan(food_quantities, allowed_foods)
            
            return JsonResponse({'status': 'success', 'meal_plan': meal_plan})
        except Exception as e:
            return JsonResponse({'status': 'error', 'details': str(e)}, status=500)

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

