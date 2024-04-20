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
            next(reader)  
            for row in reader:
                FoodItem.objects.update_or_create(
                    name=row[0],
                    defaults={
                        'cost': float(row[1]),
                        'calories': int(row[2]),
                        'protein': float(row[3]),
                        'carbs': float(row[4]),
                        'fats': float(row[5]),
                        'is_vegan': row[6].lower() == 'true',
                        'is_vegetarian': row[7].lower() == 'true',
                        'is_gluten_free': row[8].lower() == 'true',
                        'is_lactose_free': row[9].lower() == 'true'
                    }
                )
