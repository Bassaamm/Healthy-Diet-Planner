from django.http import HttpResponse, JsonResponse
from .models import FoodItem
from .optimizer import optimize_diet  
from .healper_fucntions import calculate_nutritional_needs ,   convert_to_meal_plan
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

