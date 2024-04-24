from django.test import TestCase, Client
from .models import FoodItem
from .optimizer import optimize_diet
class OptimizeDietTestCase(TestCase):
    def setUp(self):
        self.food_items = [
            {'name': 'food1', 'cost': 1, 'calories': 100, 'protein': 10, 'carbs': 20, 'fats': 5},
            {'name': 'food2', 'cost': 2, 'calories': 200, 'protein': 20, 'carbs': 40, 'fats': 10}
        ]
        self.requirements = {'calories': 300, 'protein': 30, 'carbs': 60, 'fats': 15}

    def test_optimize_diet(self):
        result = optimize_diet(self.food_items, self.requirements)
        # Make sure the reutnr value is not empty
        self.assertTrue(result)
        # Make sure the return type is dict
        self.assertIsInstance(result, dict)
        # Make sure that the total calories returned meal plan equals the required calories
        food_dict = {food['name']: food for food in self.food_items}
        self.assertEqual(sum(food_dict[item]['calories'] * quantity for item, quantity in result.items()), self.requirements['calories'])

class DietPlanIntegrationTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_diet_plan_view(self):
        user_data = {
            'weight': '70',
            'height': '170',
            'age': '30',
            'gender': 'M',
            'activity_level': 'LA',
            'diet_goal': 'loss',
            'is_vegan': 'true',
            'is_vegetarian': 'false',
            'is_gluten_free': 'true',
            'is_lactose_free': 'false'
        }
        response = self.client.post('/diet_plan', data=user_data, content_type='application/json')
        self.assertEqual(response.status_code, 200)


    def test_diet_plan_response_is_empty(self):
        user_data = {}
        response = self.client.post('/diet_plan', data=user_data, content_type='application/json')
        self.assertTrue(response)
        self.assertEqual(response.status_code, 500)
    
