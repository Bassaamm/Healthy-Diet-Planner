from django.core.management.base import BaseCommand
from healthy_diet_planner_app.models import FoodItem
import csv

class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str)

    def handle(self, *args, **options):
        csv_file_path = options['csv_file']
        with open(csv_file_path, 'r') as file:
            reader = csv.reader(file)
            next(reader)  # Skip the header row
            for row in reader:
                FoodItem.objects.update_or_create(
                    name=row[1],
                    defaults={
                        'mealType': row[0],
                        'cost': float(row[2].replace('$', '')),  # remove the dollar sign before converting to float
                        'calories': int(row[3]),
                        'protein': float(row[4]),
                        'carbs': float(row[5]),
                        'fats': float(row[6]),
                        'is_vegan': row[7].lower() == 'true',
                        'is_vegetarian': row[8].lower() == 'true',
                        'is_gluten_free': row[9].lower() == 'true',
                        'is_lactose_free': row[10].lower() == 'true',
                    }
                )
        self.stdout.write(self.style.SUCCESS('Foods saved successfully!'))