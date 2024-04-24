from django.http import HttpResponse, JsonResponse
from .models import FoodItem
from .optimizer import optimize_diet  
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from .helpers import calc_user_nutitious ,diet_plan_maker

@csrf_exempt
@require_http_methods(["GET"])
def index(request):
    return HttpResponse({"messge": " Welcome to Healthy Diet Planner! "})


@csrf_exempt
@require_http_methods(["POST"])
def diet_plan(request):
    print("meal_plan")
    print(request)
    if request.method == "POST":
        try:
            user_data = json.loads(request.body.decode('utf-8'))

            if not user_data:
                return JsonResponse({'status': 'error', 'details': 'No user data provided'}, status=500)
            
            requirements = calc_user_nutitious.get_user_nutritious(user_data)
            query = FoodItem.objects.all()
            if user_data.get('is_vegan') == "true":
                query = query.filter(is_vegan=True)
            if user_data.get('is_vegetarian') == "true":
                query = query.filter(is_vegetarian=True)
            if user_data.get('is_gluten_free') == "true":
                query = query.filter(is_gluten_free=True)
            if user_data.get('is_lactose_free') == "true":
                query = query.filter(is_lactose_free=True)

            allowed_foods = list(query.values('name', 'cost', 'calories', 'protein', 'carbs', 'fats'))

            if not allowed_foods:
                return JsonResponse({'status': 'error', 'details': 'No foods meet the dietary requirements'})

            food_quantities = optimize_diet(allowed_foods, requirements)
            meal_plan = diet_plan_maker.convert_to_meal_plan(food_quantities, allowed_foods)
            return JsonResponse({'status': 'success', 'meal_plan': meal_plan})
        except Exception as e:
            print(str(e))  
            return JsonResponse({'status': 'error', 'details': str(e)}, status=500)

