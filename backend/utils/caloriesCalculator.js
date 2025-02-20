// utils/caloriesCalculator.js
const calculateCalories = (userProfile) => {
    const { age, weight, height, gender, activityLevel, fitnessGoal } = userProfile;
  
    // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    // Adjust for activity level
    let tdee;
    switch (activityLevel) {
      case 'sedentary':
        tdee = bmr * 1.2;
        break;
      case 'light':
        tdee = bmr * 1.375;
        break;
      case 'moderate':
        tdee = bmr * 1.55;
        break;
      case 'active':
        tdee = bmr * 1.725;
        break;
      case 'very_active':
        tdee = bmr * 1.9;
        break;
      default:
        tdee = bmr * 1.2;
    }
  
    // Adjust calories based on fitness goal
    let calorieIntake;
    if (fitnessGoal === 'lose') {
      calorieIntake = tdee - 500; // Caloric deficit
    } else if (fitnessGoal === 'gain') {
      calorieIntake = tdee + 500; // Caloric surplus
    } else if (fitnessGoal === 'maintain') {
      calorieIntake = tdee; // Maintenance
    }
  
    // Calculate protein intake (usually 1.6 to 2.2 grams per kg of body weight)
    const proteinIntake = weight * 2;
  
    return { calorieIntake, proteinIntake };
  };
  
  module.exports = { calculateCalories };
  