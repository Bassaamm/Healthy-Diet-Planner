from django.core.management.base import BaseCommand
from healthy_diet_planner_app.models import FoodItem

class Command(BaseCommand):

    def handle(self, *args, **options):
        FoodItem.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Foods deleted successfully!'))