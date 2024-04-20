from pulp import LpProblem, LpMinimize, LpVariable, lpSum, LpStatus, PULP_CBC_CMD

def optimize_diet(food_items, requirements):
    prob = LpProblem("OptimalDiet", LpMinimize)
    food_vars = {item['name']: LpVariable(str(item['name']), lowBound=0) for item in food_items}
    
    # Objective: Minimize cost
    prob += lpSum([food_vars[item['name']] * item['cost'] for item in food_items]), "Total Cost"
    
    # Constraints
    prob += lpSum([food_vars[item['name']] * item['calories'] for item in food_items]) >= requirements['calories'], "Calorie_Min"
    prob += lpSum([food_vars[item['name']] * item['protein'] for item in food_items]) >= requirements['protein'], "Protein_Min"
    prob += lpSum([food_vars[item['name']] * item['carbs'] for item in food_items]) >= requirements['carbs'], "Carbs_Min"
    prob += lpSum([food_vars[item['name']] * item['fats'] for item in food_items]) >= requirements['fats'], "Fats_Min"

    # Solve the problem
    status = prob.solve(PULP_CBC_CMD(msg=0))
    # It will print if the solver is optimal or not 
    print("Solver status:", LpStatus[status])

    # Collect results
    result = {item['name']: food_vars[item['name']].value() for item in food_items if food_vars[item['name']].value() > 0}
    print("result" , result)
    return result
