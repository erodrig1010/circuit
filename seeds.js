const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const exerciseSchema = new Schema({
  name: { type: String, required: true, lowercase: true},
  imageURL: { type: String, required: true},
  instructions: { type: String},
  equipment: {
    type: String,
    enum : ['Bodyweight', 'Dumbbells', 'Kettlebells', 'Barbell', 'Medicine Ball', 'Resistance Bands'],
    default : 'Bodyweight',
  },
  bodyGroup: {
    type: String,
    enum : ['Upper Body', 'Lower Body', 'Full Body'],
    default : 'Full Body',
  },
  source: String
});

const Exercise = mongoose.model("Exercise", exerciseSchema);


mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/circuit', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });



const exercises = [
  // {
  //   "name": "Bench Dips",
  //   "imageURL": "./public/images/exercise/upper/bench-dips-bodyweight-male.svg",
  //   "instructions": `Sit on a chair with your hands either next to your hips or slightly under the hips.
  //   Lift up onto your hands and bring your hips forward.
  //   Bend your elbows and lower your hips down, keeping shoulders down and hips close to the chair.
  //   Push back up but don’t lock your elbows and repeat.`,
  //   "equipment": 'Bodyweight',
  //   "bodyGroup": 'Upper Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },
  // {
  //   "name": "Standing Dumbbell Bicep Curls",
  //   "imageURL": "./public/images/exercise/upper/bicep-curls-dumbell-male.svg",
  //   "instructions": `Holding a dumbbell in each hand, stand with your feet shoulder width apart.
  //   Let your arms hang by your side with your palms facing in to the side of your body.
  //   Keep your elbows close to your sides.
  //   Curl the dumbbells up towards your shoulders, rotating your forearms. Do not swing your hips to get the weight moving.
  //   Continue raising the dumbbells until they are level with your shoulders with your palms facing in. Your forearm should be in a vertical position.
  //   Squeeze or flex your bicep and hold for a count of one.
  //   Slowly lower the dumbbells to the starting position.
  //   Repeat.`,
  //   "equipment": 'Dumbbells',
  //   "bodyGroup": 'Upper Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },
  // {
  //   "name": "Pushups",
  //   "imageURL": "./public/images/exercise/upper/push-up-bodyweight-female.svg",
  //   "instructions": `Get into position by placing your hands flat on the floor, directly below your shoulders.
  //   Extend your legs out behind you, with only your toes and balls of your feet touching the floor.
  //   Hold your body up and keep your back straight by tightening your abdominal muscles.
  //   Your neck and head should be bent slightly back.
  //   Lower your chest towards the ground by bending your elbows until your chest is just above the ground or you feel a stretching of your chest and shoulders. Hold for a count of one.
  //   Press upwards from your chest and shoulders, straightening your arms as you return to the starting position. Hold for a count of one.
  //   Repeat.`,
  //   "equipment": 'Bodyweight',
  //   "bodyGroup": 'Upper Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },
  // {
  //   "name": "Standing Bent Over Dumbbell Rows",
  //   "imageURL": "./public/images/exercise/upper/rows-dumbell-female.svg",
  //   "instructions": `Stand tall with a tight core and flat back. Hold a pair of dumbbells at your side with an overhand grip. Bend slightly at the knees as you push your hips back. Keep your chest and head up. Upper body should be almost parallel with the floor.
  //   With your elbows at a 60-degree angle, bring the dumbbells up. Pause when your upper arm is parallel with the floor. Contract the muscle then slowly return the dumbbells to the starting point.`,
  //   "equipment": 'Dumbbells',
  //   "bodyGroup": 'Upper Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },
  // {
  //   "name": "Bodyweight Shoulder Presses",
  //   "imageURL": "./public/images/exercise/upper/shoulder-press-bodyweight-female.svg",
  //   "instructions": `From a push-up position push your glutes upwards and walk your feet in so that you are in a downward-dog pose.
  //   The shape of your body should look like a triangle from the side.
  //   Lower your shoulders towards the ground by bending your elbows.
  //   Allow your forehead to very lightly make contact with the ground before pushing upwards and away back into the starting position.`,
  //   "equipment": 'Bodyweight',
  //   "bodyGroup": 'Upper Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },

  // {
  //   "name": "Air Squats",
  //   "imageURL": "./public/images/exercise/lower/air-squat-bodyweight-female.svg",
  //   "instructions": `Place your feet at shoulder width apart while keeping your chest up and your abdominals braced.
  //   Begin the movement by swinging your arms up towards your shoulders. At the same time, bend at the knees and drive your hips back like you’re sitting in a chair.
  //   Once your upper thighs are parallel with the ground, pause, then drive your hips forward to return to the starting position.`,
  //   "equipment": 'Bodyweight',
  //   "bodyGroup": 'Lower Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },
  // {
  //   "name": "Alternating Lunges",
  //   "imageURL": "./public/images/exercise/lower/alternating-lunges-bodyweight-female.svg",
  //   "instructions": `Stand straight – that’s the starting position. Step forward with your left leg and slowly lower your body until your front knee is bent at least 90 degrees, while your rear knee is just off the floor. Keep your torso upright the entire time. Look forward.
  //   Pause, then push off your left foot off the floor and return to the starting position as quickly as you can.
  //   On your next rep, step forward with your right leg. Continue to alternate back and forth—doing one rep with your left, then one rep with your right.`,
  //   "equipment": 'Bodyweight',
  //   "bodyGroup": 'Lower Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },
  // {
  //   "name": "Bird Dogs",
  //   "imageURL": "./public/images/exercise/lower/bird-dogs-bodyweight-female.svg",
  //   "instructions": `Position yourself on all fours with knees underneath the hips and wrists under the shoulders.
  //   Engage your abs and keep your spine neutral, pulling the shoulder blades towards the hips.
  //   Lengthen the left leg until it is straight out and in line with your hips while simultaneously raising and straightening your right arm until it is parallel to the floor. Keep your head and shoulders aligned at all times.
  //   Gently lower your arm and leg back to the starting position and alternate with the other arm and leg.`,
  //   "equipment": 'Bodyweight',
  //   "bodyGroup": 'Lower Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },
  // {
  //   "name": "Power Jumps",
  //   "imageURL": "./public/images/exercise/lower/power-jumps-bodyweight-male.svg",
  //   "instructions": `Begin in a kneeling position on the floor with your back straight.
  //   Lower your glutes towards your heels and then explosively jump to your feet by bringing them forward.
  //   From the standing squatted position, drive through your calves, quadriceps, and glutes to perform one squat jump.`,
  //   "equipment": 'Bodyweight',
  //   "bodyGroup": 'Lower Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },
  // {
  //   "name": "Lateral Lunges",
  //   "imageURL": "./public/images/exercise/lower/lateral-lunges-bodyweight-male.svg",
  //   "instructions": `Stand tall with a tight core and make sure your feet are shoulder-width apart. Bring your hands together for balance.
  //   Step directly to the left, leaving your right foot in place. Bend the left knee and pause once the upper left thigh is parallel to the ground. Your right leg should be completely straight.
  //   Contract the hamstring muscle then push off the ground to return to the starting position. Repeat on the right side. Alternate this movement.`,
  //   "equipment": 'Bodyweight',
  //   "bodyGroup": 'Lower Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },

  // {
  //   "name": "Bear Crawls",
  //   "imageURL": "./public/images/exercise/full/bear-crawls-bodyweight-female.svg",
  //   "instructions": `Come to the ground, placing your knees below your hips and your hands below your shoulders. Elevate your hips up, extending your legs and arms. Keep the head in a neutral position.
  //   Move the right hand forward as you simultaneously move the left foot forward. Afterwards, move the left hand and right foot forward.
  //   Continue in this back and forth pattern, always moving the opposite hand and foot. Remember to brace the core throughout the movement.`,
  //   "equipment": 'Bodyweight',
  //   "bodyGroup": 'Full Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },
  // {
  //   "name": "Burpees",
  //   "imageURL": "./public/images/exercise/full/burpees-bodyweight-male.svg",
  //   "instructions": `Stand straight with your feet shoulder width apart and hands by your sides. This is the start position.
  //   In one smooth motion, squat down and place your hands palms down on the floor in front of your feet.
  //   Lean forward, so your weight is on your hands, at the same time jumping your legs out behind you until they are fully extended. Your body should form a straight line with your weight supported on your toes and the balls of your feet and your arms fully extended. (In a push up position)
  //   Jump your feet out by spreading your legs, so that they are wider than hip width apart, then immediately jump them back together.
  //   Complete 1 full push up.
  //   Jump your feet forward to just behind your hands.
  //   Use an explosive motion to push through your heels and return to the start postion.
  //   Repeat.`,
  //   "equipment": 'Bodyweight',
  //   "bodyGroup": 'Full Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },
  // {
  //   "name": "Crab Walks",
  //   "imageURL": "./public/images/exercise/full/crab-walks-bodyweight-female.svg",
  //   "instructions": `Sit on the ground with your knees bent, feet flat on the ground and your hands behind you. Your hands should be facing forward towards you.
  //   Begin the movement by lifting your hips into the air and bracing your abdominals. Your hips must stay up throughout the movement. Walk forward by moving your right foot and right hand forward. Switch to the left side.
  //   Continue this back and forth pattern while keeping your hips elevated. When finished, lower yourself to the ground.`,
  //   "equipment": 'Bodyweight',
  //   "bodyGroup": 'Full Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },
  // {
  //   "name": "Mountain Climbers",
  //   "imageURL": "./public/images/exercise/full/mountain-climbers-bodyweight-male.svg",
  //   "instructions": `Place your hands flat on the floor, shoulder width apart.
  //   Extend your torso and legs fully behind you with only your toes and balls of your feet touching the floor.
  //   Your body should be in a straight line, with your weight supported on your hands and toes only.
  //   Starting with either leg, flex your knee and hip at the same time to bring your knee up and under your hip. Your other leg should remain fully extended. This is the start position.
  //   Using an explosive movement, reverse the position of your legs, by extending the bent leg back and simultaneously flexing the straight leg until it is in the startposition.
  //   Continue alternating in this manner for the desire amount of time.`,
  //   "equipment": 'Bodyweight',
  //   "bodyGroup": 'Full Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },
  // {
  //   "name": "Sprints",
  //   "imageURL": "./public/images/exercise/full/sprint-bodyweight-male.svg",
  //   "instructions": `Hold your body steady in a solid, slightly-leaning-forward position.  
  //   Drive your back leg into the floor and begin by taking small, rapid steps that gradually build to bigger, explosive steps.
  //   Pump your arms and use them to pull your body forward, allow your hands to travel from hip to lip as you run.
  //   With every stride, lift your front knee while straightening your back leg completely to deliver full-bursting power.
  //   As you pass the finish line, allow your pace to slow steadily. Do not try to stop yourself instantly, you have no air bag.`,
  //   "equipment": 'Bodyweight',
  //   "bodyGroup": 'Full Body',
  //   "source": "https://workoutlabs.com/exercise-guide/"
  // },
]


Exercise.create(exercises)
.then(res => {
  console.log("Exercises created! You da best.")
})
.catch(err => {
  console.log(err)
})


// mongoose.disconnect();