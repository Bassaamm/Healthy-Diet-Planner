# Healthy Diet Planner - Backend

This is the backend for the Healthy Diet Planner. It provides an API endpoint that calculates a diet plan based on user's personal information and dietary preferences and pick the minimun cost using Linear Programing .

## Installation

Before you can use the backend, you need to install the necessary dependencies. Navigate to the `back-end\healthy_diet_plan>` directory and run the following command:

```bash
pip install -r requirements.txt
```

## Running the Server

After installing the dependencies, you can start the server by running the following command:

```bash
py manage.py runserver
```

## API Usage

To test the API endpoint, you can use a tool like Postman. The endpoint is:

```bash
http://localhost:8000/diet_plan
```

Make sure to use the POST method and provide the following JSON object as the body:

```bash
{
    "weight": "80",
    "height": "170",
    "age": "18",
    "gender": "M",
    "activity_level": "A",
    "diet_goal": "gain",
    "is_vegan": "false",
    "is_vegetarian": "false",
    "is_gluten_free": "false",
    "is_lactose_free": "false"
}
```

Example Response
Here's an example of the data returned by the API:

```bash
{
    "status": "success",
    "meal_plan": {
        "calories": 3254,
        "cost": 11.44,
        "meals": {
            "breakfast": {
                "items": {
                    "Oil, soybean lecithin": {
                        "carbs": 0,
                        "protein": 0,
                        "fat": 103
                    }
                },
                "calories": 788
            },
            "lunch": {
                "items": {
                    "Cheese, muenster": {
                        "carbs": 1,
                        "protein": 29,
                        "fat": 37
                    }
                },
                "calories": 448
            },
            "dinner": {
                "items": {
                    "Snacks, air-popped, popcorn": {
                        "carbs": 406,
                        "protein": 67,
                        "fat": 24
                    }
                },
                "calories": 2018
            }
        }
    }
}
```
