import { useEffect, useState } from "react";
import { IWorkout } from "./interfaces";
import axios from "axios";

const backendUrl = "http://localhost:3601";

function App() {
	const [workouts, setWorkouts] = useState<IWorkout[]>([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/workouts`);
			const _workouts = response.data;
			setWorkouts(_workouts);
		})();
	}, []);

	const addWorkout = () => {
		(async () => {
			const workout = {
				title: "Workout from React 8292",
				duration: "45 minutes",
			};
			const headers = {
				"Content-Type": "application/json",
			};
			try {
				const response = await axios.post(
					`${backendUrl}/workouts`,
					workout,
					{ headers }
				);
				console.log(response);
			} catch (e) {
				console.log("there was an error");
			}
		})();
	};

	const changeWorkout = () => {
		(async () => {
			const workout = {
				title: "Bicep workout",
				duration: "99 hours",
			};
			const headers = {
				"Content-Type": "application/json",
			};
			try {
				const response = await axios.put(
					`${backendUrl}/workouts/1ss7`,
					workout,
					{ headers }
				);
				console.log(response);
			} catch (e) {
				console.log("there was an error");
			}
		})();
	};

	return (
		<>
			<h1 className="text-2xl">Workout Site</h1>
			<p>There are {workouts.length} workouts.</p>
			<ul>
				{workouts.map((workout) => {
					return <li key={workout.id}>{workout.title} - {workout.duration}</li>;
				})}
			</ul>
			<hr />
			<button onClick={() => addWorkout()}>Add a workout</button>
			<hr />
			<button onClick={() => changeWorkout()}>Change a workout</button>
		</>
	);
}

export default App;
