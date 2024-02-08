import { useEffect, useState } from "react";
import { IWorkout } from "./interfaces";
import axios from "axios";

const backendUrl = "http://localhost:3601";

function App() {
	const [workouts, setWorkouts] = useState<IWorkout[]>([]);
	const loadWorkouts = async () => {
		const response = await axios.get(`${backendUrl}/workouts`);
		const _workouts = response.data;
		setWorkouts(_workouts);
	};

	useEffect(() => {
		loadWorkouts();
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
				loadWorkouts();
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
				loadWorkouts();
			} catch (e) {
				console.log("there was an error");
			}
		})();
	};

	const deleteWorkout = (workout: IWorkout) => {
		(async () => {
			try {
				const response = await axios.delete(
					`${backendUrl}/workouts/${workout.id}`
				);
				console.log(response);
				loadWorkouts();
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
					return (
						<li className="mb-2" key={workout.id}>
							{workout.title} - {workout.duration}{" "}
							<button onClick={() => deleteWorkout(workout)}>
								Delete
							</button>
						</li>
					);
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
