from django.db import models

class FoodItem(models.Model):
    mealType = models.CharField(max_length=100 , null=True , default='')
    name = models.CharField(max_length=100)
    cost = models.FloatField()
    calories = models.IntegerField()
    protein = models.FloatField()
    carbs = models.FloatField()
    fats = models.FloatField()
    is_vegan = models.BooleanField(default=False)
    is_vegetarian = models.BooleanField(default=False)
    is_gluten_free = models.BooleanField(default=False)
    is_lactose_free = models.BooleanField(default=False)