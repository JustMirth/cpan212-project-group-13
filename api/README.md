## How to run API, environment variables, table of endpoints
API requires no key; just the default installations:
npm install
npm run dev

so far for environment variables:
Method          Path                    What
PORT            4000                    Default port used

API Endpoints
Workouts
Method              Path                        What                    
GET                 /api/workouts               Get workouts
GET                 /api/workouts/:id           Get workout via ID
POST                /api/workouts               Create workout
PUT                 /api/workouts/:id           update workout
DELETE              /api/workouts/:id           delete workout

Exercises
Method              Path                        What                    
GET                 /api/exercises              Get exercises
GET                 /api/exercises/:id           Get workout via ID
POST                /api/exercises               Create exercises
PUT                 /api/exercises/:id           update exercises
DELETE              /api/exercises/:id           delete exercise

External WGER API
Method              Path                        What                    
GET                 /api/wger/exercises         Get exercises from API
## TESTING SECTION

## Workout:

Create: 
curl -i -X POST http://localhost:4000/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "userID": "001",
    "name": "Upper Body Workout",
    "description": "Chest, back, and arms",
    "date": "2026-10-23",
    "status": "planned",
    "exercises": [],
    "notes": "Start with a light warm-up"
  }'

HTTP/1.1 201 Created
{"userID":"001","name":"Upper Body Workout","description":"Chest, back, and arms","date":"2026-10-23","status":"planned","exercises":[],"notes":"Start with a light warm-up","id":"1a77adb5-3215-40c3-ac47-472370822042","createdAt":"2026-10-21T01:35:17.377Z","updatedAt":"2026-10-21T01:35:17.377Z"}

Read (All Workouts):
curl -i http://localhost:4000/api/workouts

HTTP/1.1 200 OK

Read (Specific Workout):
curl -i http://localhost:4000/api/workouts/ WORKOUT ID (THIS WILL CHANGE EACH TIME RELAUNCHED, NEED TO CHECK AND ENTER MANUALLY)

Expected status code: 200 OK

Update:
curl -i -X PUT http://localhost:4000/api/workouts/ WORKOUT ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Upper Body Workout",
    "description": "Chest, back, shoulders, and arms",
    "status": "planned",
    "notes": "Increase the weight if comfortable"
  }'

200 OK

Delete:
curl -i -X DELETE http://localhost:4000/api/workouts/ WORKOUT ID

204 No Content

   curl -i -X POST http://localhost:4000/api/workouts \
    H "Content-Type: application/json" \
  -d '{
    "userID": "01",
    "date": "2026-10-24",
    "status": "planned",
    "exercises": "[]"
  }'

Expected status: 400 Bad Request

### WorkoutExercises:

Create:
curl -i -X POST http://localhost:4000/api/workouts/ WORKOUT ID /exercises \
  -H "Content-Type: application/json" \
  -d '{
    "wgerID": 20,
    "sets": [
      { "reps": 10, "weight": 0 },
      { "reps": 8, "weight": 0 },
      { "reps": 6, "weight": 0 }
    ]
  }'
(For this, make sure you are creating to an existing workout, and it will pull information about the exercise based on the wgerID)

201 Created

Read (All exercises in a workout):
curl -i http://localhost:4000/api/workouts/ WORKOUT ID /exercises

200 OK

Read (An exercise in a workout):
curl -i http://localhost:4000/api/workouts/ WORKOUT ID /exercises/ WORKOUT EXERCISE ID
(Same things that apply for workout ID, also apply for Workout Exercise ID)

200 OK

Update:
curl -i -X PUT http://localhost:4000/api/workouts/ WORKOUT ID /exercises/ WORKOUT EXERCISE ID \
  -H "Content-Type: application/json" \
  -d '{
    "sets": [
      { "reps": 12, "weight": 0 },
      { "reps": 10, "weight": 0 }
    ]
  }'

200 OK

Delete:
curl -i -X DELETE http://localhost:4000/api/workouts/ WORKOUT ID /exercises/ WORKOUT EXERCISE ID

204 No Content

## WGER External API

    Get Exercises from WGER
curl -i http://localhost:4000/api/wger/exercises

Expected status: 200 OK

(Running this after CACHE_TTL_SECONDS (6 or so) would return a cache hit)


    returns a 502 (external API error)
changing URL indifferent from http://localhost:4000/api/wger/exercises
would return a 502 

    504 (timeout)
changing abortSignal.timeout() to lesser than API response time
would return a 504

$ curl -i http://localhost:4000/api/wger/exercises/what

would return a 404 Not Found


